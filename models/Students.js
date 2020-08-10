var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
  rollno:Number,
  name: String,
  address: String,
  department: String,
  aadhaar: Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', StudentSchema);
