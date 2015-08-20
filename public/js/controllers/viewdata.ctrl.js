angular.module('survey').controller('viewdataCtrl',function($scope,places){
    $scope.fluMarkers={};
    var that=this;
    $scope.goFinalStep = function() {
      $state.go('viewdata');
  };
  places.getOwnerFludata()
  .success(function(data){
$scope.owners=data;
  }).error(function (data) {
    console.log("error: "+data);
});

  places.getShelterFludata()
  .success(function(data){
$scope.shelters=data;

  })
  .error(function (data) {
    console.log("error: "+data);
});


places.getMediaFludata()
  .success(function(data){
$scope.mediaflu=data;

  })
  .error(function (data) {
    console.log("error: "+data);
});

  $scope.choices=["Pet Owners","Shelter Representatives","Media/Laboratory"];
  $scope.filter="";
  $scope.$watch('filter', function(newVal) {    
    $scope.resetMarkers();
    if (newVal=="Pet Owners") {
        if($scope.owners) {
            owners=$scope.owners;
            //get location data for markers
            for (var i = owners.results.length - 1; i >= 0; i--) {
                var owner=owners.results[i];
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
        if($scope.shelters) {
            shelters=$scope.shelters;
            //get location data for markers
            for (var i = shelters.results.length - 1; i >= 0; i--) {
                var shelter=shelters.results[i];
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

    else if(newVal=="Media/Laboratory"){
        if($scope.mediaflu) {
            shelters=$scope.mediaflu;
            //get location data for markers
            for (var i = shelters.results.length - 1; i >= 0; i--) {
                var shelter=shelters.results[i];
                $scope.fluMarkers[shelter._id]={
                    lat: shelter.Latitude,
                    lng: shelter.Longitude,
                    message: shelter.Location,
                    focus: false,
                    draggable: false,
                    icon: local_icons.default_icon
                }
            };
        }     
    }
});

$scope.resetMarkers=function() { 
    $scope.fluMarkers={};
    $scope.markers={};
    $scope.markers=$scope.fluMarkers;
};
var local_icons = {
    default_icon: {}
    /*virus_icon: {
        iconUrl: 'public/img/virus.png',
        shadowUrl: 'public/img/shadow.png',
             iconSize:     [24, 24], // size of the icon
            shadowSize:   [20, 24], // size of the shadow
            iconAnchor:   [10, 64], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        }*/
    };

    angular.extend($scope, {
        center: {
            lat: 40.5454013,
            lng: -74.3319302,
            zoom: 3
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