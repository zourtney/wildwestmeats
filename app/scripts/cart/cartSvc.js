/*global _ */
'use strict';

/**
 * @ngdoc function
 * @name fauxcart.cart:cartSvc
 * @description
 * # CartItem
 */
angular.module('fauxcart.cart')

.factory('cart', ['$q', 'localstorage', 'inventory', function($q, localstorage, inventory) {

  var CART_KEY = 'cart',
      cartItems;

  function loadAll() {

  }


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
    this.totalPrice = this.product.price * this.quantity;
  };


  /**
   * Get all items in the cart. This will return an object with product IDs
   * for keys and quanity as values. Builds from localstorage and caches the
   * result in the local-only `cartItems` object.
   * Meant to simulate a resource call like "GET /api/cart/".
   */
  CartItem.query = function() {
    var deferred = $q.defer();

    if (cartItems) {
      // Return cached items
      deferred.resolve(cartItems);
    }
    else {
      // Load from localstorage and deserialize.
      //TODO: clean this mess up
      var items = localstorage.get(CART_KEY) || {},
          numRequests = 0;

      cartItems = {};
      
      if (_.keys(items).length) {
        _.each(items, function(val, key) {
          ++numRequests;
          inventory.get(key).then(function(data) {
            --numRequests;
            cartItems[key] = new CartItem(data, val);
            
            if (numRequests === 0) {
              deferred.resolve(cartItems);
            }
          });
        });
      }
      else {
        deferred.resolve(cartItems);
      }
    }

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

    CartItem.save();
    deferred.resolve(cartItems[product.id]);
    return deferred.promise;
  };

  /**
   * Persist all cart items to localstorage.
   * Reduces object down to a productID <-> quantity pair.
   */
  CartItem.save = function() {
    var minimalObj = _.transform(cartItems, function(result, val, key) {
      return result[key] = val.quantity;
    });
    localstorage.set(CART_KEY, minimalObj);
  };

  return CartItem;

}]);
