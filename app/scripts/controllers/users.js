'use strict';

/**
 * @ngdoc function
 * @name webIhmApp.controller:InscriptionCtrl
 * @description
 * # InscriptionCtrl
 * Controller of the webIhmApp
 */
angular.module('webIhmApp')
  .controller('UsersCtrl', function ($scope, $http) {
      console.log("ok");
      $http.get("http://localhost/workshop_epsi/php/controller_user.php?action=getList")
        .then(function(response) {
            $scope.users = response.result;
        });
  });
