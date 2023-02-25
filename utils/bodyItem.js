function bodyPull(req) {
        return new Promise((resolve, reject) => {
            try{
                let body = [];
                req.on('data', (chunk) => {
                    body.push(chunk);
                  }).on('end', () => {
                    body = Buffer.concat(body).toString();
                    resolve(body)
                  })
                
            } catch(err) {
                reject(err)
            }
        })
}

module.exports = bodyPull;