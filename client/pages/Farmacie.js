import moment from 'moment';

Template.Farmacie.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allUsers');
		this.subscribe('farmacie');
	});
});

Template.Farmacie.helpers({
	farmacie: function() {
		return Meteor.users.find( { roles: { $in: ["farma"] } });
	},
	userEmail: function() {
		return this.emails[0].address;
	},
	isAdmin: function() {
		return Roles.userIsInRole(this._id, 'admin') ? 'admin' : '';
	},
	isFarmacia: function() {
		return Roles.userIsInRole(this._id, 'farma') ? 'farma' : '';
	},
	dateFormat: function() {
		return moment(this.createdAt).format('MMMM D YYYY');
	},
	editMode: function() {
		return Session.get('currentUser') ? 'edit-mode' : '';
	},
	currentEdit: function() {
		let user = Session.get('currentUser');
		return user._id === this._id;
	},
	referente: function() {
		if(this.profile != undefined && this.profile.cap != undefined) {
			return Farmacie.find({cap: this.profile.cap}, {referente: 1}).fetch()[0].referente;
		}
	},
	nome: function() {
		if(this.profile != undefined && this.profile.cap != undefined) {
			return Farmacie.find({cap: this.profile.cap}, {nome: 1}).fetch()[0].nome;
		}
	}
});

Template.Farmacie.events({
	'click .user-id': function() {
		console.log(this);
		Session.set('currentUser', this);
	},
	'submit .aggiorna-farmacia': function(event) {
		event.preventDefault();
		var nomeTitolare = event.target[0].value;
		Meteor.call('updateFarmacia', Session.get('currentUser').profile.cap, nomeTitolare);
	}
});