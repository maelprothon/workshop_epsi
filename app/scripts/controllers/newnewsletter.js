'use strict';

/**
 * @ngdoc function
 * @name webIhmApp.controller:NewnewsletterCtrl
 * @description
 * # NewnewsletterCtrl
 * Controller of the webIhmApp
 */
angular.module('webIhmApp')
        .controller('NewnewsletterCtrl', function ($location, $scope, $rootScope, newsLetterDAOService) {

            //Représentation Métier d'un newsletter
            $scope.userName = '';

            $scope.newsLetter = {
                nom: '',
                destinataire: '',
                diffusions: [],
                sujet: '',
                corps: '',
                elementModel: $rootScope.NEWSLETTER_ELEMENT_MODEL
            };
            
            $scope.model = 'views/template_modification.html';
            $scope.isSearchUsers = false;
            $scope.isSearchDiffusion = false;

            //TODO uncomment this line to enable / disable newLetter edition
            // enableNewsLetterEdition(true);
            $scope.changemodel = function (model) {
                if (model === 'CN') {
                    $scope.model = 'views/template_creation.html';
                }
                else if (model === 'MN') {
                    $scope.model = 'views/template_modification.html';
                }
            };
            
            //NewsLetters
            $scope.setNewsletterUser = function (user) {
                $scope.newsLetter.destinataire = user._id;
            };

            $scope.addNewsletterDiffusion = function (diffusion) {
                $scope.newsLetter.diffusions.push(diffusion._id);
            };

            $scope.deleteNewsletterDiffusion = function (diffusion) {
                removeElementFromList(diffusion, $scope.newsLetter.diffusions);
            };


            $scope.createNewsletter = function (newsLetter) {
                console.log(JSON.stringify(newsLetter));
                newsLetterDAOService.createElement(newsLetter, function (isError, message, newsLetterCreated) {
                    if (!isError) {
                        $rootScope.newsLetters.push(newsLetterCreated);
                        emptyElements();
                    }
                    console.log(JSON.stringify(message));
                    goBack();
                });
            };



            $scope.updateNewsletter = function (newsLetter) {
                newsLetterDAOService.updateElement(newsLetter, function (isError, message, newsLetterUpdated) {
                    if (!isError) {
                        updateElementToList(newsLetterUpdated, $rootScope.newsletters);
                        emptyElements();
                        enableNewsLetterEdition(false);
                    }
                    console.log(JSON.stringify(message));
                });
            };

            $scope.resetForm = function () {
                emptyElements();

            };

//            TODO uncomment this line to enable / disable newLetter edition
//            $scope.editNewsLetter = function(newsLetterToEdit){               
//                 $scope.newsLetter = newsLetterToEdit;
//                 enableNewsLetterEdition(true);
//            };


            function goBack() {
                $location.path('newsletterManager');
            }

            function enableNewsLetterEdition(isEnabled) {
                $scope.isEditNewsletter = isEnabled;
            }
            function removeElementFromList(element, liste) {
                if ((element !== null) && (element !== undefined)) {
                    for (var i in liste) {
                        if (liste[i].nom === element.nom) {
                            liste.splice(i, 1);
                            break;
                        }
                    }
                }
            }

            function updateElementToList(element, liste) {
                if ((element !== null) && (element !== undefined)) {
                    for (var i in liste) {
                        if (liste[i].nom === element.nom) {

                            liste[i] = element;
                            break;
                        }
                    }
                }
            }

            function emptyElements() {
                $scope.userName = '';
                $scope.newsLetter = {
                    nom: '',
                    destinataire: '',
                    diffusions: [],
                    sujet: '',
                    corps: '',
                    elementModel: $rootScope.NEWSLETTER_ELEMENT_MODEL
                };
            }
        });

