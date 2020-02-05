/** @typedef {import('commonmark').Node} Node */

const { HtmlRenderer: CmHtmlRenderer } = require('commonmark');

const allInvalidChars = /[^a-zA-Z0-9 ]*/g;

class HtmlRenderer extends CmHtmlRenderer {
  constructor() {
    super();
    this.__counter = 0;
    this.__givenIds = [];
  }

  /**
   * Returns an id for a given headline
   *
   * @example
   * this.getHeadlineId('My Headline');
   * // return 'my-headline'
   * this.getHeadlineId('My Headline');
   * // return 'my-headline-1' as id was already taken
   *
   * @param {string} headline The given headline text
   * @return {string} An appropriate id for a headline
   */
  getHeadlineId(headline) {
    let id = headline
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

  /**
   * @override so we can add an id to the headline by default
   *
   * @param {Node} node Current node walking over
   * @param {boolean} entering Entering a node or leaving it?
   */
  heading(node, entering) {
    const tagname = `h${node.level}`;
    if (entering) {
      const attrs = this.attrs(node);
      if (node.firstChild) {
        attrs.push(['id', this.getHeadlineId(node.firstChild.literal)]);
      }
      this.cr();
      this.tag(tagname, attrs);
    } else {
      this.tag(`/${tagname}`);
      this.cr();
    }
  }
}

module.exports = {
  HtmlRenderer,
};
