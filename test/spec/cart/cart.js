/*global _ */
'use strict';

describe('Factory: cart', function() {

  beforeEach(module('fauxcart.cart'));

  var $rootScope,
      cart,
      defaultInventory;

  //
  // Setup
  //
  beforeEach(inject(function(_$rootScope_, _cart_, _defaultInventory_) {
    $rootScope = _$rootScope_;
    cart = _cart_;
    defaultInventory = _defaultInventory_;
  }));


  //
  // Actual tests
  //

  // `query`
  it('should have a query() function', function() {
    expect(typeof cart.query).toBe('function');
  });

  it('should return an empty object upon the first call to query()', function() {
    cart.query().then(function(data) {
      expect(data).toBeTruthy();
      expect(_.keys(data).length).toBe(0);
    });
    $rootScope.$apply();
  });


  // `add`
  it('should have an add() function', function() {
    expect(typeof cart.add).toBe('function');
  });

  it('should return 1 after calling add() once', function() {
    cart.add(defaultInventory[0].id).then(function(data) {
      expect(data).toBe(1);
    });
    $rootScope.$apply();
  });

  it('should return 2 after calling add() again', function() {
    cart.add(defaultInventory[0].id).then(function(data) {
      expect(data).toBe(2);
    });
    $rootScope.$apply();
  });

  it('should be reflected in the dataset query() returns', function() {
    cart.query().then(function(data) {
      var keys = _.keys(data);
      expect(keys.length).toBe(1);
      expect(parseInt(keys[0])).toBe(defaultInventory[0].id);
      expect(data[keys[0]]).toBe(2);
    });
    $rootScope.$apply();
  });

});