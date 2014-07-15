'use strict';

describe('Controller: PricingListCtrl', function () {

  beforeEach(module('wildwestmeats.pricing'));

  var ctrl,
      scope;

  //
  // Setup
  //
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();

    ctrl = $controller('PricingListCtrl', {
      $scope: scope
    });
  }));


  //
  // Actual tests
  //
  it('should have an addRule() function', function() {
    expect(scope.addRule).toBeDefined();
    expect(typeof scope.addRule).toBe('function');
  });

  it('should have an editRule() function', function() {
    expect(scope.editRule).toBeDefined();
    expect(typeof scope.editRule).toBe('function');
  });

  it('should have an deleteRule() function', function() {
    expect(scope.deleteRule).toBeDefined();
    expect(typeof scope.deleteRule).toBe('function');
  });

  //TODO: meaningful tests

});