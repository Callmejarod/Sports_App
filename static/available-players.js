import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


class AvailablePlayers extends LitElement {
    static styles = css`

    `;

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
            const response = await fetch('/api/players/active');
            this.players = await response.json();
            this.requestUpdate(); fetched
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    }

    render() {
        return html`
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Position</th>
                    <th>Team</th>
                </tr>
            </thead>
            <tbody>
                ${this.players.map(player => html`
                    <tr>
                        <td>${player.first_name}</td>
                        <td>${player.last_name}</td>   
                        <td>${player.position}</td      
                        <td>${player.team}</td          
                    </tr>
                `)}
            </tbody>
        </table>
        `;
    }
}

customElements.define('available-players', AvailablePlayers);
