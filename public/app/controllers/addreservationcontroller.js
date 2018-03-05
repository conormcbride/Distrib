var app = angular.module('addReservationController', [])

app.controller('addReservationController', ['$scope', '$location', '$http', function($scope, $location, $http) {



    $scope.addReservation = function(newReservation){
        $http.post('/reservation', newReservation).success(function(data) {
            $scope.reservations = data;
            $location.path('/allreservationlist');
            console.log(data);
        })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


}]);
