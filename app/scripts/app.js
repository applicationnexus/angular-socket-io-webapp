'use strict';

/**
 * @ngdoc overview
 * @name webappApp
 * @description
 * # webappApp
 *
 * Main module of the application.
 */
angular
  .module('webappApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngGrid',
    'restangular',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'MainCtrl'
      })
      .when('/members', {
        templateUrl: 'views/members.html',
        controller: 'MemCtrl'
      })
      .when('/members/:add', {
        templateUrl: 'views/members_add.html',
        controller: 'MemCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
.run(function(Restangular, Config) {
    Restangular.setBaseUrl(Config.apiHome);
});
