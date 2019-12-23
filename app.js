var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var app = express();
var nodemailer = require("nodemailer");


mongoose.connect("mongodb://localhost/auctions_db", { useNewUrlParser: true } );


var seedDB = require("./seeds");
seedDB();




var User = require("./models/user.js");
var Dromologia = require("./models/dromologia.js");
var Anakoinoseis = require("./models/anakoinoseis.js");



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



app.get("/", function(req, res) {
	
	
	Anakoinoseis.find({}, function(err, anakoinoseis){
		if(err){
			console.log(err);
		}else{
			res.render("home.ejs", { currentUser : req.user, anakoinoseis: anakoinoseis });
		}
	});
});



app.get("/error_page", function(req, res){
	res.render("error_page.ejs");
});



app.get("/back", function(req, res) {
	res.redirect("back");
});



app.get("/24wra_leoforeia", function(req, res){
	
	var leoforeia = [
		{arithmos_gram: "040", afetiria: "Πειραιάς", terma: "Σύνταγμα", meres: "Δευτέρα - Πέμπτη"},
		{arithmos_gram: "500", afetiria: "Πειραιάς", terma: "Κηφισιά", meres: "Δευτέρα - Παρασκευή"},
		{arithmos_gram: "790", afetiria: "Γλυφάδα", terma: "Περιστέρι", meres: "Δευτέρα - Κυριακή"},
		{arithmos_gram: "x14", afetiria: "Σύνταγμα", terma: "Κηφισιά", meres: "Τετάρτη - Σάββατο"},
		{arithmos_gram: "x95 (Αεροδρομίου)", afetiria: "Σύνταγμα", terma: "Αεροδρόμιο", meres: "Δευτέρα - Κυριακή"},
		{arithmos_gram: "11", afetiria: "Πατήσια", terma: "Παγκράτι", meres: "Τρίτη - Παρασκευή"},
		{arithmos_gram: "T4", afetiria: "Ανθούπολη", terma: "Ελληνικό", meres: "Πέμπτη - Σάββατο"},
		{arithmos_gram: "T5", afetiria: "Ζωγράφου", terma: "Ομόνοια", meres: "Παρασκευή - Σάββατο"},
		{arithmos_gram: "T3", afetiria: "Νέο Φάληρο", terma: "Βούλα", meres: "Σάββατο - Κυριακή"},
		{arithmos_gram: "040", afetiria: "Άγιος Αντώνιος", terma: "Καισαριανή", meres: "Δευτέρα - Πέμπτη"}
	]
	


	res.render("24wra_leoforeia.ejs", {leoforeia: leoforeia});
});



// anazitisi diadromis
/////////////////////////////////////////////////////////////////
app.get("/anazitisi_diadromis", function(req, res) {
	res.render("anazitisi_diadromis.ejs");
});

app.post("/anazitisi_diadromis", function(req, res){
	
    var dromologio = {};
	
	dromologio.afetiria = req.body.dromologio.afetiria;
	dromologio.terma = req.body.dromologio.terma;
	
	
	Dromologia.find(
		dromologio
	, function(err, found_dromologio){
		if(found_dromologio.length === 0){
			//console.log("Den yparxei to dromologio \n");
			res.render("anazitisi_diadromis.ejs", { error: "Tο Δρομολόγιο δεν υπάρχει.Εισάγεται νεα στοιχεία." });
		}else{
			//console.log("yparxei tetoio dromologio \n");
			//console.log(found_dromologio);
			
			res.render("apotelesmata_anaz_diadromis.ejs", { dromologia: found_dromologio, arxi: req.body.dromologio.afetiria, telos: req.body.dromologio.terma});
		}
	});
});
///////////////////////////////////////////////////////////////////



// plirofories stasis
//////////////////////////////////////////////////////////////////////
app.get("/plirofories_stasis", function(req, res) {
	res.render("anazitisi_diadromis.ejs");
});

app.post("/plirofories_stasis", function(req, res){
	
	Dromologia.find({
		
		$or:[
			{ stasi1: req.body.dromologio.stasi },
			{ stasi2: req.body.dromologio.stasi },
			{ stasi3: req.body.dromologio.stasi },
			{ stasi4: req.body.dromologio.stasi },
			{ stasi5: req.body.dromologio.stasi },
			{ stasi6: req.body.dromologio.stasi },
			{ stasi7: req.body.dromologio.stasi },
			{ stasi8: req.body.dromologio.stasi },
			{ stasi9: req.body.dromologio.stasi },
			{ stasi10: req.body.dromologio.stasi }
		]
		
	}, function(err, found_dromologio){
		if(found_dromologio.length === 0){
			//console.log("Den yparxei to dromologio \n");
			res.render("anazitisi_diadromis.ejs", { error: "Η στάση δεν υπάρχει.Εισάγεται νεα στοιχεία." });
		}else{
			
			
			var lat;
			var lng;
			if(found_dromologio[0].stasi1 === req.body.dromologio.stasi){ 
				lat = found_dromologio[0].s1_lat;
				lng = found_dromologio[0].s1_lng;
			}else{
				lat = found_dromologio[0].s2_lat;
				lng = found_dromologio[0].s2_lng;
			}
			
			res.render("apotelesmata_plir_stasis.ejs", { dromologia: found_dromologio , stasi: req.body.dromologio.stasi, lat: lat, lng:lng });
		}
	});
});



app.get("/plirofories_stasis/:id", function(req, res){
	
	Dromologia.findById({
		_id: req.params.id
	}, function(err, found_dromologio){
		
		res.render("xartis.ejs", {lat: found_dromologio.af_lat, lng: found_dromologio.af_lng ,afetiria: found_dromologio.afetiria ,leof: found_dromologio.leoforeio });
	});
	
});
////////////////////////////////////////////////////////////////////////////////////////////





// register routes
/////////////////////////////////////////////////////////////////////////////////////////
app.get("/register", function(req, res) {
	res.render("register.ejs");
});

app.post("/register", function(req, res) {
	
	if(req.body.password !== req.body.password_again){
		//console.log("Ta password me to password_again einai diaforetika");
		res.render("register.ejs", { error: "Οι δύο κωδικοί δεν τεριάζουν.Εισάγεται ξανά τα στοιχεία σας." });
		return;
	}
	


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
			//console.log("error is: " + err);
			return res.render("register.ejs", { error: "Το Όνομα Χρήστη υπάρχει.Εισάγεται ένα διαφορετικό Όνομα Χρήστη." });
		}
		passport.authenticate("local")(req, res , function() { 	
			res.redirect("/");				
		});
	});
});
//////////////////////////////////////////////////////////////////////////////////////////////





















// anakoinwseis
//////////////////////////////////////////////////////////////////////////////
app.get("/anakoinoseis", function(req, res) {
	Anakoinoseis.find({}, function(err, anakoinoseis){
		if(err){
			console.log(err);
		}else{
			res.render("anakoinoseis.ejs", { currentUser : req.user, anakoinoseis: anakoinoseis });
		}
	});
});
//////////////////////////////////////////////////////////////////////////////

// epikoinonia
///////////////////////////////////////////////////////////////////////////////////
app.get("/epikoinonia", function(req, res){
	res.render("epikoinonia.ejs");
});

////////////////////////////////////////////////////////////////////////////


// mail
//////////////////////////////////////////////////////////////
var transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user:   "nikmak867@gmail.com",
		pass:	""								// thelei ton kwdikou tou mail gia nak anei sindesi
	}
});
var email_from = "nikmak867@gmail.com";


/*
var mailOptions = {
	from:		email_from,
	to:			"nikolakis0557@yahoo.gr",
	subject:	"OASA",
	text: 		"hellow world"
};
*/



function SendMail(mailOptions){	

	transporter.sendMail(mailOptions, function(err, info){
		if (err) {
			console.log("\n error \n");
			//console.log(err);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
	
}

///////////////////////////////////////////////////////////////////





app.get("/parapona", function(req, res){
	res.render("parapona.ejs");
});


app.post("/parapona/:id", function(req, res){
	
	
	User.find({
		
		_id: req.params.id
		
	}, function(err, found_user){
		var email;
		
		if(err){
			
			email = req.body.email;

		}else{
		
			email = found_user[0].email;
			
		}
		var sxolia = req.body.sxolia;
		var date = req.body.imerominia;
		var grammi = req.body.grammi;
		var meso = req.body.meso;
		
		
		mailOptions = {};
		mailOptions.from = email_from;
		mailOptions.to = email;
		mailOptions.subject = "Oasa "+date+" "+meso+" "+grammi;
		mailOptions.text = sxolia;
		////////
		//SendMail(mailOptions);
		/////////
		
		
		//res.render("parapona.ejs", { success : "Επιτυχής αποστολή.Σας έχει σταλεί email επιβεβαίωσης." });
		Anakoinoseis.find({}, function(err, anakoinoseis){
			if(err){
				console.log(err);
			}else{
				res.render("home.ejs", { success : "Επιτυχής αποστολή.Σας έχει σταλεί email επιβεβαίωσης.", currentUser : req.user, anakoinoseis: anakoinoseis });
			}
		});
	});
});




// epanafortisi_kartas
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
app.get("/epanafortisi_kartas", function(req, res) {
	res.render("epanafortisi_kartas.ejs");
});



app.post("/epanafortisi_kartas/:id", function(req, res) {
	
	
	User.find({
		
		_id: req.params.id
		
	}, function(err, found_user){
		
		
		var stoixeia = {};
		var cost;

		if(err){
			stoixeia.onoma    = req.body.stoixeia.onoma;
			stoixeia.eponimo  = req.body.stoixeia.eponimo;
			stoixeia.email    = req.body.stoixeia.email;
			stoixeia.kwdikos  = req.body.stoixeia.kwdikos;
			stoixeia.komistro = req.body.stoixeia.komistro;
			stoixeia.posotita = req.body.stoixeia.posotita;
			stoixeia.pliromi  = req.body.stoixeia.pliromi;
			
		}else{
			stoixeia.komistro = req.body.stoixeia.komistro;
			stoixeia.posotita = req.body.stoixeia.posotita;
			stoixeia.pliromi  = req.body.stoixeia.pliromi;
			stoixeia.kwdikos  = req.body.stoixeia.kwdikos;
			
			
			stoixeia.onoma    = found_user[0].firstName;
			stoixeia.eponimo  = found_user[0].lastName;
			stoixeia.email    = found_user[0].email;
			
		}
		
		
		if(stoixeia.komistro === "Ενιαίο εισιτήριο 90 λεπτών"){
			cost = 1.40;
		}else if(stoixeia.komistro === "Μειωμένο εισιτήριο 90 λεπτών"){
			cost = 0.60;
		}else if(stoixeia.komistro === "Ημερήσιο εισιτήριο"){
			cost = 4.50;
		}else{
			cost = 9.00;
		}
		cost = cost * stoixeia.posotita;
		
		res.render("pliromi.ejs", { p: "1", stoixeia: stoixeia, cost: cost ,currentUser: req.user });
	});
});

////////////////////////////////////////////////////////////////////




function date(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = dd + '/' + mm + '/' + yyyy;
	
	return today;
}

app.get("/epiveveosi_pliromis/:stoixeia", function(req, res){
	
	var str = req.params.stoixeia;
	
	var onoma = 			str.split('+')[0];
	var eponimo = 			str.split('+')[1];
	var email = 			str.split('+')[2];
	var kwdikos_kartas = 	str.split('+')[3];
	var komisto = 			str.split('+')[4];
	var posotita =  		str.split('+')[5];
	var cost = 				str.split('+')[6];
	var id = 				str.split('+')[7];
	
	
	console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
	
	
	
	User.findOne({
		
		_id: id
		
	}, function(err, found_user){
		if(err){
			console.log("den yparxei autos o xristis, den exei ftiaksei logariasmo");
		}else{
			var ticket = found_user.tickets;
			
			var a = {};
			a.ticket	= komisto;
			a.posotita	= posotita;
			a.cost		= cost;
			a.date		= date();
			

			console.log("ΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟΟ");

			ticket.push(a);
			
			User.findOneAndUpdate({
				_id: id
			},{
				tickets: ticket
			} ,function(error, updatedUser) {
				// tipota
			});
		}
	});
	
	
	mailOptions = {};
	mailOptions.from = email_from;
	mailOptions.to = email;
	mailOptions.subject = "Oasa - "+"Απόδειξη αγοράς.";
	mailOptions.text = "Όνομα: "+onoma+"\n"+"Επώνυμο: "+eponimo+"\n"+"Κωδικός κάρτας: "+kwdikos_kartas+"\n\n"+
	"Κόμιστρο: "+komisto+"\n"+"Ποσότητα :"+posotita+"\n\n"+"Συνολικό κόστος"+cost+"\n";
	////////
	//SendMail(mailOptions);
	
	res.render("epiveveosi_pliromis.ejs");
});

//////////////////////////////////////////////







///////  agora_eisitirion
app.get("/agora_eisitirion", function(req, res){
	res.render("agora_eisitirion.ejs");
});

app.post("/agora_eisitirion", function(req, res) {
	
	res.render("pliromi.ejs", { p: "2", currentUser:req.user });
	
});




// oi agores mou
////////////////////////////////////////////////////////////
app.get("/oi_agores_mou", function(req, res){
	
	User.find({
		_id: req.user
	}, function(err, found_user){
		if(err){
			// tipota
		}else{
			
			var ticks = [];
			var i;
			for(i = 0 ; i < found_user[0].tickets.length ; i +=2 ){
				ticks.push( found_user[0].tickets[i] );
			}
			
			res.render("oi_agores_mou.ejs", { agores: ticks });
		}
	});
});








/////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
app.get("/nyxterina_dromologia", function(req, res){
	
	var leoforeia = [
		{arithmos_gram: "500", afetiria: "Πειραιάς", terma: "Κηφισιά", meres: "Δευτέρα - Κυριακή", wres: "00:55 - 05:00"},
		{arithmos_gram: "790", afetiria: "Γλυφάδα", terma: "Περιστέρι", meres: "Δευτέρα - Κυριακή", wres: "00:55 - 05:00"},
		{arithmos_gram: "x14", afetiria: "Σύνταγμα", terma: "Κηφισιά", meres: "Δευτέρα - Κυριακή", wres: "00:55 - 05:00"}
	]
	


	res.render("nyxterina_dromologia.ejs", {leoforeia: leoforeia});
});

app.get("/staseis_amea", function(req, res){
	
	var staseis = [
		{stasi: "Αγ.Λουκάς", odos: "Πατησίων", dimos: "Αθηναίων", lewforeia: "3, 5, 11, 14, 608, Α8"},
        {stasi: "Αγ.Μαρκέλλα", odos: "Σπύρου Πάτση", dimos: "Αθηναίων", lewforeia: "026, 027, 813"},
        {stasi: "1η Ριζάρη", odos: "Ριζάρη", dimos: "Αθηναίων", lewforeia: "054, 203, 204"},
        {stasi: "2η Ριζάρη", odos: "Ριζάρη", dimos: "Αθηναίων", lewforeia: "203, 204, 250, 211, 214"},
        {stasi: "2η Σχολείο", odos: "Ευφρονιου", dimos: "Αθηναίων", lewforeia: "250, 221"},
        {stasi: "Αγ.Δημήτριος", odos: "Πανόρμου", dimos: "Αθηναίων", lewforeia: "046"},
        {stasi: "Αγ.Ελευθέριος", odos: "Αχαρνών", dimos: "Αθηναίων", lewforeia: "6, 024, 500, Β9, Γ9"}
	]
	


	res.render("staseis_amea.ejs", {staseis: staseis});
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////








// login routes
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
app.get("/login", function(req, res) {
	res.render("login.ejs", { currentUser: req.user });
});



app.post("/login", passport.authenticate("local", {
	failureRedirect: "/login",
	successRedirect: "/"
	
}), function(req, res, next) {
	
});
/////////////////////////////////////////////////////////////////////////////


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
///////////////////////////////////////////////////////////////////////////////////////



// acount routes
/////////////////////////////////////////////////////////////////////////////////
app.get("/my_account", isLoggedIn, function(req, res) {
	res.render("my_account.ejs", { currentUser:req.user });
});


app.get("/account", isLoggedIn, function(req, res) {
	res.render("account.ejs");
});

app.post("/account", isLoggedIn, function(req, res) {
	
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
		res.redirect("/my_account");
	});

});
///////////////////////////////////////////////////////////////////////////////








app.listen(3000, function() {
	console.log("Oasa server has started!!!");
});
