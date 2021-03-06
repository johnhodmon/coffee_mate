var app = angular.module('CoffeeMate', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider

    // home view
        .when('/', {
            templateUrl : 'angular_views/home.ejs',
            controller  : 'home_view_controller'
        })

        .when('/coffees', {
            templateUrl : 'angular_views/coffees.ejs',
            controller  : 'coffees_view_controller'
        })

        .when('/my_coffees', {
            templateUrl : 'angular_views/my_coffees.ejs',
            controller  : 'my_coffees_view_controller'
        })

        .when('/my_favourites', {
            templateUrl : 'angular_views/my_favourites.ejs',
            controller  : 'my_favourites_view_controller'
        })

        .when('/coffees/new', {
            templateUrl : 'angular_views/add_coffee.ejs',
            controller  : 'add_coffee_view_controller'
        })

        .when('/coffees/:id/edit', {
            templateUrl : 'angular_views/edit_coffee.ejs',
            controller  : 'edit_coffee_view_controller'
        })







});