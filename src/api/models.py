from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(50), unique=False, nullable=True)
    last_name = db.Column (db.String(80), unique=False, nullable=True)
    age = db.Column(db.Integer, unique=False, nullable=True)
    gender = db.Column(db.String(80), unique=False, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    bio = db.Column(db.String(250), unique=False, nullable=True)
    image = db.Column(db.String(250), unique=False, nullable=True)
    location = db.Column(db.String(80), unique=False, nullable=True)
    events = db.relationship('Event', backref='user', lazy=True)
    favorites = db.relationship('Favorite', backref='user', lazy=True)



    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "age": self.age,
            "gender": self.gender,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "bio": self.bio,
            "image": self.image,
            "location": self.location
        }
    
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=False, nullable=False)
    description = db.Column(db.String(250), unique=False, nullable=False)
    date = db.Column(db.String(80), unique=False, nullable=False)
    time = db.Column(db.String(80), unique=False, nullable=False)
    location = db.Column(db.String(80), unique=False, nullable=False)
    image = db.Column(db.String(250), unique=False, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    favorites = db.relationship('Favorite', backref='event', lazy=True)

    def __repr__(self):
        return f'<Event {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "date": self.date,
            "time": self.time,
            "location": self.location,
            "image": self.image,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    
class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def __repr__(self):
        return f'<Favorite User {self.user_id} Event {self.event_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "event_id": self.event_id,
            "created_at": self.created_at
        }