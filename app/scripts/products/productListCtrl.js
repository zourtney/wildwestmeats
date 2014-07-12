'use strict';

angular.module('fauxcart.products')

.controller('ProductListCtrl', ['$scope', 'inventory', 'cartItem', function($scope, inventory, CartItem) {

  inventory.query().then(function(products) {
    $scope.products = products;
  });

  CartItem.query().then(function(cartItems) {
    $scope.cartItems = cartItems;
  });

}]);