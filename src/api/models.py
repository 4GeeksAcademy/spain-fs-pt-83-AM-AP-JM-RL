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
    rate = db.Column(db.Integer, unique=False, nullable=True)
    rate_count = db.Column(db.Integer)
    average_rate = db.Column(db.Float)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    bio = db.Column(db.String(250), unique=False, nullable=True)
    image = db.Column(db.String(250), unique=False, nullable=True)
    location = db.Column(db.String(80), unique=False, nullable=True)
    events = db.relationship('Event', backref='creator', lazy=True)
    favorites = db.relationship('Favorite', backref='user', lazy=True)
    ratings_received = db.relationship('Rating', foreign_keys='Rating.user_id', backref='rated')
    posts = db.relationship('Post', foreign_keys='Post.user_id', backref='posts')

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
            "average_rate": self.average_rate,
            "created_at": self.created_at.strftime('%d-%m-%Y'),
            "updated_at": self.updated_at.strftime('%d-%m-%Y'),
            "bio": self.bio,
            "image": self.image,
            "location": self.location
        }
    
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=False, nullable=False)
    description = db.Column(db.String(250), unique=False, nullable=False)
    date = db.Column(db.Date, unique=False, nullable=False)
    time = db.Column(db.Time, unique=False, nullable=False)
    location = db.Column(db.String(80), unique=False, nullable=False)
    price = db.Column(db.Integer, unique=False, nullable=False)
    type = db.Column(db.String(15), unique=False, nullable=False)
    image = db.Column(db.String(250), unique=False, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    favorites = db.relationship('Favorite', backref='event', lazy=True)
    posts = db.relationship('Post', backref='event', foreign_keys='Post.event_id')

    def __repr__(self):
        return f'<Event {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            'date': self.date.strftime('%d-%m-%Y'),
            'time': self.time.strftime('%H:%M:%S'),
            "price": self.price,
            "location": self.location,
            "image": self.image,
            "type": self.type,
            "user_id": self.user_id,
            "created_at": self.created_at.strftime('%d-%m-%Y'),
            "updated_at": self.updated_at.strftime('%d-%m-%Y')
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
            "created_at": self.created_at.strftime('%d-%m-%Y')
        }

class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rate = db.Column(db.Float, nullable=False) 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    rater_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now) 

    def serialize(self):
        return {
            "id": self.id,
            "rate": self.rate,
            "user_id": self.user_id,
            "rater_id": self.rater_id,
            "created_at": self.created_at
        }
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "created_at": self.created_at.strftime('%d-%m-%Y'),
            "user_id": self.user_id,
            "event_id": self.event_id
        }