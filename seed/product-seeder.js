var Product = require('../models/product');
const connectDB =  require('../config/db');

const dotEnv =  require('dotenv');
var mongoose = require('mongoose');

dotEnv.config({path: '../config/config.env'})


var products = [
    new Product({
        imagePath: '/img/1.png',
        title: 'Laptop1',
        price: 10000000 
    }),
    new Product({
        imagePath: '/img/2.png',
        title: 'Laptop2',
        price: 20000000
    }),
    new Product({
        imagePath: '/img/3.png',
        title: 'Laptop3',
        price: 30000000
    }),
    new Product({
        imagePath: '/img/4.png',
        title: 'Laptop4',
        price: 40000000
    }),
    new Product({
        imagePath: '/img/5.png',
        title: 'Laptop5',
        price: 50000000
    }),
    new Product({
        imagePath: '/img/6.png',
        title: 'Laptop6',
        price: 60000000
    }),
    new Product({
        imagePath: '/img/7.png',
        title: 'Laptop7',
        price: 70000000
    }),
    new Product({
        imagePath: '/img/8.png',
        title: 'Laptop8',
        price: 80000000
    }),
    new Product({
        imagePath: '/img/9.png',
        title: 'Laptop9',
        price: 90000000
    }),
]

var done = 0;
for(var i = 0; i < products.length; i++ ) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit1();
        }
    })
}

function exit1() {
    mongoose.disconnect()
}

connectDB();
