'use strict';

describe('Controller: ProduitsCtrl', function () {

  // load the controller's module
  beforeEach(module('webIhmApp'));

  var ProduitsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProduitsCtrl = $controller('ProduitsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProduitsCtrl.awesomeThings.length).toBe(3);
  });
});
