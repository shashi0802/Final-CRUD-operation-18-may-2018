const express = require('express');        // here we load express with help of require
const user = require('./users.json');       // here we load JSON file with help of require
const fs = require('fs');                   // here we load file system module with help of require
const bodyParser = require('body-parser');  // here we load body-parse middleware for handling JSON
const jsonfile = require('jsonfile');
var app = express();                        // here we create an object with value express()

app.use(bodyParser.json());                 // it tells the system that we want to use JSON

app.put('/edit/:id', (req, res) => {
    var id = req.params.id;
    var fame = req.body.fame;
    var lname = req.body.lname;
    // var age = req.body.age;
    // var address = req.body.address;
    // var phone = req.body.phone;
    jsonfile.readFile("./users.json", function (err, data) {
      //  console.log(typeof data);
        var fileObj = data;
        //console.log(typeof (fileObj), 'data');
       console.log(fileObj.user, 'users data');
        fileObj.user.map((curr) => {
            if (curr.id == id) {
                curr.fame = fame;
                curr.lname = lname;
                // curr.age = age;
                // curr.address = address;
                // curr.phone = phone;
                console.log('Updated successfully');
            }
        });
        jsonfile.writeFile('./users.json', fileObj, function (err) {
            if (err) throw err;
        });
    });
    res.send("data updated");
});
app.listen(9000, () => {
    console.log('Put done on port 9000');
});