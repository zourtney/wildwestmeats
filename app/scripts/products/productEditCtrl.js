'use strict';

angular.module('fauxcart.products')

.controller('ProductEditCtrl', ['$scope', 'pricing', 'product', function($scope, pricing, product) {

  $scope.product = product;
  $scope.pricingRules = pricing.query();

}]);