const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MongoDB schema (defines the structure of the data)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// Create a MongoDB model based on the schema
const User = mongoose.model('User', userSchema);

// You are now connected to the 'mydatabase' database and have a User model to work with.

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MongoDB schema (defines the structure of the data)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// Create a MongoDB model based on the schema
const User = mongoose.model('User', userSchema);

// You are now connected to the 'mydatabase' database and have a User model to work with.

// Find all users
User.find({}, (err, users) => {
  if (err) {
    console.error(err);
  } else {
    console.log('All users:', users);
  }
});

// Find users with a specific condition (e.g., age greater than 25)
User.find({ age: { $gt: 25 } }, (err, users) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Users older than 25:', users);
  }
});

// Update a user's age
User.updateOne({ name: 'John Doe' }, { $set: { age: 35 } }, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log('User updated successfully:', result);
  }
});
