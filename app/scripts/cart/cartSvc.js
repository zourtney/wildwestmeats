'use strict';

/**
 * @ngdoc function
 * @name fauxcart.cart:cartSvc
 * @description
 * # CartItem
 */
angular.module('fauxcart.cart')

.factory('cart', ['$q', function($q) {

  var cartItems;

  /**
   * CartItem class.
   */
  function CartItem(product, quantity) {
    this.product = product;
    this.quantity = Math.max(quantity, 0);
    this._updatePrice();
  }

  /**
   * Increase the quantity of this item.
   */
  CartItem.prototype.add = function(quantity) {
    this.quantity += quantity;
    this._updatePrice();
  };

  CartItem.prototype._updatePrice = function() {
    console.log(this.product.name + ' has ' + this.product.discounts + ' discounts.');
    this.totalPrice = this.product.price * this.quantity;
  };


  /**
   * Get all items in the cart. This will return an object with product IDs
   * for keys and quantity as values.
   * Meant to simulate a resource call like "GET /api/cart/".
   */
  CartItem.query = function() {
    var deferred = $q.defer();

    if (! cartItems) {
      cartItems = {};
    }
    
    deferred.resolve(cartItems);
    return deferred.promise;
  };

  /**
   * Add one product of type `product` to the cart.
   */
  CartItem.add = function(product) {
    var deferred = $q.defer();

    if (! cartItems[product.id]) {
      cartItems[product.id] = new CartItem(product, 0);
    }
    cartItems[product.id].add(1);

    deferred.resolve(cartItems[product.id]);
    return deferred.promise;
  };

  return CartItem;

}]);
