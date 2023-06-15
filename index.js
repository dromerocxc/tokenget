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
const { Client } = require('node-scp')

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


app.get('/filetest', async(req, res) => {
//console.log(Client);
Client({
  host: '167.71.59.4',
  port: 22,
  username: 'integration',
  password: '**Ped2023CxC**',
  // privateKey: fs.readFileSync('./key.pem'),
  // passphrase: 'your key passphrase',
}).then(client => {
  client.uploadFile(
    './sesion.txt',
    '/home/integration/sesion.txt',
    // options?: TransferOptions
  )
        .then(response => {
            console.log('Listo')
          client.close() // remember to close connection after you finish
          res.send('Listo')
        })
        .catch(error => {})
}).catch(e => console.log(e))
})

app.use(cors({credentials: true,origin: true}));
app.listen(process.env.PORT || 3000, function() {
    console.log(__dirname)
    console.log('server started at http://localhost on port ' + PORT, '');});




 
