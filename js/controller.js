var app = angular.module('feelioApp', ['ngRoute']);

function feelioRouteConfig($routeProvider, $locationProvider) {
  $routeProvider.
  when ('/', {
    templateUrl: '/views/home.html'
  }).
  when ('/popular', {
    templateUrl: '/views/popular.html'
  }).
  when ('/contact', {
    templateUrl: '/views/contact.html'
  }).
  otherwise ({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);
}


// app.controller("PostsCtrl", function($scope, $http) {
//   $http.get('https://spreadsheets.google.com/feeds/list/1lZWwacSVxTD_ciOsuNsrzeMTNAl0Dj8SOrbaMqPKM7U/oh9bt7w/public/values?alt=json-in-script&callback=x').
//     success(function(data) {
//       //$scope.posts = data;
//       //$scope.posts = data.feed.entry[0]['gsx$title']['$t'];
//       $scope.posts = data.feed.entry;
//       // $scope.random = function() {
//       //   return 0.5 - Math.random();
//       // }
//     }).
//     error(function(data) {
//       //console.log("not able to pull data");
//     });
// });



app.controller('SuperCtrl', function($scope,$http) {
    $http.get("https://spreadsheets.google.com/feeds/list/1lZWwacSVxTD_ciOsuNsrzeMTNAl0Dj8SOrbaMqPKM7U/od6/public/values?alt=json-in-script&callback=success").success(function(data) {
      $scope.items = data;
    });
});





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
