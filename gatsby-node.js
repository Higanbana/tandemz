const { createLegalConsentFiles } = require('./scripts/legal');
const { generateTranslatedPage } = require('./scripts/translations');

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
exports.onCreatePage = params => {
  createLegalConsentFiles(params.page);
  return generateTranslatedPage(params);
};
