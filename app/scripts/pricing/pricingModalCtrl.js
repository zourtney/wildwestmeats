'use strict';

angular.module('wildwestmeats.pricing')

//NOTE: this is a catch-all controller for pricing-related modals since there
//      is no real logic needed on these screens (yet);

.controller('PricingModalCtrl', ['$scope', 'rule', function($scope, rule) {

  $scope.rule = rule;

}]);