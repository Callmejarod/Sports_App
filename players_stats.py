import requests
import datetime
from dotenv import load_dotenv
import os

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

        print(player_stats_json_list)

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occured: {http_err}")

    return player_stats_json_list

configure()
get_player_stats() 