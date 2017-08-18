var app = angular.module('myApp', [ 'yunat-modal', 'yunat-grid','ngCookies']);
app.controller("UserManage",function($scope, $rootScope, $yunatGrid,$yunatModal,$cookieStore, $http) {
    $rootScope.tableName = "t_user_role";

    $yunatGrid.init({
        columnDefs: [
            {field: 'name', displayName: '用户名', visible: true},
            {field: 'displayName', displayName: '姓名', visible: true},
            {field: 'roleName', displayName: '角色', visible: true},
            {field: 'status', displayName: '状态', visible: true}
        ]
    }, $scope);

    var param = {appId: "custom"};

    $scope.getTotalCount = function (str) {
        $scope.totalCount = 0;
        $http.post("/dynamic/execSql/getTotalCount", angular.toJson(str)).success(function (callback) {
            $scope.totalCount = callback.data[0].count;
        });
    };

    $scope.getEntity = function (str) {
        $scope.entity = {
            getList: function (getListCallBack) {
                var properties = Utils.getPropsWithoutFun(this, true);
                $http.post("/dynamic/execSql/execute", angular.extend(str, properties)).success(function (results) {
                    getListCallBack.call($scope.totalCount, results.data);
                });
            }
        };
    };

    $scope.getTotalCount(param);
    $scope.getEntity(param);

    $yunatGrid.refresh($scope, new RightEntity($rootScope.tableName, $scope.entity,$http),1);

    // 查询全部
    $scope.query = function (str) {
        var param = {appId: "custom"};
        if (str) {
            var cond = JSON.parse(str);
            if (cond.userName)
                param.name = cond.userName;
            if (cond.roleName)
                param.roleName = cond.roleName;
        }
        $scope.getTotalCount(param);
        $scope.getEntity(param);
        $yunatGrid.refresh($scope, new RightEntity($rootScope.tableName, $scope.entity,$http),$scope.pagingOptions.currentPage);
    };

    $scope.detailQuery = function (title) {
            $yunatModal.open({
                controller: roleControl,
                templateUrl: 'searchByCondition.html'
            }, {
                title: title,
                scope: $scope
            });
        };
});


var roleControl = function ($scope, $modalInstance, modalObj) {
    $scope.queryByCond = function (cond) {
        modalObj.scope.query(angular.toJson(cond));
        $scope.close();
    };

    $scope.close = function (result) {
        $modalInstance.close(result);
    };
};