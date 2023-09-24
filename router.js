var express = require("express");
var router = express.Router();

const nocache = require('nocache');

router.use(nocache());

const credential = {
    email: "admin@gmail.com",
    password: "admin123"
}


router.post('/login', (req, res) => {
    // console.log(req.body)
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        // res.end('you have successfully loged in....');
    } else {
        res.end('invalid username or password');
    }
});

//router for logout
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                // console.log(err);
                res.send(err)
            } else {
                res.render('base', { title: 'Express', logout: 'logout successfully' })
            }
        })
    }
})


router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user })
    } else {
        // res.send('unauthorized user')
        res.redirect('/')
    }
})

module.exports = router;