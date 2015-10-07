var app = angular.module('myApp', []);

app.controller('mainCtrl', ['$scope', function($scope) {
	$scope.editing = false;

	$scope.savedTodos = localStorage.getItem('todos');
	$scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.savedTodos) : [];
	localStorage.setItem('todos', JSON.stringify($scope.todos));

	$scope.addTodo = function() {
		$scope.todos.push({
			task: $scope.todoText,
      description: $scope.descriptionText,
			date: $scope.dateText,
			done: false
		});
		$scope.todoText = '';
		$scope.descriptionText = '';
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	};

	$scope.editItem = function() {
		$scope.editing = true;
		console.log(this.todo);
	};

	$scope.editTodo = function() {
		this.todo.task = this.todoText;
		this.todo.description = this.descriptionText;
		this.todo.date = this.dateText;
		this.done = false;
		localStorage.setItem('todos', JSON.stringify($scope.todos));
		$scope.editing = false;
	};

  $scope.selectAll = function() {
    angular.forEach($scope.todos, function(todo) {
      todo.done = true;
    });
  };

	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo){
			count+= todo.done ? 1 : 0;
		});
		return count;
	};

  $scope.deleteItem = function() {
    console.log($scope.todos);
    $scope.todos.splice(this.$index, 1);
    console.log(this.$index);
    localStorage.setItem('todos', JSON.stringify($scope.todos));
  };

	$scope.clear = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo){
			if (!todo.done)
				$scope.todos.push(todo);
		});
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	};
}]);
