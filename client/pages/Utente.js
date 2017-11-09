Template.Utente.helpers({
	user: function() {
		return Meteor.user();
	},
	email: function() {
		return Meteor.user().emails[0];
	}
});

Template.Utente.events({
	'click .logout-btn': function() {
		Meteor.logout();
		alert('Logout');
		FlowRouter.go('/');
	},
	'click .head-img': function() {
		FlowRouter.go('/');
	}
})