const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth');
const { check, validationResult } = require('express-validator/check');

const Product = require('../models/Product');


// @route     GET api/products
// @desc      Get all products
// @access    Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find().sort({
      date: -1
    })
    
    res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route     GET api/products/term
// @desc      filter products
// @access    Private
router.get('/:term', authMiddleware, async (req, res) => {
  const term = req.params.term
  try {
    const products = await Product.find({name:  new RegExp(term, "i")}).sort({
      date: -1
    })
    
    res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/products
// @desc      Add new products
// @access    Private
router.post(
  '/',
  [
    authMiddleware,
    [
      check('name', 'product name is required')
        .not()
        .isEmpty(),
      check('rate','product rate is required')
        .not()
        .isEmpty(),
      check('overpay','overpay is required')
      .not()
      .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, rate,overpay } = req.body;

    try {
      const newProduct = new Product({
        name,
        rate,
        overpay
      });

      const product = await newProduct.save();

      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/product/:id
// @desc      Update Product
// @access    Private
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, rate,overpay } = req.body;
console.log('hi')
  // Build contact object
  const productFields = {};
  if (name) productFields.name = name;
  if (rate) productFields.rate = rate;
  if (overpay) productFields.overpay = overpay;

  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );

    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/products/:id
// @desc      Delete product
// @access    Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let products = await Product.findById(req.params.id);

    if (!products) return res.status(404).json({ msg: 'Product not found' });

    await Product.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
