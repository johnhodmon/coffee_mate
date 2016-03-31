var app = angular.module('CoffeeMate');


app.controller('home_view_controller', ['$scope', '$window', function($scope,$window) {
    // create a message to display in our view
    $scope.message = 'Welcome to Coffee Mate';
    $scope.signedIn=false;
    $scope.profile=null;
    $scope.signIn = function() {
        // Get `GoogleAuth` instance
        var auth2 = gapi.auth2.getAuthInstance();

        // Sign-In
        auth2.signIn()
            .then(changeProfile, function(error) {


            });
    };

    /**
     * Trigger sign-out using Google Sign-In
     */
    $scope.signOut = function() {
        // Get `GoogleAuth` instance
        var auth2 = gapi.auth2.getAuthInstance();

        // Sign-Out
        auth2.signOut()
            .then( changeProfile, function(){




            });
    };

    /**
     * Invoked when sign-in status is changed
     * @param  {GoogleUser} googleUser GoogleUser object obtained upon
     *                                 successful authentication
     */
    var changeProfile = function(googleUser) {
        // See if `GoogleUser` object is obtained
        // If not, the user is signed out
        if (googleUser) {
            // Get `BasicProfile` object
            var profile = googleUser.getBasicProfile();

            // Get user's basic profile information
            $scope.profile = {
                name: profile.getName(),
                email: profile.getEmail(),
                imageUrl: profile.getImageUrl()
            };
            console.log("logged in as "+profile.getName());
            $scope.signedIn=true;
            $scope.$apply();



        } else {
            // Remove profile information
            // Polymer will take care of the rest
            $scope.profile = null;
            $scope.signedIn=false;
            $scope.$apply();
            console.log("logged out");

        }
    };




}
]);