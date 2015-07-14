'use strict';

/**
 * Route configuration for the app module.
 */
 angular.module('survey').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
        // .state('index', {
        //     url: '/',
        //     templateUrl: 'public/templates/welcome.html',
        //     controller: 'welcomeController'
        // })
        .state('index', {
            url: '/',
            templateUrl: 'public/templates/step1.html',
            controller: 'step1Ctrl',
             resolve: {
                    statelist: function (places) {
                        return places.getAllStates().error(function (data) {
                            console.log("error: "+data);
                        });
                    }
                }
        })
        .state('petowner', {
            url: '/petowner',
            templateUrl: 'public/templates/petowner.html',
            controller: 'petownerCtrl'
        })
        .state('shelter', {
            url: '/shelter',
            templateUrl: 'public/templates/shelter.html',
            controller: 'shelterCtrl'
        })
         /*.state('viewdata', {
            url: '/viewdata',
            templateUrl: 'site/templates/viewdata.html',
            controller: 'viewdataCtrl',
             resolve: {
                    owners: function (places) {
                        return places.getOwnerFludata().error(function (data) {
                            console.log("error: "+data);
                        });
                    },
                    shelters: function (places) {
                        return places.getShelterFludata().error(function (data) {
                            console.log("error: "+data);
                        });
                    }
                }
        })*/
         .state('congrats', {
            url: '/congrats',
            templateUrl: 'public/templates/congrats.html'
            //controller: 'shelterCtrl'
        });
       
    }
    ]);


angular.module("survey").service("FluData", function() {
  this.model = {};

});
