const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { check, validationResult } = require('express-validator/check');

const Product = require('../models/Product');
const Farmer = require('../models/Farmer');
const Transaction = require('../models/Transaction');

// @route     GET api/transactions
// @desc      Get all transactions
// @access    Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('farmer').sort({
      date: -1
    });
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err.message); 
    res.status(500).send('Server Error');
  }
});

// @route     GET api/transactions/:farmerId
// @desc      Get all transactions By a farmer
// @access    Private
router.get('/filter/:id', authMiddleware, async (req, res) => {
    try {
      const transactions = await Transaction.find({farmer:req.params.id}).sort({
        date: -1
      });
      res.status(200).json(transactions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route     GET api/transactions/:farmerId
// @desc      Get all transactions By a farmer
// @access    Private
router.get('/date/:date', authMiddleware, async (req, res) => {
  const date = new Date(req.params.date)
  date.setHours(0,0,0,0)
  const endDate = new Date(date).setHours(23,59,59,59)
  const options = {
    $lt:endDate,
    $gte:date
  }
  try {
    const transactions = await Transaction.find({
      createdAt: options
    }).populate('farmer').sort({
      date: -1
    });
    console.log(transactions)
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/transaction
// @desc      Add new transaction
// @access    Private
router.post(
  '/',
  [
    authMiddleware,
    [
      check('farmer', 'farmer is required')
        .not()
        .isEmpty(),
     check('product', 'product is required')
        .not()
        .isEmpty(),
     check('weight', 'weight is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { farmer, product, weight} = req.body;

    try {
        const farmerExists = await Farmer.findById(farmer)
        const productExists = await Product.findById(product)

        if(!farmerExists){
            return res.status(400).json({ msg: 'Farmer does not exist' })
        }
        if(!productExists){
            return res.status(400).json({ msg: 'Product does not exist' })
        }
      const total = weight * productExists.rate

      const newTransaction = new Transaction({
        farmer,
        product: productExists.name,
        rate: productExists.rate,
        weight,
        total
      });

      const transaction = await newTransaction.save()
      farmerExists.transaction.push(transaction._id)
      await farmerExists.save()
    
      res.status(200).json(transaction);
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
  const {weight,productId} = req.body;
  console.log(req.body)
  try {
    let transaction = await Transaction.findById(req.params.id);
    let product = await Product.findById(productId);

    if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    // Build contact object
    const transactionFields = {};
  
    if (weight || product) {
      transactionFields.weight = weight
      transactionFields.product = product.name
      transactionFields.total = weight * product.rate
    };
  
    let newTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: transactionFields },
      { new: true }
    )
      console.log("__",newTransaction)
    console.log(newTransaction)
    res.status(200).json(newTransaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/transactions/:id
// @desc      Delete transaction
// @access    Private
router.delete('/:id/:farmer', authMiddleware, async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });

    const farmer = await Farmer.findById(req.params.farmer)

    let transactionIndex = farmer.transaction.findIndex(transaction => transaction == req.params.id )
    farmer.transaction.splice(transactionIndex,1)
    await farmer.save()

    await Transaction.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
