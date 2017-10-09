
Meteor.publish('allUsers', function(){
	if(Roles.userIsInRole(this.userId,'admin')){
		return Meteor.users.find({});
	}
});

	
Drugs = new Mongo.Collection('allDrugs');
Farmacie = new Mongo.Collection('farmacie');
Ordini = new Mongo.Collection('ordini');

Meteor.publish('allDrugs', function(){
		return Drugs.find();
});

Meteor.publish('farmacie', function(){
		return Farmacie.find();
});

Meteor.publish('ordini', function(){
    return Ordini.find();
});

Drugs.allow({
    'insert': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    }
  });

Farmacie.allow({
    'insert': function (userId,doc) {
      return true; 
    }
  });

Ordini.allow({
    'insert': function (userId,doc) {
      return true; 
    }
  });