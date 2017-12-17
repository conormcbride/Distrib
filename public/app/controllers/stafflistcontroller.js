var app = angular.module('stafflistController', [])

app.controller('stafflistController', ['$scope', '$http', function($scope, $http) {
    // create a message to display in our view
    $scope.message = 'Staff List!';

    findAll();

    function findAll() {
        $http.get('/staff')
            .success(function (data) {
                $scope.staffs = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
    $scope.delete = function (id) {
        if (confirm("are you sure you want to delete this ?")) {
            console.log('Deleting id :' + id);

            $http.delete('/staff/' + id)
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

    $scope.update = function (staff) {
        console.log(staff._id);
        $scope.current = staff;
    };

    $scope.save = function () {
        console.log($scope.current._id);
        $http.put('staff/' + $scope.current._id + '/update', $scope.current).success(function (data) {

            console.log(data);
            findAll()
            $scope.current = ""
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    }
}]);