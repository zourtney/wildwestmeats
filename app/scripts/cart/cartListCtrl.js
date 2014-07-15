'use strict';

angular.module('fauxcart.cart')

.controller('CartListCtrl', ['$scope', '$modal', function($scope, $modal) {

  $scope.emptyCart = function() {
    var modalInstance = $modal.open({
      templateUrl: 'views/cart/emptyConfirmation.html',
      controller: 'CartModalCtrl'
    });

    modalInstance.result.then(function() {
      // Clear out the cart (sits on parent, application scope).
      $scope.cart.clear();
    });
  };

}]);