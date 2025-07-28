# backend/src/auth/jwt_handler.py

from datetime import datetime, timedelta
from jose import jwt, JWTError
SECRET = "secret"
ALGORITHM = "HS256"

def create_token(data: dict):
    payload = {"exp": datetime.utcnow() + timedelta(hours=2), **data}
    return jwt.encode(payload, SECRET, algorithm=ALGORITHM)

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None