// Happy
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('happy', ['ionic', 'happy.controllers', 'happy.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


// .run(function(DataSvc) {
//   var testObject = MoodObject(99, new Date());
//   $localstorage.setObject('happyMoodLogger.1.0', testObject);
//   console.log($localstorage.get('happyMoodLogger.1.0'));
  
//   var post = $localstorage.getObject('happyMoodLogger.1.0');
//   console.log(post);
// })





.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.mood', {
      url: '/mood',
      views: {
        'tab-mood': {
          templateUrl: 'templates/tab-mood.html',
          controller: 'MoodCtrl'
        }
      }
    })

    .state('tab.analytics', {
      url: '/analytics',
      views: {
        'tab-analytics': {
          templateUrl: 'templates/tab-analytics.html',
          controller: 'AnalyticsCtrl'
        }
      }
    })

    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    })

    .state('signup', {
      url: '/sign-up',
      templateUrl: 'templates/sign-up.html',
      controller: 'SignUpCtrl'
    })

    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html'
    })
    

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/mood');

});//end of config

