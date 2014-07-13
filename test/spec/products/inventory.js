'use strict';

describe('Factory: inventory', function () {

  beforeEach(module('fauxcart.products'));

  var rootScope,
      inventory,
      defaultInventory;

  //
  // Setup
  //
  beforeEach(inject(['$rootScope', 'inventory', 'defaultInventory', function($rootScope, theInventory, theDefaultInventory) {
    rootScope = $rootScope;
    inventory = theInventory;
    defaultInventory = theDefaultInventory;
  }]));


  //
  // Helpers
  //
  function expectEqual(lhs, rhs) {
    expect(lhs.id).toBe(rhs.id);
    expect(lhs.name).toBe(rhs.name);
    expect(lhs.price).toBe(rhs.price);
  }


  //
  // Actual tests
  //

  // `load`
  it('should have a query() function', function() {
    expect(typeof inventory.query).toBe('function');
  });

  it('should return an array of the default inventory from query()', function() {
    inventory.query().then(function(data) {
      expect(data).toBeTruthy();
      expect(data.length).toBe(defaultInventory.length);

      angular.forEach(data, function(item, i) {
        expectEqual(item, defaultInventory[i]);
      });
    });
    rootScope.$apply();
  });


  // `get`
  it('should have a get() function', function() {
    expect(typeof inventory.get).toBe('function');
  });

  it('should let you get() a valid product by its ID', function() {
    var compareTo = defaultInventory[0];
    inventory.get(compareTo.id).then(function(data) {
      expectEqual(data, compareTo);
    });
    rootScope.$apply();
  });

  it('should reject an attempt get() a product by an invalid ID', function() {
    //TODO: find the right way to test promise return values
    inventory.get(-999)
      .then(function() {
        expect(false).toBe(true);
      })
      .catch(function() {
        expect(true).toBe(true);
      });
    rootScope.$apply();
  });


  // `total`
  //TODO:
});
