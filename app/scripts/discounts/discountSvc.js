'use strict';

/**
 * @ngdoc function
 * @name fauxcart.discounts:discount
 * @description
 * # Discount
 */
angular.module('fauxcart.discounts')

.factory('discount', ['$q', function($q) {

  function Discount(members) {
    _.each(members, function(val, key) {
      this[key] = val;
    }, this);
  }

  Discount.prototype.getPriceFor = function(price, quantity) {
    if (this.type === 'modulo') {
      return (Math.floor(quantity / this.getNum) * this.forThePriceOfNum * price) + ((quantity % this.getNum) * price);
    }
    return price * quantity;
  };

  return Discount;

}]);