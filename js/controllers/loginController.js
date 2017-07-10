
angular.module('Authentication').controller('loginController',
    ['$scope', '$rootScope', '$location', 'authenticationService',
    function ($scope, $rootScope, $location, authenticationService) {
        // reset login status
        authenticationService.ClearCredentials();
 
        $scope.login = function () {
			console.log('chegou na função');
            $scope.dataLoading = true;
            authenticationService.Login($scope.email, $scope.senha, function(response) {
                if(response.success) {
                    authenticationService.SetCredentials($scope.email, $scope.senha);
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);