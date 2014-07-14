'use strict';

describe('Factory: inventory', function() {

  beforeEach(module('fauxcart.products'));

  var $rootScope,
      inventory;

  //
  // Setup
  //
  beforeEach(inject(function(_$rootScope_, _inventory_) {
    $rootScope = _$rootScope_;
    inventory = _inventory_;
  }));


  //
  // Actual tests
  //

  describe('with an instance', function() {
    // `$update`
    it('should have an $update() function on the prototype', function() {
      expect(typeof inventory.prototype.$update).toBe('function');
    });
  });

});