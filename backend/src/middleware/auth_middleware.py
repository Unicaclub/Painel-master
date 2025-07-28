from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, HTTPException
from src.auth.jwt_handler import verify_token

class JWTMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, protected_routes: list):
        super().__init__(app)
        self.protected_routes = protected_routes

    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        if any(path.startswith(route) for route in self.protected_routes):
            auth_header = request.headers.get("Authorization")
            if not auth_header or not auth_header.startswith("Bearer "):
                raise HTTPException(status_code=401, detail="Token ausente ou inválido")

            token = auth_header.split(" ")[1]
            payload = verify_token(token)
            if not payload:
                raise HTTPException(status_code=401, detail="Token expirado ou inválido")
        return await call_next(request)