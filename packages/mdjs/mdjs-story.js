import { LitElement, html, css } from 'lit-element';

class MdJsStory extends LitElement {

  static get properties() {
    return {
      story: {
        type: Function
      }
    };
  }

  constructor() {
    super();
    this.story = html`<p>Loading...</p>`;
  }

  render() {
    return this.story();
  }

}

customElements.define('mdjs-story', MdJsStory);
