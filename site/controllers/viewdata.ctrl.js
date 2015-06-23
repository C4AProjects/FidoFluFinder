angular.module('app').controller('viewdataCtrl',function($scope,FluData,$state){
    $scope.fludata=FluData;
var that=this;
    $scope.goFinalStep = function() {
		$state.go('viewdata');
	};
	angular.extend($scope, {
        center: {
            lat: 38.200413,
            lng: -121.218576,
            zoom: 15
        },
         markers: {
            osloMarker: {
                lat: 38.200413,
            lng: -121.218576,
                message: "FidoFluFinder",
                focus: true,
                draggable: false
            },
            testMarker: {
                lat: 38.195,
            lng: -121.218,
                message: "FidoFluFinder",
                focus: true,
                draggable: false
            },
            testMarker2: {
                lat: 38.205,
            lng: -121.218,
                message: "FidoFluFinder",
                focus: true,
                draggable: false
            }
        },
        defaults: {
            scrollWheelZoom: false
        }
    });
});