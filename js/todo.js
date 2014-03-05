var todo = angular.module('todo', ['todofilters', 'ngTouch']);
todo.controller('todoController', ['$scope',
    function ($scope) {

        $scope.appName = "On My Plate";
        $scope.newTodoText = "";
        $scope.showMoreOptions = false;

        $scope.todos = [];

        $scope.addNewTodo = function () {
            if ($scope.newTodoText == "") {
                return;
            }
            var newtodo = {
                "text": $scope.newTodoText
            };
            if ($scope.showMoreOptions) {
                if ($scope.newTodoDueDate) {
                    newtodo.duedate = $scope.newTodoDueDate;
                }
                if ($scope.newTodoDueTime) {
                    newtodo.duetime = $scope.newTodoDueTime;
                }
            }
            $scope.todos.unshift(newtodo);
            $scope.newTodoText = "";
            $scope.newTodoDueDate = null;
            $scope.newTodoDueTime = null;
            $scope.showMoreOptions = false;
            chrome.storage.sync.set({
                "todos": $scope.todos
            }, function () {
                console.log("Stuff added to plate");
            });
        }

        $scope.onNewTodoKeyDown = function ($event) {
            var code = ($event.keyCode ? $event.keyCode : $event.which);
            if (code == 13) { //Enter keycode
                $scope.addNewTodo();
            }
        }

        $scope.removeItem = function (index) {
            $scope.todos.splice(index, 1);
            chrome.storage.sync.set({
                "todos": $scope.todos
            }, function () {
                console.log("Stuff removed from plate");
            });
        }

        $scope.prioritizeItem = function (index) {
            var item = $scope.todos.splice(index, 1)[0];
            $scope.todos.unshift(item);
        }

        $scope.showOptions = function (index) {
            showOptions(index);
        }

        $scope.loadData = function () {
            chrome.storage.sync.get(null, function (data) {
                var todos = [];
                if (data.todos) {
                    todos = data.todos;
                }
                $scope.$apply(loadTodos(todos));
            });
        }

        loadTodos = function (todos) {
            $scope.todos = todos;
        }

        $scope.toggleOptions = function () {
            $scope.showMoreOptions = !$scope.showMoreOptions;
        }

}]);