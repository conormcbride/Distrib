var app = angular.module('reservationListController', [])
app.controller('reservationListController', ['$scope', '$http', function($scope, $http) {
    // create a message to display in our view
    $scope.message = 'Reservation List!';

    findAll();

    function findAll() {
        $http.get('/reservation')
            .success(function (data) {
                $scope.reservations = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.delete = function (id) {
        if (confirm("are you sure you want to delete this ?")) {
            console.log('Deleting id :' + id);

            $http.delete('/reservation/' + id)
                .success(function (data) {
                    console.log(data);
                    findAll();
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                })
        }
    }
    $scope.current = {};

    $scope.update = function (reservation) {
        console.log(reservation._id);
        $scope.current = reservation;
    };

    $scope.save = function () {
        console.log($scope.current._id);
        $http.put('reservation/' + $scope.current._id + '/update', $scope.current).success(function (data) {

            console.log(data);
            findAll()
            $scope.current = ""
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    }
}]);