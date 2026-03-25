import asyncio
import time

# In-memory dictionary bridging the architecture while keeping local testing hyper-simple
# Structure: { "room_id": { "messages": [...], "users": {"User-XXX": last_seen_timestamp} } }
# Pure RAM cache implementation, no Redis required.
cache = {}

class MemoryCache:
    async def get_room(self, room_id: str):
        return cache.get(room_id, {"messages": [], "users": {}})

    async def save_message(self, room_id: str, message: dict):
        if room_id not in cache:
            cache[room_id] = {"messages": [], "users": {}}
        cache[room_id]["messages"].append(message)
        
    async def add_user(self, room_id: str, user_id: str):
        if room_id not in cache:
            cache[room_id] = {"messages": [], "users": {}}
        cache[room_id]["users"][user_id] = time.time()

    async def get_users(self, room_id: str):
        if room_id not in cache:
            return []
        return list(cache[room_id]["users"].keys())

    async def remove_user(self, room_id: str, user_id: str):
        if room_id in cache and user_id in cache[room_id]["users"]:
            del cache[room_id]["users"][user_id]
            
            # If room drops to 0 users, permanently physically slice it out of memory
            if len(cache[room_id]["users"]) == 0:
                del cache[room_id]
                return True # True signals the room data was permanently destroyed
        return False

# Export a singleton instance simulating a database connection
db = MemoryCache()
