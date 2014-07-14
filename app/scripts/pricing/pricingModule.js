'use strict';

/**
 * @ngdoc function
 * @name fauxcart.discounts
 * @description
 * # Discounts module
 * Discounts are pricing rules that are attached to product. A product can have
 * zero or more discounts.
 */
angular.module('fauxcart.pricing', [
  'ngResource',
  'fauxcart.common'
]);