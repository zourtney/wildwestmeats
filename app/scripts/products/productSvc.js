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

  // var INVENTORY_KEY = 'inventory',
  var products;// = localstorage.get(INVENTORY_KEY) || defaultInventory;

  // Helper function: load in and deserialize products
  function loadAll() {
    products = _.map(defaultInventory, function(product) {
      return new Product(product);
    });
  }

  // Helper function: return a `Product` by its ID.
  function getById(id) {
    return _.findWhere(products, {id: parseInt(id)});
  }


  /**
   * Product class constructor.
   */
  function Product(members) {
    // Copy object keys / vals onto `this`.
    _.each(members, function(val, key) {
      this[key] = val;
    }, this);
  }

  /**
   * Returns all products available in the inventory. Builds from localstorage
   * and caches the result into the local-only `products` array.
   * Meant to simulate a resource call like "GET /api/inventory/".
   */
  Product.query = function() {
    if (! products) {
      loadAll();
    }

    var deferred = $q.defer();
    deferred.resolve(products);
    return deferred.promise;
  };

  /**
   * Returns the product with the given ID.
   * Meant to simulate a resource call like "GET /api/inventory/1".
   */
  Product.get = function(id) {
    if (! products) {
      loadAll();
    }

    var deferred = $q.defer(),
        product = getById(id);

    if (product) {
      deferred.resolve(product);
    }
    else {
      deferred.reject('Not found');
    }

    return deferred.promise;
  };

  return Product;

}]);