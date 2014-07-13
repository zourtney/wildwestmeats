/*global _ */
'use strict';

/**
 * @ngdoc function
 * @name fauxcart.products:inventory
 * @description
 * # Inventory
 */
angular.module('fauxcart.products')

/**
 * Default set of inventory to start the application with. Anything stored to
 * `localStorage` will take precedence over this data set.
 */
.factory('defaultInventory', function() {
  return [
    {
      id: 1,
      name: 'Product A',
      price: 20
    },
    {
      id: 2,
      name: 'Product B',
      price: 50
    },
    {
      id: 3,
      name: 'Product C',
      price: 30
    }
  ];
})

/**
 * Manager service for all available products.
 */
.factory('inventory', ['$q', 'localstorage', 'defaultInventory', function($q, localstorage, defaultInventory) {

  var INVENTORY_KEY = 'inventory',
      inventory = localstorage.get(INVENTORY_KEY) || defaultInventory,
      products = [];


  function Product(data) {
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
  }

  _.each(inventory, function(item) {
    products.push(new Product(item));
  });


  return {
    /**
     * Returns all products available in the inventory.
     * Meant to simulate a resource call like "GET /api/inventory/".
     */
    query: function() {
      var deferred = $q.defer();
      deferred.resolve(products);
      return deferred.promise;
    },

    /**
     * Returns the product with the given ID.
     * Meant to simulate a resource call like "GET /api/inventory/1".
     */
    get: function(id) {
      var deferred = $q.defer(),
          product = _.findWhere(products, {id: parseInt(id)});

      if (product) {
        deferred.resolve(product);
      }
      else {
        deferred.reject('Not found');
      }

      return deferred.promise;
    },

    /**
     * Totals a list of (cart) items.
     */
    total: function(items) {
      var deferred = $q.defer(),
          total = 0;

      _.each(items, function(quantity, productId) {
        var product = _.findWhere(products, {id: parseInt(productId)});
        if (product) {
          total += product.price * quantity;
        }
        //else: you had an invalid product ID...uh, why?
      });
      
      deferred.resolve(total);
      return deferred.promise;
    }
  };

}]);