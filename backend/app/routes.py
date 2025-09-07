from flask import Blueprint, jsonify, request
from .models import get_all_items, add_item, get_item_by_id, delete_item_by_id

api_bp = Blueprint("api", __name__)

@api_bp.route("/items", methods=["GET"])
def list_items():
    return jsonify(get_all_items())

@api_bp.route("/items", methods=["POST"])
def create_item():
    data = request.json
    if not data:
        return jsonify({"error": "Invalid input"}), 400
    result = add_item(data)
    return jsonify(result), 201

@api_bp.route("/items/<item_id>", methods=["GET"])
def get_item(item_id):
    item = get_item_by_id(item_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404
    return jsonify(item)

@api_bp.route("/items/<item_id>", methods=["DELETE"])
def delete_item(item_id):
    result = delete_item_by_id(item_id)
    if not result:
        return jsonify({"error": "Item not found"}), 404
    return jsonify({"success": True})
