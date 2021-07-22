const fs = require('fs')
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;

function capitalizeString(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}

function writeFile(path, tmpName, contents, cb) {
    mkdirp(path)
        .then(made => {
            fs.writeFile(`${path}/${tmpName}`, contents, cb);
        })
        .catch(err => {
            console.error(err);
        })
  }

/**
 * 
 * 1. create file directory/file_path/index.ts
 * 
 */
/**
 * 
 * @param {string} current_path 
 * @param {string} file_path 
 */
const createModel = (current_path, file_path) => {

    // 1. create file directory/file_path/Model.ts
    let tmpPathArr = file_path.split('/')
    let tmpPath =  `${current_path}/app/${tmpPathArr.filter((v,i) => i !== tmpPathArr.length-1).join('/')}` 

    let pureFileName = capitalizeString(tmpPathArr[tmpPathArr.length-1])

    let tmpName = tmpPathArr[tmpPathArr.length-1]
    
    tmpName = tmpName.endsWith('.js') ? `${tmpName.substr(0, tmpName.length-3)}.ts` : tmpName
    tmpName = tmpName.endsWith('.ts') ? tmpName : `${tmpName}.model.ts`
    tmpName = capitalizeString(tmpName)

    if (fs.existsSync(`${tmpPath}/${tmpName}`)) {

        console.error('Error, duplicate model file.');
        
    } else {

        const content = `import {DefaultScope, Scopes, Model, Column, Table, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt} from "sequelize-typescript";\nimport sequelizeCore from '~/core/db/sequelize';\n\n@Table({\n\ttableName: ''\n})\nexport default class ${pureFileName} extends Model {\n\t@PrimaryKey\n\t@Column\n\tid!: number;\n\n\t@CreatedAt\n\t@Column\n\tcreated_at!: Date;\n\n\t@UpdatedAt\n\t@Column\n\tupdated_at!: Date;\n\n\t@DeletedAt\n\t@Column\n\tdeleted_at!: Date;\n\n}\n\nsequelizeCore.addModels([${pureFileName}]);
        `;

        writeFile(
            tmpPath,
            tmpName,
            content,
            function writeFile(err) {
                if (err) return console.log(err);
            }
        )

        console.log(`Success, created model file at ${tmpPath}/${tmpName}.`);
        
    }

}

module.exports = createModel
