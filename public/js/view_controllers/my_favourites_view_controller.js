var app = angular.module('CoffeeMate');

app.controller('my_favourites_view_controller', ['$scope', '$http','$location', function($scope,$http,$location) {
    // create a message to display in our view




    findMyFavourites();

    $scope.getStarStyles=function(stars) {

        console.log("value" +stars);
        if (stars== 5) {
            return [
                "glyphicon glyphicon-star favourite-star",
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


    function findMyFavourites()
    {
        $http.get('/favourites/'+$scope.profile.email)
            .success(function(data)
            {
                $scope.favourites=data;
                console.log(data);
            })
            .error(function(data)
            {
                console.log("error:"+data);
            })
    }





}




]);