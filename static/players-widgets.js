import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class PlayersWidgets extends LitElement {
    //static style = css`

    //`;

    constructor() {
        super();
        this.players = [];
    }

    connectedCallback() {
        super.connectedCallback();
        this.fetchPlayers();  
    }

    async fetchPlayers() { 
        try {
            const response = await fetch('/api/players/stats');
            this.players = await response.json();
            this.requestUpdate(); fetched
        } catch (error) {
            console.error('Error fetching player\'s stats:', error);
        }
    }

    render() {
        return html`
            <div>
            ${this.players.map(player => html`
                <div>
                    <p>Passing Yards: ${player.passing_yards}</p>
                    <p>Receiving Yards: ${player.recieving_yards}</p>
                    <p>Rushing Yards: ${player.rushing_yards}</p>
                    <p>Touchdowns: ${player.touchdowns}</p>
                </div>
            `)}
        </div>
        `;
    }
}

customElements.define('players-widgets', PlayersWidgets);