const express = require('express')
const router = express.Router()
const Farmer = require('../models/Farmer')
const Transaction = require('../models/Transaction')
const Product = require('../models/Product')
const {check, validationResult} = require('express-validator')
const authMiddleware = require('../middlewares/auth')

// api/farmer - POST
//Private
//add a farmer
router.post('/',authMiddleware,[
    check('name','Name field is required').not().isEmpty(),
    check('region','Region field is required').not().isEmpty(),
    check('contacts','Contacts field is required').not().isEmpty(),
],
async(req,res) => {
    const {name,region,contacts} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const farmer = new Farmer({name,region,contacts})
        await farmer.save()
        return res.status(200).json(farmer)

    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
    
})

// api/farmers/imprest/id - POST
//Private
//add a farmer imprest

router.post('/imprest/:id',authMiddleware,[
    check('item','Item field is required').not().isEmpty(),
    check('amount','Amount field is required').not().isEmpty(),
], 
async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {item,amount} = req.body 
    
    try {
        const farmer = await Farmer.findById(req.params.id)
        if(!farmer) {
            return res.status(404).json({msg: 'Farmer not found'})
        }
        const imprest = {
            item,
            amount,
            date: new Date().toDateString()
        }

        farmer.imprest.push(imprest)
        await farmer.save()
        res.status(200).json(imprest)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
    
})

// api/farmers/imprest - DELETE
//Private
//delete farmer imprest

router.delete('/imprest/:id/:imprest',authMiddleware, async(req,res) => {
    try {
        const farmer = await Farmer.findById(req.params.id)
    if(!farmer) {
        return res.status(404).json({msg: 'Farmer not found'})
    }
    const farmerImprest = farmer.imprest.filter(imp => imp._id != req.params.imprest)
    console.log(farmer.imprest,farmerImprest)
 
    farmer.imprest = farmerImprest
    await farmer.save()
    return res.status(200).json('Imprest deleted')
    } catch (error) {
        console.log(error)
    }
    
})

// api/farmers/imprest - PUT
//Private
//Update farmer imprest
router.put('/imprest/:id',authMiddleware, async(req,res) => {
    const {item,amount,id} = req.body
    
    try {
        console.log(req.params.id)
        let farmer = await Farmer.findById(req.params.id)
        if(!farmer) {
            return res.status(404).json({msg: 'Farmer does not exist'})
        }

        let farmerImprests = farmer.imprest.map(imp =>{
            if(imp._id == id){
                imp.item = item
                imp.amount = amount
            }
            return imp
        })

        let modifiedImprest = farmerImprests.find(imp => imp._id == id)
        farmer.imprest = farmerImprests
        await farmer.save()
        return res.status(200).json(modifiedImprest)
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
})


// api/farmer - GET
//Private
//fetch all farmers
router.get('/',authMiddleware, async(req,res) => {
    try {
        const farmers = await Farmer.find() 
        return res.status(200).json(farmers)
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
})

// api/farmer/:term - GET
//Private
//filter farmers
router.get('/:term',authMiddleware, async(req,res) => {
    try {
        const term = req.params.term
        const farmers = await Farmer.find({ $or: [{name:  new RegExp(term, "i")}, {region: new RegExp(term, "i")}]}).sort({
            date: -1
          })
        return res.json(farmers)
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
})

// api/farmer/:id - GET
//Private
//fetch specific farmer by id
router.get('/farmer/:id',authMiddleware, async(req,res) => {
    try {
        const farmer = await Farmer.findById(req.params.id).populate('advance').populate('transaction')
        return res.json(farmer)
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
})



// api/farmer/ - PUT
//Private
//Update a farmer
router.put('/:id', authMiddleware, async(req,res) => {
    const {name,imprest,region,products,payout} = req.body

    //build a farmer object
    const farmerFields = {}
    if(name) farmerFields.name = name
    if(imprest) farmerFields.imprest = imprest
    if(region) farmerFields.region = region
    if(products) farmerFields.products = products
    if(payout) farmerFields.payout = payout
    
    try {
        console.log(req.params.id)
        let farmer = await Farmer.findById(req.params.id)
        if(!farmer) {
            return res.status(404).json({msg: 'Farmer does not exist'})
        }
        farmer = await Farmer.findByIdAndUpdate(
            req.params.id,
            {$set: farmerFields},
            {new:true }
            )
        return res.json(farmer)
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
})

// api/farmer/:id - DELETE
//Private
//delete specific farmer by id
router.delete('/:id',authMiddleware, async(req,res) => {
    try {
        const farmer = await Farmer.findByIdAndDelete(req.params.id)
        if(!farmer){
            return res.status(404).json({msg:"Farmer not found"})
        }
        await Transaction.deleteMany({farmer: req.params.id})
        await Advance.deleteMany({farmer: req.params.id})
       
        res.json({msg: 'Farmer removed Successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
})

module.exports = router;