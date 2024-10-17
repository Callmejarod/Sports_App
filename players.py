import requests
import datetime

def get_available_players():

    api_key = '8fbb50c7c026488eb5f35d84370e44d6'
    api_url = f'https://api.sportsdata.io/v3/nfl/scores/json/PlayersByAvailable?key={api_key}'

    try:

        request = requests.get(api_url)
        request.raise_for_status()
        player_data = request.json()

        player_json_list = []

        for player in player_data:
            player_id = player.get("PlayerID")
            first_name = player.get("FirstName")
            last_name =  player.get("LastName")
            position = player.get("Position")
            team = player.get("Team")
        
            player_json = {
                "player_id": player_id,
                "first_name": first_name,
                "last_name": last_name,
                "position": position,
                "team": team
            }

            player_json_list.append(player_json)

        print(player_json_list)

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")

    return 

get_available_players()