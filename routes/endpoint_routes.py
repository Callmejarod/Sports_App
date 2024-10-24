from flask import Blueprint, jsonify, render_template
from api.players import get_available_players, get_active_players
from api.players_stats import get_passing_player_stats  


routes_bp = Blueprint('routes', __name__)

@routes_bp.route('/')
def index():
    return render_template('index.html')

@routes_bp.route('/players/passing/stats')
def passing_stats():
    return render_template('passing.html')

@routes_bp.route('/api/players')
def get_player_data():
    parse_player_data = get_available_players()
    return jsonify(parse_player_data)

@routes_bp.route('/api/players/active')
def get_active_player_data():
    parse_player_data = get_active_players()
    return jsonify(parse_player_data)

@routes_bp.route('/api/players/passing/stats')
def get_passing_player_data():
    parse_player_data = get_passing_player_stats()
    return jsonify(parse_player_data)
