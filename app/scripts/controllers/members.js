'use strict';

/**
 * @ngdoc function
 * @name involvedMembersApp.controller:OrgCtrl
 * @description
 * # OrgCtrl
 * Controller of the involvedMembersApp
 */
angular.module('webappApp')
.controller('MemCtrl', function ($scope, $routeParams, $rootScope, $timeout, $location, $window, Config, Storage, Members) {
    //get admin id from localStorage
    $scope.adminid = Storage.getAdminId();
   //check if any parameter 
    if(!$routeParams.add) {
    $scope.memlist = '';
    var actualData = '';
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [50, 500, 1000],
        pageSize: 50,
        currentPage: 1
    };	
    //calculate the number of records to be displayed using page size
    $scope.setPagingData = function(data, page, pageSize){	
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.memlist = pagedData;
        console.log(data.length);
        console.log($scope.memlist);
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    
    //set the paging option
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
         if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.setPagingData(actualData, newVal.currentPage, $scope.pagingOptions.pageSize);
        }
    }, true);
   
        
        $scope.mySelections = [];
        $scope.removedIds = [];
        $scope.checkall = [];
        //set the ng-grid options
        $scope.gridOptions = {data: 'memlist', multiSelect: false, sortInfo: {fields:['first_name'], directions:['asc'] }, columnDefs: [{field: 'first_name', displayName: 'Name'}, {field: 'email', displayName: 'Email', sortable: true}, {field: 'status', displayName: 'Status'}], enablePaging: true, rowHeight: 50, enableHighlighting: true, enableRowSelection: false, showFooter: true, totalServerItems: 'totalServerItems', pagingOptions: $scope.pagingOptions};
        Members.members.get('list').then(function(data) {
            //check if returned data is string or not
            if( typeof data === 'string' ) {
                //console.log("IF");
                $scope.pageSuccess = false;
                $scope.pageError = true;
                document.getElementById('pageError').innerHTML = data;
            } else {
                actualData = data;
                //$rootScope.orgMemList = data;
                $scope.memlist = data;
                //set the paging data
                $scope.setPagingData($scope.memlist, $scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize);
            }
      });
    }
    $scope.invite = [];
    //invite members to join
    $scope.sendInvite = function(data) {
        Members.sendInvitation.name    = data.fname+' '+data.lname;
        Members.sendInvitation.first_name    = data.fname;
        Members.sendInvitation.last_name    = data.lname;
        Members.sendInvitation.email   = data.email;
        Members.sendInvitation.post().then(function(result) {
            $scope.pageSuccess = false;
            $scope.pageError = true;
            document.getElementById('pageError').innerHTML = "Invitation sent successfully.";
        }, function(error) {
            //console.log(error);
            $scope.pageSuccess = false;
            $scope.pageError = true;
            document.getElementById('pageError').innerHTML = JSON.stringify(error.data);
        });
    };//send Invite
    
  });
