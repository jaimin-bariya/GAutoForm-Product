from datetime import datetime
from app.database import db


class FormHistory(db.Model):



    id = db.Column(db.Integer, primary_key=True)
    formName = db.Column(db.String(100), nullable=False)
    formLink = db.Column(db.Text, nullable=False)
    status = db.Column(db.Boolean, default=True)
    run_at = db.Column(db.DateTime, default=datetime.utcnow)


    def __str__(self):
        return self.formName



    def __repr__(self):
        return f"<Form {self.formName} and {self.formLink} >"