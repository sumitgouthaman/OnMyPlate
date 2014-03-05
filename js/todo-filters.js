angular.module('todofilters', []).filter('daysLeft', function () {
    return function (input) {
        var date1 = new Date(input);
        var date2 = new Date();
        var diff = date1.getTime() - date2.getTime();
        if (diff > 0) {
            return Math.round(diff / (1000 * 60 * 60 * 24)) + "";
        } else {
            return "missed!";
        }
    };
});