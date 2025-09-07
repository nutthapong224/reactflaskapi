from . import mongo
from bson import ObjectId

def get_all_items():
    items = list(mongo.db.items.find())
    # แปลง _id เป็น string และเพิ่มเป็น field id
    for item in items:
        item["id"] = str(item["_id"])
        del item["_id"]  # ลบ _id ถ้าไม่ต้องการให้ส่งกลับ
    return items

def add_item(data):
    result = mongo.db.items.insert_one(data)
    # ส่งกลับพร้อม id
    data["id"] = str(result.inserted_id)
    return data

def get_item_by_id(item_id):
    try:
        item = mongo.db.items.find_one({"_id": ObjectId(item_id)})
        if item:
            item["id"] = str(item["_id"])
            del item["_id"]
        return item
    except Exception:
        return None

def delete_item_by_id(item_id):
    try:
        result = mongo.db.items.delete_one({"_id": ObjectId(item_id)})
        return result.deleted_count > 0
    except Exception:
        return False
