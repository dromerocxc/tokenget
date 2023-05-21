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
    /*let SECRET = 'uNQEUqxaldxPY8NNWvENnSaKkN25wZw45H8PoFy1yLi45wM6DGLt2SxWbwtl_-Zz37WdUmfPImmTOIKigKVssA'
    let KEY_ID = 'app_64667c1c10224c827ee7e161'
    let datos =  {"scope": "user", "external_id": peticion.body.external_id}
    var token = jwt.sign(datos, SECRET, { header:  {kid: KEY_ID}  });*/
    console.log(peticion.body.external_id)
    return respuesta.send(peticion.body)
});

app.use(cors({credentials: true,origin: true}));
app.listen(process.env.PORT || 3000, function() {
    console.log(__dirname)
    console.log('server started at http://localhost on port ' + PORT, '');});




