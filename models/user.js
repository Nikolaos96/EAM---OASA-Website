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
	],
	
	
	
	grammes:[
		{	
			leoforeio: String, afetiria: String, af_lat: Number, af_lng: Number, stasi1:  String,
			s1_lat: Number , s1_lng: Number, stasi2:  String, s2_lat: Number , s2_lng: Number, stasi3:  String,
			stasi4:  String,stasi5:  String,stasi6:  String,stasi7:  String,stasi8:  String, stasi9:  String,stasi10: String,
			terma:   String, arxizei: String, teleiwnei: String, epomeno: String
		}
	]
	
	
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);


module.exports = User;