import { Carrello } from './Banco.js'
import { Drugs } from './Banco.js'
import { Mongo } from 'meteor/mongo'
Meteor.subscribe('ordini');
Ordini = new Mongo.Collection('ordini');

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


Template.Cart.helpers({
	cart: function() {
		return Carrello.find();
	},
	confermaOpen: function() {
		return Session.get('confermaOrdineOpen');
	},
	carrelloVuoto: function() {
		return Carrello.find().fetch().length === 0;
	}
});

Template.Cart.events({
	'click .close-icon': function() {
		Carrello.remove(this._id);
	},
	'click .inoltra-ordine-btn': function() {
			console.log('cose');
		if(Carrello.find().fetch().length != 0){
			if(Session.get('currentCap') != ''){
				Ordini.insert({ cap: Session.get('currentCap'), cart: Carrello.find().fetch(), createdAt: new Date(), user: Meteor.userId(), status: "In attesa"});
				//Session.set('confermaOrdineOpen', 'conferma-ordine-open');
				alert('Ordine effettuato');
				Session.set('newOrder', 'play');
				Session.set('newOrder', '');
				Carrello.remove({});
			} else {
				alert('Inserire CAP');
			}
			
		}else {
			alert("Carrello vuoto. Selezionare almeno un prodotto per effettuare l'ordine."); 
		}
	}
});