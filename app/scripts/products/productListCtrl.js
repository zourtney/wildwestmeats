'use strict';

angular.module('fauxcart.products')

.controller('ProductListCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {

  $scope.saveProduct = function(product) {
    product.$update().then(function() {
      $rootScope.$broadcast('priceStale');
    });
  };

}]);