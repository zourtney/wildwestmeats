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
  'fauxcart.discounts',
  'fauxcart.products',
  'fauxcart.cart'
])

.config(function($routeProvider) {
  $routeProvider
    .otherwise({
      redirectTo: '/products'
    });
});