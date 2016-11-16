'use strict';

/**
 * @ngdoc service
 * @name webIhmApp.mock
 * @description
 * # mock
 * Service in the webIhmApp.
 */
angular.module('webIhmApp')
        .service('mockService', function () {
            var listeData = [];
            var mock = {
                getListeNewsletters: function () {
                    listeData = [];
                    for (var i = 0; i < 4; i++) {
                        var newLetter = {};
                        newLetter.sujet = 'new letter ' + i;
                        newLetter.id = i;
                        newLetter.contenu = 'sujet newletter ....';
                        listeData.push(newLetter);
                    }
                    return listeData;
                },
                getListeDiffusion: function () {
                    listeData = [];
                    for (var i = 0; i < 4; i++) {
                        var diffusiont = {};
                        diffusiont.name = 'diffusion ' + i;
                        diffusiont.id = i;
                        diffusiont.listeEmail = [
                            {
                                id: 0,
                                name: 'dommaine@exemple1.com'
                            },
                            {
                                id: 1,
                                name: 'dommaine@exemple2.com'
                            },
                            {
                                id: 2,
                                name: 'dommaine@exemple3.com'
                            },
                            {
                                id: 3,
                                name: 'dommaine@exemple4.com'
                            }                          
                        ];
                        listeData.push(diffusiont);
                    }
                    return listeData;
                }
            };
            return mock;
        });
