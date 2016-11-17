'use strict';

/**
 * @ngdoc function
 * @name webIhmApp.controller:ProfilCtrl
 * @description
 * # ProfilCtrl
 * Controller of the webIhmApp
 */
angular.module('webIhmApp')
  .controller('ProfilCtrl', function ($scope, $http) {
    console.log('ok');
        var req = {
            method: 'POST',
            url: 'http://localhost/workshop_epsi/php/controller_produit.php',
            data: {action:'getListWithUser', id_user:1},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  
         };
        $http(req)
        .then(function(response) {
            $scope.produit = response.data.result;
        });
  });
