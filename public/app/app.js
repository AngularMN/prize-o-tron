angular.module('apot',
  [
    'ui.router',
    'apot.aboutController',
    'apot.homeController'
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      'use strict';
      $urlRouterProvider.otherwise('/');

      // Home state routing
      $stateProvider
        .state('home', {
          url: '/',
          controller: 'homeController',
          templateUrl: 'app/home/home.html'
        })
        .state('about', {
          url: '/about',
          controller: 'aboutController',
          templateUrl: 'app/about/about.html'
        });
    }
  ]);
