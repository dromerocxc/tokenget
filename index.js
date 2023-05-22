const express     = require('express');
const app         = express();
const path        = require("path");
const bodyParser  = require("body-parser");
var cors          = require('cors');
const PORT        = process.env.PORT
var jwt           = require('jsonwebtoken');
require("dotenv").config();
const courses = [{ id: 1, name: "Algorithms" },{ id: 2, name: "Software Engineering" },{ id: 3, name: "Human Computer" }];

app.get("/", function(req, res) {res.send(courses); });
app.use(bodyParser.json())

app.post("/get-token", function(peticion, respuesta) {
    //SECRET CON-INTEGRATION
    let SECRET = 'XOi-E3aAgHVIys7ns001Gbi6L-9Qy-uRuoxP49Cdagv7VbAw3wx3pi1AnAp1hgD-goc8-VXI8ZhaES6P5x6Tvg'
    let KEY_ID = 'app_646ba6392a1425548c511013'

    let datos =  {"scope": "user", "external_id": peticion.body.external_id}
    var token = jwt.sign(datos, SECRET, { header:  {kid: KEY_ID}  });
    console.log(peticion.body.external_id)
    return respuesta.send(JSON.stringify({ token }))
});

app.use(cors({credentials: true,origin: true}));
app.listen(process.env.PORT || 3000, function() {
    console.log(__dirname)
    console.log('server started at http://localhost on port ' + PORT, '');});




 
