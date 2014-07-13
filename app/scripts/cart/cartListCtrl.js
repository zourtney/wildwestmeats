'use strict';

angular.module('fauxcart.cart')

.controller('CartListCtrl', ['$scope', 'cart', function($scope, cart) {

  cart.query().then(function(items) {
    $scope.cart = items;
  });

}]);