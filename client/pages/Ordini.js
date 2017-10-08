import './utilities.js';

Template.Ordini.helpers({
	ordini: function() {
		return Ordini.find({}, { sort: { createdAt: -1 }} );
	},
	items: function () {
		var items = 0;
		for (var i = 0; i < this.cart.length; i++) {
			items += this.cart[i].quantity;
		}
		return items;
	},
	total: function () {
		var total = 0;
		for (var i = 0; i < this.cart.length; i++) {
			total += parseFloat(this.cart[i].prezzo);
		}
		var addZero = Math.round(   (total - Math.floor(total)  ) * 100) % 10 == 0;
		if(addZero) {
			total = '' + total + '0';
		}
		return '' + total;
	},
	ordineSelezionato: function() {
		return Session.get('currentOrdine') != undefined;
	},
	date: function() {
		return formatDate(this.createdAt);
	},
	visibile: function() {
		return Session.get('dettaglio-ordine-visibile');
	},
	carrello: function() {
		return Session.get('currentOrdine').cart;
	},
	idOrdine: function() {
		return Session.get('currentOrdine')._id;
	},
	currentStatus: function() {
		return Session.get('currentOrdine').status;
	},
	codCliente: function() {
		return Session.get('currentOrdine').user;
	},
	nomeCliente: function() {
		var nome = Meteor.users.find({ _id: Session.get('currentOrdine').user}, {nome : 1}).fetch()[0].profile.firstName;
		return nome;
	},
	daSpedire: function() {
		return Session.get('currentOrdine').status == 'In attesa';
	}
});

Template.Ordini.events({
	'click .clickable': function(event) {
		var ordine = Ordini.find({_id: event.target.id }).fetch()[0];
		Session.set('dettaglio-ordine-visibile', 'visible');
		Session.set('currentOrdine', ordine);
	},
	'click .close-ordine': function() {
		Session.set('dettaglio-ordine-visibile', '');
	},
	'click .ordine-spedito': function() {
		Meteor.call('spedisciOrdine', Session.get('currentOrdine'));
		if(Session.get('currentOrdine').status == 'In attesa') {
			alert("Nuovo stato dell'ordine: SPEDITO");
		} else {
			alert("Nuovo stato dell'ordine: IN ATTESA");
		}
		Session.set('dettaglio-ordine-visibile', '');	
	}
});



/**
 * Format a date ad dd-MMM-yyyy
 * @param {Object} date - the date to be formatted
 * @return {String}  the string containing the formatted date
 */
function formatDate(date) {
  var monthNames = [
	"JAN", "FEB", "MAR",
	"APR", "MAY", "JUN", "JUL",
	"AUG", "SEP", "OCT",
	"NOV", "DEC"
  ];

  var hour = date.getHours();
  var minute = date.getMinutes();
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  return formatNumber(day,2) + '/' + monthNames[month] + '/' + year + '\t' + formatNumber(hour,2) + ':' + formatNumber(minute,2);
}

/**
 * Format a code adding some zeros where some digits are missing
 * @param {Number} id - the initial not formatted code
 * @param {Number} maxDigits - the number of digits to reach
 * @return {Number}  formattedId - the formatted code
 */
function formatNumber(num,maxDigits) {
	var initialNumberOfDigits = countDigits(num);
	var zeros;
	if(num != 0) {
		zeros = maxDigits - initialNumberOfDigits;
	} else {
		zeros = maxDigits - initialNumberOfDigits - 1;
	}
	var formattedId = '';

	for(var i = 0; i < zeros; i++){
		formattedId += '0';
	}
	formattedId += num;

	return formattedId;
}

/**
 * Count the digits of an integer number
 * @param {Number} number - the number to be checked
 * @return {Number}  digits - the number of digits
 */
function countDigits(number) {
	//calculate the number of digits of the id
	var digits = 0;
	do{
		if(number >= 1){
			number /= 10;
			digits++;
		}	
	}while(number >= 1);

	return digits;
}
