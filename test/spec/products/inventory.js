'use strict';

describe('Factory: inventory', function () {

  beforeEach(module('fauxcart.products'));

  var inv, di;

  beforeEach(inject(function(inventory, defaultInventory) {
    inv = inventory;
    di = defaultInventory;
  }));


  // Before loading the inventory from `localStorage` (or defaults).
  describe('before calling load()', function() {
    var products;
    beforeEach(function(done) {
      inv.all().then(function(data) {
        products = data;
        done();
      });
    });

    it('should not have any products', function() {
      expect(products).toBeFalsy();
    });
  });


  // After loading the inventory from `localStorage` (or defaults).
  describe('after calling load()', function() {
    var products;
    beforeEach(function(done) {
      inv.all().then(function(data) {
        console.log('with a ' + data);
        products = data;
        done();
      });
    });

    it('should have loaded the defaultInventory set', function() {
    //   expect(products).toEqual(di);
    });
  });
});
