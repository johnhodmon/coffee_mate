var app = angular.module('CoffeeMate');


app.controller('home_view_controller', ['$scope', function($scope) {
    // create a message to display in our view
    $scope.message = 'Welcome to Coffee Mate';
}
]);