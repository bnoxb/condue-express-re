const router = require('express').Router();
const passport = require('passport');

router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        failureRedirect: '/',
        session: false,
    }),
        function(req, res) {
            console.log(req.user);
            res.redirect(`${process.env.FRONT_END_URL}?name=${req.user.name}&_id=${req.user._id}&email=${req.user.email}`);
        }
);

router.get('/logout', function(req,res){
    req.logout();
    res.redirect(`${process.env.FRONT_END_URL}/`);
});

module.exports = router;