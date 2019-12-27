var mongoose   = require("mongoose");
var Dromologia = require("./models/dromologia.js");
var User = require("./models/user.js");
var Anakoinoseis = require("./models/anakoinoseis.js");


var data = [
	{leoforeio: "250", 
	 afetiria: "Πανεπιστημιουπολη",
	 af_lat: 37.971829,		af_lng: 23.759213,
	 
	 
	 stasi1: "2η Σχολειο",
	 s1_lat: 37.971960, 	s1_lng: 23.757105,
	 
	 
	 stasi2: "Ευφρονιου",
	 s2_lat: 37.972219, 	s2_lng: 23.754686,
	 
	 
	 stasi3: "Βρυσακι",
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
	
	{leoforeio: "E90", 
	 afetiria: "Πανεπιστημιουπολη",
	 af_lat: 37.971829,		af_lng: 23.759213,
	 
	 
	 stasi1: "2η Σχολειο",
	 s1_lat: 37.971960, 	s1_lng: 23.757105,
	 
	 
	 stasi2: "Εφρονιου",
	 s2_lat: 37.972219, 	s2_lng: 23.754686,
	 
	 
	 stasi3: "Βρυσακι",
	 stasi4: "2η Ριζαρη",
	 stasi5: "Ευαγγελισμος",
	 stasi6: "Χιλτον",
	 stasi7: "Καραβελ",
	 stasi8: "Πυλη",
	 stasi9: "1η Πανεπιστημιουπολη",
	 stasi10: "2η Πανεπιστημιουπολη",
	 
	 
	 terma: "Πειραιας",
	 
	 arxizei: "10:00",
     teleiwnei: "23:00",
	 epomeno:	"20 λεπτά"
	},

	{leoforeio: "026", 
	 afetiria: "Ιπποκρατους",
	 af_lat: 37.988452,		af_lng: 23.746837,
	 
	 stasi1: "Τσιμισκη",
	 s1_lat:  37.986089, 	s1_lng: 23.743565,
	 
	 
	 stasi2: "Διδοτου",
	 s2_lat:  37.983459, 	s2_lng: 23.736807,
	 
	 
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
	 afetiria: "Γουδι",
	 af_lat: 37.980770,		af_lng: 23.770837,
	 
	 stasi1: "Γραμμου",
	 s1_lat:  37.982487, 	s1_lng: 23.772563,
	 
	 
	 stasi2: "Νοσοκομειο παιδων",
	 s2_lat:  37.983881, 	s2_lng: 23.768527,
	 
	 
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
    afetiria: "Π.Φαληρο",
	af_lat: 37.930109,		af_lng: 23.686302,

    stasi1: "Φορος",
	s1_lat:  37.932600, 	s1_lng: 23.690603,
	
	
    stasi2: "Ωνασειο",
	s2_lat:  37.942468, 	s2_lng: 23.697760,
	
	
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
	af_lat: 38.026306,		af_lng: 23.761203,

    stasi1: "Πυθιας",
	s1_lat: 38.020008, 		s1_lng: 23.756361,
	
	
    stasi2: "Συκια",
	s2_lat: 38.013867, 		s2_lng: 23.749910,
	
	
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
	af_lat: 37.974573,		af_lng: 23.735612,

    stasi1: "Συνταγμα",
	s1_lat: 37.973714, 		s1_lng: 23.735461,
	
	
    stasi2: "Σταθμος Ευαγγελισμος",
	s2_lat: 37.976331, 		s2_lng: 23.747933,
	
	
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
	af_lat: 37.987744,		af_lng: 23.729292,

    stasi1: "Πολυτεχνειο",
	s1_lat:  37.988466, 	s1_lng: 23.730334,
	
	
    stasi2: "Ναυαρινου",
	s2_lat:  37.983554, 	s2_lng: 23.734737,
	
	
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
	af_lat: 37.969932,		af_lng: 23.773197,

    stasi1: "Παλαιο Τερμα",
	s1_lat: 37.971882, 		s1_lng: 23.770353,
	
	
    stasi2: "7η Ιλισιων",
	s2_lat: 37.972599, 		s2_lng: 23.767561,
	
	
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
	af_lat: 37.964992,		af_lng: 23.776363,

    stasi1: "Παλ.Τερμα",
	s1_lat:  37.966645, 	s1_lng: 23.770049,
	
	
    stasi2: "10η Καισαριανης",
	s2_lat:  37.966992, 	s2_lng: 23.765009,
	
	
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
	af_lat: 38.009549,		af_lng: 23.807233,

    stasi1: "Τομπρα",
	s1_lat: 38.011420, 	s1_lng: 23.812616,
	
	
    stasi2: "Ερτ",
	s2_lat: 38.013731, 	s2_lng: 23.826283,
	
	
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
	}


]




/*
var data2 = [
	{username: "Nick", password: "1234", password_again: "1234", firstname: "Νικόλας", lastname: "Μακ", email: "sdi1500238@di.uoa.gr", phone: "123", AFM: "321", image: ""},
	{username: "John", password: "1234", password_again: "1234", firstname: "Γιάννης", lastname: "Ιωα", email: "sdi1600216@di.uoa.gr", phone: "456", AFM: "654", image: ""},
	{username: "Greg", password: "1234", password_again: "1234", firstname: "Γρηγόρης", lastname: "Γαλ", email: "sdi1600026@di.uoa.gr", phone: "789", AFM: "987", image: ""}
]
*/

var data3 = [
	{ anakoinosi: "Προσωρινή Τροποποίηση της Διαδρομής των Λεωφορειακών Γραμμών 725, 726 και Α10."},
	{ anakoinosi: "Προσωρινή Τροποποίηση της Διαδρομής της Λεωφορειακής Γραμμής 891, λόγω διεξαγωγής αγώνα στο Δημοτικό Στάδιο Περιστεριού."},
	{ anakoinosi: "Λειτουργία ΜΜΜ λόγω της διεξαγωγής του 6ου αγώνα δρόμου «SANTA RUN ATHENS» στο Δήμο Αθηναίων."},
	{ anakoinosi: "Μερική τροποποίηση των λεωφορειακών γραμμών Α1,218,915,500 (νυχτερινή) λόγω εργασιών στο Δήμο Πειραιά."},
	
	{ anakoinosi: "Προσωρινή Τροποποίηση της Διαδρομής των Λεωφορειακών Γραμμών 402, 411, 447, 450 και 460, καθώς και των Γραμμών Τρόλλεϋ 10, 18 και 19."},
	{ anakoinosi: "Μερική προσωρινή τροποποίηση της γραμμής τρόλεϊ 17 λόγω εργασιών στην οδό Ελ. Βενιζέλου του Δήμου Δραπετσώνας-Κερατσινίου."},
	{ anakoinosi: "Παράταση Προσωρινής Τροποποίησης της Λεωφορειακής Γραμμής 704."},
	{ anakoinosi: "Μερική τροποποίηση των λεωφορειακών γραμμών Α1,218,915,500 (νυχτερινή) λόγω εργασιών στο Δήμο Πειραιά"}
]



function date(a){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	dd = dd - a;

	today = dd + '/' + mm + '/' + yyyy;
	
	return today;
}



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
	
	
	Anakoinoseis.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed Anakoinoseis");
		
		var count = 0;
		
		data3.forEach(function(data){
			if (count < 4){
				
				Anakoinoseis.create({
					anakoinosi: data.anakoinosi,
					date: date(0)
				
				}, function(err, data3){
					if(err){
						console.log(err);
					}else{
						console.log("add anakoinosi");
					}
				});
			}else if(count < 6){
				
				Anakoinoseis.create({
					anakoinosi: data.anakoinosi,
					date: date(1)
				
				}, function(err, data3){
					if(err){
						console.log(err);
					}else{
						console.log("add anakoinosi");
					}
				});
			}else {
				
				Anakoinoseis.create({
					anakoinosi: data.anakoinosi,
					date: date(2)
				
				}, function(err, data3){
					if(err){
						console.log(err);
					}else{
						console.log("add anakoinosi");
					}
				});
			}
			
			count++;
		});
	});
	
	
	
	
	/*
	User.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed Users");
		
		data2.forEach(function(data){
			User.create(data, function(err, data2){
				if(err){
					console.log(err);
				}else{
					console.log("added a User");
				}
			});
		});
	});
	*/
}

module.exports = seedDB;


