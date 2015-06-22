angular.module('app')  
    .factory('places', ['$http', function($http) {
    	var serviceBase = '/api/v1/';
    	var that=this;
    	that.getAllStates = function () {
		    return $http.get(serviceBase + 'states');
		};
		/*that.getAllPermissions = function () {
		    return $http.get(serviceBase + 'GetAllPermissions');
		};
		that.getAllPermissions = function () {
		    return $http.get(serviceBase + 'GetAllPermissions');
		};
		that.getAllPermissions = function () {
		    return $http.get(serviceBase + 'GetAllPermissions');
		};
		that.getAllPermissions = function () {
		    return $http.get(serviceBase + 'GetAllPermissions');
		};*/
       return that;
    }]);