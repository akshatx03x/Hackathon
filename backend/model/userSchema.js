const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    trim: true, 
    minlength: [3, 'Username must be at least 3 characters long.']
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    trim: true,
    lowercase: true, 
    match: [/.+\@.+\..+/, 'Please enter a valid email address.'] 
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
   
  },
  role: {
    type: String,
    enum: ['commutator', 'driver', 'admin'], 
    default: 'commutator' 
  }
}, {

  timestamps: true 
});


const User = mongoose.model('User', userSchema);

module.exports = User;