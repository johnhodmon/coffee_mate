var app = angular.module('CoffeeMate');

app.controller('edit_coffee_view_controller', ['$scope', '$location','$http','$routeParams', function($scope,$location,$http,$routeParams) {

    $scope.edit_coffee_form = {};
    var id=$routeParams.id;
    var coffee={};
    $http.get('/coffees/'+id)
        .success(function(data){
            console.log("data: "+data);
            coffee=data;

        })
        .error(function(data)
        {
            console.log('Error'+data)
        });

    $scope.edit_coffee_form.name=coffee.name;
    $scope.edit_coffee_form.coffee_shop=coffee.coffee_shop;
    $scope.edit_coffee_form.price=coffee.coffee_shop;
    $scope.edit_coffee_form.stars=coffee.stars;
    $scope.edit_coffee_form.favourite=coffee.favourite;


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

        $http.put('/coffees/'+id,updatedCoffee)
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
