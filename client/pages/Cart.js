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
	},
	cartTotal: function() {
		return Carrello.find().fetch().reduce(function(total,drug) {
			return total + parseFloat(drug.prezzo);
		},0).toFixed(2);
	},
	scegliOpen: function() {
		return Session.get('mostra-farmacie-asti');
	}
});

Template.Cart.events({
	'click .close-icon': function() {
		Carrello.remove(this._id);
	},
	'click .close-scegli': function() {
		Session.set('mostra-farmacie-asti','');
	},
	'click .inoltra-ordine-btn': function() {
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
		//Session.set('mostra-farmacie-asti','scegli-open');
	},
	'click .img-farmacia': function() {
		if(Carrello.find().fetch().length != 0){
			if(Session.get('currentCap') != ''){
				Ordini.insert({ cap: Session.get('currentCap'), cart: Carrello.find().fetch(), createdAt: new Date(), user: Meteor.userId(), status: "In attesa"});
				//Session.set('confermaOrdineOpen', 'conferma-ordine-open');
				alert('Ordine effettuato');
				Session.set('newOrder', 'play');
				Session.set('newOrder', '');
				Session.set('mostra-farmacie-asti','');
				Carrello.remove({});
			} else {
				alert('Inserire CAP');
			}
			
		}else {
			alert("Carrello vuoto. Selezionare almeno un prodotto per effettuare l'ordine."); 
		}
	}
});

Template.DrugInCart.helpers({
	defaultImg: function() {
		return (this.tipo ==='Farmaci con ricetta') ? 'logo_short.png' : '';
	}
})