import { HtmlRenderer as CmHtmlRenderer } from './commonmark/index.js';

const allInvalidChars = /[^a-zA-Z0-9 ]*/g;

export class HtmlRenderer extends CmHtmlRenderer {
  constructor() {
    super();
    this.__counter = 0;
    this.__givenIds = [];
  }

  getHeadline(text) {
    let id = text
      .replace(allInvalidChars, '')
      .replace(/ /g, '-')
      .toLowerCase();
    if (this.__givenIds.includes(id)) {
      let counter = 0;
      let testId = id;
      while (this.__givenIds.includes(testId)) {
        counter += 1;
        testId = `${id}-${counter}`;
      }
      id = testId;
    }
    this.__givenIds.push(id);
    return id;
  }

  heading(node, entering) {
    const tagname = `h${node.level}`;
    if (entering) {
      const attrs = this.attrs(node);
      if (node.firstChild) {
        attrs.push(['id', this.getHeadline(node.firstChild.literal)]);
      }
      this.cr();
      this.tag(tagname, attrs);
    } else {
      this.tag(`/${tagname}`);
      this.cr();
    }
  }
}
