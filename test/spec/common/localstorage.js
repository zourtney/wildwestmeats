'use strict';

describe('Factory: localstorage', function() {

  beforeEach(module('fauxcart.common'));

  //
  // Setup
  //
  var localStorage;
  beforeEach(inject(function(_localstorage_) {
    localStorage = _localstorage_;
  }));


  //
  // Actual tests
  //

  // Simple strings
  it('should be able to set a string to window.localStorage', function() {
    localStorage.set('TEST_STRING', 'this is the test string');
    expect(window.localStorage.TEST_STRING).toBe('this is the test string');
  });

  it('should be able to read strings from window.localStorage', function() {
    localStorage.set('TEST_STRING', 'string value');
    expect(localStorage.get('TEST_STRING')).toBe('string value');
  });


  // Complex objects
  it('should be able to serialize objects to window.localStorage', function() {
    localStorage.set('TEST_OBJECT', {text: 'this is an object in local storage', num: 50});
    var val = window.localStorage.TEST_OBJECT;
    expect(val).toContain('this is an object in local storage');
    expect(val).toContain('50');
  });

  it('should be able to read serialized objects from window.localStorage', function() {
    localStorage.set('TEST_OBJECT', {name: 'Matt Dillon', year: 1876});
    var val = localStorage.get('TEST_OBJECT');
    expect(val.name).toBe('Matt Dillon');
    expect(val.year).toBe(1876);
  });
});
