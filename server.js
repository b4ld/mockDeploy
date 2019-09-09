
const express = require('express')
const request = require('request')
const app = express()
const bodyParser = require('body-parser');




const portt = 3999

app.use(express.json());
app.use(express.urlencoded())
app.use(express.static("public_index"));
app.listen(portt, () => console.log('App listening on portt ' + portt))


app.get('/test', (req, res) => {
        
        res.json({requestBody: req.body})
      
 })






