import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class PassingStats extends LitElement {
    static styles = css`
        table {
            width: 75%;
            border-collapse: collapse;
            margin: 25px auto;
            font-size: 12px;
            min-width: 300px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }

        th, td {
            padding: 12px 12px;
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

        .loading {
            text-align: center;
            font-size: 1.2rem;
            padding: 1rem;
        }
            
        .pagination {
            text-align: center;
            margin-top: 20px;
        }

        .pagination button {
            background-color: #007ACC;
            color: white;
            border: none;
            padding: 10px 15px;
            margin: 0 5px;
            cursor: pointer;
        }

        .pagination button:disabled {
            background-color: #555;
            cursor: not-allowed;
        }
    `;

    constructor(){
        super();
        this.players = [];
        this.loading = true;
        this.currentPage = 1;
        this.playersPerPage = 10;
    }


    connectedCallback() {
        super.connectedCallback();
        this.fetchPlayers();
    }


    async fetchPlayers() { 
        try {
            const response = await fetch('/api/players/passing/stats');
            this.players = await response.json();
        } catch (error) {
            console.error('Error fetching players:', error);
        } finally {
            this.loading = false;
            this.requestUpdate(); 
        }
    }

    paginatedPlayers() {
        const start = (this.currentPage - 1) * this.playersPerPage;
        const end = start + this.playersPerPage;
        return this.players.slice(start, end);
    }

    totalPages() {
        return Math.ceil(this.players.length / this.playersPerPage)
    }

    nextPage() {
        if (this.currentPage < this.totalPages()) {
            this.currentPage++;
            this.requestUpdate();
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.requestUpdate();
        }
    }

    render(){
        return html`
        ${this.loading ? html`<div class="loading">Loading player stats...</div>`: html`
            <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Att</th>
                    <th>Cmp</th>
                    <th>Passing TD's</th>
                    <th>Passing Yards</th>
                </tr>
            </thead>
            <tbody>
                ${this.paginatedPlayers().map(player => html`
                    <tr>
                        <td>${player.first_name}</td>
                        <td>${player.last_name}</td>   
                        <td>${player.passing_attempts}</td>      
                        <td>${player.passing_completions}</td>
                        <td>${player.passing_touchdowns}</td>
                        <td>${player.passing_yards}</td>          
                    </tr>
                `)}
            </tbody>
        </table>
        <div class="pagination">
            <button @click="${this.prevPage}" ?disabled="${this.currentPage === 1}">Previous</button>
            <span>Page ${this.currentPage} of ${this.totalPages()}</span>
            <button @click="${this.nextPage}" ?disabled="${this.currentPage >= this.totalPages()}">Next</button>
        </div>
            `}

        `
    }
}

customElements.define('passing-stats', PassingStats);