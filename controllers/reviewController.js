const express   = require('express');
const router    = express.Router();
const Reviews = require('../models/ReviewSchema');

router.get('/', async (req,res)=>{
    try{
        const reviews = await Reviews.find({});
        res.json({
            status: 200,
            data: reviews,
        })
    }catch(err){
        console.log(err);
    }
});

router.post('/', async (req,res)=>{
    try{
        const createdReview = await Reviews.create(req.body);
        res.json({
            status: 200,
            data: createdReview,
        })
    }catch(err){
        console.log(err);
    }
})

module.exports = router;