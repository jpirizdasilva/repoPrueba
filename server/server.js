require('./config/config')
const express = require('express')
const app = express();


const mongoose = require('mongoose')
let bodyParser = require('body-parser')
 
 //utilizamos para obtener los datos de un form
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
// parse application/json
app.use(bodyParser.json())


app.use(require('./routes/usuario'))


mongoose.connect(process.env.URL_DB,
 {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }, (err, res)=>{

    if(err) throw err;

    console.log("base de datos ONLINE!!")
})

app.listen(process.env.PORT, function () {
    console.log(`Example app listening on port`, process.env.PORT);
});
