const express     = require('express');
const app         = express();
const path        = require("path");
const bodyParser  = require("body-parser");
var cors          = require('cors');
const PORT        = process.env.PORT
var jwt           = require('jsonwebtoken');
require("dotenv").config();
const courses = [{ id: 1, name: "Algorithms" },{ id: 2, name: "Software Engineering" },{ id: 3, name: "Human Computer" }];

var client = require('scp2')
var fs = require('fs');




app.get("/", function(req, res) {res.send(courses); });
app.use(bodyParser.json())

app.post("/get-token", function(peticion, respuesta) {
    //SECRET CON-INTEGRATION
    let SECRET = '0hC69Rhgk5pvDH_cZf6bBPthC4CgkOddDMATmiHy6wMuk1UA9yAV1jQRW1lpZDaIRkM6U7-SAmulTk8CA0Qllw'
    let KEY_ID = 'app_6470dbd0ebec40dd8e79d04c'

    let datos =  {"scope": "user", "external_id": peticion.body.external_id}
    var token = jwt.sign(datos, SECRET, { header:  {kid: KEY_ID}  });
    console.log(peticion.body.external_id)
    return respuesta.send(JSON.stringify({ token }))
});


app.get('/filestools', async(req, res) => {

const fecha = new Date();

let datos ={  host: '167.71.59.4',
    username: 'root',
    password: 'TeY7y4qKTCFWNu@@6P',
    path: '/home/integration/',
    port: 22
}

  console.log('Voy ' + fecha)

  client.scp('./test.js', datos, 
  function(err) {
  console.log(err)
  console.log('test.js');
  console.log("files uploaded in remote server");
  res.json({error_code:0,err_desc:null});
  })



/*let archivos = fs.readdir('./', function (err, archivos) {
    if (err) {
        onError(err);
    return;
    }
    console.log(archivos);
    return archivos;
    });

  res.send(archivos)*/

})


app.use(cors({credentials: true,origin: true}));
app.listen(process.env.PORT || 3000, function() {
    console.log(__dirname)
    console.log('server started at http://localhost on port ' + PORT, '');});




 
