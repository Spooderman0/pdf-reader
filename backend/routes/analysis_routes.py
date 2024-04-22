from flask import Blueprint, jsonify, request
from firebase_admin import firestore

analysis_blueprint = Blueprint('analysis', __name__)
analysisName = 'emptyAnalysis'

def findRoute(userid, docId):
    user_ref = users_ref.document(userid)
    docs_ref = user_ref.collection('Docs')
    doc_ref = docs_ref.document(docId)
    analysis_ref = doc_ref.collection('PDFAnalysis')

    return analysis_ref

users_ref = firestore.client().collection('Users')
    
#GET PDFAnalysis from 1 DOC (All data)
@analysis_blueprint.route('/<user_id>/docs/<doc_id>/PDFAnalysis/', methods = ['GET'])
def get_doc(user_id, doc_id):
    try:
        analysis_ref = findRoute(user_id, doc_id)

        abstract_data = analysis_ref.document(analysisName).get()

        if abstract_data.exists:
            abstract_dict = abstract_data.to_dict()
            return jsonify(abstract_dict)
        else:
            return jsonify({'error': 'Doc no encontrado'})
    except Exception as e:
        return jsonify({'error': str(e)})
    

#POST PDFAnalysis from 1 DOC
@analysis_blueprint.route('/<user_id>/docs/<doc_id>/PDFAnalysis/add', methods = ['POST'])

def add_doc(user_id, doc_id):

    try:
        data = request.json
        analysis_ref = findRoute(user_id, doc_id)
        analysis_ref.document(analysisName).set({
            'Abstract': data.get('Abstract'),
            'chapterAbstract' : data.get('chapterAbstract')
        })

        return jsonify({'message' : 'Documento agregado correctamente'})

    except Exception as e:
        return jsonify({'error': str(e)})

# GET PDF Abstract from 1 DOC

@analysis_blueprint.route('/<user_id>/docs/<doc_id>/PDFAnalysis/abstract', methods = ['GET'])
def get_abstract(user_id, doc_id):
    try:
        analysis_ref = findRoute(user_id, doc_id)
        abstract_data = analysis_ref.document(analysisName).get()
        

        if abstract_data.exists:
            abstract = abstract_data.to_dict().get('Abstract')
            return jsonify(abstract)
        else:
            return jsonify({'error': 'Doc no encontrado'})
    except Exception as e:
        return jsonify({'error': str(e)})



