const {syncAndSeed, db, models :{ User, Car, Sale} } = require('./db/index')

const express = require('express');
const app = express();



app.get('/api/users', async (req, res, next)=>{
    try{
        const Users = await User.findAll();
        res.send(Users);
    }
    catch(err){
        next(err)
    }
})

app.get('/api/cars', async (req, res, next)=>{
    try{
        const Cars = await Car.findAll();
        res.send(Cars);
    }
    catch(err){
        next(err)
    }
})

app.get('/api/sales', async (req, res, next)=>{
    try{
        const Sales = await Sale.findAll();
        res.send(Sales);
    }
    catch(err){
        next(err)
    }
})

const init = () =>{
    try{
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`))
        syncAndSeed();
    }
    catch(err){
        console.log(err)
    }
}

init();