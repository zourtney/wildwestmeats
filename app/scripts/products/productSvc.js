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
 * Manager service for manipulating available products.
 */
.factory('inventory', ['$q', 'localstorage', 'defaultInventory', function($q, localstorage, defaultInventory) {

  var INVENTORY_KEY = 'inventory',
      products = localstorage.get(INVENTORY_KEY) || defaultInventory;

  /**
   * Helper: get a product by its ID
   */
  function getById(id) {
    return _.findWhere(products, {id: parseInt(id)});
  }

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
          product = getById(id);

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

      _.each(items, function(quantity, id) {
        var product = getById(id);
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