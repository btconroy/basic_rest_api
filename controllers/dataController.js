const Random = require('../models/randomModel');
const result = require('../utils/result');
const checkFileExists = require('../utils/exist');
const { bodyPull } = require('../utils/bodyItem');

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

async function postNewItem(req, res) {
    const newItem = await bodyPull(req);
    const parsedItem = JSON.parse(newItem);
    const addItem = new Random(parsedItem.title, parsedItem.image, parsedItem.description);
    console.log(addItem)
    Random.addNewItem(addItem, result, res);
    
}

module.exports = {
    getAllData,
    getItem,
    updateItem,
    getImageFile,
    postNewItem
}