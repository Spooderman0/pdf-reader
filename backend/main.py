from flask import Flask, jsonify
from firebase_admin import credentials, initialize_app

app = Flask(__name__)

# Inicializar Firebase Admin SDK
cred = credentials.Certificate("config/keyapiprueba.json")
default_app = initialize_app(cred)

# Importar y registrar las rutas
from routes import users_routes
app.register_blueprint(users_routes.users_blueprint)

if __name__ == '__main__':
    app.run(debug=True, port=5000)