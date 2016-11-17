'use strict';

/**
 * @ngdoc function
 * @name webIhmApp.controller:ConnexionCtrl
 * @description
 * # ConnexionCtrl
 * Controller of the webIhmApp
 */
angular.module('webIhmApp')
  .controller('ConnexionCtrl', function ($scope,$http,$rootScope,$location) {
          $scope.loguser={
              action:'connect',
              login:'',
              password:''
          };
          $rootScope.loggedUser={
          id:'',
          name :'',
          firstname:'',
          password:'',
          login:'',
          address:'',
          codepostal:'',
          city:'',
          cagnotte:''
      }; 
      
    $scope.login = function () {
        var req = {
            method: 'POST',
            url: 'http://easytroc.prothon.me/workshop_epsi/php/controller_user.php',
            data: $scope.loguser,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
         };
        $http(req).then(function (response) {
                        if(response.data.error==="false"){
                            $rootScope.connect=true;
                            loggedUser(response.data.result);
                            $location.path('/home');
                        }
                        console.log(response);
                        return response;
                    });
        };
      function loggedUser(log) {
                $rootScope.loggedUser.id = log[0].id;
                $rootScope.loggedUser.name = log[0].nom;
                $rootScope.loggedUser.firstname= log[0].prenom;
                $rootScope.loggedUser.password= log[0].mdp;
                $rootScope.loggedUser.login= log[0].login;
                $rootScope.loggedUser.address= log[0].adresse;
                $rootScope.loggedUser.codepostal= log[0].codepostale;
                $rootScope.loggedUser.city= log[0].city;
                $rootScope.loggedUser.cagnotte= log[0].cagnotte;
                
            };
  });
