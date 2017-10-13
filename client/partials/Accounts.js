var myLogoutFunc = function() {
	Session.set('nav-toggle', '');
	FlowRouter.go('/');
};

AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    sendVerificationEmail: true,
    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',
    // Hooks
    onLogoutHook: myLogoutFunc
});

AccountsTemplates.addFields([
   	{
   		 _id: 'nome',
	    type: 'text',
	    displayName: 'Nome',
	    placeholder: {
	        signUp: "Nome"
	    },
	    required: true,
	    //minLength: 6,
	    //re: /(?=.*[a-z])(?=.*[A-Z])/,
   		//errStr: '1 lowercase and 1 uppercase letters required',
	},
	{
   		 _id: 'cognome',
	    type: 'text',
	    displayName: 'Cognome',
	    placeholder: {
	        signUp: "Cognome"
	    },
	    required: true,
	    //minLength: 6,
	    //re: /(?=.*[a-z])(?=.*[A-Z])/,
   		//errStr: '1 lowercase and 1 uppercase letters required',
	},
	{
        _id: 'telefono',
        type: 'tel',
        displayName: "Numero di telefono",
        required: true,
    },
    {
        _id: 'codiceFiscale',
        type: 'text',
        displayName: "Codice Fiscale",
        required: true,
    },
    {
        _id: 'indirizzo',
        type: 'text',
        displayName: "Indirizzo",
        required: true,
    },
    {
        _id: 'cap',
        type: 'text',
        displayName: "CAP",
        required: true,
    },
    
    /*{
        _id: 'type',
        type: 'select',
        displayName: "Type",
        select: [
			{
				text: 'Utente',
				value: 'utente'
			}, {
				text: 'Farmacia',
				value: 'farmacia'
			}, {
				text: 'Other',
				value: 'other'
			}
		]
    }*/
]);