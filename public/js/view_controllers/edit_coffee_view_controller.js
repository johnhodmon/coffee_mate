var app = angular.module('CoffeeMate');

app.controller('edit_coffee_view_controller', ['$scope', '$location','$http','$routeParams', function($scope,$location,$http,$routeParams) {

    $scope.edit_coffee_form = {};
    getCoffeeToEdit();



    function getCoffeeToEdit() {
        $http.get('/coffees/'+$routeParams.id)
            .success(function (data) {
                console.log("data: " + data);
                var coffee = data[0];

                $scope.edit_coffee_form.name=coffee.name;
                $scope.edit_coffee_form.coffee_shop=coffee.coffee_shop;
                $scope.edit_coffee_form.price=coffee.price;
                $scope.edit_coffee_form.stars=coffee.stars;
                $scope.edit_coffee_form.favourite=coffee.favourite;

            })
            .error(function (data) {
                console.log('Error' + data)
            });
    }




    $scope.editCoffee=function(coffee)
    {



        var updatedCoffee=
        {
            'name': $scope.edit_coffee_form.name,
            'coffee_shop': $scope.edit_coffee_form.coffee_shop,
            'price': $scope.edit_coffee_form.price,
            'stars': $scope.edit_coffee_form.stars,
            'favourite': $scope.edit_coffee_form.favourite


        };

        $http.put('/coffees/'+$routeParams.id,updatedCoffee)
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
