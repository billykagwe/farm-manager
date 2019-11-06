const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { check, validationResult } = require('express-validator');

const Product = require('../models/Product');
const Farmer = require('../models/Farmer');
const Advance = require('../models/Advance');

// @route     GET api/advances
// @desc      Get all advances
// @access    Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const advances = await Advance.find().populate('farmer').sort({
      date: -1
    });
    res.status(200).json(advances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/date/:date', authMiddleware, async (req, res) => {
  console.log(req.params.date)
  const date = new Date(req.params.date)
  date.setHours(0,0,0,0)
  const endDate = new Date(date).setHours(23,59,59,59)
  const options = {
    $lt:endDate,
    $gte:date
  }
  try {
    const advances = await Advance.find({createdAt: options}).populate('farmer');
    console.log(advances)
    res.status(200).json(advances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/advances/:farmerId
// @desc      Get all advances By a farmer
// @access    Private
router.get('/:farmerId', authMiddleware, async (req, res) => {
    try {
      const advances = await Advance.find({farmer:req.params.farmerId}).sort({
        date: -1
      });
      res.status(200).json(advances);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route     POST api/advance
// @desc      Add new advance
// @access    Private
router.post(
  '/',
  [
    authMiddleware,
    [
      check('farmerId', 'farmer is required')
        .not()
        .isEmpty(),
     check('item', 'Item is required') 
        .not()
        .isEmpty(),
    check('amount', 'amount is required')
        .not()
        .isEmpty(),
     check('deadline', 'deadline is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { farmerId, item, amount, deadline } = req.body;

    try {
        const farmer = await Farmer.findById(farmerId)
        
        if(deadline < Date.now()){
            return res.status(400).json({ msg: 'Date has to be in the future' })
        }

        if(!farmer){
            return res.status(400).json({ msg: 'Farmer does not exist' })
        }
      
        
      const newAdvance = new Advance({
        farmer: farmerId,
        item,
        amount,
        deadline
      });

      
      farmer.advance.push(newAdvance)

      await newAdvance.save()
      await farmer.save()
      res.status(200).json(newAdvance)
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/transaction/:id
// @desc      Update transaction
// @access    Private
router.put('/:id', authMiddleware, async (req, res) => {
  const { deadline,amount } = req.body;
  if(deadline && deadline < Date.now()){
    return res.status(400).json({ msg: 'Date has to be in the future' })
}
  
  try {
  
    // Build contact object
    const advanceFields = {};
    if (amount) advanceFields.amount = amount;
    if (deadline) advanceFields.deadline = deadline;
  
    let advance = await Advance.findById(req.params.id);

    if (!advance) return res.status(404).json({ msg: 'Advance not found' });

    advance = await Advance.findByIdAndUpdate(
      req.params.id,
      { $set: advanceFields },
      { new: true }
    );

    res.status(200).json(advance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  } 
});

// @route     DELETE api/advances/:id
// @desc      Delete advance
// @access    Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let advance = await Advance.findByIdAndRemove(req.params.id);

    if (!advance) return res.status(404).json({ msg: 'Advance not found' });

    const farmer = await Farmer.findById(advance.farmer)
    let filteredAdvance = farmer.advance.filter(advance => advance !== req.params.id)
    farmer.advance = filteredAdvance
    await farmer.save()

    res.json({ msg: 'Advance removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
