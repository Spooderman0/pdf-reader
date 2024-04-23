from flask import Blueprint, jsonify, request
from PyPDF2 import PdfReader
import pdfplumber
from docx import Document
import yake
from google.cloud import storage
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./config/keyapiprueba.json"

#Upload to bucket
def gcs_upload_file(file, bucket_name):
    try:
        client = storage.Client()
        bucket = client.bucket(bucket_name)
        print(file.filename)
        blob = bucket.blob(file.filename)
        blob.upload_from_string(file.read(), content_type=file.content_type)
        blob.make_public() #hacer el blob public (not a fan pero x igual luego vemos, sin esto no puedo generar link)
        blob_url = blob.public_url
        return True, blob_url
    
    except Exception as e:
        print(f"Error uploading file to bucket: {e}")
        return False

#Extraer contenido de PDF
def extract_content(file):
    try:
        text = ''

        if file.filename.endswith('.pdf'):
            with pdfplumber.open(file) as pdf:  #Con pdfplumber (tiene mas formato)
                pdf_reader = PdfReader(file)
                meta = pdf_reader.metadata
                print('The metadata is: ', meta.title)
                for page in pdf.pages:
                    text += page.extract_text(x_tolerance=2, y_tolerance=2)

        elif file.filename.endswith('.docx'):
            document = Document(file)
            text = '\n'.join([p.text for p in document.paragraphs])
                #print(p.text)       

        print(text)
        return text
        #return jsonify({'message': 'extraido correctamente', 'texto' : text})
    except Exception as e:
        return jsonify({'error': str(e)})
    

def upload_and_extract():
    try:
        file = request.files['file']
        if not file:
            return jsonify({'error': 'File required'})
        bucket_name = 'pruebaapi-43fcf.appspot.com'
        success, public_url = gcs_upload_file(file, bucket_name)

        if success:
            text = extract_content(file)
            if text:
                return(public_url, text)
            else:
                return jsonify({'error': 'Failed to extract text from file'})
        else:
            return jsonify({'error': 'Fail de respuesta de funcion gsc upload'})

    except Exception as e:
        return jsonify({'error': str(e)})
    
def keyword_yake(text):
    try:
        language = "es"
        max_word_size = 2
        deduplication_threshold = 0.9
        custom_kw_extractor = yake.KeywordExtractor(lan=language, n=max_word_size, dedupLim=deduplication_threshold, top=5, features=None)
        keywords = custom_kw_extractor.extract_keywords(text)
        for kw in keywords:
            print(kw)
    except Exception as e:
        return jsonify({'Error': str(e)})