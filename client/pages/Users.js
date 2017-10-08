import moment from 'moment';

Template.Users.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allUsers');
	});
});

Template.Users.helpers({
	users: function() {
		return Meteor.users.find();
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
	}
});

Template.Users.events({
	'click .user-id': function() {
		console.log(this);
		Session.set('currentUser', this);
	},
	'click .toggle-admin': function() {
		var isAdm = Roles.userIsInRole(this._id, 'admin');
		Meteor.call('toggleAdmin',this._id, isAdm);
	},
	'click .toggle-farma': function() {
		console.log(this)
		var isFarma = Roles.userIsInRole(this._id, 'farma');
		Meteor.call('toggleFarma',this._id, isFarma);
	},
	'click .close-edit-mode': function() {
		Session.set('currentUser', null);
	}
});