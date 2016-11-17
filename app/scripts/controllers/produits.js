'use strict';

/**
 * @ngdoc function
 * @name webIhmApp.controller:ProduitsCtrl
 * @description
 * # ProduitsCtrl
 * Controller of the webIhmApp
 */
angular.module('webIhmApp')
  .controller('ProduitsCtrl', function ($scope,$http,$rootScope) {
      $scope.produit={
          action:'',
          name:'',
          type:'',
          categorie:'',
          description:'',
          id_user:$rootScope.loggedUser.id,
          id:''
      };
     $scope.produitList=[];
     getList();
      
    $scope.soumissions = function () {
        $scope.produit.action = 'create';
        var req = {
            method: 'POST',
            url: 'http://localhost/workshop_epsi/php/controller_produit.php',
            data: $scope.produit,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
         };
         
         $http(req).then(function (response) {
                             if(response.data.result==='ok'){
                                 $scope.produitList=[];
                                getList();
                            }
                            $scope.message=response;
                             });
        
        
    };
    function getList (){
        $scope.produit.action = 'getListWithUser';
        var req = {
            method: 'POST',
            url: 'http://localhost/workshop_epsi/php/controller_produit.php',
            data: $scope.produit,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
         };

         $http(req).then(function (response) {                            
                            angular.forEach(response.data.result, function(value, key) {
                                $scope.produitList.push(value);
                              });
                        });
        
        
    };
    $scope.eraseproduit = function(produit){
        produit.action = 'delete';
        var req = {
            method: 'POST',
            url: 'http://localhost/workshop_epsi/php/controller_produit.php',
            data: produit,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
         };
           $scope.toerase=produit;
         $http(req).then(function (response) {
                            if(response.data.result==='ok'){
                                $scope.produitList.splice( $scope.produitList.indexOf( $scope.toerase), 1 );
                            }
                            $scope.message=response;
                            
                        });
        
        
    };
    
     function makeproduit(log) {
                var produit;
                produit={
                    action:'',
                    nom:log.name,
                    type:log.type,
                    id_categorie:log.categorie,
                    description:log.description,
                    id_user:log.id_user,
                    id:log.id
                    
                };
             return  produit;  
            };
  });
