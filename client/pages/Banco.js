import { Mongo } from 'meteor/mongo'
Meteor.subscribe('allDrugs');
export const Drugs = new Mongo.Collection('allDrugs');
export const Carrello = new Mongo.Collection('carrello', {connection: null});

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

Template.Banco.onCreated(function() {
	console.log(Session.get('drugs-to-show'));
	Session.set('quantity', 1);
	Session.set('stringToSearch','');
	this.autorun(() => {
		this.subscribe('allUsers');
		this.subscribe('allDrugs');
	});
});

Template.Banco.helpers({
	drugs: function() {
		return Drugs.find({ tipo: Session.get('drugs-to-show')});
	},
	drugGroup: function () {
		return Session.get('drugs-to-show');
	},
	farmaciConRicetta: function () {
		return Session.get('drugs-to-show') === 'Farmaci con ricetta';
	},
	open: function() {
		return Session.get('open-dettaglio');
	},
	img: function () {
		if (Session.get('currentDrug') != undefined) {

			return Session.get('currentDrug').imgSrc;
		}
	},
	nome: function () {
		if (Session.get('currentDrug') != undefined) {

			return Session.get('currentDrug').nome;
		}
	},
	formato: function () {
		if (Session.get('currentDrug') != undefined) {

			return Session.get('currentDrug').formato;
		}
	},
	prezzo: function () {
		if (Session.get('currentDrug') != undefined) {

			return formatPrice(Session.get('currentDrug').prezzo);
		}
	},
	descrizione: function () {
		if (Session.get('currentDrug') != undefined) {

			console.log(Session.get('currentDrug'));
			return Session.get('currentDrug').descrizione;
		}
	},
	quantity: function() {
		return Session.get('quantity');
	},
	contTerm: function() {
		return Session.get('cont-term');
	},
	ricettaDrugs: function() {
		if(Session.get('stringToSearch') && Session.get('stringToSearch') !== ''){
			var regEx = /[Session.get('stringToSearch')]/;
			return Drugs.find({ tipo: "Farmaci con ricetta" , "nome": Session.get('stringToSearch')}).fetch();
		}
	},
	ricercaPiena: function() {
		return Session.get('stringToSearch') !== ''; 
	}
});


Template.Banco.events({
	'click .close-icon': function () {
		Session.set('open-dettaglio', '');
		Session.set('cont-term', '');
	},
	'click .more': function() {
		Session.set('quantity', Session.get('quantity') + 1);
	},
	'click .less': function() {
		Session.set('quantity', Session.get('quantity') - 1);
	},
	'click .add-to-cart-btn': function() {
		Carrello.insert({
			product_id: Session.get('currentDrug')._id._str,
			quantity: Session.get('quantity'),
			img: Session.get('currentDrug').imgSrc,
			nome: Session.get('currentDrug').nome,
			formato: Session.get('currentDrug').formato,
			tipo: Session.get('currentDrug').tipo,
			prezzo: formatPrice(Session.get('currentDrug').prezzo * Session.get('quantity') )
		});
		Session.set('cont-term', 'cont-term-open');
		Session.set('quantity', 1);
		console.log(Carrello.findOne({product_id: Session.get('currentDrug')._id._str}));
	},
	'click .ordina-ancora-btn': function() {
		Session.set('open-dettaglio', '');
		Session.set('cont-term', '');
	},
	'submit .form-ricerca-farmaci'(event) {
        // Prevent default browser form submit
        event.preventDefault();
     
        // Get value from form element
        const target = event.target;
        var stringToSearch = event.currentTarget["0"].value.toLowerCase();
        Session.set('stringToSearch',stringToSearch);
 		event.currentTarget["0"].value = '';
 	},
 	'click .pulisci-ricerca' : function() {
 		Session.set('stringToSearch','');
 	}
});