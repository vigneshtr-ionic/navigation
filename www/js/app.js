var mapModule = angular.module("mapmodule", ["ngSanitize", "ngMaterial", "ngAnimate"])

mapModule.controller("mapcontroller", function ($scope) {
    $scope.onload = function (types) {
        if (navigator.geolocation) {
            // Get the user's current position
            navigator.geolocation.getCurrentPosition(function (position) {
                var pyrmont = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


                // Specify locatiozn, radius and place types for your Places API search.
                var request = {
                    location: pyrmont,
                    radius: '500',
                    types: types,
                };

                // Create the PlaceService and send the request.
                // Handle the callback with an anonymous function.
                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, function (results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];
                            // If the request succeeds, draw the place location on
                            // the map as a marker, and register an event to handle a
                            // click on the marker.
                            var marker = new google.maps.Marker({
                                map: map,
                                position: place.geometry.location
                            });
                        }
                    }
                });
            });
        } else {
            alert('Geolocation is not supported in your browser');
        }
    }

    $scope.onload(["petrol"]);
    $scope.searchByType = function (type) {
        $scope.onload([type])
    }
})
