angular.module('app').controller('viewdataCtrl',function($scope,FluData,$state,places,owners,shelters){
    $scope.fludata=FluData;
    $scope.fluMarkers={};
    var that=this;
    $scope.goFinalStep = function() {
      $state.go('viewdata');
  };
  $scope.choices=["Pet Owners","Shelter Representatives"];
  $scope.filter="";
  $scope.$watch('filter', function(newVal) {    
    if (newVal=="Pet Owners") {
        if(owners) {
            //get location data for markers
            for (var i = owners.data.results.length - 1; i >= 0; i--) {
                var owner=owners.data.results[i];
                $scope.fluMarkers[owner._id]={
                    lat: owner.lat,
                    lng: owner.lng,
                    message: owner.petType,
                    focus: false,
                    draggable: false,
                    icon: local_icons.virus_icon
                }
            };
        }     
    }
    else if(newVal=="Shelter Representatives"){
if(shelters) {
            //get location data for markers
            for (var i = shelters.data.results.length - 1; i >= 0; i--) {
                var shelter=shelters.data.results[i];
                $scope.fluMarkers[shelter._id]={
                    lat: shelter.lat,
                    lng: shelter.lng,
                    message: shelter.petType,
                    focus: false,
                    draggable: false,
                    icon: local_icons.virus_icon
                }
            };
        }     
    }
});

$scope.$watch('fluMarkers', function(newVal) { 
    $scope.markers=$scope.fluMarkers;
});
  var local_icons = {
    default_icon: {},
    virus_icon: {
        iconUrl: 'site/images/virus.png',
        shadowUrl: 'site/images/shadow.png',
             iconSize:     [24, 24], // size of the icon
            shadowSize:   [20, 24], // size of the shadow
            iconAnchor:   [10, 64], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        }
    };
 
angular.extend($scope, {
    center: {
        lat: 40.5454013,
        lng: -74.3319302,
        zoom: 2
    },
    markers: $scope.fluMarkers,
    layers: {
        baselayers: {
            googleTerrain: {
                name: 'Google Terrain',
                layerType: 'TERRAIN',
                type: 'google'
            },
            googleHybrid: {
                name: 'Google Hybrid',
                layerType: 'HYBRID',
                type: 'google'
            },
            googleRoadmap: {
                name: 'Google Streets',
                layerType: 'ROADMAP',
                type: 'google'
            }
        }
    },
    defaults: {
        scrollWheelZoom: false
    }
});


});