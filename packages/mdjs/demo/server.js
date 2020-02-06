const { MdJsRenderer, Parser } = require('../index.js');

module.exports = {
  nodeResolve: true,
  open: 'packages/mdjs/demo/README.md',
  watch: true,
  responseTransformers: [
    function mdJsTransformer({ url, body }) {
      if (url.endsWith('.md')) {
        const mdJsData = new Parser().parse(body);
        const html = new MdJsRenderer().render(mdJsData);
        return {
          body: html,
          contentType: 'text/html',
        };
      }
      return null;
    },
  ],
};
