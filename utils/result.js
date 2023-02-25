async function result (data, res) {
    const retrievedData = await data;
    res.writeHead(200, {'Content-Type' : 'application/json'});
    res.end(retrievedData);
}

module.exports = result;