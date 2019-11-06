const express = require('express')

const app = express();  
  
// Init Middleware  
app.use(express.json({ extended: false }));
   
//connect to DB  
require('./db')(app) 
 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/farmers',require('./routes/farmer'))
app.use('/api/products',require('./routes/product')) 
app.use('/api/transactions',require('./routes/transaction'))
app.use('/api/advances',require('./routes/advance'))   
  
       