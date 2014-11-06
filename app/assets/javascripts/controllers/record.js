function RecordCtrl($scope, Session, Records) {"use strict";
    $scope.records = Records.index();
	$scope.logout = function() {
       Session.logout();
	   $scope.$parent.loggedin = 0;
    };
}

