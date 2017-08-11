app.directive('validPassword', function() {
	return {
	  require: "ngModel",
	  link: function(scope, element, attributes, ngModel) {   
			ngModel.$validators.validPassword = function(modelValue) {
				if (!modelValue || modelValue.length < 8) {
					return false;
				}
				var re = /[A-Z]/;
				if (!re.test(modelValue)) {
					return false;
				}
				re = /[0-9]/;
				if (!re.test(modelValue)) {
					return false;
				}
				re = /[^\w\s]/;
				return re.test(modelValue);
			};
	  }
	};
});