app.directive('serverError', [function () {
  return {
    restrict: 'A',
    require: ['ngModel', '^form'],
    link: function (scope, element, attrs, ctrls) {
      var ngModel = ctrls[0];
      var formCtrl = ctrls[1];

      scope.$watch(function() {
        return ngModel.$modelValue;
      }, function() {
        formCtrl[attrs.name].$setValidity('server', true);
      });
    }
  };
}]);