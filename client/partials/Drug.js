function formatPrice(price) {
	var decimalPart = price - Math.floor(price);
	if(decimalPart == 0) {
		return "" + Math.floor(price) +".00";
	}
	else if(decimalPart < 10) {
		return "" + Math.floor(price) +"." + Math.round(decimalPart*100);
	}

	return Math.round(price*Math.pow(10,2))/Math.pow(10,2);
}

Template.Drug.helpers({
	prezzoFormattato: function() {
		return formatPrice(this.prezzo);
	}
});

Template.Drug.events({
	'click .drug-box': function() {
		Session.set('currentDrug', this);
		Session.set('open-dettaglio', 'dettaglio-open');
	}
});