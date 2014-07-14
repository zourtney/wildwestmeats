'use strict';

angular.module('fauxcart.products')

.controller('ProductListCtrl', ['$rootScope', '$scope', '$modal', function($rootScope, $scope, $modal) {

  $scope.saveProduct = function(product) {
    product.$update().then(function() {
      $rootScope.$broadcast('priceStale');
    });
  };

  $scope.editProduct = function(product) {
    var modalInstance = $modal.open({
      templateUrl: 'views/products/edit.html',
      controller: 'ProductEditCtrl',
      resolve: {
        product: function() {
          return product;
        }
      }
    });

    modalInstance.result.then(function() {
      $scope.saveProduct(product);
    });
  };

}]);