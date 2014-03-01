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

        $scope.onNewTodoKeyDown = function ($event) {
            var code = ($event.keyCode ? $event.keyCode : $event.which);
            if (code == 13) { //Enter keycode
                $scope.addNewTodo();
            }
        }

        $scope.removeItem = function (index) {
            $scope.todos.splice(index, 1);
        }

        $scope.showOptions = function (index) {
            showOptions(index);
        }

}]);