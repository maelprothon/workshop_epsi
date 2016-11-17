'use strict';

/**
 * @ngdoc function
 * @name webIhmApp.controller:ProduitsCtrl
 * @description
 * # ProduitsCtrl
 * Controller of the webIhmApp
 */
angular.module('webIhmApp')
  .controller('ProduitCtrl', function ($scope,$http,$rootScope,$routeParams) {
        console.log('ok');
        var req = {
            method: 'POST',
            url: 'http://localhost/workshop_epsi/php/controller_produit.php',
            data: {action:'getProduct', id: $routeParams.id},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  
         };
        $http(req)
        .then(function(response) {
            $scope.product = response.data.result[0];
        });
      
      $scope.reserveproduit = function(produit){
        var data = {
            action: "CreatePret",
            id_user_1: $rootScope.loggedUser.id,
            id_produit: produit.id
        }
        var req = {
            method: 'POST',
            url: 'http://localhost/workshop_epsi/php/controller_pret.php',
            data: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
         };

         $http(req).then(function (response) {
                            $scope.message=response;
                        });    
    };
  });
