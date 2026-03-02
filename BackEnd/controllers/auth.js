const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

async function registerUser(req,res){
  try {
    const {username, email, password} = req.body
    //check if user already exsists
    const existingUser = await User.findOne({email})
    if(existingUser) return res.status(400).json({message:"User Already Exists"})
    
    //hashing password
    const hashedPassword = await bcrypt.hash(password,10)
    const user = new User({username, email, password: hashedPassword})
    await user.save()

    //generating jwt
    const token = jwt.sign({id: user._id}, "SECRET_KEY", {expiresIn: "1h"})

    //send response
    res.status(200).json({
      message:"User Created Succesfully",
      token,
      user:{id: user._id, username: user.username, email: user.email}
    })
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

async function loginUser(req,res){
  try {
  const{email, password} = req.body
  const user = await User.findOne({email})

  if(!user) return res.status(400).json({message:'Invalid Credentials'})

  const isMatch = await bcrypt.compare(password,user.password)

  if(!isMatch) return res.status(400).json({message: 'Invalid Credentials'})
    
  const token = jwt.sign({id: user._id}, "SECRET_KEY", {expiresIn: "1h"})
  res.json({token, user:{id: user._id, username: user.username, email:user.email}})


  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = {registerUser, loginUser}