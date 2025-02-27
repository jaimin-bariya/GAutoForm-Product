from flask import request, jsonify, Blueprint



user_bp = Blueprint("user_bp", __name__)


@user_bp.route("/test")
def Test():
    return jsonify({"msg": "Testing with Awesome"})






