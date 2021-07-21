const inquirer = require('inquirer');
const fs = require('fs');
const { exec } = require('child_process');
const spawn = require('child_process').spawn;

const skipFiles = [
    '.DS_Store',
    '.git',
    '.gitattributes',
    '.gitignore',
    '.gitlab-ci.yml',
    '.hg',
    '.hgcheck',
    '.hgignore',
    '.idea',
    '.npmignore',
    '.travis.yml',
    'docs',
    'LICENSE',
    'README.md',
    'mkdocs.yml',
    'Thumbs.db',
];

const CHOICES = fs.readdirSync(`${__dirname}/../templates`);

const QUESTIONS = [
    {
        name: 'project-choice',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: CHOICES.filter(v => !skipFiles.includes(v))
    },
    {
        name: 'project-name',
        type: 'input',
        message: 'Project name:',
        validate: function (input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Project name may only include letters, numbers, underscores and hashes.';
        }
    }
];


const CURR_DIR = process.cwd();

inquirer.prompt(QUESTIONS)
    .then(answers => {
        const projectChoice = answers['project-choice'];
        const projectName = answers['project-name'];
        const templatePath = `${__dirname}/../templates/${projectChoice}`;
    
        fs.mkdirSync(`${CURR_DIR}/${projectName}`);

        createDirectoryContents(templatePath, projectName)
            .then(resp => {

                const yarnCmd = spawn('yarn', ['--cwd', `${CURR_DIR}/${projectName}`])

                yarnCmd.stdout.on('data', (data) => {
                    console.log(`${data}`);
                });
                
                yarnCmd.stderr.on('data', (data) => {
                    console.error(`${data}`);
                });
                
                yarnCmd.on('close', (code) => {
                    console.log(`child process exited with code ${code}`);
                });

            })
            .catch(err => {
                console.error(err);
            })
  

    });

function createDirectoryContents (templatePath, newProjectPath) {
    
    return new Promise((resolve, reject) => {
        
        const filesToCreate = fs.readdirSync(templatePath);

        filesToCreate.forEach(file => {

            if (!skipFiles.includes(file)) {

                const origFilePath = `${templatePath}/${file}`;
                const stats = fs.statSync(origFilePath);

                if (stats.isFile()) {
                    const contents = fs.readFileSync(origFilePath, 'utf8');
                    
                    const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
                    fs.writeFileSync(writePath, contents, 'utf8');
                }  else if (stats.isDirectory()) {

                    fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
                    
                    createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);

                }
                
            }

        });

        resolve({})

    })
    

}
