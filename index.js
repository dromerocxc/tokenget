var jwt = require('jsonwebtoken');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = 3000


async function getToken(peticion, respuesta){
    // Podemos acceder a la petición HTTP
    // SE REQUIERE POR PARTE DEL CLIENTE DETERMINAR DESDE DONDE SE LEE EL EXTERNAL_ID
    let agenteDeUsuario = peticion.header("user-agent");
    let SECRET = 'uNQEUqxaldxPY8NNWvENnSaKkN25wZw45H8PoFy1yLi45wM6DGLt2SxWbwtl_-Zz37WdUmfPImmTOIKigKVssA'
    let KEY_ID = 'app_64667c1c10224c827ee7e161'
    let datos =  {"scope": "user", "external_id": peticion.body.external_id}

    var token = jwt.sign(datos, SECRET, { header:  {kid: KEY_ID}  });
    console.log(peticion.body)
    console.log(token)
    respuesta.send("La ruta / solicitada con: " + agenteDeUsuario);
    return respuesta.end()
}



express()
  .use(express.static(path.join(__dirname + "/public")))
  .use(bodyParser.json())
  .post("/get-token", getToken)
  .listen(PORT, () => console.log("listening ossn port " + PORT));


