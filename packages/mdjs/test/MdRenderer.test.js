/* eslint-disable no-template-curly-in-string */

const chai = require('chai');
const fs = require('fs');
const { Parser } = require('commonmark');
const { MdRenderer } = require('../src/MdRenderer.js');

const { expect } = chai;

describe('MdRenderer', () => {
  it('can handle headlines', () => {
    const input = `
# Component
This component is so nice.
## Features
[using a search](http://google.com)
`.trim();
    const parser = new Parser();
    const renderer = new MdRenderer();
    const mdAst = parser.parse(input);

    expect(renderer.render(mdAst)).to.equal(input);
  });

  it.skip('works with the example MdRendererInput.md', () => {
    const input = fs.readFileSync('./test/MdRendererInput.md', 'utf-8');
    const parser = new Parser();
    const renderer = new MdRenderer();
    const mdAst = parser.parse(input);

    expect(renderer.render(mdAst)).to.equal(input.trim());
  });
});
