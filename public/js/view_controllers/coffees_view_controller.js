var app = angular.module('CoffeeMate');

app.controller('coffees_view_controller', ['$scope', '$http','$location', function($scope,$http,$location) {
    // create a message to display in our view



    findAll();

    $scope.editCoffee=function(coffee)
    {

        if (coffee.favourite=="glyphicon glyphicon-star gold-star")
        {
            coffee.favourite="glyphicon glyphicon-star-empty";
        }

        else
        {
            coffee.favourite="glyphicon glyphicon-star gold-star";
        }



        $http.put('/coffees/'+coffee._id,coffee)
            .success(function(data){
                console.log(data);
                findAll();
            })
            .error(function(data)
            {
                console.log('Error'+data)
            })


    }


    function findAll()
    {
        $http.get('/coffees')
            .success(function(data)
            {
                $scope.coffees=data;
                console.log(data[0]);

            })
            .error(function(data)
            {
                console.log("error:"+data);
            })
    }

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



}






]);