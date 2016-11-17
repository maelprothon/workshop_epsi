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
                setGmapMarker(title, response.data.result[i].content.adresse + ', ' + response.data.result[i].content.codepostale + ', ' + response.data.result[i].content.city, response.data.result[i].content.id);
            } 
        });
        
        function setGmapMarker(title, address, iduser) {
            var contentString = '<div id="content" style="color: black;">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+title+'</h1>'+
            '<div id="bodyContent">'+
            '<p>'+address+'<br/><a href="/produits">'+
            'Voir ses produits</a> </p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              var latitude = results[0].geometry.location.lat();
              var longitude = results[0].geometry.location.lng();
              var marker = new google.maps.Marker({
                    position: {lat: latitude, lng: longitude},
                    map: map,
                    title: title
                  });
                marker.addListener('click', function() {
                  infowindow.open(map, marker);
                });
            } 
          });

        }
        
  });
