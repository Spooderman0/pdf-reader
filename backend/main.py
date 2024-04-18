from flask import Flask, jsonify
from firebase_admin import credentials, initialize_app
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Inicializar Firebase Admin SDK
cred = credentials.Certificate("backend\config\keyapiprueba.json")
default_app = initialize_app(cred)

# Importar y registrar las rutas
from routes import users_routes, docs_routes, extract_route
app.register_blueprint(users_routes.users_blueprint)
app.register_blueprint(docs_routes.docs_blueprint)
app.register_blueprint(extract_route.extract_blueprint)

if __name__ == '__main__':
    app.run(debug=True, port=5000)