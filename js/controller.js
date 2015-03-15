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
  $http.get('https://spreadsheets.google.com/feeds/list/1lZWwacSVxTD_ciOsuNsrzeMTNAl0Dj8SOrbaMqPKM7U/oh9bt7w/public/values?alt=json-in-script&callback=x').
    success(function(data) {
      //$scope.posts = data;
      //$scope.posts = data.feed.entry[0]['gsx$title']['$t'];
      $scope.posts = data.feed.entry;
      // $scope.random = function() {
      //   return 0.5 - Math.random();
      // }
    }).
    error(function(data) {
      //console.log("not able to pull data");
    });
});



app.controller("anotherCtrl", function($scope, $http){
    $scope.results = [];
    $scope.filterText = null;
    $scope.availableCategories = [];
    $scope.categoryFilter = null;

    $scope.init = function() {
    $http.jsonp('https://spreadsheets.google.com/feeds/list/1lZWwacSVxTD_ciOsuNsrzeMTNAl0Dj8SOrbaMqPKM7U/oh9bt7w/public/values?alt=json-in-script' + '&callback=JSON_CALLBACK').success(function(data) {
      angular.forEach(data, function(value, index){
        angular.forEach(value.entry, function(classes, index){
          $scope.results.push(classes);
            angular.forEach(classes.gsx$category, function(category, index){
              var exists = false;
                angular.forEach($scope.availableCategories, function(avCat, index){
                  if (avCat == category) {
                    exists = true;
                  }
                });
                if (exists === false) {
                  $scope.availableCategories.push(category);
                }
              });
            });
          });
        }).error(function(error) {
      });
    };

    $scope.setCategoryFilter = function(category) {
    $scope.categoryFilter = category;

    }

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
