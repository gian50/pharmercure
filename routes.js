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
        BlazeLayout.render("AppLayout", {main: "Banco"});
    }
});

// Prodotti
FlowRouter.route('/products', {
    name: 'products',
    action() {
        BlazeLayout.render("AppLayout", {main: "Products"});
    }
});

// Carrello
FlowRouter.route('/cart', {
    name: 'cart',
    action() {
        BlazeLayout.render("AppLayout", {main: "Cart"});
    }
});

// Ordini
FlowRouter.route('/ordini', {
    name: 'ordini',
    action() {
        BlazeLayout.render("MainLayout", {main: "Ordini"});
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