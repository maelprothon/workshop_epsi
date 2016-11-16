'use strict';

angular.module('webIhmApp')
        .controller('NewsletterManagerCtrl', function ($scope, $rootScope, newsLetterDAOService, mailSenderService) {


            //Variables
            var NEWSLETTER_ELEMENT_MODEL = $rootScope.NEWSLETTER_ELEMENT_MODEL;


            //$rootScope.users;
            //Variable scope 
            $scope.newsletter = {
                nom: '',
                destinataire: '',
                diffusions: [],
                sujet: '',
                corps: '',
                elementModel: NEWSLETTER_ELEMENT_MODEL
            };

            $scope.login = {
                email: 'admin@admin.fr',
                password: '123'
            };

            var admin = $rootScope.admins[0];

            $scope.creation = false;
            $scope.infomation = false;
            $scope.update = false;
            $scope.model = '';
            $scope.isSearchUsers = false;
            $scope.isSearchDiffusion = false;
            $scope.listeDiffusion = [];

            //Fonction du scope
            $scope.connect = function (login) {
                if (admin.email === login.email && admin.password === login.password) {
                    $rootScope.connected = true;
                    $scope.information = true;
                }
            };

            $scope.addDiffusionNewsletter = function (diffusion) {
                $scope.newsletter.diffusions.push({_id: diffusion._id});
                $scope.listeDiffusion.push(diffusion);

            };

            //Methode d'envoie d'une newsletter
            $scope.sendNewsletter = function (newsletter) {
                newsletter.destinataire = extractAllEmailsFromDiffusion(newsletter);
                var email = {
                    recipientList: newsletter.destinataire,
                    subject: newsletter.sujet,
                    body: newsletter.corps + '<br/> <a title="Titre du lien" href="localhost:3000/incrementRateNewsletter/' + newsletter._id +
                            '> Accusé de réception</a>'
                };
                $scope.information = false;
                mailSenderService.sendEmail(email);
            };


            $scope.submitNewsletter = function (newsletter) {
                $scope.createNewsletter(newsletter);
            };

            $scope.createNewsletter = function (newsletter) {
                newsLetterDAOService.createElement(newsletter, function (isError, message, newsletter) {
                    if (!isError) {
                        $rootScope.newsLetters.push(newsletter);
                    }
                    returnToStandardViewFromCreation();
                    console.log(message);
                });
            };

            $scope.deleteNewsletter = function (newsletter) {
                newsLetterDAOService.deleteElement(newsletter, function (isError, message, newsletter) {
                    if (!isError) {
                        removeElementFromList(newsletter, $rootScope.newsLetters);
                    }
                    console.log(message);
                });
            };

            $scope.addDiffusion = function (diffusion) {
                $scope.newsletter.diffusions.push(diffusion._id);
                $scope.listeMail = toStringArray($scope.newsletter.diffusions);
            };

            $scope.removeDiffusion = function (diffusionId) {
                removeElementFromList(diffusionId, $scope.newsletter.diffusions);
                removeElementFromList(diffusionId, $scope.listeDiffusion);
            };

            $scope.removeDiffusion = function (diffusion) {
                var index = $scope.newsletter.diffusion.indexOf(diffusion);
                $scope.newsletter.diffusion.splice(index, 1);
                $scope.listeMail = toStringArray($scope.newsletter.diffusions);
            };

            //Acces à la vu de création de newsletter

            $scope.addNewsletter = function () {
                $scope.information = false;
                $scope.model = 'views/template_creation.html';
                $scope.creation = true;
            };

            //Acces à la vu de modification
            $scope.updateViewNewsletter = function (newsletter) {
                $scope.model = 'views/template_modification.html';
                $scope.newsletter = newsletter;
                $scope.update = true;
            };

            //En cas d'annulation de l'action retour à la dispostion normal
            $scope.cancelSubmit = function () {
                $scope.model = '';
                $scope.update = false;
                $scope.creation = false;
                resetForm();
            };

            $scope.searchDiffusion = function (diffusionName) {
                if (diffusionName !== '' && diffusionName !== null && diffusionName !== undefined) {
                    return  $scope.isSearchDiffusion = true;
                }
                return  $scope.isSearchDiffusion = false;
            };


            //Fonctions privées


            function extractAllEmailsFromDiffusion(newsletter) {
                var listeMailDeRetour = [];
                for (var i = 0; i < newsletter.diffusions.length; i++) {
                    angular.extend(listeMailDeRetour, getDiffusionEmails(newsletter.diffusions[i]));
                }
                return listeMailDeRetour;
            }

            function getDiffusionEmails(diffusionId) {
                var diffusion = $rootScope.diffusions;
                if (diffusionId !== null) {
                    var users = [];
                    var userId;
                    var user;
                    for (var i = 0; i < diffusion.length; i++) {
                        if (diffusion[i]._id === diffusionId) {
                            for (var j in  diffusion[i].users) {
                                userId = diffusion[i].users[j];
                                user = gerUserById(userId);
                                if (user !== null) {
                                    users.push(user.email);
                                }
                            }
                        }
                    }
                    return users;
                }
                return [];
            }

            function gerUserById(userId) {
                var i = 0;
                while ((i < $rootScope.users.length) && ($rootScope.users[i]._id !== userId)) {
                    i++;
                }
                if (i < $rootScope.users.length) {
                    return $rootScope.users[i];
                }
                return null;
            }

            function removeElementFromList(element, liste) {
                for (var i in liste) {
                    if (liste[i]._id === element._id) {
                        liste.splice(i, 1);
                        break;
                    }
                }
            }
            function annulerUpdate() {
                $scope.update = false;
                $scope.resetForm();
            }

            function returnToStandardViewFromCreation() {
                $scope.creation = false;
                $scope.resetForm();
            }


            function resetForm() {
                $scope.newsletter = {
                    nom: '',
                    destinataire: '',
                    diffusions: [],
                    sujet: '',
                    corps: ''
                };
            }

            function toStringArray(array) {
                var output = '';
                output += array[0];
                for (var i = 1; i < array.length; i++) {
                    output += ',' + array[i];
                }
                return output;
            }
        });
