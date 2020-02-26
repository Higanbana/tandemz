const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

function createLegalConsentFiles(page) {
  const { context } = page;
  if (!context || !context.frontmatter || !context.name) {
    return;
  }
  const { frontmatter, name } = context;

  if (!frontmatter.legal) {
    return;
  }
  const dir = path.join(__dirname, '../public/data');
  const updatedAt = new Date(frontmatter.updatedAt);
  const file = path.join(dir, `${frontmatter.legal_name}.json`);

  try {
    const isDirExist = fs.existsSync(dir);
    if (!isDirExist) {
      fs.mkdirSync(dir);
      console.log('Data dir created');
    }
  } catch (e) {
    console.error(e);
  }

  return writeFile(file, JSON.stringify(frontmatter)).then(
    () => {
      console.log(`File created : ${file}`);
    },
    e => console.error(e),
  );
}

module.exports = {
  createLegalConsentFiles,
};
