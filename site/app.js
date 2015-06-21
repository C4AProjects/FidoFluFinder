'use strict';

/**
 * Route configuration for the app module.
 */
 angular.module('app').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'templates/welcome.html',
            controller: 'welcomeController'
        })
        .state('step1', {
            url: '/step1',
            templateUrl: 'templates/step1.html',
            controller: 'step1Ctrl'
        })
        .state('step2', {
            url: '/step2',
            templateUrl: 'templates/step2.html',
            controller: 'step2Ctrl'
        });
       
    }
    ]);

// let's define the scotch controller that we call up in the about state
angular.module('app').controller('welcomeController', function($scope,$state) {

    var app = this;
$scope.goStep1 = function() {
    $state.go('step1');
  }
    
}).controller('step1Ctrl',function($scope,FluData,$state){
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
    $state.go('step2');
  }
})
.controller('step2Ctrl',function($scope,FluData){
    $scope.fludata=FluData
});

angular.module("app").service("FluData", function() {
  this.model = {};

});
