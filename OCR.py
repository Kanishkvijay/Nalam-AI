from flask import Flask, request, jsonify, render_template
import pdfplumber
import re

app = Flask(__name__)

# Reference ranges for lab results
patterns = {
    "CK-MB": r"(CK\s*-?\s*MB|Creatine\s*Kinase\s*-?\s*MB)\s*[:\-]?\s*(\d+\.?\d*)",
    "Myoglobin": r"(Myoglob(?:in|yn))\s*[:\-]?\s*(\d+\.?\d*)",
    "Troponin": r"(Troponin\s*[TI]?)\s*[:\-]?\s*(\d+\.?\d*)",
    "Total Cholesterol": r"(Total\s*Cholest(?:erol|rol))\s*[:\-]?\s*(\d+\.?\d*)\s*mg/dl",
    "LDL": r"(LDL|Low\s*Density\s*Lipoprotein)\s*[:\-]?\s*(\d+\.?\d*)\s*mg/dl",
    "HDL": r"(HDL|High\s*Density\s*Lipoprotein)\s*[:\-]?\s*(\d+\.?\d*)\s*mg/dl",
    "Triglycerides": r"(Triglycerides?)\s*[:\-]?\s*(\d+\.?\d*)\s*mg/dl",
    "Diastolic BP": r"(Diastolic\s*BP|Diastolic\s*Blood\s*Pressure)\s*[:\-]?\s*(\d+\.?\d*)\s*mm/Hg",
    "Systolic BP": r"(Systolic\s*BP|Systolic\s*Blood\s*Pressure)\s*[:\-]?\s*(\d+\.?\d*)\s*mm/Hg",
    "Hemoglobin": r"Hemoglobin\s+[A-Za-z]*\s*(\d+\.?\d*)\s*g/dL",
    "RBC Count": r"RBC Count\s+[A-Za-z]*\s*(\d+\.?\d*)\s*million/cmm",
    "Hematocrit": r"Hematocrit\s+[A-Za-z]*\s*(\d+\.?\d*)\s*%",
    "MCV": r"MCV\s+[A-Za-z]*\s*(\d+\.?\d*)\s*fL",
    "MCH": r"MCH\s+[A-Za-z]*\s*(\d+\.?\d*)\s*pg",
    "MCHC": r"MCHC\s+[A-Za-z]*\s*(\d+\.?\d*)\s*g/dL",
    "RDW CV": r"RDW CV\s+[A-Za-z]*\s*(\d+\.?\d*)\s*%",
    "WBC Count": r"WBC Count\s+[A-Za-z]*\s*(\d+)\s*/cmm",
    "Neutrophils": r"Neutrophils\s+[A-Za-z]*\s*(\d+)\s*%",
    "Lymphocytes": r"Lymphocytes\s+[A-Za-z]*\s*(\d+)\s*%",
    "Eosinophils": r"Eosinophils\s+[A-Za-z]*\s*(\d+)\s*%",
    "Monocytes": r"Monocytes\s+[A-Za-z]*\s*(\d+)\s*%",
    "Basophils": r"Basophils\s+[A-Za-z]*\s*(\d+)\s*%",
    "Platelet Count": r"Platelet Count\s+[A-Za-z]*\s*(\d+)\s*/cmm",
    "MPV": r"MPV\s+[A-Za-z]*\s*(\d+\.?\d*)\s*fL",
    "ESR": r"ESR\s+[A-Za-z]*\s*(\d+)\s*mm/1hr"
}

reference_ranges = {
    "Hemoglobin": (13.0, 16.5),  # g/dL
    "RBC Count": (4.5, 5.5),  # million/cmm
    "Hematocrit": (40, 49),  # %
    "MCV": (83, 101),  # fL
    "MCH": (27.1, 32.5),  # pg
    "MCHC": (32.5, 36.7),  # g/dL
    "RDW CV": (11.6, 14),  # %
    "WBC Count": (4000, 10000),  # /cmm
    "Neutrophils": (40, 80),  # %
    "Lymphocytes": (20, 40),  # %
    "Eosinophils": (1, 6),  # %
    "Monocytes": (2, 10),  # %
    "Basophils": (0, 2),  # %
    "Platelet Count": (150000, 410000),  # /cmm
    "MPV": (7.5, 10.3),  # fL
    "ESR": (0, 14),  # mm/1hr
    "CK-MB": (0, 5),
    "Myoglobin": (0, 85),
    "Troponin": (0, 0.04),
    "Total Cholesterol": (0, 200),
    "LDL": (0, 130),
    "HDL (Male)": (45, float('inf')),
    "HDL (Female)": (55, float('inf')),
    "Triglycerides (Male)": (40, 160),
    "Triglycerides (Female)": (35, 135),
    "Diastolic BP": (0, 120),
    "Systolic BP": (0, 80),
    "RBC (Male)": (4.7, 6.1),
    "RBC (Female)": (4.2, 5.4)
}

def extract_lab_values(text):
    """Extract lab values from text using regex."""
    lab_results = {}
    for test, pattern in patterns.items():
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            try:
                value = match.group(1)
                if value:
                    lab_results[test] = float(value)
            except (ValueError, TypeError):
                continue
    return lab_results

def phrase_lab_results(lab_results):
    """Generate phrases for lab results based on reference ranges."""
    phrases = []
    for test, value in lab_results.items():
        low, high = reference_ranges.get(test, (None, None))
        if low is not None and high is not None:
            if value < low:
                phrases.append(f"Your {test} level of {value} is below the normal range.")
            elif value > high:
                phrases.append(f"Your {test} level of {value} is above the normal range.")
            else:
                phrases.append(f"Your {test} level of {value} is within the normal range.")
        else:
            phrases.append(f"{test}: {value} (No reference range available)")
    return phrases

@app.route('/')
def upload_file():
    """Render the upload page."""
    return render_template('index.html')

@app.route('/process-pdf', methods=['POST'])
def process_pdf():
    """Handle PDF upload, extract lab results, and generate report."""
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Extract text from the PDF
    with pdfplumber.open(file) as pdf:
        text = ''.join(page.extract_text() for page in pdf.pages)

    # Extract lab values from the text
    lab_results = extract_lab_values(text)

    if not lab_results:
        return jsonify({"error": "No lab results found in the PDF"}), 400

    # Generate phrases for the lab results
    report = phrase_lab_results(lab_results)

    return jsonify({"report": report})

if __name__ == '__main__':
    app.run(debug=True)
