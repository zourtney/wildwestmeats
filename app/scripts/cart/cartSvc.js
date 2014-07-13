/*global _ */
'use strict';

/**
 * @ngdoc function
 * @name fauxcart.cart:cartSvc
 * @description
 * # CartItem
 */
angular.module('fauxcart.cart')

.factory('cart', ['$q', 'localstorage', function($q, localstorage) {

  var CART_KEY = 'cart',
      cartItems = localstorage.get(CART_KEY) || {},
      cartSvc;


  cartSvc = {
    /**
     * Get all items in the cart. This will return an object with product IDs
     * for keys and quanity as values.
     */
    query: function() {
      var deferred = $q.defer();
      deferred.resolve(cartItems);
      return deferred.promise;
    },

    /**
     * Add one product of type `productId` to the cart.
     */
    add: function(productId) {
      var deferred = $q.defer();

      if (! cartItems[productId]) {
        cartItems[productId] = 0;
      }
      cartItems[productId]++;

      localstorage.set(CART_KEY, cartItems);  
      return deferred.promise;
    }
  };


  // On startup, load from localstorage.
  _.each(cartItems, function(val, key) {
    cartItems[key] = val;
  });

  return cartSvc;

}]);
