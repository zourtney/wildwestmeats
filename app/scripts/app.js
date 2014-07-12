'use strict';

/**
 * @ngdoc overview
 * @name fauxcartApp
 * @description
 * # fauxcartApp
 *
 * Main module of the application.
 */
angular.module('fauxcart', [
  // 'ngAnimate',
  // 'ngCookies',
  // 'ngResource',
  'ngRoute',
  // 'ngSanitize',
  // 'ngTouch',
  'fauxcart.products'
])

.config(function($routeProvider) {
  $routeProvider
    // .when('/', {
    //   templateUrl: 'views/main.html',
    //   controller: 'MainCtrl'
    // })
    // .when('/about', {
    //   templateUrl: 'views/about.html',
    //   controller: 'AboutCtrl'
    // })
    .otherwise({
      redirectTo: '/items'
    });
});