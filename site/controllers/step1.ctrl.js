angular.module('app').controller('step1Ctrl',function($scope,FluData,$state){
    $scope.fludata=FluData;
    $scope.types = ['Pet Owner','Shelter Representative'];
    $scope.states=["Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District Of Columbia"];
    $scope.cities=['Bill de Blasio (D) New York City, NY.',
'Eric Garcetti (D) Los Angeles, CA.',
'Rahm Emanuel (D) Chicago, IL.',
'Annise Parker (D) Houston, TX.',
'Michael Nutter (D) Philadelphia, PA.',
'Greg Stanton (D) Phoenix, AZ.',
'Ivy Taylor (D) San Antonio, TX.',
'Kevin Faulconer (R) San Diego, CA.'];

$scope.zipcodes=['60001','60002','60003','60004'];
    $scope.goStep2 = function() {
        if($scope.fludata.model.usertype=='Pet Owner')
    $state.go('petowner');
else if($scope.fludata.model.usertype=='Shelter Representative')
    $state.go('shelter');
  }
});