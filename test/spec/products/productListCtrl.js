'use strict';

describe('Controller: ProductListCtrl', function () {

  beforeEach(module('fauxcart.products'));

  var ctrl,
      scope;

  //
  // Setup
  //
  beforeEach(inject(function($q, $controller, $rootScope) {
    scope = $rootScope.$new();

    scope.products = [{
      id: 1, name: 'Product 1',
      '$update': function() {
        var deferred = $q.defer();
        deferred.resolve();
        return deferred.promise;
      }
    }];
    spyOn(scope.products[0], '$update').and.callThrough();

    ctrl = $controller('ProductListCtrl', {
      $scope: scope
    });

    $rootScope.$apply();
  }));


  //
  // Actual tests
  //
  it('should have a saveProduct() function', function() {
    expect(scope.saveProduct).toBeDefined();
    expect(typeof scope.saveProduct).toBe('function');
  });

  it('should invoke product.$update when saveProduct() is called', function() {
    var product = scope.products[0];
    scope.saveProduct(product);
    expect(product.$update).toHaveBeenCalled();
  });

  it('should broadcast a "priceStale" event when product.$update() is resolved from saveProduct()', inject(function($rootScope) {
    var product = scope.products[0];
    spyOn($rootScope, '$broadcast');
    scope.saveProduct(product);
    $rootScope.$apply();
    expect($rootScope.$broadcast).toHaveBeenCalledWith('priceStale');
  }));

  //TODO: more tests

});
