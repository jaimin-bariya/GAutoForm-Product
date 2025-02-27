from flask import Flask
from app.database import db
from datetime import datetime

class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "password": self.password,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

    def __str__(self):
        return self.name

    def __repr__(self):
        return f'<User {self.f_name}>'


