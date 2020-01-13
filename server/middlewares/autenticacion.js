const jwt = require('jsonwebtoken') 

let verificaToken = (req, res, next)=>{

   

    let token = req.get('token')

    console.log('semilla: ' , process.env.SEMILLA_TOKEN)

    jwt.verify(token, process.env.SEMILLA_TOKEN, (err, decoded)=>{

        if(err){
         
            return res.status(401).json({
                ok: false,
                err
            })
        }
        console.log('usuario encode: ', req.usuario)
        console.log('usuario decoded: ', decoded.usuario)
        //pasamos al request el usuario decodificado
        req.usuario = decoded.usuario

        next()

    })
}
module.exports= verificaToken