from flask import Blueprint, jsonify, render_template
from api.players import get_available_players, get_active_players
from api.players_stats import (
    get_passing_player_stats,
    get_player_passing_leader,
    get_player_rushing_leader,
    get_player_recieving_leader,
)


routes_bp = Blueprint("routes", __name__)


@routes_bp.route("/")
def index():
    return render_template("index.html")


@routes_bp.route("/widget")
def widget():
    return render_template("widget.html")


@routes_bp.route("/api/players")
def get_player_data():
    parse_player_data = get_available_players()
    return jsonify(parse_player_data)


@routes_bp.route("/api/players/active")
def get_active_player_data():
    parse_player_data = get_active_players()
    return jsonify(parse_player_data)


@routes_bp.route("/api/players/passing/stats")
def get_passing_player_data():
    parse_player_data = get_passing_player_stats()
    return jsonify(parse_player_data)


@routes_bp.route("/api/players/passing/leaders")
def get_passing_player_leader():
    parse_player_data = get_player_passing_leader()
    return jsonify(parse_player_data)


@routes_bp.route("/api/players/rushing/leaders")
def get_rushing_player_leader():
    parse_player_data = get_player_rushing_leader()
    return jsonify(parse_player_data)


@routes_bp.route("/api/players/recieving/leaders")
def get_recieving_player_leader():
    parse_player_data = get_player_recieving_leader()
    return jsonify(parse_player_data)
