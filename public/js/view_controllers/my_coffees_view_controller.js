var app = angular.module('CoffeeMate');

app.controller('my_coffees_view_controller', ['$scope', '$http','$location', function($scope,$http,$location) {
    // create a message to display in our view




    findMyCoffees();
    $scope.allFavourites=[];



    function findMyCoffees()
    {
        $http.get('/my_coffees/'+$scope.profile.email)
            .success(function(data)
            {
                $scope.coffees=data;

            })
            .error(function(data)
            {
                console.log("error:"+data);
            })

        $http.get('/favourites') .success(function(data)
            {
                $scope.allFavourites=data;
                console.log("fav length: "+$scope.favourites.length)


            })
            .error(function(data)
            {
                console.log("error:"+data);
            })
    }
    $scope.delete=function(id) {

        if (confirm("Are you sure you want to delete this coffee?")) {


            $http.delete('coffees/' + id).success(function (data) {



                    findMyCoffees();
                })
                .error(function (data) {
                    console.log('error: ' + data);
                })

            var containedInFavourites=false;
            var favouriteId=null;
            for(var i=0;i<$scope.allFavourites.length;i++)
            {
                if($scope.allFavourites[i].coffee._id==id)
                {
                    console.log("in favs");
                    containedInFavourites=true;
                    favouriteId=$scope.allFavourites[i]._id
                    break;
                }
            }

            if (containedInFavourites)

            {
                $http.delete('favourites/' + favouriteId).success(function (data) {



                    })
                    .error(function (data) {
                        console.log('error: ' + data);
                    })
            }

        }
    };

    $scope.editCoffee=function(coffee,updatedStars)
    {



        coffee.stars=updatedStars;


        $http.put('/coffees/'+coffee._id,coffee)
            .success(function(data){

                $location.path('/my_coffees');
            })
            .error(function(data)
            {
                console.log('Error'+data)
            })


    }

    $scope.update=function(id) {

        $location.path('coffees/'+id+'/edit');
    }

    $scope.getStarStyles=function(stars) {


        if (stars== 5) {
            return [
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",

            ]
        }

        else if(stars==4)
        {
            return [
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star-empty"
            ]
        }


        else if(stars==3)
        {
            return [

                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star-empty",
                "glyphicon glyphicon-star-empty"
            ]
        }


        else if(stars==2)
        {
            return [
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star-empty",
                "glyphicon glyphicon-star-empty",
                "glyphicon glyphicon-star-empty"
            ]
        }



        else if(stars==1)
        {
            return [
                "glyphicon glyphicon-star favourite-star",
                "glyphicon glyphicon-star-empty",
                "glyphicon glyphicon-star-empty",
                "glyphicon glyphicon-star-empty",
                "glyphicon glyphicon-star-empty"

            ]
        }


        else
        {
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