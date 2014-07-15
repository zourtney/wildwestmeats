'use strict';

angular.module('wildwestmeats.products')

.controller('ProductModalCtrl', ['$scope', 'product', 'pricingRules', function($scope, product, pricingRules) {

  $scope.product = product;
  $scope.pricingRules = pricingRules;

}]);