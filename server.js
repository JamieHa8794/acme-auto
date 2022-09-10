const {syncAndSeed, db, models :{ User, Car, Sale} } = require('./db/index')
const router = require('./api/index');

const express = require('express');
const app = express();

const path = require('path')

app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use('/public', express.static(path.join(__dirname, 'public')))


app.use('/api', require('./api'))

app.get('/', (req, res, next)=>{
    try{
        res.sendFile(path.join(__dirname,'index.html'))
    }
    catch(err){
        next(err)
    }
})


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