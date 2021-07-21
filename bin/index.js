const commander = require('commander');
const fs = require('fs');

const skipFiles = require('../commons/skipFiles')

const createNewProject = require('../lib/createNewProject')

const program = new commander.Command();

const packageJson = require('../package.json');

program.version(packageJson.version || '0.0.0');

const available_templates = fs.readdirSync(`${__dirname}/../templates`);


// Commands
program
    .command('create:project <project_name>')
    .description('Create New Exybox project from template')
    .option('-t, --template <template_name>', `Template name, templates: ${ available_templates.filter(v => !skipFiles.includes(v)).join(', ') }`)
    .action((project_name, options) => {

        if (project_name && options.template) {

            createNewProject(project_name, options.template)
            
        } else {

            console.error('Error, please run again.');
            
        }

    })

    
program.parse(process.argv)
