from flask import Blueprint, jsonify, request
from firebase_admin import firestore

# Crear un Blueprint para las rutas relacionadas con la colección 'Users'
users_blueprint = Blueprint('users', __name__)

# Referencia a la colección 'Users'
users_ref = firestore.client().collection('Users')

#GET all users (lectura)
@users_blueprint.route('/get_users')
def get_users():
    try:
        # Obtener los datos de la colección 'Users'
        users_data = users_ref.get()
        users_list = [doc.to_dict() for doc in users_data]
        return jsonify(users_list)
    except Exception as e:
        return jsonify({'error': str(e)})

#POST 1 user (escritura)
@users_blueprint.route('/add_user', methods=['POST'])
def add_user():
    try:
        data = request.json
        nombre = data.get('Nombre')
        apellido = data.get('Apellido')

        if not nombre or not apellido:
            return jsonify({'error': 'Se requieren nombre y apellido'})
        
        new_user_ref = users_ref.document()
        new_user_ref.set({
            'Nombre': nombre,
            'Apellido': apellido
        })

        return jsonify({'message': 'Usuario agregado correctamente'})
    except Exception as e:
        return jsonify({'error': str(e)})