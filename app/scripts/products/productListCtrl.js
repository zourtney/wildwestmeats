'use strict';

angular.module('fauxcart.products')

.controller('ProductListCtrl', ['$scope', 'inventory', 'cart', function($scope, inventory, cart) {

  $scope.products = inventory.query();
  $scope.cart = cart.get();

}]);