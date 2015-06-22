angular.module('app').controller('petownerCtrl',function($scope,FluData,$state){
	$scope.fludata=FluData;

	$scope.goFinalStep = function() {
		$state.go('viewdata');
	};
});