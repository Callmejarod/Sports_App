import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class PlayersWidgets extends LitElement {
    static styles = css`
        .widget {
            display: flex; /* Enables flex layout for horizontal alignment */
            justify-content: center; /* Centers widgets horizontally */
            gap: 20px; /* Adds space between each widget */      
        }

        .passing_widget, .rushing_widget, .recieving_widget {
            background-color: #333; /* Gray background */
            border-radius: 8px; /* Rounded corners */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Soft shadow */
            padding: 20px; /* Space inside the widget */
            max-width: 400px; /* Set a maximum width */
            margin: 20px auto; /* Center the widget on the page */
            font-family: Arial, sans-serif; /* Font style */
        }

        .loading {
            font-size: 18px; /* Slightly larger text */
            color: #FFFFFF; /* White color */
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
            color: #FFFFFF; /* White for stats */
            margin: 5px 0; /* Space between stats */
        }

        .highlight {
            color: #007ACC;
            font-weight: bold;
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
            // Fetch passing leader
            const passingResponse = await fetch('/api/players/passing/leaders');
            const passingData = await passingResponse.json();

            // Fetch rushing leader
            const rushingResponse = await fetch('/api/players/rushing/leaders');
            const rushingData = await rushingResponse.json();

            // Fetch recieving leader
            const recievingResponse = await fetch('/api/players/recieving/leaders');
            const recievingData = await recievingResponse.json();

            // Store data
            this.players = {
                passing: passingData,
                rushing: rushingData,
                recieving: recievingData,
            };

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
                <div class="passing_widget">
                    ${this.loading
                        ? html`<p class="loading">Loading player data...</p>` 
                        : html`
                            <div class="player-info>
                                <p class="player-name"><span class="highlight">Passing Leader:</span> ${this.players.passing.first_name} ${this.players.passing.last_name}</p>
                                <p class="player-stats"><span class="highlight">Passing Yards:</span> ${this.players.passing.passing_yards} yards</p>
                            </div>
                        `}
                </div>

                <div class="rushing_widget">
                    ${this.loading
                        ? html`<p class="loading">Loading player data...</p>` 
                        : html`
                            <div class="player-info>
                                <p class="player-name"><span class="highlight">Rushing Leader:</span> ${this.players.rushing.first_name} ${this.players.rushing.last_name}</p>
                                <p class="player-stats"><span class="highlight">Rushing Yards:</span> ${this.players.rushing.rushing_yards} yards</p>
                            </div>
                        `}
                </div>

                <div class="recieving_widget">
                    ${this.loading
                        ? html`<p class="loading">Loading player data...</p>` 
                        : html`
                            <div class="player-info>
                                <p class="player-name"><span class="highlight">Recieving Leader:</span> ${this.players.recieving.first_name} ${this.players.recieving.last_name}</p>
                                <p class="player-stats"><span class="highlight">Recieving Yards:</span> ${this.players.recieving.recieving_yards} yards</p>
                            </div>
                        `}
                </div>
            </div>
        `;
    }
}

customElements.define('players-widgets', PlayersWidgets);