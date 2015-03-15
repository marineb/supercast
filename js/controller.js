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


app.controller("PostsCtrl", function($scope, $http) {
  //$http.get('http://jsonplaceholder.typicode.com/posts').
  $http.get('https://spreadsheets.google.com/feeds/list/1lZWwacSVxTD_ciOsuNsrzeMTNAl0Dj8SOrbaMqPKM7U/oh9bt7w/public/values?alt=json-in-script&callback=x').
    success(function(data) {
      //$scope.posts = data;
      //$scope.posts = data.feed.entry[0]['gsx$title']['$t'];
      $scope.posts = data.feed.entry;
      $scope.random = function() {
        return 0.5 - Math.random();
      }
    }).
    error(function(data) {
      // log error
    });
});



// {
// "userId": 1,
// "id": 1,
// "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
// "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
// },

//data.feed.entry[0]['gsx$title']['$t']


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
