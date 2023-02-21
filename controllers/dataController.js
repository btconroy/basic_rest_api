const Random = require('../models/randomModel');
const result = require('../utils/result');

function getAllData(req, res) {
    Random.allItems(result, res);
}

module.exports = {
    getAllData
}