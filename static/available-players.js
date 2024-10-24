import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


class AvailablePlayers extends LitElement {
    static styles = css`
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 16px;
            min-width: 400px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }

        th, td {
            padding: 12px 15px;
            border-bottom: 1px solid #555;
        }

        th {
            background-color: #1E1E1E;
            color: #007ACC; 
            text-align: left;
            font-weight: bold;
        }

        tr:nth-child(even) {
            background-color: #2D2D2D; 
        }

        tr:hover {
            background-color: #444444; 
        }

        td {
            color: #e5e5e5;
            font-family: 'Arial', sans-serif;
        }

        thead {
            background-color: #121212;
        }

        tbody {
            background-color: #1E1E1E; 
        }
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
            this.requestUpdate(); 
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    }

    render() {
        return html`
        <div>
        <button @click="${() => this.handleButtonClick('/api/players/active/passing')}">Passing Stats</button>
        <button @click="${() => this.handleButtonClick('/api/players/active/running')}">Running Stats</button>
        <button @click="${() => this.handleButtonClick('/api/players/active/receiving')}">Receiving Stats</button>
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
        </div>
        `;
    }
}

customElements.define('available-players', AvailablePlayers);
