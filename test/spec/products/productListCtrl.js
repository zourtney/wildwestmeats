'use strict';

describe('Controller: ProductListCtrl', function () {

  beforeEach(module('fauxcart.products'));

  var ctrl,
      scope,
      mockProducts,
      mockInventory,
      mockCartItems,
      mockCart;

  //
  // Setup
  //
  mockProducts = [{id: 1, name: 'Product 1'}];
  mockCartItems = [{1: 0}];

  beforeEach(inject(function($q, $controller, $rootScope) {
    scope = $rootScope.$new();

    mockInventory = {
      query: function() {
        var deferred = $q.defer();
        deferred.resolve(mockProducts);
        return deferred.promise;
      }
    };
    spyOn(mockInventory, 'query').and.callThrough();

    mockCart = {
      query: function() {
        var deferred = $q.defer();
        deferred.resolve(mockCartItems);
        return deferred.promise;
      }
    };
    spyOn(mockCart, 'query').and.callThrough();

    ctrl = $controller('ProductListCtrl', {
      $scope: scope,
      inventory: mockInventory,
      cart: mockCart
    });

    $rootScope.$apply();
  }));


  //
  // Actual tests
  //
  it('should call inventory.query()', function() {
    expect(mockInventory.query).toHaveBeenCalled();
  });

  it('should attach a list of available items to the scope', function() {
    expect(scope.products).toEqual(mockProducts);
  });

  it('should call cart.query()', function() {
    expect(mockCart.query).toHaveBeenCalled();
  });

  it('should attach a list of cart items to the scope', function() {
    expect(scope.cartItems).toEqual(mockCartItems);
  });
});
