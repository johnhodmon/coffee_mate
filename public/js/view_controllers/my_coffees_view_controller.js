var app = angular.module('CoffeeMate');

app.controller('my_coffees_view_controller', ['$scope', '$http','$location', function($scope,$http,$location) {
    // create a message to display in our view




    findMyCoffees();




    function findMyCoffees()
    {
        $http.get('/my_coffees/'+$scope.profile.email)
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
                    findMyCoffees();
                })
                .error(function (data) {
                    console.log('error: ' + data);
                })

        }
    };

    $scope.editCoffee=function(coffee,updatedStars)
    {
        console.log("coffee shop: "+coffee.coffee_shop);
        console.log("coffee id: "+coffee._id);
        console.log("updated stars: "+updatedStars);


        coffee.stars=updatedStars;


        $http.put('/coffees/'+coffee._id,coffee)
            .success(function(data){
                console.log(data);
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

        console.log("value" +stars);
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