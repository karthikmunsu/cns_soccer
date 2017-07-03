// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
nowQuery = Math.round(getRandomArbitrary(0,1000));
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngStorage', 'ngSanitize'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($sceDelegateProvider){

  //$sceDelegateProvider.resourceUrlWhitelist(['self','*://www.youtube.com/**']);
  $sceDelegateProvider.resourceUrlWhitelist([
'self',
'*://www.youtu.be.com/**'
]);
  //$sceDelegateProvider.resourceUrlWhitelist(['^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?\(vimeo|youtube|spotify)\.com(/.*)?$', 'self']);


})

.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top
    $ionicConfigProvider.form.checkbox('square');
}])

.directive('hideTabs', function($rootScope, $ionicTabsDelegate) {
  return {
    restrict: 'A',
    link: function($scope, $el) {
    $scope.$on("$ionicView.beforeEnter", function () {
        $ionicTabsDelegate.showBar(false);
      });


    }
  };
})




.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    //abstract: true,
     //views: {
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    //}
  })

.state('signup', {
   cache : false,
    url: '/signup',
    //abstract: true,
     //views: {
      templateUrl: 'templates/signup.html',
     controller: 'signUpCtrl',
     disableHardwareBackButton : true
    //}
  })

.state('loading', {
   cache : false,
    url: '/loading',
    //abstract: true,
     //views: {
      templateUrl: 'templates/loading.html',
     controller: 'loadingCtrl',
     disableHardwareBackButton : true
    //}
  })


.state('home', {
    url: '/home',
    //abstract: true,
     //views: {
      templateUrl: 'templates/main-page.html',
      //controller: 'LandingCtrl'
    //}
  })

.state('mainMenu', {
    url: '/mainMenu',
    //abstract: true,
     //views: {
      templateUrl: 'templates/mainMenu.html',
      controller: 'mainMenuCtrl',
      disableHardwareBackButton : true
    //}
  })

.state('homeTab', {
    url: '/homeTab',
    //abstract: true,
     //views: {
      templateUrl: 'templates/tabs-screen.html',
      controller: 'homeTabCtrl',
      disableHardwareBackButton : true
    //}
  })

.state('training-videos', {
    url: '/training-videos',
    //abstract: true,
     //views: {
      templateUrl: 'templates/training-videos.html',
      controller: 'trainingVideosCtrl',
      disableHardwareBackButton : true
    //}
  })

  .state('landing', {
    url: '/landing',
    //abstract: true,
     //views: {
      templateUrl: 'templates/landing-page.html',
      controller: 'LandingCtrl'
    //}
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/loading');

});
