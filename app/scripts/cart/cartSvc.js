/*global _ */
'use strict';


/**
 * @ngdoc function
 * @name fauxcart.cart:cartSvc
 * @description
 * # Cart
 */
angular.module('fauxcart.cart')

.factory('cartItem', ['$q', 'localstorage', function($q, localstorage) {

  var CART_KEY = 'cart',
      items = localstorage.get(CART_KEY) || {},
      cartItems = [];

  /**
   * Instance of a single item in the cart. Just a product ID and a timestamp.
   */
  function CartItem(productId, timestamp) {
    this.productId = productId;
    this.timestamp = timestamp || new Date().getTime();   // when it was added to the cart
  }

  /**
   * Persist a single item in the cart.
   * Meant to to simulate a resource creation call like "POST /api/cart/" or a
   * resource update call like "PUT /api/cart/1".
   */
  CartItem.prototype.save = function() {
    var deferred = $q.defer();

    if (! _.contains(cartItems, this)) {
      cartItems.push(this);
    }
    localstorage.set(CART_KEY, cartItems);
    deferred.resolve(this);
    
    return deferred.promise;
  };

  /**
   * Returns all items in the cart.
   * Meant to simulate a resource call like "GET /api/cart/".
   */
  CartItem.query = function() {
    var deferred = $q.defer();
    deferred.resolve(cartItems);
    return deferred.promise;
  };


  // On startup, load from localstorage.
  _.each(items, function(item) {
    cartItems.push(new CartItem(item.productId, item.timestamp));
  });

  return CartItem;

}]);
