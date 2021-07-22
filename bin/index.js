#! /usr/bin/env node

const commander = require('commander');
const fs = require('fs');


const skipFiles = require('../commons/skipFiles')

const createNewProject = require('../lib/createNewProject')
const createNewFile = require('../lib/createNewFile')

const program = new commander.Command();

const packageJson = require('../package.json');

program.version(packageJson.version || '0.0.0');

const available_templates = fs.readdirSync(`${__dirname}/../templates`);


// Commands
program
    .command('create:app <project_name>')
    .description('Create New Exybox project from template')
    .option('--template <template_name>', `Template name, templates: ${ available_templates.filter(v => !skipFiles.includes(v)).join(', ') }`)
    .action((project_name, options) => {

        if (project_name && options.template) {

            createNewProject(project_name, options.template)
            
        } else {

            console.error('Error, please run again.');
            
        }

    })

program
    .command('create:file <file_path>')
    .description('Create new file based on template, default will be js file')
    .option('--type <type_name>', `Type name, types: route, model, jsmix, react_mix`)
    .option('--ts', `Create typescript file (.ts)`)
    .option('--admin', `Create file for protected admin, available for type: react_mix`)
    .action((file_path, options) => {

        const CURR_DIR = process.cwd();

        fs.stat(`${CURR_DIR}/exybox.json`, function(err, stat) { 

            if (!err) { 
              
                const exyboxJSON = require(`${CURR_DIR}/exybox.json`)
                const template = exyboxJSON['template']

                if (template) {

                    const type_name = options.type
                    const is_ts = options.ts || false
                    const is_admin = options.admin || false
                    const current_path = CURR_DIR

                    if (
                        is_ts && 
                        ['exybox-typescript'].includes(template)
                    ) {
                        console.log(`Template ${template} is already used Typescript.`);
                    }

                    createNewFile(
                        template,
                        current_path,
                        file_path,
                        type_name,
                        is_ts,
                        is_admin
                    )
                    
                    
                } else {
                    
                    console.error('Error, please check exybox.json file and It must has template attribute.');
                    
                }

            } else {

                console.error('Error, not found exybox.json file');

            }


        });


    })

    
program.parse(process.argv)
