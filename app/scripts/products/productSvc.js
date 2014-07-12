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
      name: 'Slab of beef',
      price: 50
    },
    {
      name: 'Shank of a Lamb', // (not of Michael)
      price: 30
    }
  ];
})

/**
 * Manager service for all available products.
 */
.factory('inventory', ['$q', '$window', 'localstorage', 'defaultInventory', function($q, $window, localstorage, defaultInventory) {

  var inventory,
      INVENTORY_KEY = 'inventory';

  return {
    /**
     * Returns all products available in the inventory
     */
    all: function() {
      var deferred = $q.defer();
      deferred.resolve(inventory);
      return deferred.promise;
    },

    /**
     * Persists the inventory to `localStorage`.
     */
    save: function() {
      var deferred = $q.defer();
      
      localstorage.set(INVENTORY_KEY, inventory);
      deferred.resolve(inventory);
      
      return deferred.promise;
    },

    /**
     * Load inventory from `localStorage` into in-app memory.
     */
    load: function() {
      var deferred = $q.defer();

      inventory = localstorage.get(INVENTORY_KEY) || defaultInventory;
      deferred.resolve(inventory);
      
      return deferred.promise;
    }
  };

}]);