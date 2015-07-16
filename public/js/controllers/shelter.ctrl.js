angular.module('survey').controller('shelterCtrl',function($scope,FluData,$state,places){
    $scope.fludata=FluData;

    $scope.goFinalStep = function() {
    	//Save data and display
		places.addShelterFludata($scope.fludata.model).success(function(response){
            console.log('saved successfully');
            $state.go('congrats');
        }).error(function(data){
        	$state.go('failure');
        });
		
	};
});