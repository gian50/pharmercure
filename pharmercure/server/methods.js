 

Meteor.methods({
  toggleAdmin(id,admin) {
    console.log(id);
    if (admin) {
			Roles.removeUsersFromRoles(id, 'admin');
		} else {
			Roles.addUsersToRoles(id, 'admin');
		}
    return 'some return value';
  },
  toggleFarma(id,farma) {
    console.log(id);
    if (farma) {
			Roles.removeUsersFromRoles(id, 'farma');
		} else {
			Roles.addUsersToRoles(id, 'farma');
		}
    return 'some return value';
  },
  updateFarmacia(currentCup, nomeTitolare) {
  	Farmacie.update( {cap: currentCup}, { $set: { referente: nomeTitolare}});
  },
  spedisciOrdine(ordine) {
  	if(ordine.status == 'In attesa') {
  		Ordini.update({ _id: ordine._id }, { $set: {status: "Spedito"}});
  	} else {
  		Ordini.update({ _id: ordine._id }, { $set: {status: "In attesa"}});
  	}
  }  
});