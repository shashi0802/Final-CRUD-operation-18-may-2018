const express = require('express');
const fs = require('fs');
const jsonfile = require('jsonfile');
const user = require('./array.json');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

jsonfile.readFile('./person.json', function (err, data) {

    console.log(data.user);
    function addKeyValue(key, dataOfKey) {
        key.FullName = dataOfKey;
    }

    for(var i = 0;i<data.user.length;i++){
    let newinfo = data.user.map(function (x) {
        return addKeyValue(x,  (data.user[i].name +" "+ data.user[i].lname));
    });
}
    console.log(data);
});