from flask import Blueprint, jsonify, request
from firebase_admin import firestore, auth


docs_blueprint = Blueprint('docs', __name__)
users_ref = firestore.client().collection('Users')

    
#GET DATA FROM ALL DOCS FROM 1 USER
@docs_blueprint.route('/<user_id>/docs', methods = ['GET'])
def get_docs(user_id):
    try:
        user_ref = users_ref.document(user_id)
        docs_ref = user_ref.collection('Docs')
        docs_data = [doc.to_dict() for doc in docs_ref.stream()]
        return jsonify(docs_data)
        
    except Exception as e:
        return jsonify({'error': str(e)})
    
#GET DATA FROM 1 DOC
@docs_blueprint.route('/<user_id>/docs/<doc_id>', methods = ['GET'])
def get_doc(user_id, doc_id):
    try:
        user_ref = users_ref.document(user_id)
        docs_ref = user_ref.collection('Docs')
        doc_ref = docs_ref.document(doc_id)
        docs_data = doc_ref.get()

        if docs_data.exists:
            doc_dict = docs_data.to_dict()
            return jsonify(doc_dict)
        else:
            return jsonify({'error': 'Doc no encontrado'})
    except Exception as e:
        return jsonify({'error': str(e)})

#POST 1 DOC
@docs_blueprint.route('/<user_id>/docs/add', methods = ['POST'])
def add_doc(user_id):
    try:
        data = request.json
        user_ref = users_ref.document(user_id)
        docs_ref = user_ref.collection('Docs')
        doc_ref = docs_ref.document(data.get('id'))
        doc_ref.set({
            'Author': data.get('Author'),
            'Title': data.get('Title'),
            'Topic': data.get('Topic')
        })

        # Crear la colección de common terms para el doc y llenarla dummy o vacia
        profile_ref = doc_ref.collection('Common Terms')
        profile_ref.document('emptyAnalysis').set({
            'Abstract': 'abs', 
        })

        return jsonify({'message' : 'Documento agregado correctamente'})

    except Exception as e:
        return jsonify({'error': str(e)})
    
#UPDATE 1 DOC
@docs_blueprint.route('/<user_id>/docs/update/<doc_id>', methods = ['PUT'])
def update_doc(user_id, doc_id):
    try:
        data = request.json
        user_ref = users_ref.document(user_id)
        doc_ref = user_ref.collection('Docs').document(doc_id)

        if doc_ref.get().exists:
            doc_ref.update({
                'Author': data.get('Author'),
                'Title': data.get('Title'),
                'Topic': data.get('Topic')
            })
            return jsonify({'message': 'Doc actualizado correctamente'})
        else:
            return jsonify({'error', 'Doc no encontrado'})

    except Exception as e:
        return jsonify({'error': str(e)})
    
#DELETE 1 DOC
@docs_blueprint.route('/<user_id>/docs/delete/<doc_id>', methods = ['DELETE'])
def delete_doc(user_id, doc_id):
    try:
        user_ref = users_ref.document(user_id)
        doc_ref = user_ref.collection('Docs').document(doc_id)
        if doc_ref.get().exists:
            doc_ref.delete()
            return jsonify({'message' : 'Doc borrado correctamente'})
        else:
            return jsonify({'error': 'Doc no encontrado'})
    except Exception as e:
        return jsonify({'error': str(e)})
    
#GET KEYTERMS FROM 1 DOC
@docs_blueprint.route('/<user_id>/keyterms/<doc_id>', methods = ['GET'])
def get_keyterms(user_id, doc_id):
    try:
        user_ref = users_ref.document(user_id)
        doc_ref = user_ref.collection('Docs').document(doc_id)
        keyterms_doc = doc_ref.collection('Common Terms').document('keyTerms')
        keyterms_data = keyterms_doc.get().to_dict()
        if keyterms_data:
            return jsonify(keyterms_data)
        else:
            return jsonify({'error': 'keyterms no encontrados'})
    except Exception as e:
        return jsonify({'error': str(e)})