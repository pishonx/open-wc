/** @typedef {import('./types').MarkdownResult} MarkdownResult */

/**
 * @param {MarkdownResult} data
 * @returns {MarkdownResult}
 */
function processJs(data) {
  let jsCode = '';

  const walker = data.mdAst.walker();
  let event = walker.next();
  while (event) {
    const { node } = event;
    if (event.entering && node.type === 'code_block') {
      if (node.info === 'js script') {
        jsCode += node.literal;
        node.unlink();
      }
    }
    event = walker.next();
  }

  return { ...data, jsCode };
}

module.exports = {
  processJs,
};
