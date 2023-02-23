const server = require('http');
const fs = require('fs');
const path = require('path');
const mainDir = require('./utils/mainPath');

const { getAllData, getItem } = require('./controllers/dataController');

const PORT = 4040 || process.env.PORT;

server.createServer((req, res) => {
    if(req.method === 'GET' && req.url === '/') {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(fs.readFileSync(path.join(mainDir, '/view/index.html'), 'utf8'));
        res.end();
    } else if(req.method === 'GET' && req.url === '/public/index.js') {
        res.writeHead(200, {'Content-Type' : 'text/javascript'});
        res.write(fs.readFileSync(path.join(mainDir, '/public/index.js'), 'utf8'));
        res.end();
    } else if(req.method === 'GET' && req.url === '/api/items') {
        getAllData(req, res);
    } else if(req.method === 'GET' && req.url.match(/\/api\/item\/\w+/)) {
        const id = req.url.split('/')[3];
        getItem(req, res, id);
    }
     else {
        res.writeHead(404, {'Content-Type' : 'text/html'});
        res.write(fs.readFileSync(path.join(mainDir, '/view/error/404.html'), 'utf8'));
        res.end();
    }
}).listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});