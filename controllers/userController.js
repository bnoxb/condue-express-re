const express   = require('express');
const router    = express.Router();
const User      = require('../models/UserSchema');

router.get('/', async (req,res)=>{
    try{
        const users = User.find({});
        res.json({
            data: users,
        });
    }catch(err){
        console.log(err);
    }
})

module.exports = router;