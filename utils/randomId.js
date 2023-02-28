 const letterArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
 let idArr = [];
 let idStr;

 function randomNum() {
   return Math.floor(Math.random()* 9);
 }
 function randomLetter() {
   return letterArr[Math.floor(Math.random()*26)];
 }

function randomId() {
    const change = Math.floor(Math.random()* 4);
    for(let round = 0; round < 9; round++) {
       let num = randomNum();
       idArr.push(num);
    } 

    for(let index = 0; index < idArr.length; index += change) {
      idArr[index] = randomLetter();
    }

    idStr = idArr.join('');

    return idStr;

 }

 module.exports = randomId;