const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn');

const skipFiles = require('../commons/skipFiles');

const CURR_DIR = process.cwd();

const createDirectoryContents = (templatePath, newProjectPath) => {
    
    return new Promise((resolve, reject) => {
        
        const filesToCreate = fs.readdirSync(templatePath);

        filesToCreate.forEach(file => {

            if (!skipFiles.includes(file)) {

                const origFilePath = path.resolve(templatePath, file);
                const stats = fs.statSync(origFilePath);

                if (stats.isFile()) {
                    const contents = fs.readFileSync(origFilePath, 'utf8');
                    
                    const writePath = path.resolve(CURR_DIR, newProjectPath, file);
                    fs.writeFileSync(writePath, contents, 'utf8');
                }  else if (stats.isDirectory()) {

                    fs.mkdirSync(path.resolve(CURR_DIR, newProjectPath, file));
                    
                    createDirectoryContents(path.resolve(templatePath, file), path.resolve(newProjectPath, file));

                }
                
            }

        });

        resolve({})

    })
    

}

const changeProjectNameAndVersion = (newProjectName, packageJsonPath, callback) => {

    const packageJson = require(`${packageJsonPath}`)

    const newPackageJson = packageJson

    newPackageJson['name'] = newProjectName
    newPackageJson['version'] = '0.0.0';

    fs.writeFile(
        packageJsonPath, 
        JSON.stringify(newPackageJson, null, 4), 
        function writeJSON(err) {
            if (err) {
                console.error('err: ', err);
                return;
            } else {
                callback()
            }
        }
    );

}

const createExyboxConfigFile = (projectName, projectPath, template, callback) => {

    const config = {
        project_name: projectName,
        template: template
    }

    fs.writeFile(
        path.resolve(projectPath, 'exybox.json'), 
        JSON.stringify(config, null, 4), 
        function writeJSON(err) {
            if (err) {
                console.log(err);
                return;
            } else {
                callback()
            }
        }
    );

}

const createNewProject = (projectName, template) => {

    const templatePath = path.resolve(__dirname, '../templates', template);

    fs.mkdirSync(path.resolve(CURR_DIR, projectName));

    console.log('Creating project on ', path.resolve(`${CURR_DIR}`, `${projectName}`), '...' );

    createDirectoryContents(templatePath, projectName)
        .then((resp) => {

            changeProjectNameAndVersion(
                projectName,
                path.resolve(CURR_DIR, projectName, `package.json`),
                () => {

                    createExyboxConfigFile(
                        projectName,
                        path.resolve(CURR_DIR, projectName),
                        template,
                        () => {

                            const yarnCmd = spawn('yarn', ['--cwd', path.resolve(CURR_DIR, projectName)])

                            yarnCmd.stdout.on('data', (data) => {
                                console.log(`${data}`);
                            });
                            
                            yarnCmd.stderr.on('data', (data) => {
                                console.error(`${data}`);
                            });
                            
                            yarnCmd.on('close', (code) => {
                                console.log(`Child process exited with code ${code}`);
                            });

                        }
                    )

                }
            )


        })
        .catch(err => {
            console.error(err);
        })
        
}

module.exports = createNewProject
