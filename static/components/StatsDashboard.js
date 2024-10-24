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
                <passing-stats></passing-stats>
            </div>
        `;
    }
}

customElements.define('stats-dashboard', StatsDashboard);
