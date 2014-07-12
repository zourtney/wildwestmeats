'use strict';

/**
 * @ngdoc function
 * @name fauxcart.common
 * @description
 * # Common
 * Any code that could be common to all other modules
 */
angular.module('fauxcart.common')

.factory('localstorage', ['$window', function($window) {

  return {
    get: function(key) {
      var val = $window.localStorage[key];
      try {
        return JSON.parse(val);
      }
      catch (ex) {
        return val;
      }
    },

    set: function(key, val) {
      var strVal = (typeof val === 'string') ? val : JSON.stringify(val);
      $window.localStorage[key] = strVal;
      return val;
    }
  };

}]);