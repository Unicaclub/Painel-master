from config.database import SessionLocal
from src.models.user_model import User
from src.utils.hash import hash_password

def create_user(name, email, password):
    db = SessionLocal()
    user = User(name=name, email=email, hashed_password=hash_password(password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user