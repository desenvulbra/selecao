
angular.module('Authentication').controller('loginController',
    ['$scope', '$rootScope', '$location', 'authenticationService',
    function ($scope, $rootScope, $location, authenticationService) {
        // reset login status
        authenticationService.ClearCredentials();
 
        $scope.login = function () {
            $scope.dataLoading = true;
            authenticationService.Login($scope.email, $scope.senha, function(response) {
                if(response.success) {
                    authenticationService.SetCredentials($scope.email, $scope.senha);
					document.location.href = '/curso';
					/* console.log($location); */
                    /* $location.path('/curso');*/
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);