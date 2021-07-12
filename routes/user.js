  
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userRouter = express.Router();
const User = require("../models/user");

router.post('/saveUser', (req, res) => {
  const email = req.body;
  User.findOne({email}, (err, user) => {
      if(err) {
        console.log(err)
          res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
      }
      if(user) {
          res.status(400).json({message: {msgBody: "email is already taken", msgError: true}})
      }
      else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            First_Name: req.body.First_Name,
            Last_Name: req.body.Last_Name,              
            email: req.body.email,
            City:req.body.City,
          });
          user
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json({
                message: "User created"
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
        }
      });
    })

router.get('/getAllUser',(req, res, next)=>
{
    User.find()
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            stats: docs.map(doc =>{
                return {
                    _id:doc.id,
                    First_Name: doc.First_Name,
                    Last_Name: doc.Last_Name,              
                    email: doc.email,
                    City:doc.City,
                }
            })
        }
        console.log(docs)
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})
      

router.get("getAUser/:userId", (req, res, next)=>
{
    const id = req.params.userId;
    Profile.findById(id)
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            product: doc
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });


module.exports = router;