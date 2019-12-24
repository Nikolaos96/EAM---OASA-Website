var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	password_again: String,
	firstName: String,
	lastName: String,
	email: String,
	
	address: 	 String,
	postal_code: String,
	
	phone: Number,
	AFM:	Number,
	image: String,
	
	tickets :[	// edw einai oi epanafortiseis kartas
		{ ticket: String, posotita: Number, cost: Number, date: String }
	],
	
	tickets2:[	// edw oi agores eisitiriwn
		{ticket: String, posotita: Number, cost: Number, date: String, paralavi: String}
	]
	
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);


module.exports = User;