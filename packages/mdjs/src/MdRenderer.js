class MdRenderer {
  constructor(options) {
    this.options = options || {};
  }

  render(ast) {
    const md = [];
    const walker = ast.walker();
    let event = walker.next();
    while (event) {
      const { node, entering } = event;
      const { type } = node;
      if (entering) {
        switch (type) {
          case 'document':
            break;
          case 'list':
            // if (node.listType !== null) {
            //   attrs.push(['type', node.listType.toLowerCase()]);
            // }
            // if (node.listStart !== null) {
            //   attrs.push(['start', String(node.listStart)]);
            // }
            // if (node.listTight !== null) {
            //   attrs.push(['tight', (node.listTight ? 'true' : 'false')]);
            // }
            // var delim = node.listDelimiter;
            // if (delim !== null) {
            //   var delimword = '';
            //   if (delim === '.') {
            //     delimword = 'period';
            //   } else {
            //     delimword = 'paren';
            //   }
            //   attrs.push(['delimiter', delimword]);
            // }
            break;
          case 'code_block':
            md.push(`\`\`\`${node.info}`);
            md.push(`${node.literal}\`\`\``);
            break;
          case 'text':
            if (node.parent) {
              switch (node.parent.type) {
                case 'link':
                  md.push(`[${node.literal}](${node.parent.destination})`);
                  break;
                case 'heading':
                  md.push(`${'#'.repeat(node.parent.level)} ${node.literal}`);
                  break;
                default:
                  md.push(node.literal);
              }
            } else {
              md.push(node.literal);
            }
            break;
          // case 'image':
          //   attrs.push(['destination', node.destination]);
          //   attrs.push(['title', node.title]);
          //   break;
          // case 'custom_inline':
          // case 'custom_block':
          //   attrs.push(['on_enter', node.onEnter]);
          //   attrs.push(['on_exit', node.onExit]);
          //   break;
          // case 'paragraph':
          //   // this.buffer += node.literal;
          //   break;
          default:
            break;
        }
      } else {
        // switch (type) {
        //   case 'document':
        //     // md.push('');
        //     break;
        //   default:
        // }
      }
      event = walker.next();
    }
    return md.join('\n');
  }
}

module.exports = {
  MdRenderer,
};
