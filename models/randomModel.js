const fs = require('fs');
const path = require('path');
const mainDir = require('../utils/mainPath');
const dataFile = '/data/randomData.json';

module.exports = class Random {
    constructor(title, image, desc) {
        this.title = title;
        this.image = image;
        this.description = desc;
    }

    //@desc finding all random item
    //@route GET /api/items
    static allItems(cb, res) {
       fs.readFile(path.join(mainDir, dataFile), 'utf8', (err, items) => {
        if(err) throw console.log(err);
        cb(items, res)
    }); 
    }

    //@desc finding a single random item
    //@route GET /api/item/:id
    static findItem(cb, res, id) {
        fs.readFile(path.join(mainDir, dataFile), 'utf8', (err, items) => {
            if(err) throw console.log(err);
            const data = JSON.parse(items);
            const returnedData = data.find(item => item.id === id);
            cb(JSON.stringify(returnedData), res);
        });
    }

}