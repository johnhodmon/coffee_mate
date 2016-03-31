var app = angular.module('CoffeeMate');

app.controller('add_coffee_view_controller', ['$scope', '$location','$http', function($scope,$location,$http) {

    $scope.coffee_form = {};

    $scope.message = 'Add a Coffee!';


    $scope.addCoffee=function()
    {
        console.log("name: "+$scope.profile.name)
        var coffee=
        {
            'name': $scope.coffee_form.name,
            'coffee_shop': $scope.coffee_form.coffee_shop,
            'price': $scope.coffee_form.price,
            'user_email':$scope.profile.email,
            'user_name':$scope.profile.name,
            'user_img_url':$scope.profile.imageUrl



        };

        $http.post('/coffees',coffee)
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
