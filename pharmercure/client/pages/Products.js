Meteor.subscribe('farmacie');
Farmacie = new Mongo.Collection('farmacie');

Template.Products.events({
	'click #banco-icon': function() {
		Session.set('drugs-to-show', 'Farmaci da banco');
	},
	'click #ricetta-icon': function() {
		Session.set('drugs-to-show', 'Farmaci con ricetta');
	},
	'click #cosmetici-icon': function() {
		Session.set('drugs-to-show', 'Cosmetici');
	},
	'click #altro-icon': function() {
		Session.set('drugs-to-show', 'Altro');
	},

});