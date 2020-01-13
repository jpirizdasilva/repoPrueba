//NOTA: PARA ESTE PROYECTO SE DEBE CONFIGURAR LAS VARIABLES DE ENTORNO PERSONALIZADAS

//===============================================
//   Puerto:
//===============================================
process.env.PORT = process.env.PORT || 3000;


//===============================================
//   Entorno:
//===============================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//===============================================
//   VENCIMIENTO DEL TOKEN
//===============================================

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30 


//===============================================
//   SEED - SEMILLA DE AUTENTICACION
//===============================================

process.env.SEMILLA_TOKEN  =  process.env.SEMILLA_TOKEN || 'secret'


//===============================================
//   Base de datos:
//===============================================

let urlDB
if(process.env.NODE_ENV==='dev'){
    urlDB = 'mongodb://localhost:27017/rapimercadoDB'
}else{
    urlDB = process.env.MONGO_URI
}

process.env.URL_DB = urlDB