var todo = angular.module('todo', ['ngTouch']);
todo.controller('todoController', ['$scope',
    function ($scope) {

        $scope.appName = "On My Plate";
        $scope.newTodoText = "";

        $scope.todos = [];

        $scope.addNewTodo = function () {
            $scope.todos.unshift({
                "text": $scope.newTodoText
            })
            $scope.newTodoText = "";
        }

}]);