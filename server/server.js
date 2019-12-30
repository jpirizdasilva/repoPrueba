require('./config/config')

const express = require('express');
const app = express();
let bodyParser = require('body-parser')
 
 //utilizamos para obtener los datos de un form
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
// parse application/json
app.use(bodyParser.json())
//jwnecjwe

app.get('/usuario', function (req, res) {
    res.json('get usuario');
});

//crear
app.post('/usuario', function (req, res) {

    if(req.body.nombre===undefined){

        res.status(400).json({
            ok:false,
            mensaje:'El nombre es necesario'
        })

    }else{
        let data = req.body
        res.json(data); 
    }
   
});

//actualizar
app.put('/usuario/:id', function (req, res) {

    let id = req.params.id    
    res.json({id});
});

app.delete('/usuario', function (req, res) {
    res.json('delete usuario');
});

app.listen(process.env.PORT, function () {
    console.log(`Example app listening on port`, process.env.PORT);
});
