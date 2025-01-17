"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Event, Favorite
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import re
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import datetime

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
    new_user = User(email=data['email'], password=hashed_password, is_active=True)
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": f"Usuario con email {new_user.email} creado correctamente", "email": new_user.email, "id": new_user.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route('/login', methods=['POST'])
def handle_login():
    data = request.get_json()
    if not data['email']:
        return jsonify({"error": "Introduce un email válido."}), 400
    if not data['password']:
        return jsonify({"error": "Introduce la contraseña."}), 400
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado."}), 404
    if not check_password_hash(user.password, data['password']):
        return jsonify({"error": "Contraseña incorrecta."}), 401
    token = create_access_token(identity=user.email)
    return jsonify({"message": "Login correcto", "id": user.id, "email": user.email, "token": token}), 200


@api.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    data = request.get_json()
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no existe o no está autenticado."}), 401
    if "title" not in data or "description" not in data or "date" not in data or "time" not in data or "price" not in data or "location" not in data or "price" not in data:
        return jsonify({"error": "Faltan datos obligatorios."}), 400
    date_str = data['date']
    time_str = data['time']
    date = datetime.strptime(date_str, '%Y-%m-%d')
    time = datetime.strptime(time_str, '%H:%M').time()
    new_event = Event(title=data['title'], description=data['description'], date=date, time=time, price=data['price'], location=data['location'], image=data['image'], user_id=user.id)
    try:
        db.session.add(new_event)
        db.session.commit()
        return jsonify({"message": "Evento creado correctamente."})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error de servidor", "details": str(e)})
    
@api.route('/events')
def get_events():
    events = Event.query.all()
    events = list(map(lambda x: x.serialize(), events))
    return jsonify(events), 200

@api.route('/events/<int:event_id>')
def get_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Este evento no existe."}), 404
    return jsonify(event.serialize()), 200
@api.route('/events/<int:id>', methods=['PUT'])
@jwt_required()
def update_event(id):
    data = request.get_json()
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado o no autenticado."}), 401
    event = Event.query.get(id)
    if not event:
        return jsonify({"error": "Evento no encontrado."}), 404
    if event.user_id != user.id:
        return jsonify({"error": "No tienes permiso para editar este evento."}), 401
    if 'title' in data:
        event.title = data['title']
    if 'description' in data:
        event.description = data['description']
    if 'date' in data:
        event.date = data['date']
    if 'time' in data:
        event.time = data['time']
    if 'location' in data:
        event.location = data['location']
    try:
        db.session.commit()
        return jsonify({"message": "Evento actualizado correctamente."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error de servidor.", "detalles": str(e)}), 500

@api.route('/events/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_event(id):
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado o no autenticado."}), 401
    event = Event.query.get(id)
    if not event:
        return jsonify({"error": "Evento no encontrado."}), 404
    if event.user_id != user.id:
        return jsonify({"error": "No tienes permiso para eliminar este evento."}), 401
    try:
        db.session.delete(event)
        db.session.commit()
        return jsonify({"message": "Evento eliminado correctamente."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error de servidor.", "detalles": str(e)}), 500
    
@api.route('/profile')
@jwt_required()
def get_profile():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado."}), 404
    return jsonify({"id": user.id, "is_active": user.is_active, "email": user.email, "First_name": user.first_name, "Last_name": user.last_name, "age": user.age, "gender": user.gender, "created_at": user.created_at, "updated_at": user.updated_at, "bio": user.bio, "image": user.image, "location": user.location}), 200

@api.route('/users/<int:id>/favorites')
@jwt_required()
def get_favorites():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "No se encuentra el usuario."}), 404

    favorites = Favorite.query.filter_by(user_id=user.id).all()
    if not favorites:
        return jsonify({"message": "El usuario no tiene favoritos."}), 404

    favorites_list = list(map(lambda x: x.serialize(), favorites))
    return jsonify({"favorites": favorites_list}), 200

@api.route('/users/<int:id>/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    data = request.get_json()
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if 'event_id' not in data:
        return jsonify({"error": "Evento no encontrado."}), 404
    if not user:
        return jsonify({"error": "Usuario no encontrado."}), 404
    event = Event.query.get(data['event_id'])
    favorite = Favorite(user_id=user.id, event_id=event.id)
    try:
        db.session.add(favorite)
        db.session.commit()
        return jsonify({"message": "Favorito añadido satisfactoriamente."})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error de servidor.", "detalles": str(e)})
@api.route('/users/<int:id>/favorites', methods=['DELETE'])
@jwt_required()
def delete_favorite(id):
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user or user.id != id:
        return jsonify({"error": "Usuario no encontrado o no le pertenece este favorito."}), 404
    favorite = Favorite.query.filter_by(user_id=user.id, event_id=id).first()
    if not favorite:
        return jsonify({"error": "Favorito no encontrado."}), 404
    try:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"message": "Tarea eliminada satisfactoriamente."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error de servidor.", "detalles": str(e)}), 500
@api.route('/users/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    data = request.get_json()
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado o no autenticado."}), 401
    if user.id != id:
        return jsonify({"error": "No tienes permiso para editar este usuario."}), 401
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.password = generate_password_hash(data['password'])
    if 'is_active' in data:
        user.is_active = data['is_active']
    if 'first_name' in data:
        user.first_name = data['first_name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    if 'age' in data:
        user.age = data['age']
    try:
        db.session.commit()
        return jsonify({"message": "Usuario actualizado correctamente."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error de servidor.", "detalles": str(e)}), 500
@api.route('/users/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado o no autenticado."}), 401
    if user.id != id:
        return jsonify({"error": "No tienes permiso para eliminar este usuario."}), 401
    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "Usuario eliminado correctamente."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error de servidor.", "detalles": str(e)}), 500