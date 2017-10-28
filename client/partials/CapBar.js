Template.CapBar.helpers({
	currentCap: function() {
		return Session.get('currentCap');
	},
	quartiere: function() {
		if(Farmacie.find({ cap: Session.get('currentCap') }).fetch()[0].quartiere !== undefined)
		return ' ' + Farmacie.find({ cap: Session.get('currentCap') }).fetch()[0].quartiere;
	},
	provincia: function() {
		return Farmacie.find({ cap: Session.get('currentCap') }).fetch()[0].provincia;
	},
	comune: function() {
		return Farmacie.find({ cap: Session.get('currentCap') }).fetch()[0].comune;
	}
});