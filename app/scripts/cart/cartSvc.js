'use strict';

angular.module('fauxcart.cart')

/**
 * Manager service for manipulating the cart pseudo-singleton.
 */
.factory('cart', ['$resource', function($resource) {

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

  /**
   * Removes all items from the cart's hash, then calls "PUT /api/cart" and
   * returns a promise.
   */
  cart.prototype.clear = function() {
    // Clear out items, then persist.
    this.items = {};
    return this.$update();
  };

  return cart;

}]);
