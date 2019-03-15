const express = require('express');
const {router} = require('./router/index');
const error_handler = require('./utils/errorHandler');
require('./db/mongoose');


const app = express();
app.use(express.json());

// app.use((req, res, next) => {
//         console.log('Query is passing');
//         next();
//         //next(new Error('TEst error'));
//     },
//     (req, res, next) => {
//         console.log('Middleware 2');
//         next();
//     },
//     (req, res, next) => {
//         console.log('Middleware 3');
//         next();
//     });

app.use(router);
app.use(error_handler);

app.listen(3000,  () => {
    console.log('Example app listening on port 3000!');
});
