"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import re
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    existing_email = User.query.filter_by(email=data['email']).first()
    if existing_email:
        return jsonify({"error": "El email ya está siendo utilizado."}), 400
    if not data['email']:
        return jsonify({"error": "El campo email no puede estar vacío."}), 400
    regex_email = r"^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$"
    if not re.match(regex_email, data['email']):
        return jsonify({"error": "Formato del email inválido."})
    if not data['password']:
        return jsonify({"error": "El campo contraseña no puede estar vacío."}), 400
    if len(data['password']) < 8:
        return jsonify({"error": "La contraseña debe tener más de 8 caracteres."}), 400
    hashed_password = generate_password_hash(data['password'])
    new_user = User(email=data['email'], hashed_password=hashed_password, is_active=True)
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": f"Usuario con email {new_user.email} creado correctamente", "email": new_user.email, "id": new_user.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
@api.route('/users')
def get_users():
    users = User.query.all()
    users = list(map(lambda x: x.serialize(), users))
    return jsonify(users)
    
@api.route('/users/<int:id>')
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "Usuario no encontrado."}), 404
    return jsonify({"id": user.id, "is_active": user.is_active, "email": user.email, "First_name": user.first_name, "Last_name": user.last_name, "age": user.age, "gender": user.gender, "created_at": user.created_at, "updated_at": user.updated_at, "bio": user.bio, "image": user.image, "location": user.location})