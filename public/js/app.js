var AppRouter = Backbone.Router.extend({
	routes: {
		"": "list",
		"menu-items/new": "itemForm",
		"menu-items/:item": "itemDetails",
		"/menu-items/new": "itemForm",
		"categories/:category": "categoryDetails",
		"orders/:item" : "orderItem"
	},

	initialize: function() {
		this.menuItemsCollection = new MenuItems();
		this.menuItemsCollection.fetch();

		this.menuItemModel = new MenuItem();
		this.menuItemView  = new MenuItemDetails({
			model: this.menuItemModel
		})

		this.orderItems = new MenuItems();
		this.orderView  = new OrderView({
			collection: this.orderItems
		});

		this.menuItemForm = new MenuItemForm({
			//model: new MenuItem()
		});
		//this.menuListModel = new MenuList();

		this.menuView = new MenuView({
			collection: this.menuItemsCollection
		});

		this.menuCategoryView = new MenuCategoryView({
			category: 'Entree',
			images: [
				"brownie.jpg",
				"pizza.jpg",
				"cheeseburger.jpg"
			]
		})
	},

	list: function () {		
		$('#app').html(this.menuView.render().el);
	},

	itemDetails: function (item) {
		//this.menuItemModel.set('id', item);
		//this.menuItemModel.fetch();
		this.menuItemView.model = this.menuItemsCollection.get(item);		
		$("#app").html(this.menuItemView.render().el);
	},

	itemForm: function () {
		$('#app').html(this.menuItemForm.render().el);
	},

	categoryDetails: function(category) {
		this.menuCategoryView.options.category = category;
		$("#app").html(this.menuCategoryView.render().el);
	},

	orderItem: function(item) {
		var menuItem = this.menuItemsCollection.get(item);
		this.orderItems.add(menuItem);
		$("#app").html(this.orderView.render().el);
	}
});

var app = new AppRouter();

$(function() {
	Backbone.history.start();
});