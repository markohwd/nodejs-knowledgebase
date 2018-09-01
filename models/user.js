let mongoose = require ('mongoose');

// article Schema
let UserSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
  email:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },

});

let User = module.exports = mongoose.model('User', UserSchema);
