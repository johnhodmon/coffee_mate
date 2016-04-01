var app = angular.module('CoffeeMate');

app.controller('edit_coffee_view_controller', ['$scope', '$location','$http','$routeParams', function($scope,$location,$http,$routeParams) {

    $scope.edit_coffee_form = {};
    getCoffeeToEdit();
    var coffee={};


    function getCoffeeToEdit() {
        console.log("_id: " +$routeParams.id);
        $http.get('/coffees/'+$routeParams.id)

            .success(function (data) {
                console.log("data: " + data);
                coffee = data[0];
                console.log("name: " + coffee.name);


                $scope.edit_coffee_form.name=coffee.name;
                $scope.edit_coffee_form.coffee_shop=coffee.coffee_shop;
                $scope.edit_coffee_form.price=coffee.price;
                $scope.edit_coffee_form.stars=coffee.stars;
                $scope.edit_coffee_form.favourite=coffee.favourite;
                setStarDisplay();


            })
            .error(function (data) {
                console.log('Error' + data)
            });
    }



function setStarDisplay() {
    if ($scope.edit_coffee_form.stars == 5) {
        $scope.star1_style = $scope.star2_style = $scope.star3_style = $scope.star4_style = $scope.star5_style = "glyphicon glyphicon-star favourite-star"
    }

    else if ($scope.edit_coffee_form.stars == 4) {
        $scope.star1_style = $scope.star2_style = $scope.star3_style = $scope.star4_style = "glyphicon glyphicon-star favourite-star"
        $scope.star5_style = "glyphicon glyphicon-star-empty"
    }

    else if ($scope.edit_coffee_form.stars == 3) {
        $scope.star1_style = $scope.star2_style = $scope.star3_style = "glyphicon glyphicon-star favourite-star";
        $scope.star5_style = $scope.star4_style = "glyphicon glyphicon-star-empty"
    }

    else if ($scope.edit_coffee_form.stars == 2) {
        $scope.star1_style = $scope.star2_style = "glyphicon glyphicon-star favourite-star";
        $scope.star5_style = $scope.star4_style = $scope.star3_style = "glyphicon glyphicon-star-empty"
    }

    else if ($scope.edit_coffee_form.stars == 1) {
        $scope.star1_style = "glyphicon glyphicon-star favourite-star";
        $scope.star5_style = $scope.star4_style = $scope.star3_style = $scope.star2_style = "glyphicon glyphicon-star-empty"
    }

    else {
        $scope.star1_style = $scope.star2_style = $scope.star3_style = $scope.star4_style = $scope.star5_style = "glyphicon glyphicon-star-empty"
    }
}

$scope.toggleFavourite=function()
{
   console.log("toggle");
    if ($scope.edit_coffee_form.favourite=="glyphicon glyphicon-star gold-star")
    {
        $scope.edit_coffee_form.favourite="glyphicon glyphicon-star-empty";
    }

    else
    {
        $scope.edit_coffee_form.favourite="glyphicon glyphicon-star gold-star";
    }
}

$scope.setStars=function(numberOfStars)
{
    $scope.edit_coffee_form.stars=numberOfStars;
    setStarDisplay()
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
                $location.path('/my_coffees');
            })
            .error(function(data)
            {
                console.log('Error'+data)
            })


    }

}

]);
