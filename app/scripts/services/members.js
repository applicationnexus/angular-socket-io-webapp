'use strict';

angular.module('webappApp')
.service('Members', function Message(Config, Restangular) {
    var members = Restangular.all('members');
    return {
        members: members,
        add: members.one('add'),
        remove: members.one('remove'),
        updateDetails: members.one('updateDetails'),
        sendInvitation: members.one('sendInvitation'),
        checkValidUser: members.one('checkValidUser')
    };
});