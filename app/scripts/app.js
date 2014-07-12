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
  'fauxcart.common',
  'fauxcart.products',
  'fauxcart.cart'
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
      redirectTo: '/products'
    });
});