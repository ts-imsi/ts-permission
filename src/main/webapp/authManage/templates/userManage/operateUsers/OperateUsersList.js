function OperateUsersListCtrl($scope, $rootScope, $yunatGrid, $yunatModal, $cookieStore, $http) {
    $rootScope.tableName = "t_user_role";

    $scope.userInfo = $cookieStore.get("USER_INFO");

    $yunatGrid.init({
        columnDefs: [
            {field: 'name', displayName: '用户名', visible: true},
            {field: 'displayName', displayName: '姓名', visible: true},
            {field: 'roleName', displayName: '角色', visible: true},
            {field: 'status', displayName: '状态', visible: true}
        ]
    }, $scope);

    var param = {appId: $scope.userInfo.app_id};

    $scope.getTotalCount = function (str) {
        $scope.totalCount = 0;
        $http.post("/dynamic/execSql/getTotalCount", angular.toJson(str)).success(function (callback) {
            $scope.totalCount = callback.data;
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
        var param = {appId: $scope.userInfo.app_id};
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

    $scope.selectAll = function () {
        var _checkebox = $("input:checkbox[name='selection.roleId']");
        var _checked_count = $("input:checkbox[name='selection.roleId']:checked").length;
        if (_checkebox.length != _checked_count) {
            _checkebox.attr("checked", true);
        } else {
            _checkebox.attr("checked", false);
        }
    };

    $scope.disabled = function () {
        if ($scope.mySelection[0] == null) {
            alert("请选择数据");
            return false;
        } else {
            var entity = new RightEntity('t_user',null,$http);
            if ($scope.mySelection[0].status == '正常') {
                entity.status = 0;
            } else {
                entity.status = 1;
            }
            entity.name = $scope.mySelection[0].name;
            entity.update(function (result) {
                if (result.success) {
                    $scope.query();
                } else {
                    alert("禁用失败,请重试!");
                }
            });
        }
    };

    $scope.insert = function (title) {
        $yunatModal.open({
            controller: roleControl,
            templateUrl: 'insertOperationUsers.html'
        }, {
            title: title,
            scope: $scope
        });
    };

    $scope.update = function (title) {
        if ($scope.mySelection[0] == null) {
            alert("请选择数据");
            return false;
        }

        var status = $scope.mySelection[0].status;
        if(status && status=="禁用"){
            alert("该用户已禁用,无法进行关联操作!");
            return false;
        }
        $yunatModal.open({
            controller: roleControl,
            templateUrl: 'updateOperation.html'
        }, {
            selection: $scope.mySelection[0],
            scope: $scope,
            title: title
        });
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
}

var roleControl = function ($scope, $modalInstance, modalObj, $http, $yunatGrid, $filter) {
    $scope.title = modalObj.title;
    $scope.selection = null;
    var param = {appId: modalObj.scope.userInfo.app_id};
    if (typeof modalObj.selection != "undefined") {
        $scope.selection = modalObj.selection;
    }

    $scope.saveUser = function (obj) {
        var user = new RightEntity('t_user', obj,$http);
        user.status = 1;
        user.userId = modalObj.scope.userInfo.pkid;
        user.appId = modalObj.scope.userInfo.app_id;
        user.permission = 3;
        var currentDate = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
        user.created = currentDate;
        user.modified = currentDate;
        $http.post("/dynamic/execSql/getNameIsExist", angular.toJson(user)).success(function (cb) {
            if (cb.data[0].count > 0) {
                alert("用户名已存在,请重新输入");
            } else {
                user.insert(function (result) {
                    if (result.success) {
                        $scope.close();
                        $yunatGrid.refresh(modalObj.scope, modalObj.scope.queryEntity);
                    } else {
                        alert('添加操作用户失败,请重试!');
                    }
                });
            }
        });
    };

    $http.post("/dynamic/execSql/getRoles", angular.toJson(modalObj.scope.userInfo)).success(function (result) {
        var _roles = result.data;
        if (modalObj.selection != null && modalObj.selection.roleId != null) {
            var roleArray = modalObj.selection.roleId.split(',');
            for (var str = 0; str < roleArray.length; str++) {
                for (var int = 0; int < _roles.length; int++) {
                    if (roleArray[str] == _roles[int].pkid) {
                        _roles[int].checked = true;
                        continue;
                    }
                }
            }
        }
        $scope.roles = _roles;
    });

    $scope.toggleCheck = function (fri) {
        var param = {
            pkid: fri.pkid,
            appId: modalObj.scope.userInfo.app_id
        };

        $http.post("/dynamic/execSql/getRoleScope", angular.toJson(param)).success(function (result) {
            if (result.data.length != 0) {
                var scopeSign = new Array();
                var scopeUrl = new Array();
                for (var i = 0; i < result.data.length; i++) {
                    scopeSign.push(result.data[i].scope_sign);
                    scopeUrl.push(result.data[i].scope_url);
                }
                $scope.scopeSign = scopeSign;
                $scope.scopeUrl = scopeUrl;

                //TODO 根据$scope.scopeUrl获取列表K-v
            }
        });
    };

    $scope.saveRole = function (selection) {
        var role = new RightEntity('t_user_role', selection,$http);
        role.uid = selection.name;
        delete role.displayName;
        delete role.status;
        delete role.name;
        delete role.roleName;
        delete role.scopeValue;
        delete role.permission;

        var roles = [];
        $("input:checkbox[name='selection.roleId']:checked").each(function (i) {
            roles.push($(this).val());
        });

        role.roleIds = roles;
        role.insert(function (result) {
            if (result.success) {
                modalObj.scope.mySelection[0] = null;
                $scope.close();
                $yunatGrid.refresh(modalObj.scope, modalObj.scope.queryEntity,modalObj.scope.pagingOptions.currentPage);
            }else{
                alert(result.msg);
            }
        });
    };

    $scope.queryByCond = function (cond) {
        modalObj.scope.query(angular.toJson(cond));
        $scope.close();
    };

    $scope.close = function (result) {
        $modalInstance.close(result);
    };
};