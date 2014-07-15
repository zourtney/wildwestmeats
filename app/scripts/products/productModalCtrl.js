'use strict';

angular.module('fauxcart.products')

.controller('ProductModalCtrl', ['$scope', 'product', 'pricingRules', function($scope, product, pricingRules) {

  $scope.product = product;
  $scope.pricingRules = pricingRules;

}]);