const fs = require('fs'); 

const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;

const generatePage = require('./src/page-template');

fs.writeFile('./index.html', generatePage(name, github), err => {
  if (err) throw err;

  console.log('Portfolio complete! Check out index.html to see the outcome.')
});