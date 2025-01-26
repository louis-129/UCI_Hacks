require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const router = require('./routes/routes')
const session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,  
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(session({
  secret: 'AHBBD582629HVKUGVCIU', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 3600000 } // Use secure: true in production with HTTPS
}));

app.use('/', router);
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


    