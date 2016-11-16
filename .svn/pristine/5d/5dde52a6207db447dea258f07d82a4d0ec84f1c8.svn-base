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
            'ngTouch',
            'ngCsvImport'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/newsletter_manager', {
                        templateUrl: 'views/newsletter_manager.html',
                        controller: 'NewsletterManagerCtrl',
                        controllerAs: 'newsletterManager'
                    })
                    .when('/newsletter_settings', {
                        templateUrl: 'views/newsletter_settings.html',
                        controller: 'NewsletterSettingsCtrl',
                        controllerAs: 'newsletterSettings'
                    })
                    .when('/newNewsletter', {
                        templateUrl: 'views/newnewsletter.html',
                        controller: 'NewnewsletterCtrl',
                        controllerAs: 'newNewsletter'
                    })
                    .otherwise({
                        redirectTo: '/newsletter_manager'
                    });
        })
        .run(function (newsLetterDAOService, $rootScope,globalVariables) {
            globalVariables.init();
            newsLetterDAOService.init($rootScope);
            
            //load app data
            newsLetterDAOService.getElement($rootScope.DIFFUSION_ELEMENT_MODEL, function (isError, message, diffusions) {
                if (!isError) {
                    $rootScope.diffusions = diffusions;
                }
                console.log(JSON.stringify(message));
            });

            newsLetterDAOService.getElement($rootScope.USER_ELEMENT_MODEL, function (isError, message, diffusions) {
                if (!isError) {
                    $rootScope.users = diffusions;
                }
                console.log(JSON.stringify(message));
            });

            newsLetterDAOService.getElement($rootScope.NEWSLETTER_ELEMENT_MODEL, function (isError, message, newsletters) {
                if (!isError) {
                    $rootScope.newsLetters = newsletters;
                }

                console.log(JSON.stringify(message));
            });

            newsLetterDAOService.getElement($rootScope.ADMIN_ELEMENT_MODEL, function (isError, message, admins) {
                if (!isError) {
                    $rootScope.admins = admins;
                } else {
                    $rootScope.admins.push({
                        nom: '',
                        email: '',
                        password: '',
                        elementModel: $rootScope.ADMIN_ELEMENT_MODEL
                    });
                }
                console.log(JSON.stringify(message));
            });
        });
