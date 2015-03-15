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



app.controller('SuperCtrl', ['$scope', '$http', function($scope,$http) {
    var url = 'https://spreadsheets.google.com/feeds/list/1lZWwacSVxTD_ciOsuNsrzeMTNAl0Dj8SOrbaMqPKM7U/od6/public/values?alt=json'
    var parse = function(entry) {
      var category = entry['gsx$category']['$t'];
      var description = entry['gsx$description']['$t'];
      var title = entry['gsx$title']['$t'];
      var url = entry['gsx$url']['$t'];
      var yo = entry['gsx$yo']['$t'];
      return {
        title: title,
        description: description,
        url: url,
        category: category
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
