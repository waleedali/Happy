angular.module('happy.controllers', ['ionic'])

.controller('MoodCtrl', function($scope, $ionicPopup, $ionicTabsDelegate, $timeout, DataSvc) {

  var saveMood = function(swiper) {
      $ionicPopup.show({
      title: 'Save this mood?',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            var moodData = new MoodObject(swiper.activeLoopIndex+1, new Date());
            console.log(moodData);
            var userMoodLog = JSON.parse(localStorage.getItem('happyMoodLogger.1.0'))|| [];
            if (typeof(userMoodLog) === undefined||userMoodLog === null) {

              userMoodLog=[];
              
            };
            
            console.log(userMoodLog);

            userMoodLog.push(moodData);

            DataSvc.put(userMoodLog);
              
          }//end of function
        },
      ]
    });
  };
            
  function getDateTime() {
      var now     = new Date();
      var year    = now.getFullYear();
      var month   = now.getMonth()+1;
      var day     = now.getDate();
      var hour    = now.getHours();
      var minute  = now.getMinutes();
      var second  = now.getSeconds();
      if(month.toString().length == 1) {
          var month = '0'+month;
      }
      if(day.toString().length == 1) {
          var day = '0'+day;
      }
      if(hour.toString().length == 1) {
          var hour = '0'+hour;
      }
      if(minute.toString().length == 1) {
          var minute = '0'+minute;
      }
      if(second.toString().length == 1) {
          var second = '0'+second;
      }   
      var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
          return dateTime;
  }

  $scope.init = function () {
    var swiperParent = new Swiper('.swiper-parent',{
      slidesPerView: 1,
      onSlideChangeEnd: function() {
        $timeout(function(){
          $ionicTabsDelegate.$getByHandle('HappyTabs').select(1);
        },0)
      }
    })

    var swiperNested1 = new Swiper('.swiper-nested-1',{
      mode:'vertical',
      loop: true,
      preventLinks: false,
      onSlideClick: saveMood
    });

    var swiperNested2 = new Swiper('.swiper-nested-2',{
      mode: 'vertical'
    })

  };

  // init the view
  $scope.init();

})//end of Mood Controller


.controller('AnalyticsCtrl', function($scope, $ionicModal, $timeout, $ionicTabsDelegate, $ionicListDelegate, DataSvc){

  ////////////SETTINGS MODAL///////////////////////////
  // Create the settings modal that we will use later
  $ionicModal.fromTemplateUrl('templates/settings.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  //open the settings modal
  $scope.openSettings = function() {
    $scope.modal.show();
  };  

  // Triggered in the settings modal to close it
  $scope.closeSettings = function() {
    $scope.modal.hide();
  };

  $scope.swipeRight = function() {
    $timeout(function(){
          $ionicTabsDelegate.$getByHandle('HappyTabs').select(0);
        },0)
  }

  ///////DISPLAY FROM LOCAL STORAGE////////////////////
  //fetch user mood log from local storage
  $scope.userMoodLog = DataSvc.get();

  var gauges = [];

  function createGauge(name, label, min, max)
  {
    var config = {
      size: 340,
      label: label,
      min: undefined != min ? min : 0,
      max: undefined != max ? max : 100,
      minorTicks: 5
    }
    
    var range = config.max - config.min;
    config.yellowZones = [{ from: config.min + range*0.75, to: config.min + range*0.9 }];
    config.redZones = [{ from: config.min + range*0.9, to: config.max }];
    
    gauges[name] = new Gauge(name + "GaugeContainer", config);
    gauges[name].render();
  }

  function createGauges()
  {
    createGauge("happy", "Happiness");
  }

  function updateGauges()
  {
    for (var key in gauges)
    {
      var value = getRandomValue(gauges[key])
      gauges[key].redraw(value);
    }
  }

  function getRandomValue(gauge)
  {
    var overflow = 0; //10;
    return gauge.config.min - overflow + (gauge.config.max - gauge.config.min + overflow*2) *  Math.random();
  }

  $scope.init = function initialize()
  {
    createGauges();
  }

  $scope.init();

  $scope.$on('$viewContentLoaded',
    function(event, viewConfig){ 
        console.log("View Load: the view is loaded, and DOM rendered!");

        // random updates for 3 seconds
        var interval = setInterval(updateGauges, 500);

        setTimeout(function() {
          // stop the random updates
          window.clearInterval(interval);

          // draw the actual average based on the mood logs
          var average,
            sum = 0;
          for (var i=0; i < $scope.userMoodLog.length; i++) {
            sum += (100-(($scope.userMoodLog[i].moodId*100)/5));
          }
          average = sum/$scope.userMoodLog.length;
          console.log(average);
          gauges["happy"].redraw(average);
        }, 3000);
    });

})//end of Analytics Controller


.controller('SignInCtrl', function($scope, $state, $http) {
  
  $scope.signIn = function(user) {
    console.log('Sign-In', user);

    $http({
        method : 'POST',
        url : 'http://localhost:4111/users/session',
        data : 'email=' + user.email + '&password=' + user.password,
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
    .success(function(result){
      console.log(result);
      $state.go('tab.mood');
    })
    .error(function(data, status, headers, config) {
      console.log(status);
    });

  };
  
})

.controller('SignUpCtrl', function($scope, $state, $http) {
  
  $scope.signUp = function(user) {
    console.log('Sign-Up', user);

    $http({
        method : 'POST',
        url : 'http://localhost:4111/users',
        data : 'name=' + user.name + '&email=' + user.email + '&password=' + user.password,
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
    .success(function(result){
      console.log(result);
      $state.go('tab.mood');
    })
    .error(function(data, status, headers, config) {
      console.log(status);
    });

  };
  
})


//Side menu js controller 
  function ContentController($scope, $ionicSideMenuDelegate) {
      $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
      };//end of toggle eval
  }//end of function


 // $scope.data = {}
    function insert(moodObj){
        var userMoodLog = DataSvc.get();
        userMoodLog.push(moodObj);
        DataSvc.put(userMoodLog);
      }
