const router = require('express').Router()
const passport = require('passport')

// login
router.get('/login', (req,res)=>{
    res.render('login')
})
// google
router.get('/google',passport.authenticate('google',{
    scope: ['profile']
}))
// logout
router.get('/logout', (req,res)=>{
    res.send('wylogowywanie')
})

module.exports = router