const fs = require('fs');
const path = require('path');
const mainDir = require('../utils/mainPath');
const dataFile = '/data/randomData.json';
const { bodyPull }= require('../utils/bodyItem');
const randomId = require('../utils/randomId');

module.exports = class Random {
    constructor(title, image, desc) {
        this.title = title;
        this.image = image;
        this.description = desc;
    }
    //@desc adding a new random item
    //@route POST /api/item/

   static addNewItem(obj, cb, res) {
        const fileObject = JSON.parse(fs.readFileSync(path.join(mainDir, dataFile), 'utf8'));
        let newId = randomId();
        let checkFile = fileObject.find(item => item.id === newId);

     /*  while(checkFile != undefined) {
        newId = randomId()
        checkFile = fileObject.find(item => item.id === newId);
       } */

       const newItem = {
            id : newId,
            title : obj.title,
            image : obj.image,
            description: obj.description
        } 
        const fileUpdate = [...fileObject, newItem];

        fs.writeFile(path.join(mainDir, dataFile), JSON.stringify(fileUpdate), (err) => {
            if(err) throw console.log(err) 
            
            cb(fs.readFileSync(path.join(mainDir, '/data/randomData.json'), 'utf8'), res);
        }) 
       

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
            if(returnedData === undefined) {
                res.writeHead(404, {'Content-Type' : 'text/html'});
                res.write(fs.readFileSync(path.join(mainDir, '/view/error/404.html')));
                res.end();
            }
            
            cb(JSON.stringify(returnedData), res);
        });
    }
    //@desc update a random item
    //@route PUT /api/item/:id
    static async updateItem(cb, res, req, id){
        const items = JSON.parse(fs.readFileSync(path.join(mainDir, '/data/randomData.json')));
        // const findItem = items.find(item => {item.id === id});
        const requestedItem = await bodyPull(req);
        const reqObj = JSON.parse(requestedItem)

        const newArr =[...items];

        for(let index = 0; index < newArr.length; index++) {
            if(id === newArr[index].id) {
                newArr[index] = reqObj;
            }
        }
        fs.writeFile(path.join(mainDir, '/data/randomData.json'), JSON.stringify(newArr), (err) => {
            if(err){
                res.writeHead(404, {'Content-Type' : 'text/html'});
                res.write(fs.readFileSync(path.join(mainDir, '/view/error/404.html')));
                res.end(() => {
                    JSON.stringify({ message : "Error with updating file" })
                });
            } else {
                cb(fs.readFileSync(path.join(mainDir, '/data/randomData.json'), 'utf8'), res);
            }
        });
    }



}