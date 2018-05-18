const express = require('express');        // here we load express with help of require
const user = require('./users.json');       // here we load JSON file with help of require
const fs = require('fs');                   // here we load file system module with help of require
const bodyParser = require('body-parser');  // here we load body-parse middleware for handling JSON
const jsonfile = require('jsonfile');
var app = express();                        // here we create an object with value express()

app.use(bodyParser.json());                 // it tells the system that we want to use JSON

app.delete('/delete/:Id', (req, res) => {
    var Id = req.params.id;

    jsonfile.readFile("./users.json", function (err, data) {

        console.log(JSON.stringify(data) + "thhjmhjmjmhgm");
        data = JSON.stringify(data);
        data = JSON.parse(data);
        console.log(data + "tytytytyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyype")
        data = data.users_array.filter(function (x) { return x !== null });

        for (i = 0; i < data.length; i++) {
            console.log(data[i].id)
            console.log(data);
            if (data[i].id === Id) {
                console.log("hi")
                // console.log(data[i]);
                data.splice(Id, Id - (Id - 1));
                // console.log(data);
            }

        }
        console.log(data.length, 'length');
        jsonfile.writeFile('./users.json', data, function (err) {
            if (err) throw err;
        });
    });
    res.send("data updated");
});

app.listen(8888, () => {
    console.log('Deletion  done on port 8888');
});