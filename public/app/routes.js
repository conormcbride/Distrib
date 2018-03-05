var app = angular.module('appRoutes',['ngRoute'])


    .config(function ($routeProvider, $locationProvider) {

        $routeProvider


            .when('/',{
            templateUrl: 'app/views/pages/home.html'

        })

            .when('/about',{

            templateUrl: 'app/views/pages/about.html'

         })
        .when('/addReservation',{

            templateUrl: 'app/views/pages/reservation/addreservationlist.html',
            controller:'addReservationController',

            // authenticated: true

        }).when('/allreservationlist',{

            templateUrl: 'app/views/pages/reservation/allreservationlist.html',
            controller:'reservationListController',
            //controllerAs: 'barlist', //nickname for controller
            // authenticated: true

         })

            .when('/login',{

                templateUrl: 'app/views/pages/users/login.html',
                // authenticated: false

            })
            .when('/register',{

                templateUrl: 'app/views/pages/users/register.html',
                controller: 'regCtrl',
                controllerAs: 'register', //nickname for controller
                // authenticated: false
            })

            .when('/logout',{

                templateUrl: 'app/views/pages/users/logout.html',
                // controller: 'regCtrl',
                // controllerAs: 'register' //nickname for controller
                // authenticated: true


            })
            .when('/profile',{

                templateUrl: 'app/views/pages/users/profile.html',
                // controller: 'regCtrl',
                // controllerAs: 'register' //nickname for controller
                // authenticated: true

            })

            .when('/policy',{

                templateUrl: 'app/views/pages/privatepolicy.html',
                // controller: 'regCtrl',
                // controllerAs: 'register' //nickname for controller

            })

            .otherwise({
                redirectTo: '/'
            })   // redirects users to the home page if the url is incorrect or does not exist


        $locationProvider.html5Mode({
            enabled:true,
            requireBase: false
        })

    })

app.run(['$rootScope', 'Auth', '$location' ,function ($rootScope, Auth, $location) {
    $rootScope.$on('$routeChangeStart',  function (event, next, current) {

        if(next.$$route.authenticated == true){
            if(!Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/')
            }

        }else if (next.$$route.authenticated == false){

            if(Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/profile')
            }

        }else console.log("does not matter")

       // console.log(next.$$route.authenticated = true)
       // console.log(Auth.isLoggedIn())
    })


}]);
