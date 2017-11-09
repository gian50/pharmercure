// Home Page
FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render("HomeLayout", {main: "Home"});
    }
});

// Dashboard
FlowRouter.route('/dashboard', {
    name: 'dashboard',
    action() {
        BlazeLayout.render("AppLayout", {main: "Dashboard"});
    }
});

// Banco List
FlowRouter.route('/banco-list', {
    name: 'banco-list',
    action() {
        if(Session.get('currentCap')) {
            BlazeLayout.render("AppLayout", {main: "Banco"});
        } else {
            FlowRouter.go('/') ;
        }
    }
});
// Utente
FlowRouter.route('/utente', {
    name: 'utente',
    action() {
        BlazeLayout.render("MainLayout", {main: "Utente"});
    }
});
// Prodotti
FlowRouter.route('/products', {
    name: 'products',
    action() {
        if(Session.get('currentCap')) {
            BlazeLayout.render("AppLayout", {main: "Products"});
        } else {
            FlowRouter.go('/') ; 
        }
    }
});

// Carrello
FlowRouter.route('/cart', {
    name: 'cart',
    action() {
        if(Session.get('currentCap')) {
            BlazeLayout.render("AppLayout", {main: "Cart"});
        } else {
            FlowRouter.go('/') ; 
        }
    }
});

// Ordini
FlowRouter.route('/ordini', {
    name: 'ordini',
    action() {
        BlazeLayout.render("DesktopLayout", {main: "Ordini"});
    }
});

var adminRoutes = FlowRouter.group({
	prefix: '/admin',
	name: 'admin'
});

adminRoutes.route('/users',{
	name: 'users',
    action() {
        BlazeLayout.render("MainLayout", {main: "Users"});
    }
});

adminRoutes.route('/farmacie',{
    name: 'farmacie',
    action() {
        BlazeLayout.render("MainLayout", {main: "Farmacie"});
    }
});