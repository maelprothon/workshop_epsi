'use strict';

/**
 * @ngdoc function
 * @name webIhmApp.controller:InscriptionCtrl
 * @description
 * # InscriptionCtrl
 * Controller of the webIhmApp
 */
angular.module('webIhmApp')
  .controller('InscriptionCtrl', function ($scope, $http) {
      $scope.user={
          action :'create',
          name :'Jojo',
          firstname:'jojoj',
          password:'12345678',
          login:'madz',
          address:'AZERTYU',
          codepostal:'34070',
          city:'Montpellier'
      }; 
      
    $scope.soumission = function () {
        var req = {
            method: 'POST',
            url: 'http://localhost/workshop_epsi/php/controller_user.php',
            data: $scope.user,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
         };

        $http(req);
    };
  });
