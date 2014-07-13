'use strict';

angular.module('fauxcart.products')

.controller('ProductListCtrl', ['$scope', 'inventory', 'cart', function($scope, inventory, cart) {

  inventory.query().then(function(products) {
    $scope.products = products;
  });

  cart.query().then(function(cartItems) {
    $scope.cartItems = cartItems;
  });

}]);