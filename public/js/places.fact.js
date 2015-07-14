angular.module('survey')  
    .factory('places', ['$http', function($http) {
    	var serviceBase = 'api/v1/';
    	var that=this;
    	that.getAllStates = function () {
		    return $http.get(serviceBase + 'states');
		};
		that.getCitiesByState = function (state) {
		    return $http.get(serviceBase + 'cities/'+state);
		};
		that.getZipByCity=function(city){
			return $http.get(serviceBase+'zipcodes/'+city);
		};
		that.getLocation=function(zipcode){
			return $http.get(serviceBase+'location/'+zipcode)
		};
		//create petowner flu location
		that.addOwnerFludata = function (fludata) {
		    return $http.post(serviceBase + 'petowners',fludata);
		};
		//create shelter representative flu location
		that.addShelterFludata = function (fludata) {
		    return $http.post(serviceBase + 'shelters',fludata);
		};
		//get flu locations by states
		that.getFluLocations=function(state){
			return $http.get(serviceBase+'fludata/'+state)
		};

		//get owner flu locations
		that.getOwnerFludata=function(){
			return $http.get(serviceBase+'petowners')
		};
		//get shelter flu locations
		that.getShelterFludata=function(){
			return $http.get(serviceBase+'shelters')
		};
       return that;
    }]);