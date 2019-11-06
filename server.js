const express = require('express')

const app = express()
const path = require('path');
  
// Init Middleware  
app.use(express.json({ extended: false }));
   
//connect to DB  
require('./db')(app) 
 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/farmers',require('./routes/farmer'))
app.use('/api/products',require('./routes/product')) 
app.use('/api/transactions',require('./routes/transaction'))
app.use('/api/advances',require('./routes/advance'))   
  
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }