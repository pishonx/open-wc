/* eslint-disable no-template-curly-in-string */

const chai = require('chai');
const { Parser } = require('commonmark');
const { HtmlRenderer } = require('../src/HtmlRenderer.js');

const { expect } = chai;

function md(input) {
  const parser = new Parser();
  const renderer = new HtmlRenderer();
  const mdAst = parser.parse(input);
  return renderer.render(mdAst).trim();
}

describe('HtmlRenderer', () => {
  it('renders headlines with ids', () => {
    expect(md('# My Headline')).to.equal('<h1 id="my-headline">My Headline</h1>');
  });

  it('adds a continuous number suffix to the id for same headline names', () => {
    expect(md('# A\n# A\n# A')).to.equal(
      '<h1 id="a">A</h1>\n<h1 id="a-1">A</h1>\n<h1 id="a-2">A</h1>',
    );
    expect(md('# B\n# B\n# C')).to.equal(
      '<h1 id="b">B</h1>\n<h1 id="b-1">B</h1>\n<h1 id="c">C</h1>',
    );
  });
});
