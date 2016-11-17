'use strict';

/**
 * @ngdoc overview
 * @name webIhmApp
 * @description
 * # webIhmApp
 *
 * Main module of the application.
 */
angular
        .module('webIhmApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/connexion', {
                      templateUrl: 'views/connexion.html',
                      controller: 'ConnexionCtrl'
                    })
                    .when('/home', {
                      templateUrl: 'views/home.html',
                      controller: 'HomeCtrl',
                      controllerAs: 'home'
                    })
                    .when('/inscription', {
                      templateUrl: 'views/inscription.html',
                      controller: 'InscriptionCtrl',
                      controllerAs: 'inscription'
                    })
                    .when('/produits', {
                      templateUrl: 'views/produits.html',
                      controller: 'ProduitsCtrl',
                      controllerAs: 'produits'
                      })
                    .when('/listusers', {
                      templateUrl: 'views/listusers.html',
                      controller: 'UsersCtrl',
                      controllerAs: 'users'
                    })
                    .when('/profil/:id', {
                      templateUrl: 'views/profil.html',
                      controller: 'ProfilCtrl',
                      controllerAs: 'profil'
                    })
                    .otherwise({
                        redirectTo: '/home'
                    });
        });