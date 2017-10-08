var myPostSubmitFunc = function(userId, info) {
	console.log(userId);
	console.log(info.profile.profession);
	Roles.addUsersToRoles(userId, ['normal user',info.profile.profession]);
};

AccountsTemplates.configure({
	postSignUpHook: myPostSubmitFunc
});