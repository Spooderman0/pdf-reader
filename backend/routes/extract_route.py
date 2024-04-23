from flask import Blueprint, jsonify, request
from PyPDF2 import PdfReader
import pdfplumber
from firebase_admin import firestore
from docx import Document
import yake
from google.cloud import storage
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./config/keyapiprueba.json"


extract_blueprint = Blueprint('extract', __name__)#
users_ref = firestore.client().collection('Users')

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
    

def upload_extract():
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

@extract_blueprint.route('/<user_id>/upload_file2', methods = ['POST'])
def register_doc(user_id):
    try:
        bucket_url, text = upload_extract()
        keyword_yake(text)
        
        user_ref = users_ref.document(user_id)
        docs_ref = user_ref.collection('Docs')
        doc_ref = docs_ref.document('DocNew')
        doc_ref.set({
            'Author': 'un autor',
            'Storage_URL' : bucket_url,
            'Title': 'un titulo',
            'Topic': 'un tema',
            'UploadedDate': firestore.SERVER_TIMESTAMP
        })
        #agregar coleccion de common terms
        commonterms_ref = doc_ref.collection('Common Terms')
        #agregar un documento de empty terms en common terms
        commonterm_ref = commonterms_ref.document('emptyTerms')
        # Obtener el término y su frecuencia del cuerpo de la solicitud
        term = 'term'
        freq = 'freq'
        commonterm_ref.set({
            'terms' :  {term : freq}
        })

        #agregar coleccion de PDF analysis
        PDFAnalysis_ref = doc_ref.collection('PDFAnalysis')
        #agregar doc a pdf analysis
        PDFAnalysisDoc_ref = PDFAnalysis_ref.document('emptyAnalysis')
        chapter = 'Abstract Chapter'
        figure = 'Figura 1'
        PDFAnalysisDoc_ref.set({
            'Abstract' : 'woa',
            'Abstract Chapters' : [chapter],
            'Figuras' : [figure]
        })


        return jsonify({
            'message': 'Doc uploaded to bd',
            'public_url': bucket_url,
            'text': text
        })
    except Exception as e:
        return jsonify({'Error adding uploaded doc to db', str(e)})