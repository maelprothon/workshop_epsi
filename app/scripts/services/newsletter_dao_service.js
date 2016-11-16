'use strict';
/**
 * @ngdoc service
 * @name webIhmApp.NewsLetterDAO
 * @description
 * # NewsLetterDAO
 * Service in the webIhmApp.
 */
angular.module('webIhmApp')
        .service('newsLetterDAOService', function ($http) {

            var SUCCESS_REQUEST = 1;
            var BASE_URL = '';

//
//             //authentication
//            this.login = function (elementModel, done) {
//                $http.get(BASE_URL + '/login/' + elementModel).then(function (response) {
//                    if (response.data.status === SUCCESS_REQUEST) {
//                        return done(false, response.data.message, response.data.elements);
//                    }
//                    done(true, response.data.message);
//                }, function (response) {
//                    done(true, response);
//                });
//            };
            
            
            //get elements
            this.getElement = function (elementModel, done) {
                $http.get(BASE_URL + '/getElement/' + elementModel).then(function (response) {
                    if (response.data.status === SUCCESS_REQUEST) {
                        return done(false, response.data.message, response.data.elements);
                    }
                    done(true, response.data.message);
                }, function (response) {
                    done(true, response);
                });
            };

            //seach Element
            this.seachElement = function (elementModel, nom, done) {
                $http.get(BASE_URL + '/searchElement/' + elementModel + '/' + nom).then(function (response) {
                    if (response.data.status === SUCCESS_REQUEST) {
                        return done(false, response.data.message, response.data.elements);
                    }
                    done(true, response.data.message);
                }, function (response) {
                    done(true, response);
                });
            };

            //create element
            this.createElement = function (element, done) {
                $http.post(BASE_URL + '/createElement', element)
                        .then(function (response) {
                            if (response.data.status === SUCCESS_REQUEST) {
                                return done(false, response.data.message, response.data.elements);
                            }
                            return done(true, response.data.message);
                        }, function (response) {
                            return  done(true, response);
                        });
            };

            //create elements
            this.createElements = function (elements, done) {
                $http.post(BASE_URL + '/createElements', elements)
                        .then(function (response) {
                            if (response.data.status === SUCCESS_REQUEST) {
                                return done(false, response.data.message, response.data.elements);
                            }
                            return done(true, response.data.message);
                        }, function (response) {
                            return  done(true, response);
                        });
            };

            //update elements
            this.updateElement = function (element, done) {
                $http.post(BASE_URL + '/updateElement', element)
                        .then(function (response) {
                            if (response.data.status === SUCCESS_REQUEST) {
                                return done(false, response.data.message, response.data.elements);
                            }
                            return done(true, response.data.message);
                        }, function (response) {
                            return  done(true, response);
                        });
            };

            this.deleteElement = function (element, done) {
                $http.post(BASE_URL + '/deleteElement', element)
                        .then(function (response) {
                            if (response.data.status === SUCCESS_REQUEST) {
                                return done(false, response.data.message, response.data.elements);
                            }
                            return  done(false, response.data.message);
                        }, function (response) {
                            return  done(true, response);
                        });
            };

            this.init = function ($rootScope) {
                BASE_URL = $rootScope.BASE_URL;
                $http.defaults.headers.common = {};
                $http.defaults.headers.post = {'Content-Type': 'application/json'};
                $http.defaults.headers.put = {};
                $http.defaults.headers.patch = {};
            };
        });
