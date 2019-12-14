var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var app = express();

mongoose.connect("mongodb://localhost/auctions_db", { useNewUrlParser: true } );





var User = require("./models/user.js");






//var ChatStuff = require("./models/chat.js");
//var Auction = require("./models/auction.js");
//var Bid = require("./models/bid.js");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var passportLocalMongoose = require("passport-local-mongoose");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var https = require('https');
var fs = require('fs');
var dateFormat = require('dateformat');
var request=require('request');
var findOrCreate = require('mongoose-find-or-create');
var ObjectId = require('mongodb').ObjectID;
var path = require('path');



// =========================================
var privateKey  = fs.readFileSync("./openssl/key.pem", 'utf8');//ssl
var certificate = fs.readFileSync("./openssl/cert.pem", 'utf8');
var credentials = {key: privateKey, cert: certificate};


app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use(methodOverride("_method"));			/////////////////////////////

app.use(require("express-session")({
	secret: "i worth a lot!!!",
	resave: false,
	saveUninitialized: false,
}));





app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});



//============================================
app.use(express.static("public"));  // tell express to serve the public dir

// clearing browser cache (pushing the back button after logout will now redirect to login page)
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});




// ROUTES
app.get("/index", function(req, res) {
	res.render("index.ejs");
});



app.get("/", function(req, res) {
	res.render("home.ejs", {currentUser : req.user});
});



app.get("/back", function(req, res) {
	res.redirect("back");
});







// sign up routes
app.get("/register", function(req, res) {
	res.render("register.ejs");
});

app.post("/register", function(req, res) {
	/*
	if(req.body.password !== req.body.password_again){
		//console.log("Ta password me to password_again einai diaforetika");
		return res.render("user_exists.ejs");
	}
	*/


	var newUser = new User({username: req.body.username,
							password_again: req.body.password_again,

							firstName: req.body.firstName,
							lastName: req.body.lastName,
							email: req.body.email,
							phone: req.body.phone,
							AFM:	req.body.AFM,
							image:	req.body.image
	});

	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			console.log("error is: " + err);
			res.render("register.ejs");
		}
		passport.authenticate("local")(req, res , function() { 	
			res.redirect("/");												
		});
	});
});







// login routes
app.get("/login", function(req, res) {
	res.render("login.ejs", { currentUser: req.user });
});



app.post("/login", passport.authenticate("local", {
	failureRedirect:"/login",
	successRedirect: "/"
	
}), function(req, res, next) {
	
});



// logout route
app.get("/logout", function(req ,res) {
	req.logout();
	res.redirect("/");
});





//MIDDLEWARES
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}




app.get("/my_account", isLoggedIn, function(req, res) {
	res.render("my_account.ejs", { currentUser:req.user });
});





app.get("/account", isLoggedIn, function(req, res) {
	res.render("account.ejs");
});

app.post("/account", isLoggedIn, function(req, res) {
	console.log(req.body);
	User.findByIdAndUpdate({
		_id: req.user._id
	}, {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		AFM: req.body.AFM,
		email: req.body.email,
		phone: req.body.phone,
		image: req.body.image
		
	} ,function(error, updatedUser) {
		res.redirect("/");
	});

});



app.listen(3000, function() {
	console.log("auctions app server has started!!!");
});
