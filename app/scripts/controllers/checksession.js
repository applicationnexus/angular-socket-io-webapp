'use strict';

/**
 * @ngdoc function
 * @name involvedMembersApp.controller:OrgCtrl
 * @description
 * # OrgCtrl
 * Controller of the involvedMembersApp
 */
angular.module('webappApp')
.controller('LoginSessionCtrl', function ($scope, $routeParams, $location, Storage) {
    //check if user is logged in or not
    if(( !Storage.getAdminId()) || (!Storage.getAdminEmail())) {
        Storage.setAdminId('');
        Storage.setAdminEmail('');
        //user is not logged in so redirect him to login page
        $location.path('/');
    }
    //logout function
    $scope.logout = function() {
        Storage.setAdminId('');
        Storage.setAdminEmail('');
        $location.path('/');
    };
  });

