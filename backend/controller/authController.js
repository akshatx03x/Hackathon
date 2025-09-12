const user = require('../model/userSchema.js'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 


const registerUser = async (req, res) => {
  try {
 
    const { username, email, password, role } = req.body;

    
    const checkExistingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please try with another username or email."
      });
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    
    await newlyCreatedUser.save();

  
    if (newlyCreatedUser) {
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: {
          username: newlyCreatedUser.username,
          email: newlyCreatedUser.email,
          role: newlyCreatedUser.role,
        },
      });
    } else {
 
      res.status(400).json({
        success: false,
        message: 'User registration failed'
      });
    }
  } catch (e) {
   
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
};




const loginUser = async (req, res) => {
  try {
   
    const { username, password } = req.body;

 
    const user = await User.findOne({ username });

   
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid User"
      });
    }

   
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
     
      return res.status(400).json({
        success: false,
        message: "Invalid Username or Password"
      });
    }

 
    const accessToken = jwt.sign({
      userId: user._id,
      username: user.username,
      role: user.role
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: '2h' 
    });

   
    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      accessToken
    });

  } catch (e) {
   
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
};

module.exports = { registerUser, loginUser };