from fastapi import FastAPI
from config.database import engine, Base
from src.routes import login_routes, user_routes

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "OK - Painel Master"}

app.include_router(login_routes.router)
app.include_router(user_routes.router)

Base.metadata.create_all(bind=engine)
