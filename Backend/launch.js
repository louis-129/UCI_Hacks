require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const router = require('./routes/routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

const coreOptions = {
  origin: '*',
  credentials:true,
  optionSuccessStatus: 200

}

app.use(cors(coreOptions));
app.use('/',router)

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
  });

const dbOptions = {useNewUrlParser:true, useUnifiedTopology:true}
mongoose.connect(process.env.ATLAS_KEY, dbOptions)
.then(()=>console.log("Datebase is connected!"))
.catch(err=>console.log(err))
   
     
const server = app.listen(process.env.PORT,()=>{
  console.log("Server is running on port 3000")
})


    