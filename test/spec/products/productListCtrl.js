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
    mockCartItems = {items: {1: 0}};

    beforeEach(inject(function($q, $controller, $rootScope) {
      scope = $rootScope.$new();

      mockInventory = {
        query: function() {
          return mockProducts;
        }
      };
      spyOn(mockInventory, 'query').and.callThrough();

      mockCart = {
        get: function() {
          return mockCartItems;
        }
      };
      spyOn(mockCart, 'get').and.callThrough();

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

    it('should call cart.get()', function() {
      expect(mockCart.get).toHaveBeenCalled();
    });

    it('should attach a list of cart items to the scope', function() {
      expect(scope.cart).toEqual(mockCartItems);
    });
});
