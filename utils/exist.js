const fs = require('fs');
const path = require('path');
const mainDir = require('../utils/mainPath');

async function checkImageFileExists(filePath, res, file, format) {
    try{
        if (fs.statSync(path.join(mainDir, filePath)).isFile()) {
            
                res.writeHead(200, {'Content-Type' : `image/${format}`});
                res.write(fs.readFileSync(path.join(mainDir, `/public/img/${file}`)));
                res.end();
            

       } else{
        console.log('file status unknown')
        }
      
    }catch(err) {
        if(err) {
                res.writeHead(404, {'Content-Type' : 'text/html'});
                res.write(fs.readFileSync(path.join(mainDir, '/view/error/404.html'), 'utf8'));
                res.end();
        }
    }
}

module.exports = checkImageFileExists;