'use strict';

describe('Factory: pricing', function() {

  beforeEach(module('fauxcart.pricing'));

  var $rootScope,
      PricingRule;

  //
  // Setup
  //
  beforeEach(inject(function(_$rootScope_, _PricingRule_) {
    $rootScope = _$rootScope_;
    PricingRule = _PricingRule_;
  }));


  //
  // Actual tests
  //

  describe('with an instance', function() {
    // `$update`
    it('should have an $update() function on the prototype', function() {
      expect(typeof PricingRule.prototype.$update).toBe('function');
    });
  });

});