var app = angular.module('login', ['ngCookies']);
app.controller('LoginCtrl', function ($scope, $http, $location) {

    $scope.msg = "";

    $scope.login = function (user) {
        $("p").addClass("login-error");

        if (!user.name && !user.password) {
            $scope.msg = "请输入用户名和密码";
        } else if (!user.name) {
            $scope.msg = "请输入用户名";
        } else if (!user.password) {
            $scope.msg = "请输入密码";
        } else {
            var appId = user.appId;
            if (appId === "0") {
                $scope.msg = "请选择权限应用平台";
            } else {
                $scope.msg = "";
                //todo

                $http.post("/permissions/manage/loginValid", user).success(function (result) {
                    if (result.success) {
                        $scope.msg = "";
                        $("p").removeClass("login-error");
                        // 登录跳转
                        $("#loginForm").submit();
                    } else {
                        $("p").addClass("login-error");
                        $scope.msg = result.msg;
                    }
                });
            }
        }
    };

    $scope.getApps = function () {
        $scope.user = {};
        //todo
        $http.get("/permissions/manage/getApps").success(function (result) {
            if (result.success && result.data.length > 0) {
                $scope.appInfo = result.data;
                $scope.user.appId = "0";
            }
        });
    };
});