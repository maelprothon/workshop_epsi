'use strict';

/**
 * @ngdoc function
 * @name webIhmApp.controller:UserCtrl
 * @description
 * # UsersCtrl
 * Controller of the webIhmApp
 */
angular.module('webIhmApp')
  .controller('UsersCtrl', function ($scope, $http) {      
        console.log('ok');
        $http.get('http://easytroc.prothon.me/workshop_epsi/php/controller_user.php?action=getList')
        .then(function(response) {
            $scope.users = response.data.result;
            var title = "";
            for(var i = 0; i<response.data.result.length; i++) {
                title = response.data.result[i].content.nom + " " + response.data.result[i].content.prenom;
                setGmapMarker(title, response.data.result[i].content.adresse + ', ' + response.data.result[i].content.codepostale + ', ' + response.data.result[i].content.city);
            } 
        });
        
        function setGmapMarker(title, address) {
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  var latitude = results[0].geometry.location.lat();
                  var longitude = results[0].geometry.location.lng();
                  var marker = new google.maps.Marker({
                        position: {lat: latitude, lng: longitude},
                        map: map,
                        title: title
                      });

                } 
              });
        }
        
  });
