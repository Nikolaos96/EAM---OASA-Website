var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var app = express();
var nodemailer = require("nodemailer");


mongoose.connect("mongodb://localhost/auctions_db", { useNewUrlParser: true } );


var seedDB = require("./seeds");
//seedDB();



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
	res.locals.cookies = req.flash("cookies");
	
	next();
});



//============================================
app.use(express.static("public"));  // tell express to serve the public dir

// clearing browser cache (pushing the back button after logout will now redirect to login page)
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});


var count = 0 ;
app.get("/", function(req, res) {
	
	
	
	Anakoinoseis.find({}, function(err, anakoinoseis){
		if(err){
			console.log(err);
		}else{
			res.render("home.ejs", { cookies:count , currentUser : req.user, anakoinoseis: anakoinoseis });
		}
	});
});


app.get("/alert", function(req, res){
	count++;
	
	res.redirect('back');
});






app.get("/home_en", function(req, res) {
	
	Anakoinoseis.find({}, function(err, anakoinoseis){
		if(err){
			console.log(err);
		}else{
			res.render("home_en.ejs", { cookies:count ,currentUser : req.user, anakoinoseis: anakoinoseis });
		}
	});
});



app.get("/error_page", function(req, res){
	res.render("error_page.ejs" , {cookies:count});
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
	


	res.render("24wra_leoforeia.ejs", {cookies:count ,leoforeia: leoforeia});
});



// anazitisi diadromis
/////////////////////////////////////////////////////////////////
app.get("/anazitisi_diadromis", function(req, res) {
	res.render("anazitisi_diadromis.ejs", {cookies:count });
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
			res.render("anazitisi_diadromis.ejs", { cookies:count ,error: "Tο Δρομολόγιο δεν υπάρχει.Εισάγετε νεα στοιχεία." });
		}else{
			//console.log("yparxei tetoio dromologio \n");
			//console.log(found_dromologio);
			
			res.render("apotelesmata_anaz_diadromis.ejs", { cookies:count ,dromologia: found_dromologio, arxi: req.body.dromologio.afetiria, telos: req.body.dromologio.terma});
		}
	});
});
///////////////////////////////////////////////////////////////////




app.get("/email_me", function(req, res){
	// req.body.a
	// req.body.b
	// req.body.c
	
	
	Anakoinoseis.find({}, function(err, anakoinoseis){
		if(err){
			console.log(err);
		}else{
			res.render("home_en.ejs", { success:"To email σας στάλθηκε." ,cookies:count ,currentUser : req.user, anakoinoseis: anakoinoseis });
		}
	});
});




// plirofories stasis
//////////////////////////////////////////////////////////////////////
app.get("/plirofories_stasis", function(req, res) {
	res.render("anazitisi_diadromis.ejs", {cookies:count });
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
			res.render("anazitisi_diadromis.ejs", { cookies:count ,error: "Η στάση δεν υπάρχει.Εισάγεται νεα στοιχεία." });
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
			
			res.render("apotelesmata_plir_stasis.ejs", { cookies:count ,dromologia: found_dromologio , stasi: req.body.dromologio.stasi, lat: lat, lng:lng });
		}
	});
});



app.get("/plirofories_stasis/:id", function(req, res){
	
	Dromologia.findById({
		_id: req.params.id
	}, function(err, found_dromologio){
		
		res.render("xartis.ejs", {cookies:count ,lat: found_dromologio.af_lat, lng: found_dromologio.af_lng ,afetiria: found_dromologio.afetiria ,leof: found_dromologio.leoforeio });
	});
	
});


app.get("/_staseis/:id", function(req, res){
	
	Dromologia.find({
		_id: req.params.id
	}, function(err, found_dromologio){
		
		res.render("oles_oi_staseis.ejs", { cookies:count ,dromo: found_dromologio });
	});
	
});
////////////////////////////////////////////////////////////////////////////////////////////





// register routes
/////////////////////////////////////////////////////////////////////////////////////////
app.get("/register", function(req, res) {
	res.render("register.ejs", {cookies:count});
});

app.post("/register", function(req, res) {
	
	if(req.body.password !== req.body.password_again){
		//console.log("Ta password me to password_again einai diaforetika");
		res.render("register.ejs", { cookies:count ,error: "Οι δύο κωδικοί δεν ταιριάζουν.Εισάγεται ξανά τα στοιχεία σας." });
		return;
	}
	


	var newUser = new User({username:		req.body.username,
							password_again: req.body.password_again,

							firstName: 		req.body.firstName,
							lastName: 		req.body.lastName,
							email: 			req.body.email,
							address: 		req.body.address,
							postal_code:	req.body.postal_code,
							
							phone: 			req.body.phone,
							AFM:			req.body.AFM,
							image:			req.body.image
	});

	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			//console.log("error is: " + err);
			return res.render("register.ejs", { cookies:count ,error: "Το Όνομα Χρήστη υπάρχει.Εισάγεται ένα διαφορετικό Όνομα Χρήστη." });
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
			res.render("anakoinoseis.ejs", { cookies:count ,currentUser : req.user, anakoinoseis: anakoinoseis });
		}
	});
});
//////////////////////////////////////////////////////////////////////////////

// epikoinonia
///////////////////////////////////////////////////////////////////////////////////
app.get("/epikoinonia", function(req, res){
	res.render("epikoinonia.ejs", {cookies:count});
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
	res.render("parapona.ejs", {cookies:count });
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
				res.render("home.ejs", { cookies:count ,count:count, success : "Επιτυχής αποστολή.Σας έχει σταλεί email επιβεβαίωσης.", currentUser : req.user, anakoinoseis: anakoinoseis });
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
	res.render("epanafortisi_kartas.ejs", {cookies:count });
});



app.post("/epanafortisi_kartas/:id", function(req, res) {
	
	
	User.find({
		
		_id: req.params.id
		
	}, function(err, found_user){
		
		
		var stoixeia = {};
		var cost = 0;

		if(err){
			stoixeia.onoma    = req.body.stoixeia.onoma;
			stoixeia.eponimo  = req.body.stoixeia.eponimo;
			stoixeia.email    = req.body.stoixeia.email;
			stoixeia.kwdikos  = req.body.stoixeia.kwdikos;
			
			stoixeia.posotita1 = req.body.stoixeia.posotita1;
			stoixeia.posotita2 = req.body.stoixeia.posotita2;
			stoixeia.posotita3 = req.body.stoixeia.posotita3;
			stoixeia.posotita4 = req.body.stoixeia.posotita4;
			
			stoixeia.pliromi  = req.body.stoixeia.pliromi;
			
		}else{
			stoixeia.posotita1 = req.body.stoixeia.posotita1;
			stoixeia.posotita2 = req.body.stoixeia.posotita2;
			stoixeia.posotita3 = req.body.stoixeia.posotita3;
			stoixeia.posotita4 = req.body.stoixeia.posotita4;
			
			stoixeia.pliromi  = req.body.stoixeia.pliromi;
			stoixeia.kwdikos  = req.body.stoixeia.kwdikos;
			
			stoixeia.onoma    = found_user[0].firstName;
			stoixeia.eponimo  = found_user[0].lastName;
			stoixeia.email    = found_user[0].email;
		}
		
		
		
		if(stoixeia.posotita1 > 0){
			cost += stoixeia.posotita1 * 1.40;
			stoixeia.komistro1 = "Ενιαίο εισιτήριο 90 λεπτών";
		}else{
			stoixeia.posotita1 = 0;
			stoixeia.komistro1 = " ";
		}
		
		if(stoixeia.posotita2 > 0){
			cost += stoixeia.posotita2 * 0.60;
			stoixeia.komistro2 = "Μειωμένο εισιτήριο 90 λεπτών";
		}else{
			stoixeia.posotita2 = 0;
			stoixeia.komistro2 = " ";
		}
		
		if(stoixeia.posotita3 > 0){
			cost += stoixeia.posotita3 * 4.50;
			stoixeia.komistro3 = "Ημερήσιο εισιτήριο";
		}else{
			stoixeia.posotita3 = 0;
			stoixeia.komistro3 = " ";
		}
		
		if(stoixeia.posotita4 > 0){
			cost += stoixeia.posotita4 * 9.00;
			stoixeia.komistro4 = "Εισιτήριο πέντε ημερών";
		}else{
			stoixeia.posotita4 = 0;
			stoixeia.komistro4 = " ";
		}
		
		
		
		
		res.render("pliromi.ejs", { cookies:count , p: "1", stoixeia: stoixeia, cost: cost ,currentUser: req.user });
	});
});




////////////////////////////////////////////////////////////////////
///////  agora_eisitirion
app.get("/agora_eisitirion", function(req, res){
	res.render("agora_eisitirion.ejs", {cookies:count});
});

app.post("/agora_eisitirion/:id", function(req, res) {
	
	
	User.find({
		
		_id: req.params.id
		
	}, function(err, found_user){
		
		
		var stoixeia = {};
		var cost = 0;
		
		

		if(err){
			stoixeia.onoma    = req.body.stoixeia.onoma;
			stoixeia.eponimo  = req.body.stoixeia.eponimo;
			stoixeia.email    = req.body.stoixeia.email;
			stoixeia.dieuthinsi = req.body.stoixeia.dieuthinsi;
			stoixeia.tx = 		  req.body.stoixeia.tx;
			
			stoixeia.paralavi = req.body.stoixeia.paralavi;
			
			stoixeia.posotita1 = req.body.stoixeia.posotita1;
			stoixeia.posotita2 = req.body.stoixeia.posotita2;
			stoixeia.posotita3 = req.body.stoixeia.posotita3;
			stoixeia.posotita4 = req.body.stoixeia.posotita4;
			
			stoixeia.pliromi  = req.body.stoixeia.pliromi;
			
		}else{
			stoixeia.posotita1 = req.body.stoixeia.posotita1;
			stoixeia.posotita2 = req.body.stoixeia.posotita2;
			stoixeia.posotita3 = req.body.stoixeia.posotita3;
			stoixeia.posotita4 = req.body.stoixeia.posotita4;
			
			
			stoixeia.pliromi  = req.body.stoixeia.pliromi;
			stoixeia.paralavi = req.body.stoixeia.paralavi;
			
			
			stoixeia.onoma    = found_user[0].firstName;
			stoixeia.eponimo  = found_user[0].lastName;
			stoixeia.email    = found_user[0].email;
			stoixeia.dieuthinsi = found_user[0].address;
			stoixeia.tx = 		  found_user[0].postal_code;
			
		}
		
		if(stoixeia.posotita1 > 0){
			cost += stoixeia.posotita1 * 1.40;
			stoixeia.komistro1 = "Ενιαίο εισιτήριο 90 λεπτών";
		}else{
			stoixeia.posotita1 = 0;
			stoixeia.komistro1 = " ";
		}
		
		if(stoixeia.posotita2 > 0){
			cost += stoixeia.posotita2 * 0.60;
			stoixeia.komistro2 = "Μειωμένο εισιτήριο 90 λεπτών";
		}else{
			stoixeia.posotita2 = 0;
			stoixeia.komistro2 = " ";
		}
		
		if(stoixeia.posotita3 > 0){
			cost += stoixeia.posotita3 * 4.50;
			stoixeia.komistro3 = "Ημερήσιο εισιτήριο";
		}else{
			stoixeia.posotita3 = 0;
			stoixeia.komistro3 = " ";
		}
		
		if(stoixeia.posotita4 > 0){
			cost += stoixeia.posotita4 * 9.00;
			stoixeia.komistro4 = "Εισιτήριο πέντε ημερών";
		}else{
			stoixeia.posotita4 = 0;
			stoixeia.komistro4 = " ";
		}
		
		
		if(stoixeia.paralavi === "Αποστολή στην παραπάνω διεύθυνση (+5.00 ευρώ)"){
			cost += 5.00;
		}
		
		res.render("pliromi.ejs", { cookies:count , p: "2", currentUser:req.user, stoixeia: stoixeia, cost: cost });
	});
});



////////////////////////////////////////////////////////////////////
///////  times_eisitirion
app.get("/times_eisitirion", function(req, res){
	res.render("times_eisitirion.ejs", {cookies:count});
});

////////////////////////////////////////////////////////////////////
///////  dikaiologitika
app.get("/dikaiologitika", function(req, res){
	res.render("dikaiologitika.ejs", {cookies:count});
});

////////////////////////////////////////////////////////////////////
///////  stathmoi_ekdosis
app.get("/stathmoi_ekdosis", function(req, res){
	
	var stathmoi = [
		{stathmos: "Αγ. Παρασκευή(Σταθμός Ο.ΣΥ.)", odos: "Λ.Μεσογείων & Αγ.Ιωάννου 7", meres: "Δευτέρα - Παρασκευή", wres: "06:00-21:00"},
        {stathmos: "Κηφισια(Σταθμός Ηλεκτρικού)", odos: "Γρηγόριου Λαμπράκη 36", meres: "Δευτέρα - Κυριακή", wres: "06:10-20:20"},
        {stathmos: "Δάφνη(Σταθμός ΜΕΤΡΟ)", odos: "Αγ.Δημητρίου 5", meres: "Δευτέρα - Σάββατο", wres: "07:00-20:00"},
        {stathmos: "Σύνταγμα(Σταθμός ΜΕΤΡΟ)", odos: "Πλατεία Συντάγματος", meres: "Δευτέρα - Κυριακή", wres: "06:00-00:00"},
        {stathmos: "Γραφεία Ο.ΣΥ.", odos: "Παρνασού 6", meres: "Δευτέρα - Παρασκευή", wres: "08:00-14:15"},
        {stathmos: "Γραφεία Ο.Α.Σ.Α.", odos: "Μετσόβου 15", meres: "Δευτέρα - Παρασκευή", wres: "08:00-14:15"}
	]
	


	res.render("stathmoi_ekdosis.ejs", {cookies:count , stathmoi: stathmoi});
});





function date(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = dd + '/' + mm + '/' + yyyy;
	
	return today;
}

var count = 0;

app.get("/epiveveosi_pliromis/:stoixeia", function(req, res){
	count ++;
	
	if(count % 2 === 1 ){
		
	var str = req.params.stoixeia;
	var t = str.split('+')[0];
	
	
	var stoixeia = {};
	stoixeia.onoma = str.split('+')[1];
	stoixeia.eponimo = str.split('+')[2];
	stoixeia.email = str.split('+')[3];
	
	
	if(t === "1"){
		stoixeia.kwdikos_kartas = str.split('+')[4];
		stoixeia.komisto1 = str.split('+')[5];
		stoixeia.komisto2 = str.split('+')[6];
		stoixeia.komisto3 = str.split('+')[7];
		stoixeia.komisto4 = str.split('+')[8];
		
		stoixeia.posotita1 = str.split('+')[9];
		stoixeia.posotita2 = str.split('+')[10];
		stoixeia.posotita3 = str.split('+')[11];
		stoixeia.posotita4 = str.split('+')[12];
		
		
		
		stoixeia.cost = str.split('+')[13];
		stoixeia.id = str.split('+')[14];
		
	}else{
		stoixeia.komisto1 = str.split('+')[4];
		stoixeia.komisto2 = str.split('+')[5];
		stoixeia.komisto3 = str.split('+')[6];
		stoixeia.komisto4 = str.split('+')[7];
		
		stoixeia.posotita1 = str.split('+')[8];
		stoixeia.posotita2 = str.split('+')[9];
		stoixeia.posotita3 = str.split('+')[10];
		stoixeia.posotita4 = str.split('+')[11];
		

		stoixeia.cost = str.split('+')[12];
		stoixeia.id = str.split('+')[13];
		stoixeia.dieuthinsi = str.split('+')[14];
		stoixeia.tx = str.split('+')[15];
		stoixeia.paralavi = str.split('+')[16];
		
	}
	



	
	
	User.findOne({
		_id: stoixeia.id
	}, function(err, found_user){
		if(err){
			//console.log("den yparxei autos o xristis, den exei ftiaksei logariasmo");
		}else{
			if(t === "1"){
				var ticket = found_user.tickets;
				
				var a1 = {};
				var a2 = {};
				var a3 = {};
				var a4 = {};
				
				if( stoixeia.posotita1 > 0 ){
					a1.ticket	= stoixeia.komisto1;
					a1.posotita	= stoixeia.posotita1;
					a1.cost = stoixeia.posotita1 * 1.40;
					a1.date = date();
					
					ticket.push(a1);
				}
				
				
				if( stoixeia.posotita2 > 0 ){
					a2.ticket	= stoixeia.komisto2;
					a2.posotita	= stoixeia.posotita2;
					a2.cost = stoixeia.posotita2 * 0.60;
					a2.date = date();
					
					ticket.push(a2);
				}
				
				
				if( stoixeia.posotita3 > 0 ){
					a3.ticket	= stoixeia.komisto3;
					a3.posotita	= stoixeia.posotita3;
					a3.cost = stoixeia.posotita3 * 4.50;
					a3.date = date();
					
					ticket.push(a3);
				}
				
				if( stoixeia.posotita4 > 0 ){
					a4.ticket	= stoixeia.komisto4;
					a4.posotita	= stoixeia.posotita4;
					a4.cost = stoixeia.posotita4 * 9.00;
					a4.date = date();
					
					ticket.push(a4);
				}
				
		
				
				User.findOneAndUpdate({
					_id: stoixeia.id
				},{
					tickets: ticket
				} ,function(error, updatedUser) {
					// tipota
				});
				
			}else{
				
				var ticket = found_user.tickets2;
				
				var a1 = {};
				var a2 = {};
				var a3 = {};
				var a4 = {};
				
				
				if( stoixeia.posotita1 > 0 ){
					a1.ticket	= stoixeia.komisto1;
					a1.posotita	= stoixeia.posotita1;
					a1.cost = stoixeia.posotita1 * 1.40;
					a1.date = date();
					a1.paralavi	= stoixeia.paralavi;
					
					ticket.push(a1);
				}
				
				
				if( stoixeia.posotita2 > 0 ){
					a2.ticket	= stoixeia.komisto2;
					a2.posotita	= stoixeia.posotita2;
					a2.cost = stoixeia.posotita2 * 0.60;
					a2.date = date();
					a2.paralavi	= stoixeia.paralavi;
					
					ticket.push(a2);
				}
				
				
				if( stoixeia.posotita3 > 0 ){
					a3.ticket	= stoixeia.komisto3;
					a3.posotita	= stoixeia.posotita3;
					a3.cost = stoixeia.posotita3 * 4.50;
					a3.date = date();
					a3.paralavi	= stoixeia.paralavi;
					
					ticket.push(a3);
				}
				
				if( stoixeia.posotita4 > 0 ){
					a4.ticket	= stoixeia.komisto4;
					a4.posotita	= stoixeia.posotita4;
					a4.cost = stoixeia.posotita4 * 9.00;
					a4.date = date();
					a4.paralavi	= stoixeia.paralavi;
					
					ticket.push(a4);
				}
				
				
				
				User.findOneAndUpdate({
					_id: stoixeia.id
				},{
					tickets2: ticket
				} ,function(error, updatedUser) {
					// tipota
				});
			}
		}
	});
	
	
	mailOptions = {};
	mailOptions.from = email_from;
	mailOptions.to = stoixeia.email;
	mailOptions.subject = "Oασα - "+"Απόδειξη αγοράς.";
	
	
	///////////////////////////////////
	if(t === "1"){
		mailOptions.text = "Όνομα: "+stoixeia.onoma+"\n"+"Επώνυμο: "+stoixeia.eponimo+"\n"+"Κωδικός κάρτας: "+stoixeia.kwdikos_kartas+"\n\n";
		mailOptions.text += "Kόμιστρο/α: \n";
		
		if( stoixeia.posotita1 > 0 ){
			mailOptions.text += stoixeia.komisto1;
			mailOptions.text += ": ";
			mailOptions.text += stoixeia.posotita1;
			mailOptions.text += "\n";
		}
		
		if( stoixeia.posotita2 > 0 ){
			mailOptions.text += stoixeia.komisto2;
			mailOptions.text += ": ";
			mailOptions.text += stoixeia.posotita2;
			mailOptions.text += "\n";
		}
		
		if( stoixeia.posotita3 > 0 ){
			mailOptions.text += stoixeia.komisto3;
			mailOptions.text += ": ";
			mailOptions.text += stoixeia.posotita3;
			mailOptions.text += "\n";
		}
		
		if( stoixeia.posotita4 > 0 ){
			mailOptions.text += stoixeia.komisto4;
			mailOptions.text += ": ";
			mailOptions.text += stoixeia.posotita4;
			mailOptions.text += "\n";
		}
		
		mailOptions.text += "\nΣυνολικό κόστος: ";
		mailOptions.text += stoixeia.cost;
	}else{
		mailOptions.text = "Όνομα: "+stoixeia.onoma+"\n"+"Επώνυμο: "+stoixeia.eponimo+"\n"+"Διεύθυνση: "+stoixeia.dieuthinsi+"\n"+"Ταχυδρομικός Κώδικας: "+stoixeia.tx+"\n"+
		"Παραλαβή: "+stoixeia.paralavi+"\n\n";
		mailOptions.text += "Kόμιστρο/α: \n";
		
		
		if( stoixeia.posotita1 > 0 ){
			mailOptions.text += stoixeia.komisto1;
			mailOptions.text += ": ";
			mailOptions.text += stoixeia.posotita1;
			mailOptions.text += "\n";
		}
		
		if( stoixeia.posotita2 > 0 ){
			mailOptions.text += stoixeia.komisto2;
			mailOptions.text += ": ";
			mailOptions.text += stoixeia.posotita2;
			mailOptions.text += "\n";
		}
		
		if( stoixeia.posotita3 > 0 ){
			mailOptions.text += stoixeia.komisto3;
			mailOptions.text += ": ";
			mailOptions.text += stoixeia.posotita3;
			mailOptions.text += "\n";
		}
		
		if( stoixeia.posotita4 > 0 ){
			mailOptions.text += stoixeia.komisto4;
			mailOptions.text += ": ";
			mailOptions.text += stoixeia.posotita4;
			mailOptions.text += "\n";
		}
		
		mailOptions.text += "\nΣυνολικό κόστος: ";
		mailOptions.text += stoixeia.cost;
	}
	
	
	//console.log(mailOptions.text);
	//SendMail(mailOptions);
	}
	
	res.render("epiveveosi_pliromis.ejs", {cookies:count});
});

//////////////////////////////////////////////








// oi agores mou
////////////////////////////////////////////////////////////
app.get("/oi_agores_mou", isLoggedIn ,function(req, res){
	
	User.find({
		_id: req.user
	}, function(err, found_user){
		if(err){
			// tipota
		}else{
			
			
		/*
			var ticks = [];
			var i;
			for(i = 0 ; i < found_user[0].tickets.length ; i +=2 ){
				ticks.push( found_user[0].tickets[i] );
			}
			
			var ticks2 = [];
			for(i = 0 ; i < found_user[0].tickets2.length ; i +=2 ){
				ticks2.push( found_user[0].tickets2[i] );
			}
		*/
			var ticks  = found_user[0].tickets;
			var ticks2 = found_user[0].tickets2;
			
			var t1 = 1;
			if(ticks.length === 0){
				t1 = 0;
			}
			var t2 = 1;
			if(ticks2.length === 0){
				t2 = 0;
			}
		
		
		
		
			res.render("oi_agores_mou.ejs", { cookies:count , currentUser:req.user, agores1: ticks , t1: t1 , agores2:ticks2 , t2: t2 });
		}
	});
});




app.get("/diagrafi_agorwn/:id", isLoggedIn , function(req, res){
	var str = req.params.id;
	
	var id = str.split('+')[0];
	var a  = str.split('+')[1];
	
	
	User.find({
		_id: id
	}, function(err, found_user){
		if(err){
			// tipota
		}else{
			var ticket = [];
			
			
			
			if(a === "1"){
				User.findOneAndUpdate({
					_id: id
				},{
					tickets: ticket
				} ,function(error, updatedUser) {
					// tipota
				});
			}else{
				User.findOneAndUpdate({
					_id: id
				},{
					tickets2: ticket
				} ,function(error, updatedUser) {
					// tipota
				});
			}
			res.redirect('back');
		}
	});
});








//////////////////////////////////////////////////////////////////////////////////
app.get("/oles_oi_grammes", function(req, res){
	
	Dromologia.find(
		{}
	, function(err, found_dromologio){
		if(found_dromologio.length === 0 || err){
			//console.log("Den yparxei to dromologio \n");
		}else{
			var a;
			
			if(typeof req.user !== "undefined"){
				a = req.user._id;
			}else{
				a = 1;
			}
			
			
			User.find({
				_id: a
			},function(error, found_user) {
				if(error){
					res.render("oles_oi_grammes.ejs", { cookies:count , currentUser: req.user , dromologia: found_dromologio });
				}else{
					var grammes = found_user[0].grammes;
					
					var i, j;
					for(i = 0 ; i < found_dromologio.length ; i++){
						var f = 0;
						for(j = 0 ; j < grammes.length ; j++){
							if(found_dromologio[i].leoforeio === grammes[j].leoforeio){
								f = 1;
								break;
							}
						}
						
						
						if(f == 0){
							found_dromologio[i].ss = 0;
						}else{
							found_dromologio[i].ss = 1;
						}
					}
					
					
					res.render("oles_oi_grammes.ejs", { cookies:count , currentUser: req.user , dromologia: found_dromologio });
				}
			});
			
			
		}
	});
});







app.get("/oles_oi_grammes/:id", function(req, res){
	var str = req.params.id;
	
	var user_id = str.split('+')[0];
	var leof 	= str.split('+')[1];
	var ss		= str.split('+')[2];
	
	
	
	if(ss === "I"){	// apothikeusi	dromologiou
		
			User.find({
				_id: user_id
			},function(error, found_user) {
				
				var arr = found_user[0].grammes;
				
				Dromologia.find({
					leoforeio: leof
				}, function(err, found){
					arr.push(found[0]);
					
					
					User.findOneAndUpdate({
						_id: user_id
					},{
						grammes: arr
					} ,function(error, updatedUser) {
						// tipota
					});
					
				});
			});
			
			res.redirect('back');
			
	}else{		// diagrafi dromologiou
		
		User.find({
				_id: user_id
			},function(error, found_user) {
				
				var arr = found_user[0].grammes;
				var i;
				
				for(i = 0 ; i < arr.length ; i++){
					if(arr[i].leoforeio == leof){
						arr.splice(i,1);
					}
				}
				
			
				User.findOneAndUpdate({
					_id: user_id
				},{
					grammes: arr
				} ,function(error, updatedUser) {
					// tipota
				});
			});
			
			res.redirect('back');
			
	}
});


app.get("/dromologia_mou", function(req, res){
	
	User.find({
		_id: req.user
	}, function(err, found_user){
		var grammes = found_user[0].grammes;
		var a = grammes.length;
		
		res.render("dromologia_mou.ejs", {cookies:count , grammes: grammes, a: a });
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
	


	res.render("nyxterina_dromologia.ejs", {cookies:count , leoforeia: leoforeia});
});

app.get("/dromologia_aerodromiou", function(req, res){
	
	var leoforeia = [
		{arithmos_gram: "Χ93", afetiria: "Σταθμός Υπερ.Λεωφ.Κηφισου", terma: "Αεροδρόμιο", meres: "Δευτέρα - Κυριακή"},
		{arithmos_gram: "Χ95", afetiria: "Σύνταγμα", terma: "Αεροδρόμιο", meres: "Δευτέρα - Κυριακή"},
		{arithmos_gram: "Χ96", afetiria: "Πειρεάς", terma: "Αεροδρόμιο", meres: "Δευτέρα - Κυριακή"},
        {arithmos_gram: "Χ97", afetiria: "Σταθμός Ελληνικού", terma: "Αεροδρομιο", meres: "Δευτέρα - Κυριακή"}
	]
	


	res.render("dromologia_aerodromiou.ejs", {cookies:count , leoforeia: leoforeia});
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
	


	res.render("staseis_amea.ejs", {cookies:count , staseis: staseis});
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// help
app.get("/pws_epanafortizw_karta", function(req, res){
	res.render("pws_epanafortizw_karta.ejs", {cookies:count });
});
app.get("/pws_anazitw_diadromi", function(req, res){
	res.render("pws_anazitw_diadromi.ejs", {cookies:count });
});



// login routes
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
app.get("/login", function(req, res) {
	res.render("login.ejs", { cookies:count , currentUser: req.user });
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
	res.render("my_account.ejs", { cookies:count , currentUser:req.user });
});


app.get("/account", isLoggedIn, function(req, res) {
	res.render("account.ejs", {cookies:count});
});

app.post("/account", isLoggedIn, function(req, res) {
	
	User.findByIdAndUpdate({
		_id: req.user._id
	}, {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		
		address: 		req.body.address,
		postal_code:	req.body.postal_code,

		email: req.body.email,
		phone: req.body.phone,
		image: req.body.image
		
	} ,function(error, updatedUser) {
		res.redirect("/my_account");
	});

});
///////////////////////////////////////////////////////////////////////////////




app.get("/epanadora_kvdikou", function(req, res){
	res.render("epanadora_kvdikou.ejs", {cookies:count});
});

app.post("/epanadora_kvdikou", function(req, res){
	var email = req.body.email;
	
	User.find({
		
		email: email
		
	}, function(err, found_user){
		var k;
		
		if(err || found_user.length === 0){
			k = 1;
		}else{
			
			mailOptions = {};
			mailOptions.from = email_from;
			mailOptions.to = found_user[0].email;
			mailOptions.subject = "Oasa "+" - Υπενθύμιση κωδικού";
			mailOptions.text = "Ο κωδικός σας είναι:  "+found_user[0].password_again;
			////////
			//SendMail(mailOptions);
			/////////
			k = 2;
		}
		
		Anakoinoseis.find({}, function(err, anakoinoseis){
			if(err){
				console.log(err);
			}else{
				if(k === 1){
					res.render("home.ejs", { cookies:count , count:count, error : "Δεν υπάρχει το email που δόθηκε.", currentUser : req.user, anakoinoseis: anakoinoseis });
				}else{
					res.render("home.ejs", { cookies:count , count:count, success : "Στάλθηκε o κωδικός σας στο email.", currentUser : req.user, anakoinoseis: anakoinoseis });
				}
			}
		});
	});
});





app.get("/epanadora_kvdikou", function(req, res){
	res.render("epanadora_kvdikou.ejs", {cookies:count });
});

app.post("/epanadora_kvdikou", function(req, res){
	var email = req.body.email;
	
	User.find({
		
		email: email
		
	}, function(err, found_user){
		var k;
		
		if(err || found_user.length === 0){
			k = 1;
		}else{
			
			mailOptions = {};
			mailOptions.from = email_from;
			mailOptions.to = found_user[0].email;
			mailOptions.subject = "Oasa "+" - Υπενθύμιση κωδικού";
			mailOptions.text = "Ο κωδικός σας είναι:  "+found_user[0].password_again;
			////////
			//SendMail(mailOptions);
			/////////
			k = 2;
		}
		
		Anakoinoseis.find({}, function(err, anakoinoseis){
			if(err){
				console.log(err);
			}else{
				if(k === 1){
					res.render("home.ejs", { cookies:count , count:count, error : "Δεν υπάρχει το email που δόθηκε.", currentUser : req.user, anakoinoseis: anakoinoseis });
				}else{
					res.render("home.ejs", { cookies:count , count:count, success : "Στάλθηκε o κωδικός σας στο email.", currentUser : req.user, anakoinoseis: anakoinoseis });
				}
			}
		});
	});
});





app.listen(3000, function() {
	console.log("Oasa server has started!!!");
});
