Template.CapBar.helpers({
	currentCap: function() {
		return Session.get('currentCap');
	},
	quartiere: function() {
		return Farmacie.find({ cap: Session.get('currentCap') }).fetch()[0].quartiere;
	},
	provincia: function() {
		return Farmacie.find({ cap: Session.get('currentCap') }).fetch()[0].provincia;
	}
});