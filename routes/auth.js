const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../config/keys')
const authMiddleware = require('../middlewares/auth')

const User = require('../models/User')

//Route: /api/auth
//Access: Private
//Desc: get loggedin user
router.get('/',authMiddleware, async(req,res,next) => {
    try {
        const user = await User.findById(req.user)
    return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server error')
    }
    
})

//Route: /api/auth/login
//Access: Public
//Desc: login user
router.post('/login',[
    check('email').isEmail(),
    check('password').isString()
], async(req,res,next) => {
    const {email,password} = req.body
    //check for errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg: errors.array()})
    }

    try{
    //check whether the user exists
    const user = await User.findOne({email})
    if(!user) {
        return res.status(400).json({errors: 'Invalid Credentials'})
    }

    //check password 
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) {
        return res.status(400).json({msg: 'Invalid Credentials'})
    }
    //sign token
    const payload = {
        id: user.id
    }
    jwt.sign(payload,jwtSecret, {
        expiresIn: '1h'
    }, (err,token) => {
        if(err) throw err;
        res.status(200).json({token})
    })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})

//Route: /api/auth/register
//Access: Public
//Desc: Register/Create user
router.post('/register',[
    check('email','Enter a valid email').isEmail(),
    check('password').isLength({min:5}),
    check('confirmPassword').not().isEmpty()
], 
async (req,res,next) => {
    const {email,password,confirmPassword} = req.body;
    // check for errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg: errors.array()})
    }

    //check whether passwords match
    if(password !== confirmPassword) {
        return res.status(400).json({msg: 'Passwords must match'})
    }

    try {
        //check whether user exists
    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({msg: 'User with this email already exists'})
    }

    //generate hash password
    const hashedPassword = await bcrypt.hash(password,10)

    //create new user
    const newUser = new User({
        email,
        password: hashedPassword
    })

    //save user
    await newUser.save()

    //sign token
    const payload = {
        id: newUser._id
    }
    jwt.sign(payload,jwtSecret, {
        expiresIn: '1h'
    }, (err,token) => {
        if(err) throw err;
        res.status(200).json({token})
    })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
    
})

module.exports = router;