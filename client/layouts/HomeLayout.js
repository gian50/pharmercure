Template.HomeLayout.events({
	'click .login-toggle': ()=> {
		console.log('clik')
			if(Meteor.userId()) {
				Meteor.logout();
				alert('Logout');
				Session.set('nav-toggle','');
			} else {
				Session.set('nav-toggle','open');
			}
		}

});