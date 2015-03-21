'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.directive('equals', function() {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function(scope, elem, attrs, ngModel) {
            if(!ngModel) return; // do nothing if no ng-model

            // watch own value and re-validate on change
            scope.$watch(attrs.ngModel, function() {
                validate();
            });

            // observe the other value and re-validate on change
            attrs.$observe('equals', function (val) {
                validate();
            });

            var validate = function() {
                // values
                var val1 = ngModel.$viewValue;
                var val2 = attrs.equals;

                // set validity
                ngModel.$setValidity('equals', ! val1 || ! val2 || val1 === val2);
            };
        }
    }
})
.controller('MainCtrl', function ($scope, $routeParams, $location, Storage, Admin) {
    //initialize login variable
    $scope.login = [];
    $scope.PageError = false;
    //Login function
    
    $scope.AdminLogin = function(data) {
        //prepare the post variables
        Admin.AdminLogin.username = data.username;
        Admin.AdminLogin.passwd = data.password;
        //post the user data to server
        Admin.AdminLogin.post().then(function(result) {
            //console.log(result);
            //check if the result available
            if(result) {
                Storage.setAdminId(result._id);
                Storage.setAdminEmail(result.email);
                Storage.setAdminUsername(result.username);
                //redirect to members listing page
                $location.path('/members');
            }
            
        }, function(response) {
            //console.log(JSON.stringify(response));
            $scope.PageError = true;
            //display Error
            if(response.data) {
                document.getElementById('PageError').innerHTML = response.data;
            } else {
                document.getElementById('PageError').innerHTML = "Error occured please try again after sometime.";
            }
        });
    };
    $scope.profile = [];
    $scope.profile.username = Storage.getAdminUsername();
    $scope.profile.email = Storage.getAdminEmail();
    var adminId = Storage.getAdminId();
    var adminEmail = Storage.getAdminEmail();
    $scope.updateProfile = function(data) {
        Admin.AdminUpdate.admid = adminId;
        Admin.AdminUpdate.username = data.username;
        Admin.AdminUpdate.email = data.email;
        Admin.AdminUpdate.password = data.password;
        console.log(data);
        Admin.AdminUpdate.post().then(function(result) {
            //check if returned data is string or not
            if( typeof result === 'string' ) {
                $scope.pageError = true;
                document.getElementById('pageError').innerHTML = JSON.stringify(result);
            } else {
                Storage.setAdminEmail(result.email);
                Storage.setAdminUsername(result.username);
                $scope.pageError = true;
                document.getElementById('pageError').innerHTML = "Profile updated successfully";
            }
        }, function(error) {
            $scope.pageError = true;
            document.getElementById('pageError').innerHTML = error.data;
        });
    }
    
    
  });
