from flask import Blueprint, jsonify, request
from firebase_admin import firestore
from auth.authentication import generate_uuid
from analyze_functions.analyze_functions import upload_and_extract, keyword_yake

extract_blueprint = Blueprint('extract', __name__)#
users_ref = firestore.client().collection('Users')

    
@extract_blueprint.route('/<user_id>/upload_file2', methods = ['POST'])
def register_doc(user_id):
    try:
        bucket_url, text = upload_and_extract()
        keywords = keyword_yake(text)
        
        user_ref = users_ref.document(user_id)
        docs_ref = user_ref.collection('Docs')
        doc_ref = docs_ref.document(generate_uuid('D'))
        print(doc_ref.id)
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
        commonterm_ref = commonterms_ref.document('keyTerms')
        # Obtener el término y su frecuencia del cuerpo de la solicitud
        keyTerms = {}

        for term, freq in keywords:
            keyTerms[term]=freq
        print(keyTerms)

        commonterm_ref.set({
            'terms' :  keyTerms
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
            'text': text,
            'keywords': keywords,
            'doc_ref': doc_ref.id
        })
    except Exception as e:
        return jsonify({'Error adding uploaded doc to db', str(e)})