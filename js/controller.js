var app = angular.module('feelioApp', ['ngRoute']);

function feelioRouteConfig($routeProvider, $locationProvider) {
  $routeProvider.
  when ('/', {
    templateUrl: '/views/home.html'
  }).
  when ('/about', {
    templateUrl: '/views/about.html'
  }).
  when ('/contact', {
    templateUrl: '/views/contact.html'
  }).
  when ('/nyc', {
    templateUrl: '/views/home-nyc.html'
  }).
  when ('/sf', {
    templateUrl: '/views/home-sf.html'
  }).
  when ('/paris', {
    templateUrl: '/views/home-paris.html'
  }).
  when ('/signup', {
    templateUrl: '/views/signup.html'
  }).
  when ('/almost', {
    templateUrl: '/views/almost.html'
  }).
  when ('/welcome', {
    templateUrl: '/views/welcome.html'
  }).
  when ('/goodbye', {
    templateUrl: '/views/goodbye.html'
  }).
  otherwise ({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);
}

app.controller('MainCtrl', function($scope, $route, $routeParams, $location) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
});

app.controller('NavCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.$location = $location;
}]);

app.controller('CitiesCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.$location = $location;
}]);


app.config(feelioRouteConfig);

// Make sure GA passes the right data
app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeSuccess', function(){
      ga('send', 'pageview', $location.path());
    });
});
