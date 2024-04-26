from flask import Blueprint, jsonify, request
from firebase_admin import firestore
from datetime import datetime

conversation_blueprint = Blueprint('conversation', __name__)

path = '/<user_id>/docs/<doc_id>/Conversation/<convo_id>'

def findRoute(userid, docId):
    user_ref = users_ref.document(userid)
    docs_ref = user_ref.collection('Docs')
    doc_ref = docs_ref.document(docId)
    conversation_ref = doc_ref.collection('Conversation')

    return conversation_ref

users_ref = firestore.client().collection('Users')
    
#GET ALL CONVERSATIONS
@conversation_blueprint.route(path, methods = ['GET'])
def get_convo(user_id, doc_id, convo_id):
    try:
        conversation_ref = findRoute(user_id, doc_id)

        msgs = conversation_ref.document(convo_id).get()

        if msgs.exists:
            msgs_dict = msgs.to_dict()
            return jsonify(msgs_dict)
        else:
            return jsonify({'error': 'Doc no encontrado'})
    except Exception as e:
        return jsonify({'error': str(e)})
    
#CREATE A NEW CONVERSATION
@conversation_blueprint.route(path  + '/newConvo', methods = ['POST'])
def newConvo(user_id, doc_id, convo_id):

    try:
        conversation_ref = findRoute(user_id, doc_id)
        conversation_ref.document(convo_id).set({
            'title': convo_id,
            'timestamp': datetime.now(),
            'counter': 0
        })

        return jsonify({'message' : 'Mensaje agregado correctamente'})

    except Exception as e:
        return jsonify({'error': str(e)})

#ADD MESSAGE TO CONVERSATION
@conversation_blueprint.route(path  + '/add', methods = ['POST'])
def add_msg(user_id, doc_id, convo_id):

    try:
        data = request.json
        conversation_ref = findRoute(user_id, doc_id)
        conversation_ref.document(convo_id).update({
            'counter': firestore.Increment(1)
        })

        conversation_ref.document(convo_id).collection('Messages').add({
            'message': data.get('message'),
            'role': data.get('role'),
            'timestamp': datetime.now()
        })

        return jsonify({'message' : 'Mensaje agregado correctamente'})

    except Exception as e:
        return jsonify({'error': str(e)})
    
#UPDATE TITLE OF CONVERSATION
@conversation_blueprint.route(path + '/update', methods = ['PUT'])
def update_convo(user_id, doc_id, convo_id):
    try:
        data = request.json
        conversation_ref = findRoute(user_id, doc_id)
        conversation_ref.document(convo_id).update({
            'title': data.get('title')
        })

        return jsonify({'message' : 'Conversación actualizada correctamente'})

    except Exception as e:
        return jsonify({'error': str(e)})

#GET MESSAGES FROM CONVERSATION
@conversation_blueprint.route(path + '/messages', methods = ['GET'])
def get_msgs(user_id, doc_id, convo_id):
    try:
        conversation_ref = findRoute(user_id, doc_id)
        msgs = conversation_ref.document(convo_id).collection('Messages').get()

        msgs = [msg.to_dict() for msg in msgs]

        return jsonify(msgs)
    except Exception as e:
        return jsonify({'error': str(e)})


#DELETE CONVERSATION
@conversation_blueprint.route(path + '/delete', methods = ['DELETE'])
def delete_convo(user_id, doc_id, convo_id):
    try:
        conversation_ref = findRoute(user_id, doc_id)
        conversation_ref.document(convo_id).delete()

        return jsonify({'message' : 'Conversación eliminada correctamente'})
    except Exception as e:
        return jsonify({'error': str(e)})
