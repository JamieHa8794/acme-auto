const { models :{ User, Car, Sale} } = require('../db/index')
const router = require('express').Router();



router.get('/users', async (req, res, next)=>{
    try{
        const Users = await User.findAll();
        res.send(Users);
    }
    catch(err){
        next(err)
    }
})

router.get('/cars', async (req, res, next)=>{
    try{
        const Cars = await Car.findAll();
        res.send(Cars);
    }
    catch(err){
        next(err)
    }
})

router.get('/users/:id/sales', async (req, res, next)=>{
    try{
        const Sales = await Sale.findAll({
            where:{
                userId: req.params.id
            },
            include:[
                Car
            ]
        });
        res.send(Sales);
    }
    catch(err){
        next(err)
    }
})


module.exports = router;