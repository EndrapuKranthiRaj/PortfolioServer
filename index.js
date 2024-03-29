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
const crosConfig ={
    origin: ["https://kranthi-raj-portfolio.vercel.app"],  // for vercl use https://kranthi-raj-portfolio.vercel.app
    methods : ["POST","GET"],
    credentials: true
  }

  app.use(cors(crosConfig))
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


app.post('/projects/newproject', async (req, res) => {
  try {
    const allProjects = await UserModel.create(req.body);
    res.json(allProjects);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3001,()=>{
    console.log("Serer is Running.....")
})
module.exports = app;
