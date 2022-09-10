const {syncAndSeed, db, models :{ User, Car, Sale} } = require('./db/index')
const router = require('./api/index');

const express = require('express');
const app = express();

app.use('/api', require('./api'))




const init = () =>{
    try{
        syncAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`))
    }
    catch(err){
        console.log(err)
    }
}

init();