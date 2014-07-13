'use strict';

angular.module('fauxcart.products')

.controller('ProductListCtrl', ['$scope', 'inventory', 'cart', 'discount', function($scope, inventory, cart, discount) {

  inventory.query().then(function(products) {
    $scope.products = products;
  });

  cart.query().then(function(cartItems) {
    $scope.cartItems = cartItems;
  });

  discount.query().then(function(data) {
    $scope.discounts = data;
  });

}]);