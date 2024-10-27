import requests
import datetime
from dotenv import load_dotenv
import os

from api.players import get_active_players

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
            passing_completions = player.get("PassingCompletions", [])
            passing_attempts = player.get("PassingAttempts", [])
            Passing_completion_percentage = player.get("PassingCompletionPercentage", [])
            passing_touchdowns = player.get("PassingTouchdowns", [])
            recieving_yards = player.get("ReceivingYards", [])
            rushing_yards = player.get("RushingYards", [])
            touchdowns = player.get("Touchdowns", [])

            player_json = {
                "player_id":player_id,
                "name":name,
                "passing_yards":passing_yards,
                "passing_completions": passing_completions,
                "passing_attempts": passing_attempts,
                "passing_completion_percentage": Passing_completion_percentage,
                "passing_touchdowns": passing_touchdowns,
                "recieving_yards":recieving_yards,
                "rushing_yards":rushing_yards,
                "touchdowns":touchdowns,
            }

            player_stats_json_list.append(player_json)

        # print(player_stats_json_list[:5])

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occured: {http_err}")

    return player_stats_json_list

def get_passing_player_stats():

    active_players_json = get_active_players()
    player_stats_json = get_player_stats()
    
    player_passing_stats = []

    for player in active_players_json:
        for player_stat in player_stats_json:
            if player.get("player_id") == player_stat.get("player_id",):
                
                if player_stat.get("passing_attempts") > 0:


                    passing_stats_dictionary = {
                        "player_id": player.get("player_id", ""),
                        "first_name": player.get("first_name",""),
                        "last_name": player.get("last_name", ""),
                        "passing_yards": player_stat.get("passing_yards", 0),
                        "passing_attempts": player_stat.get("passing_attempts", 0),
                        "passing_completions": player_stat.get("passing_completions", 0),
                        "passing_completion_percentage": player_stat.get("passing_completion_percentage", 0),
                        "passing_touchdowns": player_stat.get("passing_touchdowns"),
                        "total_touchdowns": player_stat.get("touchdowns")
                    }

                    player_passing_stats.append(passing_stats_dictionary)

    return player_passing_stats

def get_player_passing_leader():
    players_data = get_player_stats()
    available_players_data = get_active_players()
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
get_player_stats()
get_passing_player_stats()
get_player_passing_leader()