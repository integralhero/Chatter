// public/js/controllers/MessageCtrl.js
angular.module('MessageCtrl', []).controller('MessageController', function($scope, MessagesFactory) {
    $scope.message = {};
    $scope.finalMessage = {};
    $scope.message.username = MessagesFactory.getUsername();
    $scope.submitMessage = function(messageObj) {
    	$scope.finalMessage = angular.copy(messageObj);
    	$scope.finalMessage.created = Date.now;
    	MessagesFactory.createMessage($scope.finalMessage);
    };
    function setMessages(allMessages) {

    	console.log("setMessages: ", allMessages);
    	$scope.displayMessages = allMessages;

    }
    function retrieveMessages() {
    	MessagesFactory.getAll(setMessages);
    }
    retrieveMessages();
    setInterval(function() {
        retrieveMessages();
    }, 500)
});