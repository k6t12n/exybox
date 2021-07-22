const fs = require('fs')


/**
 * 
 * 1. create directory directory/file_path
 * 2. create directory directory/file_path/middlewares
 * 3. create directory directory/file_path/models
 * 4. create directory directory/file_path/functions
 * 5. create file directory/file_path/index.ts
 * 
 */
const createRoute = (current_path, file_path) => {

    // 1. create directory directory/file_path
    const route_dir = `${current_path}/app/${file_path.toLowerCase()}`;
    if (!fs.existsSync(route_dir)){

        fs.mkdirSync(route_dir);

    }

    // 2. create directory directory/file_path/middlewares
    const middleware_dir = `${current_path}/app/${file_path.toLowerCase()}/middlewares`;
    if (!fs.existsSync(middleware_dir)){
        fs.mkdirSync(middleware_dir);
    }

    // 3. create directory directory/file_path/models
    const models_dir = `${current_path}/app/${file_path.toLowerCase()}/models`;
    if (!fs.existsSync(models_dir)){
        fs.mkdirSync(models_dir);
    }

    // 4. create directory directory/file_path/functions
    const functions_dir = `${current_path}/app/${file_path.toLowerCase()}/functions`;
    if (!fs.existsSync(functions_dir)){
        fs.mkdirSync(functions_dir);
    }
    
    // 5. create file directory/file_path/index.ts
    const index_file = `${current_path}/app/${file_path.toLowerCase()}/index.ts`;

    const routeContent = `import {Router, NextFunction, Request, Response} from "express";\n\nconst router = Router();\n\nrouter.get('/', async (req: Request, res: Response, next: NextFunction) => {\n\treturn res.json({status: 200, message: 'OK'})\n})\n\nexport default router;`

    fs.writeFile(
        index_file, 
        routeContent, 
        function writeJSON(err) {
            if (err) return console.log(err);
        }
    );

    console.log(`Success, created route at ${current_path}/app/${file_path.toLowerCase()}.`);

}

module.exports = createRoute
