"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import EventRegistration, db, User, Event, Favorite, Rating, Post
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import re
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import datetime, timedelta
import os

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
    token = create_access_token(identity=user.email, expires_delta=timedelta(days=5))
    return jsonify({"message": "Login correcto", "id": user.id, "email": user.email, "token": token}), 200


@api.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no existe o no está autenticado."}), 401

    data = request.get_json()
    

    title = data.get('title')
    description = data.get('description')
    date_str = data.get('date')
    time_str = data.get('time')
    price = data.get('price')
    location = data.get('location')
    image = data.get('image')
    type = data.get('type')
    

    if not all([title, description, date_str, time_str, price, location, type]):
        return jsonify({"error": "Faltan datos obligatorios."}), 400

    date = datetime.strptime(date_str, '%Y-%m-%d')
    time = datetime.strptime(time_str, '%H:%M').time()


    new_event = Event(
        title=title,
        description=description,
        date=date,
        time=time,
        price=price,
        location=location,
        image=image,
        type= type,
        user_id=user.id
    )
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

    
@api.route('/filtered_events', methods=['POST'])
def get_filtered_event():
    data = request.get_json()
    events = Event.query.all()  
    if data.get('type'):
        events = Event.query.filter_by(type=data['type']).all()
    events = list(map(lambda x: x.serialize(), events))
    return jsonify(events), 200


@api.route('/profile')
@jwt_required()
def get_profile():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado."}), 404
    return jsonify(user.serialize()), 200

@api.route('/events/<int:id>/favorites', methods=['POST'])
@jwt_required()
def add_favorite(id):
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado."}), 404
    event = Event.query.get(id)
    if not event:
        return jsonify({"error": "Evento no encontrado."}), 404
    favorite = Favorite(user_id=user.id, event_id=event.id)
    existing_favorite = Favorite.query.filter_by(user_id=user.id, event_id=event.id).first()
    if existing_favorite:
        return jsonify({"error": "Este favorito ya existe"}), 400
    try:
        db.session.add(favorite)
        db.session.commit()
        return jsonify({"message": "Favorito añadido satisfactoriamente."})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error de servidor.", "detalles": str(e)})
@api.route('/events/<int:id>/favorites', methods=['DELETE'])
@jwt_required()
def delete_favorite(id):
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado."}), 404
    favorite = Favorite.query.filter_by(user_id=user.id, event_id=id).first()
    if not favorite:
        return jsonify({"error": "Favorito no encontrado."}), 404
    try:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"message": "Favorito eliminado satisfactoriamente."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error de servidor.", "detalles": str(e)}), 500
    
@api.route('/events/<int:event_id>/register', methods=['POST'])
@jwt_required()
def register_to_event(event_id):
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado o no autenticado."}), 401

    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Evento no encontrado."}), 404

    exist_registration = EventRegistration.query.filter_by(user_id=user.id, event_id=event.id).first()
    if exist_registration:
        return jsonify({"error": "Ya estás registrado en este evento."}), 400

    new_registration = EventRegistration(user_id=user.id, event_id=event.id)
    try:
        db.session.add(new_registration)
        db.session.commit()
        return jsonify({"message": "Te has registrado en el evento correctamente."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error de servidor.", "detalles": str(e)}), 500
    
@api.route('/events/<int:event_id>/registrations', methods=['GET'])
def get_event_registrations(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Evento no encontrado."}), 404

    registrations = EventRegistration.query.filter_by(event_id=event.id).all()
    registrations_list = [reg.serialize() for reg in registrations]
    return jsonify({"registrations": registrations_list}), 200

@api.route('/events/<int:event_id>/cancelregister', methods=['DELETE'])
@jwt_required()
def unregister_from_event(event_id):
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado o no autenticado."}), 401

    registration = EventRegistration.query.filter_by(user_id=user.id, event_id=event_id).first()
    if not registration:
        return jsonify({"error": "No estás registrado en este evento."}), 404

    try:
        db.session.delete(registration)
        db.session.commit()
        return jsonify({"message": "Has cancelado tu registro en el evento correctamente."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error de servidor.", "detalles": str(e)}), 500

@api.route('/users/favorites', methods=['GET']) 
@jwt_required()
def get_favorites():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "No se encuentra el usuario."}), 404
    favorites = Favorite.query.filter_by(user_id=user.id).all()
    favorites_list = [fav.serialize() for fav in favorites]
    return jsonify({"favorites": favorites_list}), 200

@api.route('/update-user', methods=['PUT'])
@jwt_required()
def update_user():
    data = request.get_json()
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado o no tienes permisos."}), 401
    
    if not check_password_hash(user.password, data['password']):
        return jsonify({"error": "La contraseña no es correcta"}), 401

    if 'email' in data and data['email']:
        user.email = data['email']
    if 'firstName' in data and data['firstName']:
        user.first_name = data['firstName']
    if 'lastName' in data and data['lastName']:
        user.last_name = data['lastName']
    if 'age' in data and data['age']:
        try:
            user.age = int(data['age'])
        except ValueError:
            return jsonify({"error": "La edad debe ser un número entero válido."}), 400
    if 'bio' in data and data['bio']:
        user.bio = data['bio']
    if 'location' in data and data['location']:
        user.location = data['location']
    if 'image' in data and data['image']:
        user.image = data['image']
    
    try:
        db.session.commit()
        return jsonify({"user": user.serialize(), "message": "Usuario actualizado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error de servidor.", "detalles": str(e)}), 500

@api.route('/delete-user/', methods=['DELETE'])
@jwt_required()
def delete_user():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado o no tienes permisos."}), 401
    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "Usuario eliminado correctamente."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error de servidor.", "detalles": str(e)}), 500
@api.route('/user-details')
@jwt_required()
def get_user():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado."}), 404
    return jsonify(user.serialize()), 200
@jwt_required()
def get_user():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado."}), 404
    return jsonify(user.serialize()), 200
@api.route('/event-creator-details/<int:event_id>')
def get_event_creator_details(event_id):
    event = Event.query.get(event_id)
    user = User.query.filter_by(id=event.user_id).first()
    if not event:
        return jsonify({"error": "Evento no encontrado"}), 404
    return jsonify(user.serialize())

@api.route('/rating/<int:user_id>', methods=['POST'])
@jwt_required()
def add_rate(user_id):
    data = request.get_json()
    user_email = get_jwt_identity()
    rater = User.query.filter_by(email=user_email).first()
    if not rater:
        return jsonify({"error": "Usuario no encontrado"}), 404
    user_rated = User.query.filter_by(id=user_id).first()
    if not user_rated:
        return jsonify({"error": "El usuario al que intentas puntuar no existe"}), 404
    if rater.id == user_rated.id:
        return jsonify({"error": "No puedes puntuarte a ti mismo"}), 401
    existing_rate = Rating.query.filter_by(user_id=user_rated.id, rater_id=rater.id).first()
    if existing_rate:
        return jsonify({"error": "Ya has puntuado a este creador"}), 401
    new_rate = Rating(rate=data['rate'], user_id=user_id, rater_id=rater.id)
    int_rate = int(data['rate'])

    try:
        if user_rated.rate is None:
            user_rated.rate = 0
        if user_rated.rate_count is None:
            user_rated.rate_count = 0
        user_rated.rate = user_rated.rate + int_rate 
        user_rated.rate_count += 1
        user_rated.average_rate = user_rated.rate / user_rated.rate_count
        db.session.add(new_rate)
        db.session.commit()
        return jsonify({"message": "Rating añadido", "new_average": user_rated.average_rate}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
@api.route('/new-post/<int:event_id>', methods=['POST'])
@jwt_required()
def new_post(event_id):
    data = request.get_json()
    if not "content" in data or not data['content'].strip():
        return jsonify({"error": "No tiene contenido"}), 400
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "No se ha encontrado el evento"}), 404
    new_post = Post(content=data['content'], user_id=user.id, event_id=event.id)
    try:
        db.session.add(new_post)
        db.session.commit()
        return jsonify({"message": "Post creado correctamente"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"error de servidor, {e}"}), 500
@api.route('/posts/<int:event_id>')
def get_event_posts(event_id):
    posts = Post.query.filter_by(event_id=event_id).all()
    serialized_posts = [events.serialize() for events in posts]
    return jsonify(serialized_posts)
@api.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    data = request.get_json()
    current_email = get_jwt_identity()
    user = User.query.filter_by(email=current_email).first()
    if not 'password' in data or not 'matchingPassword' in data:
        return jsonify({"error": "No se ha enviado la nueva contraseña o la confirmación"}), 400
    if data['password'] != data['matchingPassword']:
        return jsonify({"error": "Las contraseñas no coinciden"}), 400
    if len(data['password']) < 8:
        return jsonify({"error": "La nueva contraseña debe tener más de 8 caracteres"}), 400
    user.password = generate_password_hash(data['password'])
    db.session.commit()
    return jsonify({"message": "Contraseña actualizada correctamente"}), 200

@api.route('/find-password', methods=['POST'])
@jwt_required()
def get_password():
    data = request.get_json()
    if not "password" in data:
        return jsonify({"error": "No hay datos"}), 400
    current_email = get_jwt_identity()
    user = User.query.filter_by(email=current_email).first()
    if not check_password_hash(user.password , data['password']):
        return jsonify({"error": "Contraseña incorrecta"}), 400
    return jsonify({"message": "Contraseña correcta"}), 200