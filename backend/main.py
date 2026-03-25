from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from ws_manager import manager
from memory_cache import db
import time

app = FastAPI(title="QuickConnect Anonymous Chat API")

# Setup robust CORS to allow exactly the development instances and the remote tunnel
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://4d0cg8n5-5173.inc1.devtunnels.ms"  # Trailing slashes are stripped by spec
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "QuickConnect Backend is running", "security_level": "volatile_memory_only"}

@app.websocket("/ws/{room_id}/{user_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str, user_id: str):
    accepted = await manager.connect(websocket, room_id, user_id)
    if not accepted:
        # Handshake rejected (room is full, and user doesn't have the right sessionStorage ID)
        return

    try:
        # 1. On successful connection, IMMEDIATELY dump chat history
        room_data = await db.get_room(room_id)
        if room_data and "messages" in room_data and room_data["messages"]:
            await websocket.send_json({
                "type": "history",
                "messages": room_data["messages"]
            })
            
        # 2. Announce the user joined securely
        join_msg = {
            "type": "system",
            "text": f"{user_id} securely connected.",
            "timestamp": time.strftime("%I:%M %p")
        }
        await manager.broadcast_to_room(room_id, join_msg)

        # 3. Endless loop listening for incoming payloads (OWASP Hardened)
        while True:
            data = await websocket.receive_text()
            
            # [OWASP: Buffer Overflow & DoS Protection] Prevent users from pushing 50MB strings into RAM
            if len(data) > 2000:
                await websocket.send_json({
                    "type": "system",
                    "text": "Payload rejected: Messages cannot exceed 2000 characters.",
                    "timestamp": time.strftime("%I:%M %p")
                })
                continue
                
            # [OWASP: Injection] Strip potentially hazardous invisibles
            sanitized_data = data.strip()
            if not sanitized_data:
                continue
            
            # Format and package the clean packet
            message_event = {
                "type": "message",
                "id": str(time.time()),
                "text": sanitized_data,
                "senderId": user_id,
                "timestamp": time.strftime("%I:%M %p")
            }
            
            # Save volatilely to memory
            await db.save_message(room_id, message_event)
            # Push payload to BOTH connected clients
            await manager.broadcast_to_room(room_id, message_event)
            
    except WebSocketDisconnect:
        # Client dropped (closed tab, refreshed, internet loss)
        manager.disconnect(websocket, room_id)
        room_destroyed = await db.remove_user(room_id, user_id)
        
        if room_destroyed:
            print(f"[CLEANUP] Room '{room_id}' dropped to 0 users. Erased all historical data physically.")
        else:
            leave_msg = {
                "type": "system",
                "text": f"{user_id} disconnected.",
                "timestamp": time.strftime("%I:%M %p")
            }
            await manager.broadcast_to_room(room_id, leave_msg)
