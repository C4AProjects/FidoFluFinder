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
    $scope.cities=["Acampo",
    "Acton","Adelaide","Encino","Escalon",
    "Media","Medinah","Medora"];

$scope.zipcodes=['60001','60002','60003','60004','60005'];
    $scope.goStep2 = function() {
        if($scope.fludata.model.usertype=='Pet Owner')
    $state.go('petowner');
else if($scope.fludata.model.usertype=='Shelter Representative')
    $state.go('shelter');
  }
});