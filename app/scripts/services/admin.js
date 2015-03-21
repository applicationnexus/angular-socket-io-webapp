'use strict';

angular.module('webappApp')
.service('Admin', function Message(Config, Restangular) {
    var admin = Restangular.all('admin');
    return {
	   AdminLogin : admin.one('AdminLogin'),
       AdminUpdate: admin.one('AdminUpdate'),
       AdminForgot: admin.one('AdminForgot')
        
    };
});