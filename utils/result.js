const fs = require('fs');
const path = require('path');
const mainDir = require('./mainPath');

module.exports = result = (data, res) => {
    res.writeHead(200, {'Content-Type' : 'application/json'});
    res.end(data);
}