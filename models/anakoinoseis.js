var mongoose = require("mongoose");

var anakoinoseisSchema = new mongoose.Schema({
	anakoinosi: String,

	date: String
});


var Anakoinoseis = mongoose.model("Anakoinoseis", anakoinoseisSchema);
module.exports = Anakoinoseis;