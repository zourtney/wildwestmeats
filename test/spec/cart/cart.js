/*global _ */
'use strict';

describe('Factory: cart', function() {

  beforeEach(module('wildwestmeats.cart'));

  var $rootScope,
      cart,
      cartInst,
      mockProductId = 1;

  //
  // Setup
  //
  beforeEach(inject(function(_$rootScope_, _cart_) {
    $rootScope = _$rootScope_;
    cart = _cart_;
  }));


  //
  // Actual tests
  //

  // `get`
  it('should have a get() function', function() {
    expect(typeof cart.get).toBe('function');
  });


  describe('with an instance', function() {
    // Mock out an instance of this resource. Thwart the `$update` function
    // that gets called behind the scenes. (We only care that it's called).
    var mockItems = {};
    
    beforeEach(inject(function($q) {
      var Cart = cart;  // js hint annoyance...
      cartInst = new Cart();
      
      cartInst.items = mockItems;
      
      cartInst.$update = function() {
        var deferred = $q.defer();
        deferred.resolve(cartInst);
        return deferred.promise;
      };
      spyOn(cartInst, '$update').and.callThrough();
    }));

    // `$update`
    it('should have an $update() function on the prototype', function() {
      expect(typeof cartInst.$update).toBe('function');
    });

    // `add`
    it('should have an add() function on the prototype', function() {
      expect(typeof cartInst.add).toBe('function');
    });

    it('should return an object with quantity = 1 after calling add() once', function() {
      cartInst.add(mockProductId).then(function(data) {
        expect(data.items[mockProductId]).toBe(1);
        expect(cartInst.$update).toHaveBeenCalled();
      });
      $rootScope.$apply();
    });

    it('should return an object with quantity = 2 after calling add() a second time', function() {
      cartInst.add(mockProductId).then(function(data) {
        expect(data.items[mockProductId]).toBe(2);
        expect(cartInst.$update).toHaveBeenCalled();
      });
      $rootScope.$apply();
    });

    // `clear`
    it('should have an clear() function on the prototype', function() {
      expect(typeof cartInst.clear).toBe('function');
    });

    it('should return an object with no keys after calling clear()', function() {
      cartInst.clear().then(function(data) {
        expect(_.keys(data).length).toBe(0);
      });
    });
  });

  //TODO: more tests

});