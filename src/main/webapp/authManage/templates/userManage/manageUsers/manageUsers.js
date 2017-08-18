function manageUsersCtrl($scope, $rootScope, $yunatGrid, $yunatModal, $cookieStore,$http) {
    $rootScope.tableName = "t_user";

    $scope.userInfo = $cookieStore.get("USER_INFO");

    $yunatGrid.init({
        columnDefs: [
            {field: 'name', displayName: '用户名', visible: true},
            {field: 'displayName', displayName: '姓名', visible: true},
            {field: 'permission', displayName: '用户类型', visible: true},
            {field: 'status', displayName: '状态', visible: true}
        ]
    }, $scope);

    var param = {appId: $scope.userInfo.app_id};

    $scope.getTotalCount = function (str) {
        $scope.totalCount = 0;
        $http.post("/dynamic/execSql/getUserTotal", angular.toJson(str)).success(function (callback) {
            $scope.totalCount = callback.data;
        });
    };

    $scope.getEntity = function (str) {
        $scope.entity = {
            getList: function (getListCallBack) {
                var properties = Utils.getPropsWithoutFun(this, true);
                $http.post("/dynamic/execSql/getUserList", angular.extend(str, properties)).success(function (results) {
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
        var param = {appId: $scope.userInfo.app_id};
        if (str) {
            var cond = JSON.parse(str);
            if (cond.userName)
                param.name = cond.userName;

        }
        $scope.getTotalCount(param);
        $scope.getEntity(param);
        $yunatGrid.refresh($scope, new RightEntity($rootScope.tableName, $scope.entity,$http),$scope.pagingOptions.currentPage);
    };
    $scope.disabled = function () {
        if ($scope.mySelection[0] == null) {
            alert("请选择数据");
            return false;
        } else {
            var entity = new RightEntity('t_permission',null,$http);
            if ($scope.mySelection[0].permission == '应用管理员') {
                entity.permission = 3;
            } else {
                entity.permission = 2;
            }
            entity.name = $scope.mySelection[0].name;
            entity.update(function (result) {
                if (result.success) {
                    $scope.query();
                } else {
                    alert("更新失败,请重试!");
                }
            });
        }
    };













}
