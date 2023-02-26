const Random = require('../models/randomModel');
const result = require('../utils/result');
const checkFileExists = require('../utils/exist');

function getAllData(req, res) {
    Random.allItems(result, res);
}

function getItem(req, res, id) {
    Random.findItem(result, res, id);
}

function updateItem(req, res, id) {
    Random.updateItem(result, res, req, id);
}

function getImageFile(req, res, file, format) {
    checkFileExists(`/public/img/${file}`, res, file, format)
}

module.exports = {
    getAllData,
    getItem,
    updateItem,
    getImageFile
}