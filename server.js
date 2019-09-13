
const express = require('express')
const request = require('request')
const app = express()
const bodyParser = require('body-parser');

const portt = 3999

app.use(express.json());
app.use(express.urlencoded())
app.use(express.static("public_index"));
app.listen(portt, () => console.log('App listening on portt ' + portt))
var d = new Date();
var k = 0; 

app.get('/mock', (req, res) => {
        console.log("AFTER INGRESS -- WHITE HAMMER ")
    res.redirect("/")
})

app.get('/logs', (req, res) => {
        console.log("Time is --- " + d)
        var i = 0;
        while (i < 10) {
                console.log("We made " + i + " --Iterations ----- find the Word RED HAMMER ");
                i++;
        }
        console.log("Times Pressed " + k)
        k++
        res.redirect("/")
})






