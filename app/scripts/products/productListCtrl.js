'use strict';

angular.module('fauxcart.products')

.controller('ProductListCtrl', ['$scope', 'inventory', function($scope, inventory) {

  inventory.all().then(function(products) {
    $scope.products = products;
  });

}]);