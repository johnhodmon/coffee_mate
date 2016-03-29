var app = angular.module('CoffeeMate');

app.controller('coffees_view_controller', ['$scope', '$http','$location', function($scope,$http,$location) {
    // create a message to display in our view
    $scope.message = 'Coffees Page!';

    findAll();

    function findAll()
    {
        $http.get('/coffees')
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
                    findAll();
                })
                .error(function (data) {
                    console.log('error: ' + data);
                })

        }
    }

    $scope.incrementStars=function(id) {




        $http.put('/coffees/'+id+'/stars').success(function (data) {


                console.log(data)
                findAll();
            })
            .error(function (data) {
                console.log('error: ' + data);
            })

    }

}



]);