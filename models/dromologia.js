var mongoose = require("mongoose");


var dromologiaSchema = new mongoose.Schema({
	leoforeio: String,

	afetiria: String,
	af_lat: Number,		af_lng: Number,
	
	stasi1:  String,
	s1_lat: Number , 	s1_lng: Number,
	
	stasi2:  String,
	s2_lat: Number , 	s2_lng: Number,
	
	stasi3:  String,
	stasi4:  String,
	stasi5:  String,
	stasi6:  String,
	stasi7:  String,
	stasi8:  String,
	stasi9:  String,
	stasi10: String,
	
	terma:   String,
	
    arxizei: String,	// wra pou arxizei vardia
    teleiwnei: String,	// wra pou teleiwnei vardia
	epomeno:	String	// kathe 20 lepta erxetai epomeno leoforeio
});


var Dromologia = mongoose.model("Dromologia", dromologiaSchema);
module.exports = Dromologia;