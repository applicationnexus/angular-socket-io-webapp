'use strict';

angular.module('webappApp')
.service('Config', function Config() {
    var config = {
        mode: 'developmentLocal',
        developmentRemote: {
            apiHome: 'https://example.com:4000' //remote server
        },
        developmentLocal: {
            apiHome: 'http://localhost:4000'
        }
    };

    return config[config.mode];
});