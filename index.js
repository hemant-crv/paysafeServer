const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config.js');
const paySafeCheckout = require('./routes/paySafeCheckout');

mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', paySafeCheckout);

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});