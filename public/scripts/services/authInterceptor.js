angular.module("app").service('authInterceptor', function($q) {
    var service = this;

    service.responseError = function(response) {
        if (response.status == 401){
            window.location = "/#login"; //$state.go('login', {});
            return $q.reject(response);
        }
        if (response.status == 404){
            window.location = "/#404"; //$state.go('404', {});
            return $q.reject(response);
        }
        
    };
});