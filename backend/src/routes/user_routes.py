from fastapi import APIRouter

router = APIRouter(prefix="/api/users")

@router.get("/")
def list_users():
    return ["admin@painel.com"]
