from fastapi import APIRouter, Request, HTTPException
from src.auth.jwt_handler import create_token
from src.utils.hash import verify_password
from config.database import SessionLocal
from src.models.user_model import User

router = APIRouter(prefix="/api")

@router.post("/login")
def login(req: Request):
    data = await req.json()
    email = data.get("email")
    password = data.get("password")
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    token = create_token({"sub": user.email})
    return {"token": token}

