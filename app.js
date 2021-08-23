const inquirer = require('inquirer');

const fs = require('fs'); 
const generatePage = require('./src/page-template');

const promptUser = () => {
  return inquirer.prompt ([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Seriously, what do we call you?');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username.'
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },    
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ])
}

const promptProject = portfolioData => {
  console.log(`
  =================
  Add a New Project
  =================
  `);
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      validate: projectName => {
        if (projectName) {
          return true;
        } else {
          console.log('Your project deserves a name, come on.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (required):',
      validate: projectDescription => {
        if (projectDescription) {
          return true;
        } else {
          console.log('Describe your project.');
          return false;
        }
      } 
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'With what did you build this project? Check all that apply:',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project (required):',
      validate: linkInput => {
        if (linkInput) {
          return true;
        } else {
          console.log('Nice try, but we need an address.');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    },
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile('./dist/index.html', pageHTML, err => {
      if (err) {
        console.log(err);
        return;
      } 
      console.log('Page created! Check out index.html in this directory to see it!');
    
      fs.copyFile('./src/style.css', './dist/style.css', err => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Style sheet copied successfully!')
      })    
    });
  });