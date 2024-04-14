from flask import Blueprint, jsonify, request
from firebase_admin import firestore
from PyPDF2 import PdfReader

users_blueprint = Blueprint('users', __name__)
users_ref = firestore.client().collection('Users')


#GET all users
@users_blueprint.route('/users', methods = ['GET'])
def get_users():
    try:
        users_data = users_ref.get()
        users_list = [doc.to_dict() for doc in users_data]
        #users_list_json = jsonify(users_list)
        #users_list_json.headers.add('Access-Control-Allow-Origin', '*')
        #return users_list_json
        return jsonify(users_list)
    except Exception as e:
        return jsonify({'error': str(e)})
    
#GET 1 user
@users_blueprint.route('/users/<user_id>', methods = ['GET'])
def get_user(user_id):
    try:
        user_ref = users_ref.document(user_id)
        user_data = user_ref.get()
        if user_data.exists:
            user_dict = user_data.to_dict()
            return jsonify(user_dict)
        else:
            return jsonify({'error': 'Usuario no encontrado'})
    except Exception as e:
        return jsonify({'error': str(e)})

#ADD user
@users_blueprint.route('/adduser', methods = ['POST'])
def add_user():
    try:
        data = request.json
        user_ref = users_ref.document(data.get('id'))
        user_ref.set({
            'username': data.get('username'),
            'pwd': data.get('pwd')
        })

        # Crear la colección de perfil (profile) para el usuario
        profile_ref = user_ref.collection('Profile')
        profile_ref.document('info').set({
            'Vocab': 3, #valores default
            'Theme': "Light"
        })

        return jsonify({'message': 'Usuario agregado correctamente'})
    except Exception as e:
        return jsonify({'error': str(e)})
    
#UPDATE 1 user
@users_blueprint.route('/update/<user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.json
        user_ref = users_ref.document(user_id)
        if user_ref.get().exists:
            user_ref.update({
                'username': data.get('username'),
                'pwd': data.get('pwd')
            })
            return jsonify({'message': 'Usuario actualizado correctamente'})
        else:
            return jsonify({'error': 'Usuario no encontrado'})
    except Exception as e:
        return jsonify({'error': str(e)})
    
#DELETE 1 user
@users_blueprint.route('/delete/<user_id>', methods = ['DELETE'])
def delete_user(user_id):
    try:
        user_ref = users_ref.document(user_id)
        if user_ref.get().exists:
            user_ref.delete()
            return jsonify({'message': 'Usuario borrado correctamente'})
        else:
            return jsonify({'error': 'usuario no encontrado'})
    except Exception as e:
        return jsonify({'error': str(e)})
    

#EXTRACCION DE PDF (pasar a otro lado)
#Extraer contenido de PDF
"""@users_blueprint.route('/extract', methods=['POST'])
def extract_content():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part.'})

        file = request.files['file']

        pdf = PdfReader(file)
        text = ''
        for page in pdf.pages:
            text += page.extract_text()

        return jsonify({'text': text})
    except Exception as e:
        return jsonify({'error': str(e)})"""