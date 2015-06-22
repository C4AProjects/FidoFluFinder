angular.module('app').controller('shelterCtrl',function($scope,FluData,$state){
    $scope.fludata=FluData;

    $scope.goFinalStep = function() {
		$state.go('viewdata');
	};
});