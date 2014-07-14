'use strict';

/**
 * @ngdoc function
 * @name fauxcart.pricing
 * @description
 * # Discounts module
 * Discounts are pricing rules that are attached to product. A product can have
 * zero or more discounts.
 */
angular.module('fauxcart.pricing', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'fauxcart.common'
])

.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/pricing', {
      templateUrl: 'views/pricing/list.html',
      controller: 'PricingListCtrl'
    });

}]);