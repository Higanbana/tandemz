const parse5 = require('parse5');
const treeAdapter = require('parse5/lib/tree-adapters/default.js');
const axios = require('axios');

const allowedStringTags = ['strong', 'em', 'span'];
function getText(node) {
  if (treeAdapter.isTextNode(node)) {
    const text = treeAdapter.getTextNodeContent(node);
    if (!text.trim() || text === '\n') {
      return [];
    }
    return [text];
  }

  const childs = treeAdapter.getChildNodes(node);
  if (childs && childs.length) {
    const onlyStrongAndSpan = !childs.some(childNode => {
      const tag = treeAdapter.getTagName(childNode);
      return !allowedStringTags.includes(tag);
    });

    if (onlyStrongAndSpan) {
      const innerNode = treeAdapter.createDocumentFragment();
      innerNode.childNodes = childs;
      return [parse5.serialize(innerNode)];
    }

    return childs.reduce((curr, childNode) => {
      return [...curr, ...getText(childNode)];
    }, []);
  }
  return [];
}

function replaceTexts(node, resultsMap) {
  if (treeAdapter.isTextNode(node)) {
    const text = treeAdapter.getTextNodeContent(node);
    if (!text.trim() || text === '\n') {
      return;
    }
    node.value = resultsMap[text];
  }

  const childs = treeAdapter.getChildNodes(node);

  if (!childs || !childs.length) {
    return;
  }

  const onlyStrongAndSpan = !childs.some(childNode => {
    const tag = treeAdapter.getTagName(childNode);
    return !allowedStringTags.includes(tag);
  });

  if (onlyStrongAndSpan) {
    const innerNode = treeAdapter.createDocumentFragment();
    innerNode.childNodes = childs;
    const text = parse5.serialize(innerNode);
    node.value = resultsMap[text];
    return;
  }

  return childs.forEach(childNode => replaceTexts(childNode, resultsMap));
}

async function generateTranslatedPage({ page, actions }) {
  const { context } = page;

  const parsed = parse5.parseFragment(context.html);

  const texts = getText(parsed);

  try {
    if (texts.length) {
      const result = await axios.post(
        'https://api.weglot.com/translate?api_key=wg_67fd86c77ab6a28f974dd9686efe3ade5',
        {
          l_from: 'fr',
          l_to: 'en',
          words: texts.map(word => ({
            t: 1,
            w: word,
          })),
          request_url: `/en${page.context.url}`,
          title: context.frontmatter.title,
        },
      );

      const resultsMap = result.data.from_words.reduce((acc, word, index) => {
        return {
          ...acc,
          [word]: result.data.to_words[index],
        };
      }, {});

      replaceTexts(parsed, resultsMap);
    } else {
      console.log(context.url);
    }

    actions.createPage({
      ...page,
      path: `/en${page.path}`,
      context: {
        ...page.context,
        url: `/en${page.context.url}`,
        locale: 'en',
        html: parse5.serialize(parsed),
      },
    });
  } catch (e) {
    console.error(e.stack);
  }
}

module.exports = {
  generateTranslatedPage,
};
