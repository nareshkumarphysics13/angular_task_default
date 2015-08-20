sessionStorage.setItem('isLogin', "false");

var techColorCont = angular.module('tColorControllers', []);
techColorCont.controller('mainController', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) { 
    $scope.login = {};
    $rootScope.gustBook = {};
    $rootScope.stateInfoList = [];
    $rootScope.isNavVisible = false;
    $rootScope.gustBookInfo = [];
    $rootScope.isBackNav = false;
    
    $scope.$on('$routeChangeStart', function(event, current) {
        $scope.isChangeClass = "";
    });
    $scope.$on('$routeChangeSuccess', function(event, current) {
        $scope.isChangeClass = "active";
        $scope.currentPagePath = $location.path();
        if($scope.currentPagePath == "/loginPage" || $scope.currentPagePath == "/success")
            $rootScope.isBackNav = false;
        else
            $rootScope.isBackNav = true;
        
    });
    if(sessionStorage.getItem('isLogin') == "false") {
         window.location.href = "#/loginPage";
    }
    $scope.logout = function() {
        sessionStorage.setItem('userName', " ");
        sessionStorage.setItem('isLogin', "false");
        $rootScope.isNavVisible = false;
        window.location.href = "#/loginPage";
    }    
    $scope.gustBook = function() {
        window.location.href = "#/gustBook";
    }
    $scope.backPage = function() {
        window.history.back();
    }
}]);
techColorCont.controller('loginController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) { 
    $scope.login = {};
    $scope.submitForm = function() {
        if($scope.login.userName != "" && $scope.login.userName != undefined && $scope.login.Password != "" && $scope.login.Password != undefined)  
        {
            $http.get('json/login.json').
            success(function(data, status, headers, config) {
                angular.forEach(data, function(index) {
                    if($scope.login.userName == index.username && $scope.login.Password == index.password) {
                        sessionStorage.setItem('userName', $scope.login.userName);
                        sessionStorage.setItem('isLogin', "true");

                    }
                });

                $rootScope.gustBookInfo = [];
                if(sessionStorage.getItem('isLogin') == "true") {
                    $rootScope.isNavVisible = true;
                    window.location.href = "#/success";
                }
                else {
                    window.location.href = "#/error";
                }
            }).
            error(function(data, status, headers, config) {
              // log error
            });
        }
        else if($scope.login.userName == "" || $scope.login.userName == undefined) {
            alert("Please enter the user name");
        }
        else if($scope.login.Password == "" || $scope.login.Password == undefined) {
            alert("Please enter the password");
        }
    }
  }]);
  techColorCont.controller('successController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $http.get('json/state.json').
        success(function(data, status, headers, config) {
            $rootScope.stateInfoList = data;
        }).
        error(function(data, status, headers, config) {
          // log error
        });

  }]);
techColorCont.controller('stateInfoController', ['$scope', '$rootScope', '$http', '$routeParams', function ($scope, $rootScope, $http, $routeParams) {
        $scope.stateNameInfo = $routeParams.stateName;
        angular.forEach($rootScope.stateInfoList, function(index) {
            if($scope.stateNameInfo == index.name)
                $scope.stateDetailInfo = index;
        });
        
  }]);
techColorCont.controller('gustBookController', ['$scope', '$rootScope', '$http', '$routeParams', function ($scope, $rootScope, $http, $routeParams) {
        $scope.saveMsg = function() {
            $scope.mobileNumber = $scope.gBook.mobile;
            $scope.messageInfo = $scope.gBook.msg;
            
            if($scope.mobileNumber == "" || $scope.mobileNumber == undefined) {
                alert("please enter the mobile number");
            }
            else if(isNaN($scope.mobileNumber) || $scope.mobileNumber.length < 10) {
                alert("please enter the valid mobile number");
            }
            else if($scope.messageInfo == "" || $scope.messageInfo == undefined) {
                alert("please enter the message");
            }
            else {
                $rootScope.gustBookInfo.push({
                    "mobile": $scope.mobileNumber,
                    "message": $scope.messageInfo
                });
                $scope.gBook.mobile = "";
                $scope.gBook.msg = "";
            }
        }
  }]);