var mongoose   = require("mongoose");
var Dromologia = require("./models/dromologia.js");
var User = require("./models/user.js");


var data = [
	{leoforeio: "250", 
	 afetiria: "Πανεπιστημιουπολη",
	 
	 stasi1: "2η Σχολειο",
	 stasi2: "Βρυσακι",
	 stasi3: "Εφρονιου",
	 stasi4: "2η Ριζαρη",
	 stasi5: "Ευαγγελισμος",
	 stasi6: "Χιλτον",
	 stasi7: "Καραβελ",
	 stasi8: "Πυλη",
	 stasi9: "1η Πανεπιστημιουπολη",
	 stasi10: "2η Πανεπιστημιουπολη",
	 
	 
	 terma: "Φιλοσοφικη",
	 
	 arxizei: "10:00",
     teleiwnei: "23:00",
	 epomeno:	"20 λεπτά"
	},
	
	{leoforeio: "026", 
	 afetiria: "Ιπποκρατους",
	 
	 stasi1: "Τσιμισκη",
	 stasi2: "Διδοτου",
	 stasi3: "Ακαδημιας",
	 stasi4: "Ομηρου",
	 stasi5: "Συνταγμα",
	 stasi6: "Μοναστηρακι",
	 stasi7: "Ικα",
	 stasi8: "Σιδερα",
	 stasi9: "Κοζανης",
	 stasi10: "Λαγκαδα",
	 
	 
	 terma: "Βοτανικος",
	 
	 arxizei: "7:00",
     teleiwnei: "23:00",
	 epomeno:	"20 λεπτά"
	},
	
	{leoforeio: "032", 
	 afetiria: "Γουδη",
	 
	 stasi1: "Γραμμου",
	 stasi2: "Νοσοκομειο παιδων",
	 stasi3: "Λαικο",
	 stasi4: "Οτε",
	 stasi5: "Αλεξ",
	 stasi6: "Καφενειο",
	 stasi7: "Ιλισια",
	 stasi8: "2η Ιλισια",
	 stasi9: "Πλατεια Ιλισια",
	 stasi10: "Μαρασλειος",
	 
	 
	 terma: "Μαρασλειος",
	 
	 arxizei: "6:00",
     teleiwnei: "22:00",
	 epomeno:	"30 λεπτά"
	},
	
	{
    leoforeio: "550",
    afetiria: "Π.Φαλιρο",

    stasi1: "Φορος",
    stasi2: "Ωνασειο",
    stasi3: "Σκρα",
    stasi4: "Στροφη Ν.Σμυρνης",
    stasi5: "Ολυμπιακη",
    stasi6: "Στ.Συγγρου-Φιξ",
    stasi7: "Πινακοθηκη",
    stasi8: "Ιλισια",
    stasi9: "Ζερβα",
    stasi10: "Ολυμπιακο Σταδιο",

    terma: "Κηφισια",

    arxizei: "6:00",
    teleiwnei: "23:00",
    epomeno: "22 λεπτά"
	},
	
	{
    leoforeio: "608",
    afetiria: "Γαλατσι",

    stasi1: "Πυθιας",
    stasi2: "Συκια",
    stasi3: "Βορειος Πολος",
    stasi4: "Πλατεια Κολατσιου",
    stasi5: "Λυσσιατρειο",
    stasi6: "Καλλιφορνα",
    stasi7: "Ακαδημιας",
    stasi8: "Νοσοκομειο Ευαγγελισμος",
    stasi9: "Ικα",
    stasi10: "6η Ζωγραφου",

    terma: "Νεκροταφειο Ζωγραφου",

    arxizei: "6:00",
    teleiwnei: "23:00",
    epomeno: "20 λεπτά"
	},

	{
    leoforeio: "Ε14",
    afetiria: "Ζαππειο",

    stasi1: "Συνταγμα",
    stasi2: "Σταθμος Ευαγγελισμος",
    stasi3: "Ιλισια",
    stasi4: "Αμπελοκηποι",
    stasi5: "Ερυθρος Σταυρος",
    stasi6: "Αγ.Βαρβαρα",
    stasi7: "Υγεια",
    stasi8: "Ολυμπιακο Σταδιο",
    stasi9: "Διονυσου",
    stasi10: "Ερατω",

    terma: "Υπ.Παιδιας",

    arxizei: "6:00",
    teleiwnei: "23:00",
    epomeno: "25 λεπτά"
	},

	{
    leoforeio: "Α7",
    afetiria: "Στουρναρη",

    stasi1: "Πολυτεχνειο",
    stasi2: "Ναυαρινου",
    stasi3: "Τσιμισκη",
    stasi4: "Ιπποκρατους",
    stasi5: "Ικα",
    stasi6: "Αμπελοκηποι",
    stasi7: "Ερυθρος Σταυρος",
    stasi8: "Κατεχακη",
    stasi9: "Σερρων",
    stasi10: "Ολυμπιακο Σταδιο",

    terma: "Πλατεια Πλατανου",

    arxizei: "6:00",
    teleiwnei: "23:00",
    epomeno: "28 λεπτά"
	},

	{
    leoforeio: "221",
    afetiria: "Ζωγραφου",

    stasi1: "Παλαιο Τερμα",
    stasi2: "7η Ιλισιων",
    stasi3: "Φοιτητ.Εστια",
    stasi4: "Νοσοκ.Συγγρου",
    stasi5: "Χιλτον",
    stasi6: "Συνταγμα",
    stasi7: "Ακαδημιας",
    stasi8: "Νοσοκομειο Ευαγγελισμος",
    stasi9: "Ευφρονιου",
    stasi10: "6η Ιλισιων",

    terma: "Ζωγραφου",

    arxizei: "6:00",
    teleiwnei: "23:00",
    epomeno: "37 λεπτά"
	},

	{
    leoforeio: "224",
    afetiria: "Καισαριανης",

    stasi1: "Παλ.Τερμα",
    stasi2: "10η Καισαριανης",
    stasi3: "Παναγιτσα",
    stasi4: "Αστυνομια",
    stasi5: "Χιλτον",
    stasi6: "Νοσοκ.Ευαγγελισμος",
    stasi7: "Νομικη",
    stasi8: "Πολυτεχνειο",
    stasi9: "Πεδιον Αρεως",
    stasi10: "1η Ελ.Βενιζελου",

    terma: "Τερμα Ελ.Βενιζελου",

    arxizei: "6:00",
    teleiwnei: "23:00",
    epomeno: "45 λεπτά"
	},

	{
    leoforeio: "305",
    afetiria: "Στ.Νομισματοκοπειου",

    stasi1: "Τομπρα",
    stasi2: "Ερτ",
    stasi3: "Σταυρος",
    stasi4: "Β.Ρωτα",
    stasi5: "Πυργος",
    stasi6: "Ασυρματος",
    stasi7: "Σχολειο",
    stasi8: "Ορφανοτροφειο",
    stasi9: "Ξυροτυρι",
    stasi10: "Γηπεδο",

    terma: "Αρτεμις(Αγ.Νικολαος)",

    arxizei: "7:00",
    teleiwnei: "24:00",
    epomeno: "50 λεπτά"
	},

	{
    leoforeio: "402",
    afetiria: "Στ.Κατεχακη",

    stasi1: "Γενικο Κρατικο",
    stasi2: "Παλαμα",
    stasi3: "Σιδερα",
    stasi4: "Χαιμαντα",
    stasi5: "Πλ.Δουρου",
    stasi6: "Ριζαρειος",
    stasi7: "1η Πολυδροσου",
    stasi8: "Γιασεμιων",
    stasi9: "Κρινων",
    stasi10: "4η Πολυδροσου",

    terma: "Πολυδροσο",

    arxizei: "6:00",
    teleiwnei: "26:00",
    epomeno: "30 λεπτά"
	},

	{
    leoforeio: "447",
    afetiria: "Χαλανδρι",

    stasi1: "Χαιμαντα",
    stasi2: "Αγιος Παντελεημονας",
    stasi3: "Ιωαννινων",
    stasi4: "Ταυγετου",
    stasi5: "Σκρα",
    stasi6: "Πρωτεως",
    stasi7: "Μακεδονιας",
    stasi8: "Ολυμπου",
    stasi9: "Ερμου",
    stasi10: "Ναυτικη Βαση",

    terma: "Ανω Βριλησσια",

    arxizei: "6:00",
    teleiwnei: "23:00",
    epomeno: "20 λεπτά"
	},

	{
    leoforeio: "530",
    afetiria: "Στ.Κηφισιας",

    stasi1: "Ζηρνειο",
    stasi2: "Καρπαθου",
    stasi3: "Αγ.Νεκταριος",
    stasi4: "Φουρνος",
    stasi5: "Γουναρη",
    stasi6: "Νιεν",
    stasi7: "Καπη",
    stasi8: "Σχολειο",
    stasi9: "Πλ.Ν.Πεντελης",
    stasi10: "Πλατεια Αγ.Σιλα",

    terma: "Ν.Πεντελη",

    arxizei: "6:00",
    teleiwnei: "23:00",
    epomeno: "15 λεπτά"
	},

	{
    leoforeio: "801",
    afetiria: "Πειραιας Πλ.Καραισκακη",

    stasi1: "Αλων",
    stasi2: "Λευκα",
    stasi3: "Ζερβου",
    stasi4: "Σινεμα",
    stasi5: "Μελισσα",
    stasi6: "Κερανης",
    stasi7: "Τ.Ε.Ι. Πειραια",
    stasi8: "Γεφυρακι",
    stasi9: "Οτε",
    stasi10: "Κουνελια",

    terma: "Παλασκα",

    arxizei: "6:00",
    teleiwnei: "23:00",
    epomeno: "20 λεπτά"
	},

	{
    leoforeio: "855",
    afetiria: "Ψαρι",

    stasi1: "5η Ψαρι",
    stasi2: "Γεφυρα",
    stasi3: "6η Κορυτσας",
    stasi4: "Μιαουλη",
    stasi5: "Πλατεια Φουσας",
    stasi6: "Προαστιακος",
    stasi7: "Οσε",
    stasi8: "3η Φουσας",
    stasi9: "Κεμ",
    stasi10: "Αγ.Παρασκευη",

    terma: "Λοφος Κυριλλου",

    arxizei: "6:00",
    teleiwnei: "23:00",
    epomeno: "25 λεπτά",
	},

	{
    leoforeio: "Α10",
    afetiria: "Στ.Λαρισης",

    stasi1: "Λιοσιων",
    stasi2: "Παιωνιου",
    stasi3: "Θυμαρακια",
    stasi4: "Βρεττου",
    stasi5: "Μητερα",
    stasi6: "Μουσικο Σχολειο Ιλιου",
    stasi7: "Κυκλαδων",
    stasi8: "Αττικη Οδος",
    stasi9: "Σοφ.Πεππα",
    stasi10: "Τζαβελλα",

    terma: "Αχαρναι",

    arxizei: "10:00",
    teleiwnei: "22:00",
    epomeno: "20 λεπτά"
	},

	{
    leoforeio: "Β5",
    afetiria: "Στ.Λαρισης",

    stasi1: "Μιχ.Βοδα",
    stasi2: "Παιδιον Αρεως",
    stasi3: "Βραιλα",
    stasi4: "Παναθηναια",
    stasi5: "Ιπποκρατους",
    stasi6: "Στ.Αμπελοκηποι",
    stasi7: "Γαλαξιας",
    stasi8: "Σχολη Αστυνομιας",
    stasi9: "Στ.Κατεχακη",
    stasi10: "Τομπρα",

    terma: "Αγ.Παρασκευη",

    arxizei: "7:00",
    teleiwnei: "23:00",
    epomeno: "40 λεπτά"
	},

	{
    leoforeio: "Χ95",
    afetiria: "Συνταγμα",

    stasi1: "Χιλτον",
    stasi2: "Ιλισια",
    stasi3: "Γαλαξιας",
    stasi4: "Ζαγορα",
    stasi5: "Σχολη Αστυνομιας",
    stasi6: "Στ.Νομισματοκοπειο",
    stasi7: "Πυργος",
    stasi8: "Σεα",
    stasi9: "Αττικες Διαδρομες",
    stasi10: "Τελωνειο",

    terma: "Κτηριο Αναχωρησεων",

    arxizei: "6:00",
    teleiwnei: "6:00",
    epomeno: "35 λεπτά"
	}
]





var data2 = [
	{username: "Nick", password: "1234", password_again: "1234", firstname: "Νικόλας", lastname: "Μακ", email: "sdi1500238@di.uoa.gr", phone: "123", AFM: "321", image: ""},
	{username: "John", password: "1234", password_again: "1234", firstname: "Γιάννης", lastname: "Ιωα", email: "sdi1600216@di.uoa.gr", phone: "456", AFM: "654", image: ""},
	{username: "Greg", password: "1234", password_again: "1234", firstname: "Γρηγόρης", lastname: "Γαλ", email: "sdi1600026@di.uoa.gr", phone: "789", AFM: "987", image: ""}
]





function seedDB(){
	// Remove alla Dromologia
	Dromologia.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed Dromologia");
		// add a few Dromologia
		data.forEach(function(seed){
			Dromologia.create(seed, function(err, data){
				if(err){
					console.log(err);
				}else{
					console.log("added a Dromologia");
				}
			});
		});
	});
	
	User.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed Users");
		
		data2.forEach(function(seed){
			User.create(seed, function(err, data2){
				if(err){
					console.log(err);
				}else{
					console.log("added a User");
				}
			});
		});
	});
}

module.exports = seedDB;


