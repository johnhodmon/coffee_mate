var app = angular.module('CoffeeMate');

app.controller('coffees_view_controller', ['$scope', '$http','$location', function($scope,$http,$location) {
    // create a message to display in our view




        findAll();




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



}




]);