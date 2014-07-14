'use strict';

describe('Factory: pricing', function() {

  beforeEach(module('fauxcart.pricing'));

  var $rootScope,
      pricing;

  //
  // Setup
  //
  beforeEach(inject(function(_$rootScope_, _pricing_) {
    $rootScope = _$rootScope_;
    pricing = _pricing_;
  }));


  //
  // Actual tests
  //

  describe('with an instance', function() {
    // `$update`
    it('should have an $update() function on the prototype', function() {
      expect(typeof pricing.prototype.$update).toBe('function');
    });
  });

});