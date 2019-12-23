var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	password_again: String,
	firstName: String,
	lastName: String,
	email: String,
	phone: Number,
	AFM:	Number,
	image: String,
	
	tickets :[
		{ ticket: String, posotita: Number, cost: Number, date: String }
	]
	
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);


module.exports = User;