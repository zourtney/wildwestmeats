/*global _ */
'use strict';

/**
 * @ngdoc function
 * @name fauxcart.cart:cartSvc
 * @description
 * # cart
 */
angular.module('fauxcart.cart')

.factory('cart', ['$q', '$http', '$resource', function($q, $http, $resource) {

  var cart = $resource('/api/cart/', null, {
    'update': { method: 'PUT' }
  });

  /**
   * Add `productId` to the cart's hash. This function updates the hash, then
   * calls "PUT /api/cart" and returns a promise.
   */
  cart.prototype.add = function(productId) {
    // Increment the counter for the given product.
    if (! this.items[productId]) {
      this.items[productId] = 0;
    }
    this.items[productId]++;

    // Calls "PUT /api/cart", returning the updated hash along with the updated
    // cart price.
    return this.$update();
  };

  return cart;

}]);
