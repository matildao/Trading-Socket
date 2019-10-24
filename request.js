const https = require('https');


function GetAllProducts(callback) {

    try {
        https.get(`${process.env.API_BASE}/products`, function (res) {
            const data = [];

            res.on('data', function (chunk) {
                data.push(chunk);
            });
            res.on('end', function () {
                callback(data.join(''));
            });
        }).on('error', function (e) {
            console.log("Got error: " + e.message);
        });
    } catch (e) {
        console.log(e);
    }
}

module.exports = { GetAllProducts };
