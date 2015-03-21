'use strict';

angular.module('webappApp')
    .service('Storage', function Storage($cookies) {
        return {
            setAdminId: function (id) {
                window.localStorage.setItem("AdminId", id);
            },
            getAdminId: function() {
                return window.localStorage.getItem('AdminId');
            },
            setAdminEmail: function (email) {
                window.localStorage.setItem("AdminEmail", email);
            },
            getAdminEmail: function() {
                return window.localStorage.getItem('AdminEmail');
            },
            setAdminUsername: function (username) {
                window.localStorage.setItem("AdminUsername", username);
            },
            getAdminUsername: function() {
                return window.localStorage.getItem('AdminUsername');
            }
        };
    });