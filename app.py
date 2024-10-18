from flask import Flask
from flask import render_template
from flask import jsonify
from players import get_available_players

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/players')
def get_player_data():
    parse_player_data = get_available_players()
    return jsonify(parse_player_data)

if __name__ == "__main__":
    app.run(debug=True)