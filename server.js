
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
                "httpslogs": {
                        "ID": "mockdeploy",
                        "Version": "v5 NOTstable",
                        "Status": "BAD",
                        "Date": d,
                        "Btn Pressed ": k + " Times",
                        "Host": req.headers.host,
                },
                "systemlogs": {
                        "SHost": os.hostname(),
                        "Release": os.release(),
                        "CPUmain": os.cpus()[0],
                        "CPUtimes": os.cpus()[0].times,
                        "Free Mem": os.freemem(),
                }
        }
        console.log(logsToSend)
        k++
        res.redirect("/")
})

var metadata = ""
var ipv4 = ""
var creds = ""
var creds2 = ""
var nodename = ""
var profid = ""

app.get('/host', (req, res) => {
        var logsToSend = {
                "systemlogs": {
                        "SHost": os.hostname(),
                }
        }

        request('http://169.254.169.254/latest/meta-data/public-ipv4', { json: true }, (err, res, body) => {
                if (err) { return console.log(err); }
                // console.log(body.url);
                ipv4 = body;
        });

        var html = `<!DOCTYPE HTML>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css?family=Noticia+Text|Noto+Sans+JP&display=swap" rel="stylesheet">

  <style>

    body {
      background-color: red;
      margin: 0;
      padding: 0;
    }

    .ab {
      font-family: 'Noto Sans JP', sans-serif;
      text-align: center;
      font-size: 25px;
      margin-top: 0px;
      padding-top: 10px;
    }
    .abc {
      font-family: 'Noto Sans JP', sans-serif;
      text-align: center;
      font-size: 20px;
      margin-top: 0px;
      padding-top: 10px;
      color: greenyellow;
    }
    .abcd {
      font-family: 'Noto Sans JP', sans-serif;
      text-align: center;
      font-size: 20px;
      margin-top: 0px;
      padding-top: 10px;
    }

    .divtitle {
      background: url("vdf.png") no-repeat;
      background-size: cover;
      /* border: 1px black solid; */
      height: 100vh;
      width: 100%;
      display: block;
    }

    .myButton1 {
      background-image: url("vdficon.png");
      background-repeat: no-repeat;
      /* Do not repeat the image */
      background-size: center;
      width: 100px;
      height: 100px;
      background-color: transparent;
      position: relative;
      border: none;
      left: calc(50% - 50px);
      -moz-border-radius: 10px;
      -webkit-border-radius: 10px;
      margin-top: 10px;
    }

    .myButton1:hover {
      outline: none;
      cursor: pointer;
    }

    .myButton1:active {
      position: relative;
      top: 2px;
      left: calc(50% - 48px);
    }

    .lab {
      text-align: center;
      margin-top: -10px;
      font-family: 'Noticia Text', serif;
    }
    #iderror{
      text-align: center;
      background-color: blue
    }
  </style>


</head>

<body>
  <div class="divtitle">

    <h1 class="ab">MOCK DEPLOY</h1>
    <h3 class="abcd">HOST VERSION</h3>
    <h3 class="abcd">
      Got to "/host" to see the host with OS 
    </h3>
    <h3 class="abcd">
    OS Host: 
    `+ logsToSend.systemlogs.SHost + `
    </h3>

    <div class="abcd" id="hostname"></div>   
<script>
  document.getElementById("hostname").innerHTML =
  "Page hostname is:  " + window.location.hostname;
</script>
<div>
  <h1 class="abcd">POD DATA</h1>
  <h2 class="abcd">IP `+ ipv4 + `</h2>
</div>
    <form action="/logs" method="GET">
      <button class="myButton1" name="Name" value="logs"></button>
      <h3 class="lab">PRESS TO SEND LOGS</h3>
    </form>
  </div>
</body>

</html> 

`
        res.send(html)
})








