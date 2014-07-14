'use strict';

angular.module('fauxcart.pricing')

.controller('PricingModalCtrl', ['$scope', 'rule', function($scope, rule) {

  $scope.rule = rule;

}]);