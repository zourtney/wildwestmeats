'use strict';

describe('Factory: detfaultInventory', function () {

  beforeEach(module('fauxcart.products'));

  var defaultInventory;

  //
  // Setup
  //
  beforeEach(inject(function(_defaultInventory_) {
    defaultInventory = _defaultInventory_;
  }));


  //
  // Actual tests
  //
  it('should contain a list of items that have an id property', function() {
    angular.forEach(defaultInventory, function(product) {
      expect(product.id).toBeDefined();
    });
  });

  it('should contain a list of items that have a name property', function() {
    angular.forEach(defaultInventory, function(product) {
      expect(product.name).toBeDefined();
    });
  });

  it('should contain a list of items that have a price property', function() {
    angular.forEach(defaultInventory, function(product) {
      expect(product.price).toBeDefined();
    });
  });
});
