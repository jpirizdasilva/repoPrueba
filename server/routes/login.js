const express = require('express')
const app = express();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario')
const jwt = require('jsonwebtoken')


app.post('/login', (req, res)=>{

    let body = req.body

    Usuario.findOne({email: body.email}, (err, usuarioDB)=>{

        //ERROR
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //USUARIO NO EXISTE
        if(!usuarioDB){

            return res.status(400).json({
                ok: false,
                err:{
                    message: '(Usuario) o contraseña incorrectos'
                }
            })
        }

        //COMPARAR SI LAS CONTRASEÑAS NO COINCIDEN
        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
            
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Usuario o (contraseña) incorrectos'
                }
            })
        }

        console.log('semilla al crear: ' , process.env.SEMILLA_TOKEN)
        //GENERAMOS EL TOKEN CON LA DEPENDENCIA JSONWENTOKEN
        let token = jwt.sign({
            usuario: usuarioDB         
          }, process.env.SEMILLA_TOKEN , { expiresIn: process.env.CADUCIDAD_TOKEN});

        
        //DEVOLVEMOS LA RESPUESTA
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })

    })
})

module.exports = app