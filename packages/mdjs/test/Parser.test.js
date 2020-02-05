/* eslint-disable no-template-curly-in-string */

const chai = require('chai');
const { Parser } = require('../src/Parser.js');

const { expect } = chai;

describe('Parser', () => {
  it('extracts only "js script" code blocks', () => {
    const parser = new Parser();
    const code = [];
    code.push('## Intro');
    code.push('```js');
    code.push('const foo = 1;');
    code.push('```');
    code.push('```js script');
    code.push('const bar = 22;');
    code.push('```');
    const { jsCode } = parser.parse(code.join('\n'));

    expect(jsCode).to.equal('const bar = 22;\n');
  });

  it('extracts stories', () => {
    const code = [];
    code.push('```js story');
    code.push('export const fooStory = () => {}');
    code.push('```');
    const { stories } = new Parser().parse(code.join('\n'));
    expect(stories.length).to.equal(1);
    expect(stories[0].key).to.equal('fooStory');
    expect(stories[0].name).to.equal('fooStory');
    expect(stories[0].displayedCode).to.equal('export const fooStory = () => {}\n');
    expect(stories[0].codeAst).to.not.be.undefined; // babel AST
  });
});

// // describe.skip('Parser Overrides', () => {
// //   it('can replace a specific ', () => {
// //     const input = `
// // # Component
// // This component is so nice.
// // ## Features
// // `;
// //     const expected = `
// // # Better Component
// // So nice
// // ## Features
// // `;
// //     const parser = new Parser();
// //     parser.parse(input);

// //     replace('# Component', '# Better Component');
// //     // replaceFromTo('# Component', '## Features');
// //   });

// //   it('allows for an array of override md files', async () => {
// //     const input = `
// // # Component
// // This component is so nice.
// // ## Features
// // `;
// //     const override = `
// // # Component ::overrideUntil(## Features)
// // # Better Component
// // So nice
// // `;

// //     const expected = `
// // # Better Component
// // So nice
// // ## Features
// // `;
// //   });
// // });
