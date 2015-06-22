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
            templateUrl: 'site/templates/welcome.html',
            controller: 'welcomeController'
        })
        .state('step1', {
            url: '/step1',
            templateUrl: 'site/templates/step1.html',
            controller: 'step1Ctrl'
        })
        .state('step2', {
            url: '/step2',
            templateUrl: 'site/templates/step2.html',
            controller: 'step2Ctrl'
        })
        .state('petowner', {
            url: '/petowner',
            templateUrl: 'site/templates/petowner.html',
            controller: 'petownerCtrl'
        })
        .state('shelter', {
            url: '/shelter',
            templateUrl: 'site/templates/shelter.html',
            controller: 'shelterCtrl'
        })
         .state('viewdata', {
            url: '/viewdata',
            templateUrl: 'site/templates/viewdata.html'
            //controller: 'shelterCtrl'
        })
         .state('aboutus', {
            url: '/aboutus',
            templateUrl: 'site/templates/aboutus.html'
            //controller: 'shelterCtrl'
        });
       
    }
    ]);


angular.module('app').controller('step2Ctrl',function($scope,FluData){
    $scope.fludata=FluData
});

angular.module("app").service("FluData", function() {
  this.model = {};

});
