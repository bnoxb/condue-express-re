const express   = require('express');
const router    = express.Router();
const User      = require('../models/AuthSchema');
const bcrypt    = require('bcryptjs');


// a get route to pass req.session over
router.get('/', async (req,res)=>{
    try{
        if(req.session.logged){
            res.json({
                data: req.session,
            })
        }else {
            res.json({
                data: "not logged in",
            })
        }
        
    }catch(err){
        console.log(err);
    }
})

// check credentials
router.post('/login', async (req,res)=>{
    try{
        const foundUser = await User.findOne({'username': req.body.username});
        if(!foundUser){
            res.json({
                status: 401,
                data: "login unsuccessful",
            })
        }
        const valid = bcrypt.compareSync(req.body.password, foundUser.password);

        if(valid) {

            req.session.logged = true;
            req.session.username = foundUser.username;

            res.json({
                status: 200,
                data: "login successful",
            });
            console.log(req.session);
        } else {
            res.json({
                status: 401,
                data: "login unsuccessful",
            })
        }

    }catch(err){
        console.log(err);
    }
})

// make new admin
router.post('/register', async (req,res)=>{
    try{
        const hashedPass = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hashedPass;

        const user = await User.create(req.body);

        req.session.logged = true;
        req.session.username = req.body.username;

        res.json({
            status: 200,
            data: 'login successful',
        });
        console.log(req.session);
    }catch(err){
        console.log(err);
        res.json({
            status: err.code,
            data: 'login unsuccessful'
        })
    }
})

module.exports = router;