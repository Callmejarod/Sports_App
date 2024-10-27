import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './PassingStats.js'; // Import the passing stats component


class StatsDashboard extends LitElement {
    static styles = css`
        div {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .table-buttons{
            display: flex;
            flex-direction: Row;
            gap: 30px;

        }

        .positional-stats {
            padding: 10px 20px; 
            cursor: pointer; 
        }
    `;

    constructor() {
        super();
        this.activeComponent = 'passing'; 
    }

    handleButtonClick(component) {
        this.activeComponent = component; 
        this.requestUpdate();
    }

    render() {
        return html`
            <div>
                <div class="table-buttons">
                    <button class="positional-stats">Passing</button>
                    <button class="positional-stats">Rushing</button>
                    <button class="positional-stats">Receiving</button>
                </div>
                <passing-stats></passing-stats>
            </div>
        `;
    }
}

customElements.define('stats-dashboard', StatsDashboard);
