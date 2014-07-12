'use strict';

/**
 * @ngdoc function
 * @name fauxcart.cart:cartSvc
 * @description
 * # Cart
 */
angular.module('fauxcart.cart')

/**
 * Default set of inventory to start the application with. Anything stored to
 * `localStorage` will take precedence over this data set.
 */
.factory('cart', ['$q', 'localstorage', function($q, localstorage) {

  var CART_KEY = 'cart';

  function CartSvc() {
    this.items = localstorage.get(CART_KEY) || {};
    this.total = 0;
  }

  CartSvc.prototype = {
    all: function() {
      var deferred = $q.defer();
      deferred.resolve(this.items);
      return deferred.promise;
    },

    add: function(productId) {
      if (this.items[productId]) {
        this.items[productId].quantity++;
      }
      else {
        this.items[productId] = {
          quantity: 1
        };
      }

      this._updateTotal();
    },

    _updateTotal: function() {
      //TODO: calculate real total
      this.total++;
    }
  };

  return new CartSvc();

}]);
