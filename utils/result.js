function result (data, res) {
    res.writeHead(200, {'Content-Type' : 'application/json'});
    res.end(data);
}

module.exports = result;