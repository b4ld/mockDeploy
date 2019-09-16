
const express = require('express')
const request = require('request')
const app = express()
const bodyParser = require('body-parser');
const os = require('os');
const portt = 3999

app.use(express.json());
app.use(express.urlencoded())
app.use(express.static("public_index")); // with path doesnt work, TEST:  doing a "/" on "/mock" and send the public_index on it path 
app.listen(portt, () => console.log('App listening on portt ' + portt))
var d = new Date();
var k = 1;

app.get('/mock', (req, res) => {
        console.log("Someone is trying to enter.....")
        res.redirect("/")
})

app.get('/logs', (req, res) => {
        var logsToSend = {
                "httpslogs":{
                        "ID": "mockdeploy",
                        "Version": "v5-stable",
                        "Status":"GOOD",
                        "Date": d,
                        "Btn Pressed ": k +" Times",
                        "Host": req.headers.host,
                },
                "systemlogs":{
                        "SHost":os.hostname(),
                        "Release":os.release(),
                        "CPUmain":os.cpus()[0],
                        "CPUtimes":os.cpus()[0].times,
                        "Free Mem":os.freemem(),
                }
        }
        console.log(logsToSend)
        k++
        res.redirect("/")
})






