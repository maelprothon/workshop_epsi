'use strict';

/**
 * @ngdoc function
 * @name webIhmApp.controller:NewsletterSettingCtrl
 * @description
 * # NewsletterSettingCtrl
 * Controller of the webIhmApp
 */
angular.module('webIhmApp')
        .controller('NewsletterSettingsCtrl', function ($scope, $parse, $rootScope, newsLetterDAOService) {

            $rootScope.templateName = 'newsletter_settings';
            $scope.editModeDiffusion = false;
            $scope.diffusionToEdit = null;
            $scope.nomDiffusion = '';
            $scope.userName = '';
            $scope.isSearchUsers = false;
            $rootScope.usersFound = {};
            $scope.usersRaw = null;

            $scope.user = {
                nom: '',
                prenom: '',
                email: '',
                elementModel: $rootScope.USER_ELEMENT_MODEL
            };

            $scope.diffusion = {
                nom: '',
                users: [],
                elementModel: $rootScope.DIFFUSION_ELEMENT_MODEL
            };

            $scope.adminToEdit = $rootScope.admins[0];
            $scope.createElement = function (element) {
                newsLetterDAOService.createElement(element, function (isError, message, element) {
                    if (!isError) {
                        var elements = $rootScope.getListElementsByElementModel(element.elementModel);
                        elements.push(element);
                        emptyFields();
                    }
                    console.log(JSON.stringify(message));
                });
            };

            $scope.deleteElement = function (element) {
                newsLetterDAOService.deleteElement(element, function (isError, message, element) {
                    if (!isError) {
                        removeElementFromList(element, $rootScope.getListElementsByElementModel(element.elementModel));
                    }
                    console.log(JSON.stringify(message));
                });
            };

            $scope.updateElement = function (element) {
                newsLetterDAOService.updateElement(element, function (isError, message, diffusionUpdated) {
                    if (!isError) {
                        updateElementToList(diffusionUpdated, $rootScope.getListElementsByElementModel(element.elementModel));
                    }
                    console.log(JSON.stringify(message));
                });
            };

            //user edition
            $scope.createUser = function (user) {
                if (emailFormatIsCorrect(user.email)) {
                    $scope.createElement(user);
                }
            };

            //diffusion edition
            $scope.searchUser = function (userName) {
                if (userName !== '' && userName !== null && userName !== undefined) {
                    return $scope.isSearchUsers = true;
                }
                return $scope.isSearchUsers = false;
            };

            $scope.editDiffusion = function (diffusion) {
                $scope.diffusionToEdit = diffusion;
                $scope.editModeDiffusion = true;
            };

            $scope.updateDiffusion = function (diffusion) {
                $scope.updateElement(diffusion);
                $scope.editModeDiffusion = false;
            };

            $scope.addDiffusionUser = function (user) {
                $scope.diffusionToEdit.users.push(user._id);
                $scope.isSearchUsers = false;
                emptyFields();
            };

            $scope.deleteDiffusionUser = function (user) {
                removeUserFromList(user._id, $scope.diffusionToEdit.users);
            };

            $scope.getDiffusionUsers = function (diffusion) {
                if (diffusion !== null) {
                    var users = [];
                    var userId;
                    var user;

                    for (var i in  diffusion.users) {
                        userId = diffusion.users[i];
                        user = gerUserById(userId);
                        if (user !== null) {
                            users.push(user);
                        }
                    }
                    return users;
                }
                return [];
            };

            $scope.cancelEditDiffution = function () {
                $scope.editModeDiffusion = false;
            };

            //CSV importation
            $scope.csv = {
                content: null,
                header: true,
                separator: ';',
                result: null,
                encoding: 'ISO-8859-1'
            };

            $scope.loadUser = function (usersRaw) {
                var users = setElementModelToUsersRaw(usersRaw);         
                newsLetterDAOService.createElements(users, function (isError, message, users) {
                     console.log(JSON.stringify(users));
                    if (!isError) {
                        users.forEach(function(user){
                             $rootScope.users.push(user);
                        });
                        return;
                    }
                    console.log(JSON.stringify(message));
                });
            };

            function setElementModelToUsersRaw(usersRaw) {
                var users = [];
                usersRaw.forEach(function(userRaw){
                    users.push({
                        nom: userRaw.nom,
                        prenom: userRaw.prenom,
                        email: userRaw.email,
                        elementModel: $rootScope.USER_ELEMENT_MODEL
                    }); 
                });
                    
                return users;
            }

            function emptyFields() {
                $scope.user = {
                    nom: '',
                    prenom: '',
                    email: '',
                    elementModel: $rootScope.USER_ELEMENT_MODEL
                };

                $scope.diffusion = {
                    nom: '',
                    users: [],
                    elementModel: $rootScope.DIFFUSION_ELEMENT_MODEL
                };

                $scope.userName = '';
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
//            function toPrettyJSON(json, tabWidth) {
//                var _lastGoodResult = '';
//                var objStr = JSON.stringify(json);
//                var obj = null;
//                try {
//                    obj = $parse(objStr)({});
//                } catch (e) {
//                    // eat $parse error
//                    return _lastGoodResult;
//                }
//
//                var result = JSON.stringify(obj, null, Number(tabWidth));
//                _lastGoodResult = result;
//
//                return result;
//            }

            function emailFormatIsCorrect(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }

            function removeUserFromList(user, liste) {
                for (var i in liste) {
                    if (liste[i]._id === user._id) {
                        liste.splice(i, 1);
                        break;
                    }
                }
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
        });


