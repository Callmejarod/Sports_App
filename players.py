import requests
from dotenv import load_dotenv
import os

def configure():
    load_dotenv()

def get_available_players():

    api_url = f"https://api.sportsdata.io/v3/nfl/scores/json/PlayersByAvailable?key={os.getenv('api_key')}"

    try:

        request = requests.get(api_url)
        request.raise_for_status()
        player_data = request.json()

        player_json_list = []

        for player in player_data:
            player_id = player.get("PlayerID", [])
            first_name = player.get("FirstName", [])
            last_name =  player.get("LastName", [])
            position = player.get("Position", [])
            team = player.get("Team", [])
        
            player_json = {
                "player_id": player_id,
                "first_name": first_name,
                "last_name": last_name,
                "position": position,
                "team": team
            }

            player_json_list.append(player_json)

        print(len(player_json_list))

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")

    return player_json_list

def get_active_players():

    api_url = f"https://api.sportsdata.io/v3/nfl/scores/json/PlayersByAvailable?key={os.getenv('api_key')}"

    request = requests.get(api_url)
    request.raise_for_status()
    player_data = request.json()

    player_list = []

    for player in player_data:
        player_id = player.get("PlayerID", [])
        first_name = player.get("FirstName", [])
        last_name =  player.get("LastName", [])
        position = player.get("Position", [])
        team = player.get("Team", [])

        if team is not None:
            player_json = {
                    "player_id": player_id,
                    "first_name": first_name,
                    "last_name": last_name,
                    "position": position,
                    "team": team            
            }

            player_list.append(player_json)

    print(len(player_list))

    return player_list[:10]
configure()
get_available_players()
get_active_players()