const bcrypt = require("bcrypt");
const User = require("../models/User");
const Art = require("../models/Art");
const { generateJwtToken } = require("../utils");

exports.getUsers = async(req, res) => {
  try{
    const users = await User.find({});
    return res.status(200).json(users)
  }catch(err){
    return res.status(500).json({
        message: "Internal server error"
    })
 }
}

exports.signin = (req, res) => {
  const { email, password } = req.body
  User.findOne({ email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    
    if (user && bcrypt.compareSync(password, user.password)) {
      const { _id, email } = user;
      const token = generateJwtToken(_id, email);
      res.status(200).json({
            success: true,
            message: "Well come",
            user,
            token
          });
          
        } else {
          return res.status(400).json({ message: "Something went wrong" });
        }
      });
  };

exports.register = async(req, res) => { 
      const { 
        firstName,
        lastName,
        email,
        password
      } = req.body;

  try {
    User.findOne({ email }).exec(async (error, user) => {
      if (user) {
          return res.status(400).json({
              success: false,
              message: "Email already exists",
          });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const _user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

      _user.save( async(err, user) => {
        if (err) {
            return res.status(400).json({
                message: "Something went wrong",
                err
            });
        }

        if (user) {
          return res.status(201).json({
            success: true,
            message: "Registered successfully",
          });
        }
      });
      }
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrongs",
      error
    });
  }
}


exports.getFavoruites= async(req, res)=>{
  const { _id } = req.user
  const user = await User.findOne({ _id }).populate("favorites", {Art})
  console.log(user);
  if(user?.favorites){
    return res.status(200)
    .json({ 
      arts: user.favorites
    });
  }
  
}

exports.addToFavoruite = async(req, res) =>{
  const { _id } = req.user

  try {
    const { artId } = req.params;

    User.findOneAndUpdate(
      { _id },
      { $push: { favorites: artId } },
      { new: true },
      (err, user) => {
        if (err) {
          return res.status(500).json({ message: "Server error" });
        }
        
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        return res.status(200).json({ message: "Art added to favorites" });
      }
    );

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

exports.removeFromFavoruite=()=>{
  const { _id } = req.user
}