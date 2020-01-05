const router = require('express').Router()

// login
router.get('/login', (req,res)=>{
    res.render('login')
})
// google
router.get('/google', (req,res)=>{
    res.send('logowanie za pomocą google')
})
// logout
router.get('/logout', (req,res)=>{
    res.send('wylogowywanie')
})

module.exports = router