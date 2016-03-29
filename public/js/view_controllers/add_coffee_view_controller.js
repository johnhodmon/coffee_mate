var app = angular.module('CoffeeMate');

app.controller('add_coffee_view_controller', ['$scope', '$location','$http', function($scope,$location,$http) {

    $scope.coffee_form = {};

    $scope.message = 'Add a Coffee!';


    $scope.addCoffee=function()
    {
        var coffee=
        {
            'name': $scope.coffee_form.name,
            'coffee_shop': $scope.coffee_form.coffee_shop,
            'price': $scope.coffee_form.price


        };

        $http.post('/coffees',coffee)
            .success(function(data){
                console.log(data);
                $location.path('/coffees');
            })
            .error(function(data)
            {
                console.log('Error'+data)
            })


    }

}

]);
