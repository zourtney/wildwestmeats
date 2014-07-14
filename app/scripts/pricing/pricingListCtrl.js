/*global _ */
'use strict';

angular.module('fauxcart.pricing')

.controller('PricingListCtrl', ['$rootScope', '$scope', 'pricing', '$modal', function($rootScope, $scope, pricing, $modal) {

  //
  // Helper functions
  //

  /**
   * Persist this rule to the server and keep the global array up to date.
   */
  function saveRule(rule) {
    var method = rule.id ? '$update' : '$save';  // use: $update (PUT) or $save (POST)
    
    rule[method]().then(function() {
      // Add rule to global set if needed (only on POST)
      if (! _.contains($scope.pricingRules, rule)) {
        $scope.pricingRules.push(rule);
      }

      // Send app-wide notification that the price is probably out of date.
      $rootScope.$broadcast('priceStale');
    });
  }

  /**
   * Remove this rule from the server and keep the global array up to date.
   */
  function deleteRule(rule) {
    rule.$delete().then(function() {
      var i = _.indexOf($scope.pricingRules, rule);
      if (i >= 0) {
        $scope.pricingRules.splice(i, 1);
      }
    });
  }



  //
  // Scope functions
  //

  $scope.editRule = function(rule) {
    var modalInstance = $modal.open({
      templateUrl: 'views/pricing/edit.html',
      controller: 'PricingModalCtrl',
      resolve: {
        rule: function() {
          return rule;
        }
      }
    });

    modalInstance.result.then(function() {
      saveRule(rule);
    });
  };

  $scope.addRule = function() {
    var PricingRule = pricing;  // to appease js-hint's "looks like a constructor" message...TODO: fix service name.
    $scope.editRule(new PricingRule());
  };

  $scope.deleteRule = function(rule) {
    var modalInstance = $modal.open({
      templateUrl: 'views/pricing/deleteConfirmation.html',
      controller: 'PricingModalCtrl',
      resolve: {
        rule: function() {
          return rule;
        }
      }
    });

    modalInstance.result.then(function() {
      deleteRule(rule);
    });
  };

}]);