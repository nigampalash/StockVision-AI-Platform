from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb://root:examplepassword@localhost:27017"

client = AsyncIOMotorClient(MONGO_URL)
mongo_db = client.stockvision_data

def get_mongo_db():
    return mongo_db
