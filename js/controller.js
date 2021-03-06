var app = angular.module('feelioApp', ['ngRoute', 'angular.filter']);

function feelioRouteConfig($routeProvider, $locationProvider) {
  $routeProvider.
  when ('/', {
    templateUrl: '/views/temp-home.html'
  }).
  when ('/test', {
    templateUrl: '/views/home.html'
  }).
  when ('/ways-to-listen', {
    templateUrl: '/views/ways-to-listen.html'
  }).
  when ('/contact', {
    templateUrl: '/views/contact.html'
  }).
  otherwise ({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);
}


app.controller('SuperCtrl', ['$scope', '$http', function($scope,$http) {

    // $scope.find = 'popular';

    var url = 'https://spreadsheets.google.com/feeds/list/1lZWwacSVxTD_ciOsuNsrzeMTNAl0Dj8SOrbaMqPKM7U/od6/public/values?alt=json'
    var parse = function(entry) {
      var category = entry['gsx$category']['$t'];
      var description = entry['gsx$description']['$t'];
      var title = entry['gsx$title']['$t'];
      var thumbnail = entry['gsx$thumbnail']['$t'];
      return {
        category: category,
        description: description,
        title: title,
        thumbnail: thumbnail
      };
    }
    $http.get(url)
    .success(function(response) {
      var entries = response['feed']['entry'];
      $scope.parsedEntries = [];
      for (key in entries) {
        var content = entries[key];
        $scope.parsedEntries.push(parse(content));
      }
    });
}]);


app.controller('MainCtrl', function($scope, $route, $routeParams, $location) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
});

app.controller('NavCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.$location = $location;
}]);


app.config(feelioRouteConfig);

// Make sure GA passes the right data
app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeSuccess', function(){
      ga('send', 'pageview', $location.path());
    });
});
