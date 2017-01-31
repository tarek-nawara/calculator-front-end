var app = angular.module('myApp', []);
app.controller('appController', function ($scope, $http, $window) {
	$scope.expression = "";
	$scope.userId = 0;

	$scope.buttonHandler = function (value, index) {
		$scope.expression = $scope.expression.concat(value);
	}

	$scope.deleteHandler = function () {
		$scope.expression = $scope.expression.substr(0, $scope.expression.length - 1);
	}

	$scope.equalHandler = function () {
		var equation = btoa($scope.expression);
		$http.get('http://localhost:8080/calc?equation=' + equation).
			then(function (response) {
				$scope.expression = response.data.toString();
			});
	}

	$scope.historyHandler = function () {
		console.log("history");
	}

	$scope.signInHandler = function () {
		console.log("starting in signInHandler...");
		var userLoginRegisterationInfo = { name: $scope.userName, password: $scope.password }
		console.log($scope.userName);
		console.log($scope.password);
		$http.post('http://localhost:8080/login', userLoginRegisterationInfo).
			then(function (response) {
				console.log(response.data);
				var loginStatus = response.data.loginStatus;
				switch (loginStatus) {
					case 'USER_NOT_FOUND':
						$scope.errorMessage = 'Please, You must sign up';
						break;
					case 'PASSWORD_INCORRECT':
						$scope.errorMessage = 'Incorrect name or password';
						break;
					case 'SUCCESSFULL_LOGIN':
						$scope.errorMessage = false;
						$scope.userId = response.data.userId;
						$window.location.href = "index.html";
				}
			});
	}

	$scope.signUpHandler = function () {
		console.log("starting in signUpHandler....");
		var userLoginRegisterationInfo = { name: $scope.userName, password: $scope.password }
		$http.post('http://localhost:8080/user/', userLoginRegisterationInfo).
			then(function (response) {
				console.log(response.data);
				$scope.userId = response.data;
				$window.location.href = "index.html";
			});
	}
});
