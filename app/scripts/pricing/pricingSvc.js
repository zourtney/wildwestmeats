/*global _ */
'use strict';

angular.module('fauxcart.pricing')

/**
 * Manager service for manipulating available pricing rules.
 */
.factory('PricingRule', ['$resource', function($resource) {

  var PricingRule,
      instanceMethods;

  //
  // Single pricing rule resource
  //

  PricingRule = $resource('/api/pricing/:id', { id: '@id' }, {
    'update': { method: 'PUT' },
    '_query': { method: 'GET', isArray: true }   // see notes below
  });

  /**
   * Returns whether or not this rule is new (ie: not POSTed to the server yet)
   *
   * See usage in:
   *   - views/pricing/edit.html
   */
  PricingRule.prototype.isNew = function() {
    return ! this.hasOwnProperty('id');
  };



  //
  // Collection of pricing rules
  //
  // The following code hooks into the `query()` call response and adds helper
  // functions onto the returned array. These are collection-level functions,
  // as opposed model-level functions, like the one defined `PricingRule`'s
  // prototype (above). It's a bit dirty, but certainly makes the array feel
  // like a first-class object. 
  //
  // See usage in:
  //   - scripts/pricing/pricingListCtrl.js
  //   - views/products/list.html
  //
  // Adapted from: http://cc.bingj.com/cache.aspx?q=angular+post+process+resource&d=4531050142510086&mkt=en-US&setlang=en-US&w=z-cumrEbTJsMe-f91S-SlFG0kl-enV-y
  //
  PricingRule.query = function() {
    var inst = this._query.apply(this, arguments);

    inst.$promise.then(function(data) {
      angular.extend(data, instanceMethods);
    });
    
    return inst;
  };

  instanceMethods = {
    /**
     * Returns whether or not the rule can be in this array.
     */
    contains: function(rule) {
      return _.contains(this, rule);
    },

    /**
     * Returns a rule by its ID
     */
    getById: function(id) {
      return _.findWhere(this, { id: parseInt(id) });
    },

    /**
     * Removes the rule from this list.
     */
    remove: function(rule) {
      var i = _.indexOf(this, rule);
      if (i >= 0) {
        this.splice(i, 1);
      }
    }
  };

  return PricingRule;

}]);