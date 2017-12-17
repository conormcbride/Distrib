var app = angular.module('addstaffController', [])

app.controller('addstaffcontroller', ['$scope', '$location', '$http', function($scope, $location, $http) {



    $scope.addStaff = function(newStaff){
        $http.post('/staff', newStaff).success(function(data) {
            $scope.bars = data;
            $location.path('/allstafflist');
            console.log(data);
        })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


}]);
