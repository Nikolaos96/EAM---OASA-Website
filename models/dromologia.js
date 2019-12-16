var mongoose = require("mongoose");


var dromologiaSchema = new mongoose.Schema({
	leoforeio: String,

	afetiria: String,
	
	stasi1:  String,
	stasi2:  String,
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