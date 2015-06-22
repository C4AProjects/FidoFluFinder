// let's define the welcome controller that we call up in the about state
angular.module('app').controller('welcomeController', function($scope,$state) {

    var app = this;
$scope.goStep1 = function() {
    $state.go('step1');
  }
    
});