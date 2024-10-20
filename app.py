from flask import Flask
from flask import render_template
from flask import jsonify
from players import get_available_players
from players import get_active_players
from players_stats import get_player_stats
from players_stats import get_player_passing_leader

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/players')
def get_player_data():
    parse_player_data = get_available_players()
    return jsonify(parse_player_data)

@app.route('/api/players/active')
def get_active_player_data():
    parse_player_data = get_active_players()
    return jsonify(parse_player_data)

@app.route('/api/players/stats')
def get_player_stats_data():
    parse_player_data = get_player_stats()
    return jsonify(parse_player_data)

@app.route('/api/players/passing_leader')
def get_player_passing_leader_data():
    parse_player_data = get_player_passing_leader()
    return jsonify(parse_player_data)

if __name__ == "__main__":
    app.run(debug=True)