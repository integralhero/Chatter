// public/js/services/MessageService.js
angular.module('MessageService', []).factory('MessagesFactory', ['$http', function($http) {
    var username = "";
    return {
        setUsername: function(name) {
            username = name;
        },
        getUsername : function() {
            return username;
        },
        // call to get all nerds
        getAll : function(callback) {
            $http.get('/api/messages').success(function(response) {
                console.log("MessageService[getAll]: ", response);
                callback(response);
            });
        },

        // POST call to create new message
        createMessage : function(data) {
            console.log("createMessage: ", data);
            $http.post('/api/messages', data).success(function(response) {
                console.log("posted message");
                return response;
            });
        }
    }       

}]);