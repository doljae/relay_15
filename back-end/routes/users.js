const fs = require('fs');
var express = require('express');
var router = express.Router();
var users = require('../public/database/users.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('users', users);
});
router.post('/', function(req, res, next) {
    const len = users.data.length;
    const info = req.body;
    users.data.push({
        no: (len + 1),
        email: `${info.email}`,
        password: `${info.password}`,
        name: `${info.name}`
    });
    const stringJson = JSON.stringify(users);
    fs.open('./public/database/users.json', 'a', "666", function(err, id) {
        if (err) {
            console.log("file open err!!");
        } else {
            fs.writeFile('./public/database/users.json', '', function() {
                console.log('file is cleand!');
                fs.write(id, stringJson, null, 'utf8', function(err) {
                    console.log('file was saved!');
                });
            });
        }
    })
    console.dir(info);
    res.send({ status: "OK", data: info });
});

module.exports = router;