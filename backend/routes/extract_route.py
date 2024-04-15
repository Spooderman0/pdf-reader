from flask import Blueprint, jsonify, request
from PyPDF2 import PdfReader
import pdfplumber
from docx import Document
from google.cloud import storage
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./config/keyapiprueba.json"


extract_blueprint = Blueprint('extract', __name__)

def gcs_upload_file(file, bucket_name):
    try:
        client = storage.Client()
        bucket = client.bucket(bucket_name)
        blob = bucket.blob(file.name)
        blob.upload_from_string(file.read(), content_type=file.content_type)
        blob.make_public() #hacer el blob public (not a fan pero x igual luego vemos, sin esto no puedo generar link)
        blob_url = blob.public_url
        return True, blob_url
    
    except Exception as e:
        print(f"Error uploading file to bucket: {e}")
        return False

#Extraer contenido de PDF
@extract_blueprint.route('/extract', methods=['POST'])
def extract_content():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part.'})

        file = request.files['file']
        text = ''

        if file.filename.endswith('.pdf'):
            with pdfplumber.open(file) as pdf:  #Con pdfplumber (tiene mas formato)
                for page in pdf.pages:
                    text += page.extract_text()

        elif file.filename.endswith('.docx'):
            document = Document(file)
            text = '\n'.join([p.text for p in document.paragraphs])
                #print(p.text)       

        print(text)
        return jsonify({'message': 'extraido correctamente'})
    except Exception as e:
        return jsonify({'error': str(e)})
    

@extract_blueprint.route('/upload_file', methods = ['POST'])
def upload_file():
    try:
        file = request.files['file']
        if not file:
            return jsonify({'error': 'File required'})
        bucket_name = 'pruebaapi-43fcf.appspot.com'
        success, public_url = gcs_upload_file(file, bucket_name)
        if success:
            return jsonify({'message': 'File uploaded successfully', 'public_url': public_url})
        else:
            return jsonify({'error': 'Fail de respuesta de funcion gsc upload'})

    except Exception as e:
        return jsonify({'error': str(e)})