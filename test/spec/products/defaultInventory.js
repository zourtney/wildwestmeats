'use strict';

describe('Factory: detfaultInventory', function () {

  beforeEach(module('fauxcart.products'));

  var di;

  //
  // Setup
  //
  beforeEach(inject(function(defaultInventory) {
    di = defaultInventory;
  }));


  //
  // Actual tests
  //
  it('should contain a list of items that have an id property', function() {
    angular.forEach(di, function(product) {
      expect(product.id).toBeDefined();
    });
  });

  it('should contain a list of items that have a name property', function() {
    angular.forEach(di, function(product) {
      expect(product.name).toBeDefined();
    });
  });

  it('should contain a list of items that have a price property', function() {
    angular.forEach(di, function(product) {
      expect(product.price).toBeDefined();
    });
  });
});
