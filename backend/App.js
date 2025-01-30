const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Middleware
app.use(express.json());
app.use('/', (res, req, next) => {
    res.send('Hello World');
});

//Connect to DB
//IPPLJ26NbFbtkpkJ
mongoose.connect("mongodb+srv://admin:IPPLJ26NbFbtkpkJ@cluster0.zyjul.mongodb.net/")
.then(() => console.log('Connected to DB'))
.then(() => {app.listen(3000);})
.catch(err => console.log(err));
