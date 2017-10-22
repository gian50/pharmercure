
let accetableCaps = ['10149'];

Template.Home.events({
	'submit .open-list'(event) {
        // Prevent default browser form submit
        event.preventDefault();
     
        // Get value from form element
        const target = event.target;
        //const text = target.number.value;
        var insertedCap = event.currentTarget["0"].value;
        var foundCap = Farmacie.find({ cap: insertedCap}).fetch().length != 0;
        if(foundCap) {
             console.log(event.currentTarget["0"].value);
             Session.set('currentCap',event.currentTarget["0"].value);
             FlowRouter.go('/products') ;
        } else {
          alert('CAP non disponibile');
        }
 	}
});