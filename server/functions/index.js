const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin")
require('dotenv').config()


const serviceAccountKey = require('./serviceAccountKey.json')
const express = require('express')
const app = express();

//body parser for our JSON data
app.use(express.json());

//cross origin
const cors = require('cors');
app.use(cors({origin : true}));
app.use((req,res,next) =>{
    res.set("Access-Control-Allow-Origin","*");
    next();
});

//firebase credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
  });

  //api endpoint
  app.get("/",(req,res) =>{
    return res.send("Hello world");
  })

  const userRoute = require("./routes/user");
  app.use("/api/users",userRoute);

  const productRoute = require("./routes/Products");
  app.use("/api/Products",productRoute);

  
  

  exports.app=functions.https.onRequest(app);