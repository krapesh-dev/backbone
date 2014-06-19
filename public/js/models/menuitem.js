var MenuItem = Backbone.Model.extend({
  urlRoot: '/items',  
  defaults: {
      category: 'Entree',
      imagepath: 'garden-salad.jpg',
      name: ''
  }
});