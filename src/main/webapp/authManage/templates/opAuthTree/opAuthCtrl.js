function OpAuthTreeCtrl($scope, $http, $cookieStore, $filter) {

    var appId = $cookieStore.get("USER_INFO").app_id;
    var operator = $cookieStore.get("USER_INFO").operator;
    $scope.$watch('currentRoleId', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            _getRoleOps(newVal, appId);
        }
    }, true);

    var originalOps;

    // 根据角色ID获取该角色所有操作
    var _getRoleOps = function (roleId, appId) {
        $http.post("/permissions/manage/getRoleOps", {roleId: roleId, appId: appId}).success(function (result) {
            var roleDatas = result.data;
            $scope.ops = {};
            for (var i in roleDatas) {
                $scope.ops[roleDatas[i].operationId] = true;
            }
            // 保存$scope.ops的原始状态
            originalOps = angular.copy($scope.ops);
        });
    };

    _getRoleOps($scope.$parent.currentRoleId, appId);

    // 重置按钮，回复原始状态
    $scope.reset = function () {
        $scope.ops = originalOps;
    };

    $scope.saveOps = function (ops) {
        var currentRoleId = $scope.$parent.currentRoleId;
        /*
         ng-model绑定checkbox时，当checkbox选中时ng-model绑定的值为true,反之为false
         */
        var entity = new RightEntity("tb_role_operation",null,$http);
        entity.roleId = currentRoleId;
        entity.appId = appId;
        entity.condition = ops;
        entity.operator=operator;
        console.log(entity.operator);
        entity.saveOrUpdate(function (result) {
            alert(result.msg);
        });
    };
}