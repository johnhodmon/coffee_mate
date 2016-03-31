var app = angular.module('CoffeeMate');

app.controller('my_favourites_view_controller', ['$scope', '$http','$location', function($scope,$http,$location) {
    // create a message to display in our view




    findMyFavourites();




    function findMyFavourites()
    {
        $http.get('/favourites/'+$scope.profile.email)
            .success(function(data)
            {
                $scope.coffees=data;
                console.log(data);
            })
            .error(function(data)
            {
                console.log("error:"+data);
            })
    }

    $scope.delete=function(id) {

        if (confirm("Are you sure you want to delete this coffee?")) {


            $http.delete('coffees/' + id).success(function (data) {


                    console.log(data)
                    findMyFavourites();
                })
                .error(function (data) {
                    console.log('error: ' + data);
                })

        }
    };

    $scope.incrementStars=function(id) {




        $http.put('/coffees/'+id+'/stars').success(function (data) {


                console.log(data);
                findMyFavourites();
            })
            .error(function (data) {
                console.log('error: ' + data);
            })

    }

    $scope.update=function(id) {

        $location.path('coffees/'+id+'/edit');
    }

}




]);