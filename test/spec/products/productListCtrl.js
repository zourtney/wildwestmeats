'use strict';

describe('Controller: ProductListCtrl', function () {

  beforeEach(module('fauxcart.products'));

  var ctrl,
      scope;

  beforeEach(inject(function($q, $controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('ProductListCtrl', {
      $scope: scope,
      inventory: {
        all: function() {
          var deferred = $q.defer();
          deferred.resolve([{name: 'Product 1'}]);
          return deferred.promise;
        }
      }
    });
  }));

  it('should attach a list of available items to the scope', inject(function($rootScope) {
    $rootScope.$apply();
    expect(scope.products).toBeDefined();
  }));
});
