'use strict';

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