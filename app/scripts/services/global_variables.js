'use strict';

/**
 * @ngdoc service
 * @name webIhmApp.globalVariables
 * @description
 * # globalVariables
 * Service in the webIhmApp.
 */
angular.module('webIhmApp')
        .service('globalVariables', function ($rootScope) {
            var isProductionMode = false; //false true

            //server configuration
            var serverAdressProd = '192.168.10.15';
            var serverAdressDev = 'localhost';
            var serverPort = 3000;

            //constants
            $rootScope.BASE_URL = '';

            $rootScope.NEWSLETTER_ELEMENT_MODEL = 'newsletters';
            $rootScope.DIFFUSION_ELEMENT_MODEL = 'diffusions';
            $rootScope.USER_ELEMENT_MODEL = 'users';
            $rootScope.ADMIN_ELEMENT_MODEL = 'admins';
            $rootScope.CONNECTION = false;

            //app data lists
            $rootScope.diffusions = {};
            $rootScope.users = {};
            $rootScope.newsLetters = {};
            $rootScope.admins = {};

            //global functions
            $rootScope.getListElementsByElementModel = function (elementModel) {
                if (elementModel === $rootScope.DIFFUSION_ELEMENT_MODEL) {
                    return $rootScope.diffusions;
                } else if (elementModel === $rootScope.USER_ELEMENT_MODEL) {
                    return $rootScope.users;
                } else if (elementModel === $rootScope.NEWSLETTER_ELEMENT_MODEL) {
                    return $rootScope.newsletters;
                } else if (elementModel === $rootScope.ADMIN_ELEMENT_MODEL) {
                    return $rootScope.admins;
                }
            };

            var globalVariables = {
                init: function () {
                    var serverAdress;
                    if (isProductionMode) {
                        serverAdress = serverAdressProd;
                    } else {
                        serverAdress = serverAdressDev;
                    }
                    $rootScope.BASE_URL = 'http://' + serverAdress + ':' + serverPort;    
                }
            };

            return globalVariables;
        });
