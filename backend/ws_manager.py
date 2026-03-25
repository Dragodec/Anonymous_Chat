import asyncio
from fastapi import WebSocket
from typing import Dict, List
from memory_cache import db

class ConnectionManager:
    def __init__(self):
        # Maps roomId -> list of active WebSocket objects
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room_id: str, user_id: str):
        await websocket.accept()

        current_users = await db.get_users(room_id)
        
        # Enforce severe 2-person anonymity limit natively on the socket handshake!
        if len(current_users) >= 2 and user_id not in current_users:
            await websocket.close(code=1008, reason="ERR_ROOM_FULL_STRICT")
            return False

        if room_id not in self.active_connections:
            self.active_connections[room_id] = []
        
        self.active_connections[room_id].append(websocket)
        await db.add_user(room_id, user_id)
        return True

    def disconnect(self, websocket: WebSocket, room_id: str):
        if room_id in self.active_connections:
            try:
                self.active_connections[room_id].remove(websocket)
            except ValueError:
                pass
                
            if len(self.active_connections[room_id]) == 0:
                del self.active_connections[room_id]

    async def broadcast_to_room(self, room_id: str, message: dict):
        if room_id in self.active_connections:
            # Gather is highly efficient for async pushing massive text payloads 
            tasks = [connection.send_json(message) for connection in self.active_connections[room_id]]
            if tasks:
                await asyncio.gather(*tasks)

manager = ConnectionManager()
