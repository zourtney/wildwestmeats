/*global _ */
'use strict';

angular.module('wildwestmeats.products')

.controller('ProductListCtrl', ['$rootScope', '$scope', '$modal', function($rootScope, $scope, $modal) {

  //
  // Helper functions
  //

  /**
   * Persist this product to the server.
   * NOTE: this is only on the scope for testability
   */
  $scope.saveProduct = function(product) {
    product.$update().then(function() {
      $rootScope.$broadcast('priceStale');
    });
  };



  //
  // Scope functions
  //

  /**
   * Shows a modal in which you can update the product.
   */
  $scope.editProduct = function(product) {
    var modalInstance = $modal.open({
      templateUrl: 'views/products/edit.html',
      controller: 'ProductModalCtrl',
      resolve: {
        product: function() {
          return product;
        },
        pricingRules: function() {
          return $scope.pricingRules;
        }
      }
    });

    modalInstance.result.then(function() {
      $scope.saveProduct(product);
    });
  };

}]);