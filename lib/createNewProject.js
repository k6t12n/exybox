const fs = require('fs');
const spawn = require('child_process').spawn;

const skipFiles = require('../commons/skipFiles');

const CURR_DIR = process.cwd();

const createDirectoryContents = (templatePath, newProjectPath) => {
    
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

const changeProjectNameAndVersion = (newProjectName, packageJsonPath) => {

    const packageJson = require(`${packageJsonPath}`)

    const newPackageJson = packageJson

    newPackageJson['name'] = newProjectName
    newPackageJson['version'] = '0.0.0'

    fs.writeFile(
        packageJsonPath, 
        JSON.stringify(newPackageJson, null, 4), 
        function writeJSON(err) {
            if (err) return console.log(err);
        }
    );

}

const createExyboxConfigFile = (projectName, projectPath, template) => {

    const config = {
        project_name: projectName,
        template: template
    }

    fs.writeFile(
        `${projectPath}/exybox.json`, 
        JSON.stringify(config, null, 4), 
        function writeJSON(err) {
            if (err) return console.log(err);
        }
    );

}

const createNewProject = (projectName, template) => {

    const templatePath = `${__dirname}/../templates/${template}`;

    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    console.log('Creating project on ', `${CURR_DIR}/${projectName}`, '...' );

    createDirectoryContents(templatePath, projectName)
        .then(resp => {

            changeProjectNameAndVersion(
                projectName,
                `${CURR_DIR}/${projectName}/package.json`
            )

            createExyboxConfigFile(
                projectName,
                `${CURR_DIR}/${projectName}`,
                template
            )
            
            const yarnCmd = spawn('yarn', ['--cwd', `${CURR_DIR}/${projectName}`])

            yarnCmd.stdout.on('data', (data) => {
                console.log(`${data}`);
            });
              
            yarnCmd.stderr.on('data', (data) => {
                console.error(`${data}`);
            });
              
            yarnCmd.on('close', (code) => {
                console.log(`Child process exited with code ${code}`);
            });

        })
        .catch(err => {
            console.error(err);
        })
        
}

module.exports = createNewProject
