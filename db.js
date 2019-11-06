const mongoose = require('mongoose');
const {mongoURI} = require('./config/keys')

module.exports = (app) => {
  const port = process.env.PORT || 5000
 mongoose.connect(mongoURI,{useUnifiedTopology:true})
    .then(() => {
       app.listen(port, () => {   
     })
      })
    .catch(err => console.log(err)) 

   }
