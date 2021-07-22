const fs = require('fs');

/**
 * 
 * @param {string} current_path 
 * @param {string} file_path 
 * @param {boolean} is_admin 
 */
const createReactMix = (current_path, file_path, is_admin) => {

    if (is_admin) {

        // let tmpPathArr = file_path.split('/')
        // let tmpPath =  `${current_path}/app/${tmpPathArr.filter((v,i) => i !== tmpPathArr.length-1).join('/')}` 
    
        // let tmpName = tmpPathArr[tmpPathArr.length-1]
        
        // tmpName = tmpName.endsWith('.js') ? tmpName : `${tmpName}.js`

        // let data = fs.readFileSync(`${current_path}/file`)
        
    } else {
        
    }

    console.log(`Success, created react mix file at ${tmpPath}/${tmpName}.`);
        

}

module.exports = createReactMix
