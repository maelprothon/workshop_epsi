'use strict';

/**
 * @ngdoc function
 * @name webIhmApp.controller:ProfilCtrl
 * @description
 * # ProfilCtrl
 * Controller of the webIhmApp
 */
angular.module('webIhmApp')
  .controller('ProfilCtrl', function ($scope, $http, $rootScope, $routeParams) {
    console.log('ok');
        var req = {
            method: 'POST',
            url: 'http://localhost/workshop_epsi/php/controller_produit.php',
            data: {action:'getListWithUser', id_user: $routeParams.id},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  
         };
        $http(req)
        .then(function(response) {
            $scope.produits = response.data.result;
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
    $scope.voirdetailproduit = function(produit){
        var data = {
            action: "getListWithUser",
            id_user: $rootScope.loggedUser.id,
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
