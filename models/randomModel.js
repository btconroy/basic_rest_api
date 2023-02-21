const fs = require('fs');
const path = require('path');
const mainDir = require('../utils/mainPath');
const result = require('../utils/result');

module.exports = class Random {
    constructor(title, image, desc) {
        this.title = title;
        this.image = image;
        this.description = desc;
    }

    //@desc random item
    //@route /api/items
    static allItems(cb, res) {
       fs.readFile(path.join(mainDir, '/data/randomData.json'), 'utf8', (err, data) => {
        if(err) throw console.log(err);
        cb(data, res)
    }) 
    }
}