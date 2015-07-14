angular.module('survey').controller('petownerCtrl',function($scope,FluData,$state,places){
	$scope.fludata=FluData;

	$scope.goFinalStep = function() {
		//Save data and display
		places.addOwnerFludata($scope.fludata.model).success(function(response){
            console.log('saved successfully');
            $state.go('congrats');
        });
		
	};
});