/*global _ */
'use strict';

angular.module('wildwestmeats.pricing')

.controller('PricingListCtrl', ['$rootScope', '$scope', '$modal', 'PricingRule', function($rootScope, $scope, $modal, PricingRule) {

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
      if (! $scope.pricingRules.contains(rule)) {
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
      $scope.pricingRules.remove(rule);
    });
  }



  //
  // Scope functions
  //

  /**
   * Shows a modal in which you can update the pricing rule.
   */
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

  /**
   * Shows the edit modal with a new, unsaved pricing rule. If the user clicks
   * 'save' in the modal, the rule will be POSTed to the server and added to
   * the global list. (See `saveRule()` above)
   */
  $scope.addRule = function() {
    $scope.editRule(new PricingRule());
  };

  /**
   * Shows a modal asking the user to confirm pricing rule deletion.
   */
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