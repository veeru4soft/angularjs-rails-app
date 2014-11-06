//= require jquery.min
//= require jquery-migrate-1.2.1.min
//= require suggest.min
//= require angular
//= require angular-file-upload
//= require bootstrap.min
//= require angular-strap.min
//= require angular-resource
//= require jquery.reveal
//= require xeditable
//= require ng-ckeditor-master/libs/ckeditor/ckeditor
//= require ng-ckeditor-master/src/scripts/02-directive
//= require services/todosService
//= require services/commentsService
//= require services/recordService
//= require services/sessionService
//= require services/postsService
//= require services/projectsService
//= require services/tasksService
//= require controllers/todos
//= require controllers/projects
//= require controllers/app
//= require controllers/users
//= require controllers/record
//= require script.js

angular.module('PostCommentRails', ['postsService', 'xeditable', 'todosService', 'commentsService', 'projectsService', 'tasksService', 'sessionService','recordService','$strap.directives', 'angularFileUpload', 'ngCkeditor'])
  .config(['$httpProvider', function(provider){
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
            function success(response) {
                return response
            };

            function error(response) {
                if (response.status == 401) {
                    $rootScope.$broadcast('event:unauthorized');
                    $location.path('/users/login');
                    return response;
                };
                return $q.reject(response);
            };

            return function(promise) {
                return promise.then(success, error);
            };
        }];
        provider.responseInterceptors.push(interceptor);
  }])
  .config(['$routeProvider', function(router){
    router
      .when('/', {templateUrl:'/home/index.html'})
      .when('/record', {templateUrl:'/record/index.html', controller:RecordCtrl})
      .when('/users/login', {templateUrl:'/users/login.html', controller:UsersCtrl})
      .when('/users/register', {templateUrl:'/users/register.html', controller:UsersCtrl})	
      .when('/projects', {templateUrl:'/projects/index.html', controller: ProjectsCtrl})
			.when('/projects/add', {templateUrl:'/projects/add.html', controller: ProjectAddCtrl})
			.when('/projects/:project_id', {templateUrl:'/projects/show.html', controller: ProjectShowCtrl})
			.when('/projects/:project_id/edit', {templateUrl:'/projects/edit.html', controller: ProjectEditCtrl})
			.when('/tasks/add', {templateUrl:'/tasks/add.html', controller: TaskAddCtrl})
      .when('/todo_home', {templateUrl:'/users/home.html.erb', controller:TodoHomeCtrl})
      .when('/user', {templateUrl:'/users/user.html', controller:UserViewCtrl})
      .when('/todos/add', {templateUrl:'/todos/add.html', controller:TodoAddCtrl})
      .when('/todos', {templateUrl:'/todos/index.html', controller:TodosCtrl})
      .when('/todo/:todo_id/edit', {templateUrl:'/todos/edit.html', controller:TodoEditCtrl})
			.when('/todos/:todo_id', {templateUrl: 'todos/show.html', controller:TodoShowCtrl}) 
      .otherwise({redirectTo: '/'});
}]);
