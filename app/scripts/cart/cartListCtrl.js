'use strict';

angular.module('fauxcart.cart')

.controller('CartListCtrl', ['$scope', '$modal', function($scope, $modal) {

  /**
   * Shows a confirmation modal, then rlears out the cart (which sits on
   * parent, application scope).
   */
  $scope.emptyCart = function() {
    var modalInstance = $modal.open({
      templateUrl: 'views/cart/emptyConfirmation.html',
      controller: 'CartModalCtrl'
    });

    modalInstance.result.then(function() {
      $scope.cart.clear();
    });
  };

  /**
   * Shows a "it's all fake" modal when the user hits the "Check out" button.
   */
  $scope.checkOut = function() {
    $modal.open({
      templateUrl: 'views/cart/checkout.html',
      controller: 'CartModalCtrl'
    });
  };

}]);