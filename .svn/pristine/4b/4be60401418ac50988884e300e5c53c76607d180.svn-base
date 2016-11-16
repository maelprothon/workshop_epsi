 'use strict';

/**
 * @ngdoc service
 * @name webIhmApp.mailSender
 * @description
 * # mailSender
 * Service in the webIhmApp.
 */

angular.module('webIhmApp')
        .service('mailSenderService', function ($http, globalVariables) {
            var BASE_URL = globalVariables.BASE_URL;
    
                this.sendEmail = function (emailRaw) {
                    var email = genMailOption(emailRaw);
                    $http.post(BASE_URL + '/sendMail',email)
                            .then(function (responce) {
                                console.log('message : ' + responce.data.message + ', status : ' + responce.status);
                            }, function (data, status) {
                                console.log('message : ' + data.message + ', status : ' + status);
                            });
                };
   
         function genMailOption(emailRaw) {
                var recipients = '',
                        size = emailRaw.recipientList.length,
                        i = 0,
                        htmlBody = '<b>' + emailRaw.body + '</b>';

                while (i < (size - 2)) {
                    recipients += emailRaw.recipientList[i] + ', ';
                    i++;
                }
                
                recipients += emailRaw.recipientList[size-1];
                
                var mail = {
                    to: recipients,
                    subject: emailRaw.subject,
                    text: emailRaw.body,
                    html: htmlBody
                };

                return JSON.parse(JSON.stringify(mail));
            }

        });
