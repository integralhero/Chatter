// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', ['$scope', '$location', 'MessagesFactory', function($scope, $location, MessagesFactory) {
    $scope.username = ""; 
    $scope.enterChat = function() {
    	MessagesFactory.setUsername($scope.username);
    	$location.path("/messages");
    }
}]);