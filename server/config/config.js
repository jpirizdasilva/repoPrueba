//===============================================
//   Puerto:
//===============================================
process.env.PORT = process.env.PORT || 3000;


//===============================================
//   Entorno:
//===============================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';




//===============================================
//   Base de datos:
//===============================================

// let urlDB
// if(process.env.NODE_ENV==='dev'){
//     urlDB = 'mongodb://localhost:27017/rapimercadoDB'
// }else{
    urlDB = 'mongodb+srv://adminrapimercado:algoRELOCO2020@rapimercado-118c2.mongodb.net/rapimercadoDB'
// }

process.env.URL_DB = urlDB