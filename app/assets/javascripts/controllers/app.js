function AppCtrl($scope, Session, $rootScope) {"use strict";
		$scope.admin = 0
    $scope.current_person = 0
    $scope.loggedin = 0

    //$scope.user = Session.requestCurrentUser();

    $scope.$on('event:unauthorized', function(event) {
        console.log('unauthorized');
    });
    $scope.$on('event:authenticated', function(event) {
        console.log('authenticated');
    });


}