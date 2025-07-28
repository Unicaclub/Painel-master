from fastapi import APIRouter, Request, HTTPException
from config.database import SessionLocal
from src.models.user_model import User
from src.utils.hash import verify_password
from src.auth.jwt_handler import create_token

router = APIRouter(prefix="/api")

@router.post("/login")
async def login(request: Request):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")

    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    token = create_token({"sub": user.email})
    return {"token": token}
