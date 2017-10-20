Template.HeaderPharm.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allUsers');
	});
});

Template.HeaderPharm.events({
	'click .login-toggle': ()=> {
			if(Meteor.userId()) {
				Meteor.logout();
				alert('Logout');
				Session.set('nav-toggle','');
			} else {
				Session.set('nav-toggle','open');
			}
		}

});

console.log(Meteor.userId());

Template.HeaderPharm.helpers({
	userName: function() {
		//console.log( Meteor.users.find({_id: Meteor.userId()}));
		return Meteor.users.find({ _id: Meteor.userId() }).fetch()[0].profile.firstName;
	}
});