const Sequelize = require('sequelize');
const { STRING, BOOLEAN, UUID, UUIDV4 } = Sequelize;

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_car_sales_db')

const User = db.define('user',{
    id:{
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING
    }
})

const Car = db.define('car', {
    id:{
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING
    }
})

const Sale = db.define('sale', {
    id:{
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    extendedWarenty:{
        type: BOOLEAN,
        defaultValue: true,
    }
})


Sale.belongsTo(Car);
Sale.belongsTo(User);


const syncAndSeed = async () =>{
    try{
        await db.sync({ force : true });
        console.log('connected to db')
        const [moe, larry, lucy ] = await Promise.all(
            ['moe', 'larry', 'lucy'].map( name =>{
                return(User.create({ name: name }))
            }))
        
        const [ford, toyta, audi] = await Promise.all(
            ['ford', 'toyta', 'audi'].map( name =>{
                return(Car.create({name : name}))
            })
        )

        const sales = await Promise.all([
        Sale.create({userId: moe.id, carId: ford.id}),
        Sale.create({userId: moe.id, carId: audi.id}),
        Sale.create({userId: lucy.id, carId: audi.id}),
        Sale.create({userId: larry.id, carId: ford.id}),
        Sale.create({userId: larry.id, carId: toyta.id})
        ])
        }
    catch(err){
        console.log(err)
    }
}


module.exports = {
    syncAndSeed,
    db,
    models: {
        User,
        Car,
        Sale
    }
}