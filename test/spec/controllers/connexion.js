'use strict';

describe('Controller: ConnexionCtrl', function () {

  // load the controller's module
  beforeEach(module('webIhmApp'));

  var ConnexionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConnexionCtrl = $controller('ConnexionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConnexionCtrl.awesomeThings.length).toBe(3);
  });
});
