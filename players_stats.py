import requests
import datetime
from dotenv import load_dotenv
import os
from players import get_available_players 

def configure():
    load_dotenv()

def get_player_stats():

    api_url = f"https://api.sportsdata.io/v3/nfl/stats/json/PlayerSeasonStats/2024REG?key={os.getenv('api_key')}"

    try:

        request = requests.get(api_url)
        request.raise_for_status()
        player_data = request.json()
        
        player_stats_json_list = []

        for player in player_data:
            player_id = player.get("PlayerID", [])
            name = player.get("Name", [])
            passing_yards = player.get("PassingYards", [])
            recieving_yards = player.get("ReceivingYards", [])
            rushing_yards = player.get("RushingYards", [])
            touchdowns = player.get("Touchdowns", [])

            player_json = {
                "player_id":player_id,
                "name":name,
                "passing_yards":passing_yards,
                "recieving_yards":recieving_yards,
                "rushing_yards":rushing_yards,
                "touchdowns":touchdowns,
            }

            player_stats_json_list.append(player_json)

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occured: {http_err}")

    return player_stats_json_list

def get_player_passing_leader():
    players_data = get_player_stats()
    available_players_data = get_available_players()
    matched_players_list = []
    max_passing_yards = 0

    for player_stats in players_data:
        for available_player in available_players_data:
            if player_stats.get("player_id") == available_player.get("player_id"):
                matched_players ={
                    "player_id":player_stats.get("player_id"),
                    "first_name":available_player.get("first_name"),
                    "last_name":available_player.get("last_name"),
                    "passing_yards":player_stats.get("passing_yards")
                }

                matched_players_list.append(matched_players)

                if player_stats.get("passing_yards") > max_passing_yards:
                    max_passing_yards = player_stats.get("passing_yards")
                    leader = matched_players

    return leader

configure()
get_player_passing_leader()