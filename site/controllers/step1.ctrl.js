angular.module('app').controller('step1Ctrl',function($scope,FluData,$state,statelist,places){
    $scope.fludata=FluData;
    $scope.types = ['Pet Owner','Shelter Representative'];
    if (statelist)
      $scope.states = statelist.data.results;
  else 
    $scope.states={};
$scope.$watch('fludata.model.state', function(newVal) {
    if (newVal) {
        places.getCitiesByState(newVal).success(function(response){
            $scope.cities=_.uniq(response.results);
        });
    }
});

$scope.$watch('fludata.model.city', function(newVal) {
    if (newVal) {
        places.getZipByCity(newVal).success(function(response){
            $scope.zipcodes=response.results;
        });
    }
});

$scope.$watch('fludata.model.zipcode', function(newVal) {
    if (newVal) {
        places.getLocation(newVal).success(function(response){
            $scope.fludata.model.lat=response.lat;
            $scope.fludata.model.lng=response.lng;
        });
    }
});

$scope.goStep2 = function() {
    if($scope.fludata.model.usertype=='Pet Owner')
        $state.go('petowner');
    else if($scope.fludata.model.usertype=='Shelter Representative')
        $state.go('shelter');
}
});