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
                    .when('/listusers', {
                      templateUrl: 'views/listusers.html',
                      controller: 'UsersCtrl'
                    })
                    .when('/myroute', {
                      templateUrl: 'views/myroute.html',
                      controller: 'MyrouteCtrl',
                      controllerAs: 'myroute'
                    })
                    .when('/Profil', {
                      templateUrl: 'views/profil.html',
                      controller: 'ProfilCtrl',
                      controllerAs: 'Profil'
                    })
                    .otherwise({
                        redirectTo: '/home'
                    });
        });