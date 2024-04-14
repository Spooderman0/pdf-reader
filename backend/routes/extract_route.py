from flask import Blueprint, jsonify, request
from PyPDF2 import PdfReader
import pdfplumber

extract_blueprint = Blueprint('extract', __name__)

#Extraer contenido de PDF
@extract_blueprint.route('/extract', methods=['POST'])
def extract_content():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part.'})

        file = request.files['file']

        #Con PyPDF2
        """pdf = PdfReader(file)
        text = ''
        for page in pdf.pages:
            text += page.extract_text()"""
        
        #Con pdfplumber (tiene mas formato)
        with pdfplumber.open(file) as pdf:
            text = ''
            for page in pdf.pages:
                text += page.extract_text()

        print(text)
        return jsonify({'message': 'extraido correctamente'})
    except Exception as e:
        return jsonify({'error': str(e)})