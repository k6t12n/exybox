const fs = require('fs');
const spawn = require('child_process').spawn;

const skipFiles = require('../../commons/skipFiles');

const exybox_typescript = require('./templates/exybox-typescript/index')

const CURR_DIR = process.cwd();

const createNewFile = (template, current_path, file_path, type_name, is_ts, is_admin) => {

    if (template === 'exybox-typescript') {

        if (type_name === 'route') {

            exybox_typescript.createRoute(current_path, file_path)
            
        } else if (type_name === 'model') {

            exybox_typescript.createModel(current_path, file_path)
            
        } else if (type_name === 'react_mix') {

            // exybox_typescript.createReactMix(current_path, file_path, is_admin)
            
        } else {
            console.log('File type is not available for this template.');
        }
        
    } else if (template === 'exybox-react-redux') {

    } else {
        
    }
        
}

module.exports = createNewFile
