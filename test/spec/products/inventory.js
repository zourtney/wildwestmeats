'use strict';

describe('Factory: Product', function() {

  beforeEach(module('fauxcart.products'));

  var $rootScope,
      Product;

  //
  // Setup
  //
  beforeEach(inject(function(_$rootScope_, _Product_) {
    $rootScope = _$rootScope_;
    Product = _Product_;
  }));


  //
  // Actual tests
  //

  describe('with an instance', function() {
    // `$update`
    it('should have an $update() function on the prototype', function() {
      expect(typeof Product.prototype.$update).toBe('function');
    });
  });

});