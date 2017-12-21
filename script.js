var app = angular.module('main',['ngRoute']);


app.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl : './components/home/home.html',
        controller : 'homeCtrl'
    }).when('/login' , {
        templateUrl : './components/login/login.html' ,
        controller : 'loginCtrl'

    }).when('/rus/login' , {
        templateUrl : './components/login-rus/login-rus.html' ,
        controller : 'loginCtrl'
    }).when('/rus/' , {
        templateUrl : './components/home-rus/home-rus.html' ,
        controller : 'homeCtrl'
    }).otherwise({
        template : '404'
    });
});

// make a factory to share data between controllers
app.factory('Data', function(){
    return {
        username : '',
        password : ''
    };
});


app.controller('homeCtrl',function($scope , $location , Data){
    console.log(Data);
    var username = $scope.username;
    var password = $scope.password;
    $scope.goToLogin = function(lang){  //i will use lang variable to check which language we are currently using
        if($scope.username.length >= 4 && $scope.password.length >= 4) {
            Data.username = $scope.username;
            Data.password = $scope.password;
            if(lang == 'eng'){
                $location.path('/login');
            }else if(lang == 'rus'){
                $location.path('/rus/login');
            }
        }else{
            if(lang == 'eng'){
                alert("Password and username have to be at least 4 character length");
            }else if(lang == 'rus'){
                alert("Пароль и Логин должны состоять не менее чем из 4 символов");
            }
        }
    }
    $scope.goRussian = function(){
        $location.path('/rus/');
    }
    $scope.goEnglish = function(){
        $location.path('/');
    }
});

app.controller('loginCtrl',function($scope , Data ,$location){
    console.log('Login Ctrl');
    console.log(Data.username);
    $scope.username = Data.username;
    if(Data.username == '' || Data.password == ''){
        $location.path('/');
    }
    $scope.logout = function(){
        $location.path('/');
        Data.username = '';
        Data.password = '';
    }
})


