const express = require('express')
const app = express();

//agregamos todas las rutas a nuestro server
app.use(require('./usuario'))
app.use(require('./login'))


module.exports = app