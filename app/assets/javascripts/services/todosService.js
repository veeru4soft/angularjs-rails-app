angular.module('todosService', ['ngResource'])
  .factory('Todos', function($resource) {
    return $resource('todos.json', {}, {
      index: { method: 'GET', isArray: true},
      create: { method: 'POST' },
      assigned_todos: {method: 'GET', isArray: true}
    });
  })
  .factory('Todo', function($resource){
    return $resource('todos/:todo_id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT' },
      destroy: { method: 'DELETE' }
    });
  });




