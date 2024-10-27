import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class PlayersWidgets extends LitElement {
    static styles = css`
        .widget {
            background-color: #f8f9fa; /* Light background */
            border-radius: 8px; /* Rounded corners */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Soft shadow */
            padding: 20px; /* Space inside the widget */
            max-width: 400px; /* Set a maximum width */
            margin: 20px auto; /* Center the widget on the page */
            font-family: Arial, sans-serif; /* Font style */
        }

        .loading {
            font-size: 18px; /* Slightly larger text */
            color: #6c757d; /* Gray color */
            text-align: center; /* Center the loading text */
            margin: 10px 0; /* Space around the loading text */
        }

        .player-info {
            display: flex; /* Use flexbox for layout */
            flex-direction: column; /* Stack items vertically */
            align-items: center; /* Center items */
            text-align: center; /* Center text */
        }

        .player-name {
            font-size: 24px; /* Larger font for player name */
            font-weight: bold; /* Bold text */
            color: #007bff; /* Blue color for player name */
            margin: 5px 0; /* Space above and below the name */
        }

        .player-stats {
            font-size: 18px; /* Font size for stats */
            color: #343a40; /* Darker gray for stats */
            margin: 5px 0; /* Space between stats */
        }

        .player-stats span {
            font-weight: bold; /* Bold text for the stats */
        }
    `;

    constructor() {
        super();
        this.players = [];
        this.loading = true;
    }

    connectedCallback() {
        super.connectedCallback();
        this.fetchPlayers();  
    }

    async fetchPlayers() { 
        this.loading = true;
        try {
            const response = await fetch('/api/players/passing/leaders');
            this.players = await response.json();
            this.requestUpdate();
        } catch (error) {
            console.error('Error fetching player\'s stats:', error);
        } finally {
            this.loading = false;
            this.requestUpdate();
        }
    }

    render() {
        return html`
            <div class="widget">
                ${this.loading
                    ? html`<p class="loading">Loading player data...</p>` 
                    : html`
                        <div class="player-info>
                            <p class="player-name">Passing Leader: ${this.players.first_name} ${this.players.last_name}</p>
                            <p class="player-stats">Passing Yards: ${this.players.passing_yards} yards</p>
                        </div>
                    `}
            </div>
        `;
    }
}

customElements.define('players-widgets', PlayersWidgets);