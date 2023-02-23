const Random = require('../models/randomModel');
const result = require('../utils/result');

function getAllData(req, res) {
    Random.allItems(result, res);
}

function getItem(req, res, id) {
    Random.findItem(result, res, id);
}

module.exports = {
    getAllData,
    getItem
}