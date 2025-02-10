from flask import Flask, request, jsonify, session
from langchain.chains import create_stuff_documents_chain
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_groq import ChatGroq
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain.schema import HumanMessage, AIMessage
import os
import uuid
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "fallback_secret_key")

# Initialize LLM with secure API key
groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("GROQ_API_KEY is not set in the environment variables.")

llm = ChatGroq(groq_api_key=groq_api_key, model_name="llama-3.3-70b-versatile")

# Chat history storage
session_store = {}

# Function to get session history
def get_session_history(session_id: str) -> BaseChatMessageHistory:
    return session_store.setdefault(session_id, {"history": ChatMessageHistory()})["history"]

@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    question = data.get('question')
    
    if not question:
        return jsonify({"error": "Missing question."}), 400
    
    session_id = session.get('session_id')
    if not session_id:
        session_id = str(uuid.uuid4())
        session['session_id'] = session_id
    
    session_history = get_session_history(session_id)
    
    # Define chatbot prompt
    prompt_template = (
        "You are a medical chatbot. Answer questions professionally and accurately. "
        "\n\nQuestion: {input}\n\nProvide a clear, medically accurate answer."
    )
    
    question_prompt = ChatPromptTemplate.from_messages([
        ("system", prompt_template),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ])
    
    question_chain = create_stuff_documents_chain(llm, question_prompt)
    
    try:
        response = question_chain.invoke(
            {
                "input": question,
                "chat_history": session_history.messages,
            }
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
