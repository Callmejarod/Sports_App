import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


class AvailablePlayers extends LitElement {
    static styles = css`
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 16px;
            min-width: 400px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        }

        th, td {
            padding: 12px 15px;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #4CAF50;
            color: white;
            text-align: left;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tr:hover {
            background-color: #c0ffb3;
        }

        td {
            font-family: 'Arial', sans-serif;
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
