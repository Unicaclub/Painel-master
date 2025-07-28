from fastapi import FastAPI
from config.database import engine, Base
from src.routes import login_routes, user_routes
from src.middleware.auth_middleware import JWTMiddleware

app = FastAPI()

app.add_middleware(JWTMiddleware, protected_routes=["/api/users"])

@app.get("/")
def read_root():
    return {"status": "OK - Painel Master"}

app.include_router(login_routes.router)
app.include_router(user_routes.router)

Base.metadata.create_all(bind=engine)


# === backend/src/routes/user_routes.py ===
from fastapi import APIRouter

router = APIRouter(prefix="/api/users")

@router.get("/")
def list_users():
    return [{"id": 1, "email": "admin@painel.com"}]