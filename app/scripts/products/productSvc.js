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
 * Default set of inventory to start the application with.
 */
.factory('defaultInventory', ['product', 'discount', function(Product, Discount) {

  return [
    new Product({
      id: 1,
      name: 'Product A',
      price: 20
    }),
    new Product({
      id: 2,
      name: 'Product B',
      price: 50,
      discounts: [
        new Discount({
          type: 'modulo',
          getNum: 5,
          forThePriceOfNum: 3
        })
      ]
    }),
    new Product({
      id: 3,
      name: 'Product C',
      price: 30
    })
  ];
}])


/**
 * Product class constructor.
 */
.factory('product', [function() {

  function Product(members) {
    _.each(members, function(val, key) {
      this[key] = val;
    }, this);
  }

  return Product;

}])


/**
 * Manager service for manipulating available products.
 */
.factory('inventory', ['$q', 'defaultInventory', function($q, defaultInventory) {

  var products = defaultInventory;

  // Helper function: return a `Product` by its ID.
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
    }
  };

}]);