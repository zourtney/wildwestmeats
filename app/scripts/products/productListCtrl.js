'use strict';

angular.module('fauxcart.products')

.controller('ProductListCtrl', ['$scope', 'inventory', 'cart', function($scope, inventory, cart) {

  inventory.all().then(function(products) {
    $scope.products = products;
  });

  $scope.cart = cart;

}]);