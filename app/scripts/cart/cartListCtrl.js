/*global _ */
'use strict';

angular.module('fauxcart.cart')

.controller('CartListCtrl', ['$scope', 'cart', 'inventory', function($scope, cart, inventory) {

  cart.query().then(function(items) {
    $scope.cart = items;
  });

}]);