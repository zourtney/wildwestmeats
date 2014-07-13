/*global _ */
'use strict';

angular.module('fauxcart.cart')

.controller('CartListCtrl', ['$scope', 'cart', 'inventory', function($scope, cart, inventory) {

  $scope.cart = [];

  cart.query().then(function(item) {
    _.each(item, function(quantity, productId) {
      // Request the full product object from the 'back-end'
      inventory.get(productId).then(function(product) {
        $scope.cart.push({
          product: product,
          quantity: quantity
        });
      });
    });
  });

}]);