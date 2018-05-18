const express = require('express');        // here we load express with help of require
const user = require('./users.json');       // here we load JSON file with help of require
const fs = require('fs');                   // here we load file system module with help of require
const bodyParser = require('body-parser');  // here we load body-parse middleware for handling JSON
const jsonfile = require('jsonfile');

var app = express();                        // here we create an object with value express()

app.use(bodyParser.json());                 // it tells the system that we want to use JSON

app.get("/", function (req, res) {              //GET is used to request data from a specified resource.
    res.send('This is main route.....');
});

app.get("/users", (req, res) => {

    res.json(user);
});

//here i display full name in code.
app.get('/userss', (req, res) => {
    // var fullName, array_ele = " ";
    // for (i in user.user) {
    //     fullName = user.user[i].fame + " " + user.user[i].lname;
    //     // if (user.user[i].age <= 30) {
    //     //     user.user[i].age = "Young";
    //     // }
    //     // if (user.user[i].age > 30) {
    //     //     user.user[i].age = "Old";
    //     // }
    //     array_ele += ("<br>id:" + user.user[i].id + "FullName : " + fullName);// ", Age : " + user.user[i].age + ", Phone : " + user.users_array[i].phone + "<br>");
    // }
    // console.log(array_ele);
    // res.send(array_ele);

    jsonfile.readFile('./users.json', function (err, data) {
        console.log(data.user);
        function addKeyValue(key, dataOfKey) {
            key.FullName = dataOfKey;
        }
        let newinfo = data.user.map(function (x) {
            return addKeyValue(x, (x.fame + " " + x.lname));
        });
        console.log(data);
        res.send(data);
    });
});

//here is code for Update the data
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

//delete
app.delete('/delete/:id', (req, res) => {
    jsonfile.readFile('./users.json', function (err, data) {
        //console.log(req.params.id+"------------------------------------------");
        var Id = req.params.id;
        //console.log(Id+"+++++++++++++++++++++++++++++++++++++++++++++");
        var i;
        for (i = 0; i < data.user.length; i++) {
            //    console.log("========="+ data.user[i].id,data.user.length);
            d = data.user[i].id
            //  console.log(d+'fdhxgfdgj')
            if (d == Id) {
                console.log('---------', Object.values(data.user).indexOf(d))
                data.user.splice(i, 1);
                //    console.log("=========");
                break;
            }
        }
        //console.log(JSON.stringify(data) + "g-frgcbdbg");
        console.log(data.user);
        console.log(data.user.length + " : length");
        jsonfile.writeFile('./users.json', data, (err) => { if (err) throw err });
    });
    res.send("data deleted");
});


app.post('/users/add', (req, res) => {                 //Post is used to send data to server to create/update a resource.
    fs.readFile(__dirname + "/" + "users.json", 'utf-8', function (err, user) {  //to read entire content of file
        if (err) throw err
        var jsonObject = JSON.parse(user);          //to convert data which is receive from server into js object.
        jsonObject.user.push({
            id: req.body.id,
            fame: req.body.fame,    //The push() method adds new items to the end
            lname: req.body.lname,
            // age: req.body.age,
            // address: req.body.address,
            // phone: req.body.phone
        })
        //it send simple http response
        fs.writeFile('./users.json', JSON.stringify(jsonObject), 'utf-8', function (err) {  //it use to write the file
            if (err) throw err
            console.log('New user added');
        })
        res.send(jsonObject);
    });
});


app.listen(8000, () => {
    console.log('server started on port 8000');
});