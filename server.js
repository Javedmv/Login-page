const express = require('express');
const path = require('path')
const bodyparser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const router = require('./router')

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
//to bring static files to the page
app.use(express.static('public'));

app.use(session({
    secret: uuidv4(),     //hashvalue used the uuid meathod will make session completely secret
    resave: false,
    saveUninitialized: true
}));
app.use('/route', router)

// home route   
app.get('/', (req, res) => {
    res.render('base', { title: 'Welcome Login' });
});


app.listen(port, () => { console.log('listening to server') });





// const app = require('server.js');
// const fs = require('fs');