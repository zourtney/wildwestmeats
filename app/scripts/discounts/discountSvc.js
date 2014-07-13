'use strict';

/**
 * @ngdoc function
 * @name fauxcart.discounts:discount
 * @description
 * # Discount
 */
angular.module('fauxcart.discounts')

.factory('defaultDiscounts', function() {
  return [
    {
      id: 1,
      type: 'modulo',
      getNum: 5,
      forThePriceOfNum: 3
    }
  ];
})

.factory('discount', ['$q', 'defaultDiscounts', function($q, defaultDiscounts) {

  var discounts = defaultDiscounts;

  function Discount(members) {
    this.type = members.type;
  }

  Discount.query = function() {
    var deferred = $q.defer();
    deferred.resolve(discounts);
    return deferred.promise;
  };

  return Discount;

}]);