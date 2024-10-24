from flask import Flask
from flask import render_template
from flask import jsonify
from players import get_available_players
from players import get_active_players
from players_stats import get_passing_player_stats

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/players/passing/stats')
def passing_stats():
    return render_template('passing.html')

@app.route('/api/players')
def get_player_data():
    parse_player_data = get_available_players()
    return jsonify(parse_player_data)

@app.route('/api/players/active')
def get_active_player_data():
    parse_player_data = get_active_players()
    return jsonify(parse_player_data)

@app.route('/api/players/passing/stats')
def get_passing_player_data():
    parse_player_data = get_passing_player_stats()
    return jsonify(parse_player_data)


if __name__ == "__main__":
    app.run(debug=True)