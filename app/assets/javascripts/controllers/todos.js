function TodosCtrl($scope, Todos) {
	
    "use strict";
    $scope.todos = Todos.index();


    $scope.remove = function(id) {
        var title = 'Delete Todo?', msg = 'Are you sure you want to delete this todo?', btns = [{
            result : 'cancel',
            label : 'Cancel'
        }, {
            result : 'ok',
            label : 'OK',
            cssClass : 'btn-primary'
        }];

             var result1 =  confirm(msg);
                if (result1 === true ) {
                Post.destroy({
                    post_id : id
                }, function() {
                    $location.path('/todos');
                });
            }

        
    };
    
    $scope.convertBoolean = function(val) {
        return val ? 'Yes' : 'No';
    };
}

function CommentAddCtrl($scope, $location, Comments, $routeParams) {
    "use strict";
    $scope.comment = {};
		alert(comment.todo_id);
    $scope.comment.todo_id = comment.todo_id;
    $scope.create = function(comment) {
        var commentService = new Comments(comment);
        commentService.$create(function(comment1) {
						console.log($scope.comments.length)
						$scope.comments.push(comment);
        });
		$scope.comments = Comments.index({
			id : $routeParams.todo_id
		});
		$scope.comment = '';
    }
}

function TodoAddCtrl($scope, $location, Todos, Todo, Projects, Posts) {
    "use strict";
    $scope.projects = Projects.index();

    $scope.users = Posts.index();
    $scope.todo = {};

    $scope.create = function(todo) {
        var todoService = new Todos(todo);
        todoService.$create(function(todo) {
			$location.path('/todos');
        });
    }
}

function TodoEditCtrl($scope, $routeParams, $location, Todo) {
    "use strict";
    
    $scope.master = {};
    var todo_id = $routeParams.todo_id;
    $scope.todo = Todo.show({
        todo_id : todo_id
    }, function(resource) {
        $scope.master = angular.copy(resource);
    });

    $scope.update = function(todo) {
        todo.$update({
            todo_id : todo_id
        }, function(updatedTodo) {
            $location.path('/todos/');
        });
    }
}


function TodoHomeCtrl($scope, Session, Todos, Comments, $http) {"use strict";
    $scope.$parent.normal_user = 1;
    $scope.$parent.loggedin = 1;
    $scope.$parent.current_person = Session.requestCurrentUser();
    $scope.assigned_todos = Todos.assigned_todos();

		$scope.comment = {};
    $scope.create = function(comment, todo_id) {

				comment.todo_id = parseInt(todo_id);

        var commentService = new Comments(comment);
        commentService.$create(function(comment) {
						$(".comment_box").val("")
						$(".close-reveal-modal").click();
        });
		}
}

function TodoShowCtrl($scope, $location, $routeParams, Todo, Comments) {"use strict";
    $scope.todo = Todo.show({
        todo_id : $routeParams.todo_id
    });

    $scope.comments = Comments.index({
				id : $routeParams.todo_id
		});
    $scope.convertBoolean = function(val) {
        return val ? 'Yes' : 'No';
    };
}

