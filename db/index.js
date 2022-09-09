const Sequelize = require('sequelize');
const { STRING, BOOLEAN } = Sequelize;

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_car_sales_db')

