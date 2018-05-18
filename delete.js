const express = require('express');
const fs = require('fs');
const jsonfile = require('jsonfile');
const user = require('./array.json');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.delete('/delete/:id', (req, res) => {
    jsonfile.readFile('./array.json', function (err, data) {
        console.log(req.params.id+"------------------------------------------");
        var Id = req.params.id;
        console.log(Id+"+++++++++++++++++++++++++++++++++++++++++++++");
        var i;
        for (i = 0; i < data.user.length; i++) {

            //    console.log("========="+ data.user[i].id,data.user.length);

            d = data.user[i].id
            console.log(d+'fdhxgfdgj')
            if (d == Id) {
                console.log('---------', Object.values(data.user).indexOf(d))

                data.user.splice(i, 1);


                console.log("=========");
                break;
            }

        }


        console.log(data.user);
        console.log(data.user.length + " : length");
        jsonfile.writeFile('./array.json', data, (err) => { if (err) throw err });
    });
    res.send("data updated");
});

app.listen(9999, () => { console.log("Deletion done on port 9999") });