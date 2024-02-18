const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const  UserModel = require("./models/Users")
require('dotenv').config();
const DATABASE = process.env.DATABASE
const PASS = process.env.PASS


const app = express()
app.use(express.json())
//for cors start
  app.use(cors())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // '*' allows any origin, you can restrict it to specific origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
//for cors end


mongoose.connect(DATABASE)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/all_projects',async (req,res) =>{
    try {
      const allproject = await UserModel.find({})
      res.json(allproject);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
})

app.get('/projects/:id', async (req, res) => {
    try {
      const _id = req.params.id;
      const project = await UserModel.findById(_id);
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  //for simple athuntication
  app.get('/admin/:id', async (req, res) => {
    try {
      const id = req.params.id;
      res.json(id==PASS);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


app.post("/projects/newproject",(req,res)=>{
UserModel.create(req.body)
.then(allprojects => res.jsonn(allprojects))
.catch(err=> res.json(err))
})


app.listen(3001,()=>{
    console.log("Serer is Running.....")
})
module.exports = app;
