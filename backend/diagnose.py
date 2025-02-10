from flask import Flask, request, jsonify, render_template, session
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_chroma import Chroma
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain.schema import HumanMessage, AIMessage
import os
import uuid
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "fallback_secret_key")

# Initialize embeddings
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Initialize LLM with secure API key
groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("GROQ_API_KEY is not set in the environment variables.")

llm = ChatGroq(groq_api_key=groq_api_key, model_name="llama-3.3-70b-versatile")

# Chat history storage
session_store = {}

# Persistent vectorstore directory
VECTORSTORE_DIR = "chroma_db"
os.makedirs(VECTORSTORE_DIR, exist_ok=True)

# Function to get session history
def get_session_history(session_id: str) -> BaseChatMessageHistory:
    return session_store.setdefault(session_id, {"history": ChatMessageHistory()})["history"]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_report():
    file = request.files.get('file')
    if not file or not file.filename.endswith('.pdf'):
        return jsonify({"error": "Invalid file format. Please upload a PDF."}), 400
    
    session_id = str(uuid.uuid4())
    session['session_id'] = session_id  # Store session ID in Flask session

    os.makedirs("uploaded_reports", exist_ok=True)  # Ensure directory exists
    file_path = f"uploaded_reports/{session_id}.pdf"
    file.save(file_path)
    
    # Process PDF
    loader = PyPDFLoader(file_path)
    report_docs = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    report_splits = text_splitter.split_documents(report_docs)
    
    # Initialize vectorstore
    vectorstore = Chroma.from_documents(documents=report_splits, embedding=embeddings, persist_directory=VECTORSTORE_DIR)
    retriever = vectorstore.as_retriever()
    
    # Define prompt
    patient_prompt_template = (
        "You are a medical chatbot. Use the provided patient report to answer questions professionally. "
        "\n\nPatient Report Content: {context}"
        "\n\nQuestion: {input}"
        "\n\nProvide a clear, medically accurate answer."
    )

    question_prompt = ChatPromptTemplate.from_messages([
        ("system", patient_prompt_template),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ])
    
    # Create chains
    history_aware_retriever = create_history_aware_retriever(llm=llm, retriever=retriever, prompt=question_prompt)
    question_chain = create_stuff_documents_chain(llm, question_prompt)
    rag_chain = create_retrieval_chain(history_aware_retriever, question_chain)
    
    conversational_rag_chain = RunnableWithMessageHistory(
        rag_chain,
        get_session_history,
        input_messages_key="input",
        history_messages_key="chat_history",
        output_messages_key="answer"
    )
    
    # Store session data
    session_store[session_id] = {
        'chain': conversational_rag_chain,
        'report_docs': report_docs,
        'vectorstore': vectorstore,
        'history': ChatMessageHistory()
    }
    
    return jsonify({"message": "Report uploaded successfully.", "session_id": session_id})

@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    question = data.get('question')
    
    session_id = data.get('session_id') or session.get('session_id')

    if not question or not session_id:
        return jsonify({"error": "Missing question or session ID."}), 400
    
    session_data = session_store.get(session_id)
    if not session_data:
        return jsonify({"error": "Session not found. Please upload a report first."}), 400
    
    chain = session_data.get('chain')
    report_docs = session_data.get('report_docs')
    session_history = session_data.get('history')

    if not chain or not report_docs or not session_history:
        return jsonify({"error": "Session data is incomplete. Please re-upload the report."}), 400

    try:
        response = chain.invoke(
            {
                "input": question,
                "context": " ".join([doc.page_content for doc in report_docs]),
                "chat_history": session_history.messages,
            },
            config={"configurable": {"session_id": session_id}}
        )
        
        if 'answer' not in response:
            return jsonify({"error": "Invalid response format from LLM."}), 500

        session_history.add_message(HumanMessage(content=question))
        session_history.add_message(AIMessage(content=response['answer']))
        
        return jsonify({"answer": response['answer']})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
