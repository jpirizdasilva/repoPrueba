//=======================================================================
// MIDDLEWARE PARA VERIFICAR TOKEN
//=======================================================================

const jwt = require('jsonwebtoken') 

let verificaToken = (req, res, next)=>{   

    let token = req.get('token')

    jwt.verify(token, process.env.SEMILLA_TOKEN, (err, decoded)=>{

        if(err){
         
            return res.status(401).json({
                ok: false,
                err
            })
        }
        
        //pasamos al request el usuario decodificado
        req.usuario = decoded.usuario

        next()

    })
}



//=======================================================================
// MIDDLEWARE PARA VERIFICAR ROL DE ADMINISTRADOR
//=======================================================================

let verificaAdminRole = (req, res, next)=>{

    let usuario = req.usuario

    if(usuario.role==='ADMIN_ROLE'){
        next()
    }else{
        return res.json({
            ok: false,
            message:'El usuario no es administrador'
        })
    }
}

module.exports= {verificaToken, verificaAdminRole}
