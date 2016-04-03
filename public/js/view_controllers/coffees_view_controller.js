var app = angular.module('CoffeeMate')
    app.directive('coffeeMap', function() {



        return {


            template: '<div></div>',
            link:function initMap() {
                var icon="img/icon_30932_light_blue.png";
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(52.220624,-6.9413368),
                    title:"Hello World!",
                    description:"more coffee",

                    icon:icon
                });
            var map =  new google.maps.Map(document.getElementById('map'), {
                center: {lat: 52.2475523, lng: -7.1481351},
                zoom: 12
            });
                var infowindow = new google.maps.InfoWindow();
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent('<div><strong>More Details</strong><br>')
                    infowindow.open(map, this);
                });

            marker.setMap(map);
        }

        };


    });



app.controller('coffees_view_controller', ['$scope', '$http','$location', function($scope,$http,$location) {
    // create a message to display in our view

    $scope.favourites = [];

    $scope.$watch(function() {
        return $scope.signedIn;;
    }, function(newValue, oldValue) {
        if(newValue==true)
        {
            findAll()
        }
    });

    findAll();



    $scope.editCoffee = function (coffee) {

        if (coffee.favourite == "glyphicon glyphicon-star gold-star") {
            coffee.favourite = "glyphicon glyphicon-star-empty";
        }

        else {
            coffee.favourite = "glyphicon glyphicon-star gold-star";
        }


        $http.put('/coffees/' + coffee._id, coffee)
            .success(function (data) {

                findAll();
            })
            .error(function (data) {
                console.log('Error' + data)
            })


    }

    $scope.makeFavourite = function (coffee) {
        var alreadyFavourite = false;
        var favouriteId = null;
        for (var i = 0; i < $scope.favourites.length; i++) {
            if ($scope.favourites[i].coffee._id == coffee._id) {
                alreadyFavourite = true;
                favouriteId = $scope.favourites[i]._id
                break;
            }
        }

        if (alreadyFavourite) {
            $http.delete('favourites/' + favouriteId).success(function (data) {


                })
                .error(function (data) {
                    console.log('error: ' + data);
                })
        }

        else {
            var favourite = {
                'email': $scope.profile.email,
                'coffee': coffee
            }


            $http.post('favourites', favourite)
        }

        findAll();
    }

    $scope.getFavouriteStyle = function (id) {

        for (var i = 0; i < $scope.favourites.length; i++) {
            if ($scope.favourites[i].coffee._id == id) {
                return ["glyphicon glyphicon-star gold-star "];
            }
        }


        return ["glyphicon glyphicon-star-empty "];


    }


    function findAll() {

        if ($scope.signedIn)
        {
            $http.get('/coffees')
                .success(function (data) {
                    $scope.coffees = data;


                })
                .error(function (data) {
                    console.log("error:" + data);
                })


        $http.get('/favourites/' + $scope.profile.email).success(function (data) {
                $scope.favourites = data;


            })
            .error(function (data) {
                console.log("error:" + data);
            })
    }
    }

    $scope.getStarStyles = function (stars) {


        if (stars == 5) {
            return [
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
            ]
        }

        else if (stars == 4) {
            return [
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star-empty"
            ]
        }


        else if (stars == 3) {
            return [

                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star-empty",
                "glyphicon glyphicon-star-empty"
            ]
        }


        else if (stars == 2) {
            return [
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star-empty",
                "glyphicon glyphicon-star-empty",
                "glyphicon glyphicon-star-empty"
            ]
        }


        else if (stars == 1) {
            return [
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star-empty",
                "glyphicon glyphicon-star-empty",
                "glyphicon glyphicon-star-empty",
                "glyphicon glyphicon-star-empty"

            ]
        }


        else {
            return [
                "glyphicon glyphicon-star-empty",
                "glyphicon glyphicon-star-empty",
                "glyphicon glyphicon-star-empty",
                "glyphicon glyphicon-star-empty",
                "glyphicon glyphicon-star-empty"

            ]
        }


    }



}






]);