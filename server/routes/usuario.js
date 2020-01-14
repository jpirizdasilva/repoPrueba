const express = require('express')
const app = express();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario')
const _ = require('underscore')
const {verificaToken, verificaAdminRole} = require('../middlewares/autenticacion')

//---------------------------------------------------------------------------------------------------------
        //GET: 
/* Regresa los usuarios que esten con el campo estado: true, ya que implica que son los que se encuentran
activos para su uso, los que poseen estado:false se encuentran estado de borrado  */
//---------------------------------------------------------------------------------------------------------
app.get('/usuario', verificaToken, function (req, res) {

    let desde = req.query.desde || 0 ; //obtenemos el parametro del url
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);


    
    Usuario.find({ estado: true}, "nombre email img role estado google")
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios)=>{

                if(err){
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                Usuario.count({estado: true}, (err, contador)=>{

                    res.json({
                        ok: true,
                        usuarios,
                        registros: contador
                    })
                })
               
            })
});


//crear
app.post('/usuario',  function (req, res) {

    let body = req.body

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })


    usuario.save((err, usuarioDB)=>{
        
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
    

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })   
});


//actualizar
app.put('/usuario/:id', [verificaToken, verificaAdminRole], function (req, res) {

    let id = req.params.id  

    //filtramos los campos que queremos actualizar con la funcion pick del packete underscore
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']) 

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators:true,  context: 'query'},(err, usuarioDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }  

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    } )
   
});



//ELIMINAR UN USUARIO DE LA BBDD
app.delete('/usuario/:id', [verificaToken, verificaAdminRole], function (req, res) {
    
    let id = req.params.id  
    // Usuario.findByIdAndDelete(id, (err, usuarioBorrado)=>{

    let cambiaEstado = {
        estado:false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true, context: 'query'},(err, usuarioBorrado) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }  

        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                err: {      
                    message:  "El usuario no existe"
                }
            })
        } 
        
        res.json({
            ok: true,
            usuario: usuarioBorrado
        })

    } )
});

module.exports = app