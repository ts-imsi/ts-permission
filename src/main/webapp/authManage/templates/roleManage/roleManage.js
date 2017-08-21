function roleManageCtrl($scope, $rootScope, $yunatGrid, $yunatModal, $cookieStore,$http) {
    $rootScope.tableName = "tb_role";
    $scope.queryEntity = new RightEntity("tb_role",null,$http);
    $scope.userInfo = $cookieStore.get("USER_INFO");
    $yunatGrid.init({
        columnDefs: [
            { field: 'pkid', displayName: '角色编号'},
            { field: 'name', displayName: '角色名称'}
        ]}, $scope);
    var param = {appId: $scope.userInfo.app_id};
    var entity = {
        getList: function (getListCallBack) {
            $http.post("/dynamic/execSql/getRoleManages",angular.toJson(param)).success(function (results) {
                getListCallBack.call(results.data.length, results.data);
            });
        }
    };
    $yunatGrid.refresh($scope, new RightEntity($rootScope.tableName, entity,$http));
    // 查询全部
    $scope.query = function () {
        $yunatGrid.refresh($scope, new RightEntity($rootScope.tableName, entity,$http));
    };
    //新增角色
    $scope.insert = function (title) {
        $yunatModal.open({templateUrl: 'addRole.html', controller: scopeControl}, {title: title, scope: $scope});
    };

    $scope.detailQuery = function (title) {
        $yunatModal.open({
            templateUrl: 'queryInfo.html',
            controller: scopeControl
        }, {
            title: title,
            scope: $scope,
            selection: $scope.mySelection[0]
        });
    };

    $scope.addScope = function (title) {
        if ($scope.mySelection[0] == null) {
            alert("请选择一条数据!");
            return;
        } else {
            if ($scope.mySelection[0].scopeName != null) {
                alert("请选择范围为空的数据");
                return;
            }
        }
        $yunatModal.open({
                templateUrl: 'addScope.html',
                controller: scopeControl}, {
                title: title,
                scope: $scope,
                selection: $scope.mySelection[0]});
    };

    $scope.updateRoleScope = function (title) {
        var item = $scope.mySelection[0];
        if (item == null) {
            alert("请选择需要修改的数据!");
            return;
        }
        $yunatModal.open({
                templateUrl: 'updateRoleScope.html',
                controller: scopeControl}, {
                title: title,
                scope: $scope,
                selection: item});
    };

    $scope.deleteScope = function () {
        if ($scope.mySelection[0] == null) {
            alert("请选择需要需要删除的数据!");
            return;
        } else {
            var _pkid = $scope.mySelection[0].roleScopeId;
            if (_pkid != null) {
                var roleScope = new RightEntity('t_role_scope',null,$http);
                roleScope.pkid = _pkid;
                roleScope.del(function (result) {
                    if (result.success) {
                        delRole($scope.mySelection[0].pkid);
                    } else {
                        alert("删除角色失败,请重试!");
                    }
                });
            } else {
                delRole($scope.mySelection[0].pkid);
            }
        }
        ;
    };

    function delRole(pkid) {
        var role = new RightEntity('tb_role',null,$http);
        role.pkid = pkid;
        role.del(function (result) {
            if (result.success) {
                $scope.query();
            } else {
                alert("删除角色失败,请重试!");
            }
        });
    }
}
var scopeControl = function ($scope, $modalInstance, modalObj, $http, $yunatGrid, $filter) {
    $scope.selection = null;
    if (typeof($scope.selection) != "undefined") {
        $scope.selection = modalObj.selection;
    }
    $scope.title = modalObj.title;
    $scope.saveRole = function (operationObj) {
        var role = new RightEntity("tb_role", operationObj,$http);
        role.appId = modalObj.scope.userInfo.app_id;
        role.operator = modalObj.scope.userInfo.pkid;
        $http.post("/dynamic/execSql/getNameIsExist", angular.toJson(role)).success(function (cb) {
            if (cb.data == 0) {
                role.insert(function (result) {
                    if (result.success) {
                        $scope.close();
                        $yunatGrid.refresh(modalObj.scope, modalObj.scope.queryEntity);
                    } else {
                        alert("添加角色失败,请重试");
                    }
                });
            } else {
                alert("角色名已存在,请重新输入");
            }
        });
    };

    $scope.saveScope = function (roleScope) {
        var roleScopeEntity = new RightEntity('t_role_scope', roleScope,$http);
        roleScopeEntity.name = roleScopeEntity.scopeName;
        delete roleScopeEntity.scopeName;
        roleScopeEntity.appId = $scope.selection.appId;
        roleScopeEntity.roleId = $scope.selection.pkid;
        roleScopeEntity.operator = $scope.selection.userId;
        roleScopeEntity.created = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
        roleScopeEntity.insert(function (result) {
            if (result.success) {
                $scope.close();
                $yunatGrid.refresh(modalObj.scope, modalObj.scope.queryEntity);
            } else {
                alert("添加范围失败,请重试");
            }
        });
    };

    //详细查询
    $scope.queryInfo = function (operationObj) {
        var param = {name: operationObj.name, appId: modalObj.scope.userInfo.app_id};
        var _detail_query_entity = {
            getList: function (getListCallBack) {
                $http.post("/dynamic/execSql/getRoleManages",angular.toJson(param)).success(function (results) {
                    getListCallBack.call(results.data.length, results.data);
                });
            }
        };
        $scope.close();
        $yunatGrid.refresh(modalObj.scope, _detail_query_entity);
    };

    //修改
    $scope.isShow = false;
    if ($scope.selection != null) {
        if ($scope.selection.roleScopeId != null) {
            $scope.isShow = true;
        }
    }
    $scope.updateRoleScope = function (operationObj) {
        if ($scope.isShow) {
            var role_scope = new RightEntity('t_role_scope', $scope.selection,$http);
            delete role_scope.pkid;
            delete role_scope.scopeName;
            delete role_scope.roleScopeId;
            role_scope.pkid = $scope.selection.roleScopeId;
            role_scope.roleId = $scope.selection.pkid;
            role_scope.name = $scope.selection.scopeName;
            role_scope.updated = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
            role_scope.update(function (result) {
                if (result.success) {
                    $scope.updateCommon('tb_role', $scope.selection);
                }
            });
        } else {
            $scope.updateCommon('tb_role', $scope.selection);
        }
    };

    $scope.updateCommon = function (tableName, selectEntity) {
        var roleEntity = new RightEntity(tableName,null,$http);
        roleEntity.pkid = selectEntity.pkid;
        roleEntity.name = selectEntity.name;
        roleEntity.update(function (result) {
            if (result.success) {
                modalObj.scope.mySelection[0] = null;
                $scope.close();
                $yunatGrid.refresh(modalObj.scope, modalObj.scope.queryEntity);
            } else {
                alert("修改失败,请重试!");
            }
        });
    };
    //取消
    $scope.close = function (result) {
        $modalInstance.close(result);
    };
};