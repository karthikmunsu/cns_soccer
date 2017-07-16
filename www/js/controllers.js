angular.module('starter.controllers', ['ngStorage',])

.constant('domain','http://46.101.27.39:82')






.factory('cns',function(){
  var userdetails= [];
  userdetails.setmatchuparraycount = function(count){
    mpcount = count;
  }

  userdetails.setLoginstatus = function(){
    localStorage.loginstatus = true;
  }

userdetails.logout = function(){
     localStorage.clear();
  }


  return userdetails;
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('LandingCtrl', function($scope, $state, Chats, $ionicTabsDelegate) {
  //$ionicTabsDelegate.showBar(true);
  var arr = [];
  arr.push({url:'img/shoot1.png'});
  arr.push({url:'img/shoot3.png'});
  arr.push({url:'img/shoot2.jpg'});
  $scope.images = arr;
  
  $scope.gotoLogin = function() {
    console.log('login Fired!');
    $state.go('login');
  }

  $scope.gotoSignup = function() {
    $state.go('signup');
  }

})

.controller('LoginCtrl', function($scope, $state, $ionicLoading, $http, domain, $ionicPopup, cns, $timeout, $window, $localStorage, $ionicModal, $ionicSlideBoxDelegate, $ionicTabsDelegate) {

  $scope.$on("$ionicView.beforeEnter", function () {
$ionicTabsDelegate.showBar(false);
if(localStorage.loginstatus == true){
  $state.go('homeTab');
}else if(localStorage.loginstatus == false){

}

$scope.data = {};
$scope.data.username = "";
$scope.data.password = "";
      });

$scope.checked = "true";

 $scope.checkPassword = function($event,pwd){


   var tmp = $scope.data.password;
   if($event.keyCode == 8){
    if((tmp.length)+1<8){

     $scope.checked = false;
   }else{
     $scope.checked = true;
   }

   }
   if((pwd.length)>=8){

     $scope.checked = false;
   }else{
     $scope.checked = true;
   }

 };




 $scope.limitKeypress = function ($event, value, maxLength) {

  if(value.length == maxLength){
    $event.preventDefault();
  }

  if(event.keyCode==32||event.keyCode == 96 || event.keyCode == 126 || event.keyCode == 33  || event.keyCode ==64 || event.keyCode ==35 || event.keyCode ==36 || event.keyCode ==37 || event.keyCode ==94 || event.keyCode ==38 || event.keyCode ==42 || event.keyCode ==40 || event.keyCode ==41 || event.keyCode ==95 || event.keyCode ==43 || event.keyCode ==61 || event.keyCode ==45 || event.keyCode ==44 || event.keyCode ==46 || event.keyCode ==47 || event.keyCode ==123 || event.keyCode ==125 || event.keyCode ==91 || event.keyCode ==93 || event.keyCode ==92 || event.keyCode ==124 || event.keyCode ==63 || event.keyCode ==60 || event.keyCode ==62 || event.keyCode ==59 || event.keyCode ==58 || event.keyCode ==39 || event.keyCode ==34){
    $event.preventDefault();
  }

    }


  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>'
    });
  };

$scope.hide = function(){
        $ionicLoading.hide();
  };
  // login function 
  $scope.login = function(uname, pass) {
    $scope.show($ionicLoading);
if(typeof uname == 'undefined' || uname.length == '0' ){
    $ionicPopup.show({
    title: 'Required!',
  cssClass:'forgotuser rtremove',
    subTitle: 'Enter username!',
    scope: $scope,
    buttons: [
      { text: 'Ok' }
    ]
  });
      $scope.hide($ionicLoading);
     }else if(typeof pass == 'undefined' || pass.length == '0' ){

    $ionicPopup.show({
    title: 'Required!',
  cssClass:'forgotuser rtremove',
    subTitle: 'Enter password!',
    scope: $scope,
    buttons: [
      { text: 'Ok' }
    ]
  });
      $scope.hide($ionicLoading);
     }else{

localStorage.message = uname;// this line is for storing the data as permanent
    var request = {
        method: "POST",
        url: domain+"/api/v1/login",
        /*params: {
        username: uname,
        password: pass
      },*/
       headers: { 'x-email': uname, 'x-password': pass }
      };


    /*Successful HTTP post request or not */
      $http(request).then(function (response){ console.log(response);

        if (response.statusText == 'OK'){
          $scope.responseMessage = "You are in";
  cns.setLoginstatus();
  //localStorage.fblogin = true;
      $state.go('homeTab');
      $scope.hide($ionicLoading);
        }
        else {
      $scope.hide($ionicLoading);

    $ionicPopup.show({
    title: 'Login Failed!',
  cssClass:'forgotuser rtremove',
    subTitle: 'Username/password is incorrect!',
    scope: $scope,
    buttons: [
      { text: 'Ok' }
    ]
  });



          $scope.responseMessage = "Username or Password is incorrect";
        }
    $scope.hide($ionicLoading);
      }).catch(function(error)
    {
          
      console.log(error);
          $scope.responseMessage = "You are in";

      $scope.hide($ionicLoading);

    $ionicPopup.show({
    title: 'Login Failed!',
  cssClass:'forgotuser rtremove',
    subTitle: 'Username/password is incorrect!',
    scope: $scope,
    buttons: [
      { text: 'Ok' }
    ]
  });

    $scope.hide($ionicLoading);
    });
     }

  }


  $scope.gotoSignup = function() {
    $state.go('signup');
  }

  //forget username
$scope.forget_Username = function(){
  $scope.data = {};
  $ionicPopup.show({
    template: '<input type="text" placeholder="Email" style="text-color:blue;" ng-model="data.res_user_name">',
    title: 'Forgot Username?',
  cssClass:'forgotuser',
    subTitle: 'Enter the email address associated with your account.',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: 'Request',
        onTap: function(e) {
      reset_name($scope.data.res_user_name);
        }
      }
    ]
  });
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function reset_name(email){
  $scope.show($ionicLoading);
  if(typeof email == 'undefined'){
    console.log(email);
        $ionicPopup.show({
    title: 'Message!',
  cssClass:'forgotuser  rtremove',
    subTitle: 'Enter E-mail Address!',
    scope: $scope,
    buttons: [
      { text: 'Ok' }
    ]
  });
  $scope.hide($ionicLoading);
  }else{
  if(!validateEmail(email)){
        $ionicPopup.show({
    title: 'Message!',
  cssClass:'forgotuser  rtremove',
    subTitle: 'Enter valid E-mail Address!',
    scope: $scope,
    buttons: [
      { text: 'Ok' }
    ]
  });
    $scope.hide($ionicLoading);
  }else
  {
  var request = {
        method: "POST",
        url: domain+"/api/v1/username/email",
    params:{"email": email
  },
       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };
  $http(request).then(function (response){
    $scope.hide($ionicLoading);

      var res = response;

      Object.keys(res.data).forEach(function(k) {
    if(k === "status") {
        $ionicPopup.show({
    title: 'Sent Successfully!',
  cssClass:'forgotuser',
    subTitle: 'The Forgot Username Request mail has been sent to your mail id.',
    scope: $scope,
    buttons: [
      { text: 'Ok' }
    ]
  });
      }
  if(k === "email"){
     var tmp = response.data.email[0];
      if(tmp == "The given email does not belong to a valid account. Please try with correct email."){
        $ionicPopup.show({
    title: 'Message!',
  cssClass:'forgotuser',
    subTitle: 'The given email does not belong to a valid account. Please try with correct email.!',
    scope: $scope,
    buttons: [
      { text: 'Ok' }
    ]
  });
      }
  }

      })

    }).catch(function(error){
      $scope.hide($ionicLoading);

        $ionicPopup.show({
    title: 'Server Error!',
  cssClass:'forgotuser',
    subTitle: 'Please Try Again!',
    scope: $scope,
    buttons: [
      { text: 'Ok' }
    ]
  });

    })



  }
  }

}












//forgot password
$scope.forget_Password = function(){
     // A confirm dialog TAKEN FROM http://ionicframework.com/docs/api/service/$ionicPopup/

$scope.data = {};
  $ionicPopup.show({
    template: '<input type="text" placeholder="Email" ng-model="data.res_user_email">',
  cssClass:'myPopup',
    title: 'Forgot Password?',
  cssClass: 'forgotpass',
    subTitle: 'Enter your email address to request a password reset.',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: 'Request',
        onTap: function(e) {
          console.log("Request button is clicked!");
      console.log($scope.data.res_user_email);
      reset_email($scope.data.res_user_email);
        }
      }
    ]
  });


function reset_email(email){
  $scope.show($ionicLoading);
  console.log(email);
  if(typeof email == 'undefined'){
    console.log(email);
        $ionicPopup.show({
    //template: '<input type="username" placeholder="Email" style="text-color:blue;" ng-model="data.res_user_name">',
    title: 'Message!',
  cssClass:'forgotuser rtremove',
    subTitle: 'Enter E-mail Address!',
    scope: $scope,
    buttons: [
      { text: 'Ok' }
    ]
  });
  $scope.hide($ionicLoading);
  }else{
  if(!validateEmail(email)){
        $ionicPopup.show({
    //template: '<input type="username" placeholder="Email" style="text-color:blue;" ng-model="data.res_user_name">',
    title: 'Message!',
  cssClass:'forgotuser rtremove',
    subTitle: 'Enter valid E-mail Address!',
    scope: $scope,
    buttons: [
      { text: 'Ok' }
    ]
  });
    $scope.hide($ionicLoading);
  }else
  {


  var request = {
        method: "POST",
        url: domain+"/api/v1/password/email",
    params:{"email": email
  },
       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };
  $http(request).then(function (response){
    $scope.hide($ionicLoading);
      console.log(response);



     var res = response;

      Object.keys(res.data).forEach(function(k) {
        console.log(k);
    if(k === "status") {
        $ionicPopup.show({
    //template: '<input type="username" placeholder="Email" style="text-color:blue;" ng-model="data.res_user_name">',
    title: 'Sent Successfully!',
  cssClass:'forgotuser rtremove',
    subTitle: 'The Forgot Password Request mail has been sent to your mail id.',
    scope: $scope,
    buttons: [
      { text: 'Ok' }
    ]
  });


      }
  if(k === "email"){
     var tmp = response.data.email[0];
      console.log(tmp);
      if(tmp == "The given email does not belong to a valid account. Please try with correct email."){

        $ionicPopup.show({
    //template: '<input type="username" placeholder="Email" style="text-color:blue;" ng-model="data.res_user_name">',
    title: 'Message!',
  cssClass:'forgotuser rtremove',
    subTitle: 'The given email does not belong to a valid account. Please try with correct email.!',
    scope: $scope,
    buttons: [
      { text: 'Ok' }
    ]
  });
      }
  }

      })




    }).catch(function(error){
      $scope.hide($ionicLoading);
      console.log(error);

        $ionicPopup.show({
    //template: '<input type="username" placeholder="Email" style="text-color:blue;" ng-model="data.res_user_name">',
    title: 'Server Error!',
  cssClass:'forgotuser rtremove',
    subTitle: 'Please Try Again!',
    scope: $scope,
    buttons: [
      { text: 'Ok' }
    ]
  });

    })

}

}

}


}

})

.controller('signUpCtrl', function($scope, $state) {
  $scope.gotoPrevious = function(){
      $state.go('login');
    }
}) 


.controller('loadingCtrl', function($scope, $state, $timeout) {
  
  $timeout(callAtTimeout, 3000);

  function callAtTimeout() {
    $state.go('landing');
  }

})



.controller('mainMenuCtrl', function($scope, $state, $timeout) {
  var data = [];
  data.push({name: 'Free',image: './img/bottom_nav/tab1.png'});
  data.push({name: 'Strategy',image: './img/bottom_nav/tab2.png'});
  data.push({name: 'Exercise',image: './img/bottom_nav/tab3.png'});
  data.push({name: 'Training',image: './img/bottom_nav/tab4.png'});
  data.push({name: 'Payments',image: './img/bottom_nav/tab5.png'});
  $scope.sessionData = data;

  $scope.gotoSession = function(data) {
    // $state.go(data); // if the client wants to navigate through the pages kindly uncomment this line
    if(data == 'Free'){
      $state.go('homeTab');
    }
    //$state.go('home');
  }

})  


.controller('homeTabCtrl', function($scope, $state, $http, $ionicModal, $ionicSlideBoxDelegate, $timeout, $ionicTabsDelegate) {
    $scope.$on("$ionicView.afterEnter", function () {
            $ionicTabsDelegate.showBar(true);
            $ionicTabsDelegate.select(0);
          });
    /*$scope.$on("$ionicView.beforeLeave", function () {
           $ionicTabsDelegate.showBar(false);
            $ionicTabsDelegate.select(0);
          });*/
    $scope.headerUrl = function() {
      url = "templates/header.html?updated="+JSON.stringify(nowQuery);
      //return url; // uncommnt this line for to display the header menu on the header with the header logo and the right side user profle pic display
      // it has been included from the header.html
    }

    console.log(JSON.stringify(nowQuery)); // check this console before the header menu display ive already created query to display it

     $scope.images = [];
    
    $scope.loadImages = function() {
        for(var i = 0; i < 10; i++) {
            $scope.images.push({id: i, src: "img/gallery1.jpg"}); //http://placehold.it/50x50
        }
    }

    $ionicModal.fromTemplateUrl('modal.html', function (modal) { // this is the function used to display the modal on click of the images in the 4*4 coloumns
                $scope.gridModal = modal;
            }, {
                scope: $scope,
                animation: 'slide-in-up'
            })
            $scope.openModal = function (data) {
              $scope.imgUrl = data;
                $scope.inspectionItem = data;
                $scope.gridModal.show();
            }
            $scope.closeModal = function () {
                $scope.gridModal.hide();
            }


})

.controller('indexcontroller', function($scope, $state) {

$scope.gotoPage = function(data) { // this is function which takes dynamic values from the tabs when the tab is clicked it will trigger to take the dynamic value and route to the particular screen from one state to another
  console.log('dynamic route naviagation');
}

$scope.gotoTab = function() {
  $state.go('homeTab');
}

$scope.gotoTraining = function() {
  $state.go('training-videos');
}

})

.controller('trainingVideosCtrl', function($scope, $sce, $state, $http, $ionicModal, $ionicSlideBoxDelegate, $timeout, $ionicTabsDelegate) {

  $scope.$on("$ionicView.afterEnter", function () {
            $ionicTabsDelegate.showBar(true);
            $ionicTabsDelegate.select(1);
          });
   
 

            $scope.trustSrc = function(src) {
              return $sce.trustAsResourceUrl(src);
            }
         //https://youtu.be/lY7InQD0QmQ 
$scope.images = [];
    $scope.imgUrl = $scope.trustSrc('https://www.youtube.com/embed/9rprKh8fzw4?&showinfo=0&controls=0');
    //var videoUrl = $scope.trustSrc('http://youtu.be/lY7InQD0QmQ');
    //console.log(videoUrl);

    $scope.loadImages = function() {
        for(var i = 0; i < 10; i++) {
          var videoUrl = $scope.trustSrc('https://www.youtube.com/embed/9rprKh8fzw4?&showinfo=0&controls=0');
            $scope.images.push({id: i, src: videoUrl}); //http://placehold.it/50x50
        }
    }
    console.log($scope.images);

    /*$ionicModal.fromTemplateUrl('video-modal.html', function (modal) { // this is the function used to display the modal on click of the images in the 4*4 coloumns
                $scope.gridModal = modal;
            }, {
                scope: $scope,
                animation: 'slide-in-up'
            })
            $scope.openModal = function (data) {
              console.log(data);
              // data = $scope.trustSrc(data);
              $scope.imgUrl = data;
                $scope.inspectionItem = data;
                $scope.gridModal.show();
            }
            $scope.closeModal = function () {
                $scope.gridModal.hide();
            }*/

$scope.sliderImages = [];
$scope.sliderImages.push({src: 'img/slide1.jpg'});
$scope.sliderImages.push({src: 'img/slide2.jpg'});
$scope.sliderImages.push({src: 'img/slide3.jpg'});
$scope.sliderImages.push({src: 'img/slide4.jpg'});
$scope.sliderImages.push({src: 'img/slide5.jpg'});
  
 $scope.headerUrl = function() {
      url = "templates/header.html?updated="+JSON.stringify(nowQuery);
      return url; // uncommnt this line for to display the header menu on the header with the header logo and the right side user profle pic display
      // it has been included from the header.html
    } 
      

 

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

