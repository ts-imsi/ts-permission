var parentId;

function OperationCtrl($scope, $yunatGrid, $yunatModal, $cookieStore,$http) {

    parentId = $scope.$parent.currentTab.pkid;

    $scope.userInfo = $cookieStore.get("USER_INFO");

    $yunatGrid.initConfig({
        data: "opDatas",
        columnDefs: [
            { field: 'pkid', displayName: 'pkid', visible: false },
            { field: 'name', displayName: '操作名'},
            { field: 'opCode', displayName: '操作码'},
            { field: 'px', displayName: '排序'}
        ]
    }, $scope);

    // 监听页面表格变化，根据变化刷新表格
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage || newVal.pageSize !== oldVal.pageSize) {
            _getPagedDataAsync($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize, $scope);
        }
    }, true);

    _getPagedDataAsync($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize, $scope);

    $scope.insert = function (title) {
        $yunatModal.open({
            templateUrl: 'myOpManage.html',
            controller: OpManageModalCtrl
        }, {
            title: title,
            scope: $scope
        });
    };

    $scope.update = function (title) {
        $yunatModal.open({
            templateUrl: 'myOpManage.html',
            controller: OpManageModalCtrl
        }, {
            title: title,
            operationObj: angular.copy($scope.mySelection[0]),
            scope: $scope
        });
    };

    $scope.del = function () {
        if ($scope.mySelection[0] == null) {
            alert("请选择要删除的数据！");
            return false;
        }
        if (confirm("删除操作不可逆转，你确定删除该条数据？？")) {
            var entity = new RightEntity("t_operation",null,$http);
            var pkid = $scope.mySelection[0].pkid;
            entity.pkid = pkid;
            entity.del(function (result) {
                if (result.success) {
                    delete $scope.orginMenuData[parentId][pkid];
                    _getPagedDataAsync($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize, $scope);
                }
                alert(result.msg);
            });
        }
    };
}

var _getPagedDataAsync = function (page, pageSize, scope) {
    setTimeout(function () {
        var data = JsonUtil.jsonObject2Array(scope.orginMenuData[parentId]);
        _setPagingData(data, page, pageSize, scope);
    }, 100);
};
var _setPagingData = function (data, page, pageSize, scope) {
    var pageData = data.slice((page - 1) * pageSize, page * pageSize);
    scope.opDatas = pageData;
    scope.totalServerItems = data.length;
    if (!scope.$$phase) {
        scope.$apply();
    }
};

var OpManageModalCtrl = function ($scope, $modalInstance, modalObj, $filter,$http) {

    // 绑定表单对象
    $scope.operationObj = modalObj.operationObj;

    var scope = modalObj.scope;
    var title = modalObj.title;
    $scope.title = title;
    $scope.currentTabId = parentId;

    $scope.save = function (menuObj) {
        if (~title.indexOf("新增")) {
            var entity = new RightEntity("t_operation", menuObj,$http);
            entity.appId = scope.userInfo.app_id;
            entity.operator = scope.userInfo.pkid;
            entity.parentId = parentId;
            entity.created = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
            entity.insert(function (result) {
                if(result.success){
                    // 插入目录，返回新插入数据的pkid
                    var pkid = result.data.id;
                    var need2InsertMenu = menuObj;
                    need2InsertMenu.pkid = pkid;
                    need2InsertMenu.subMenus = {};
                    // 更新数据绑定
                    scope.orginMenuData[parentId][pkid] = need2InsertMenu;
                    scope.orginMenuData[pkid] = need2InsertMenu.subMenus;

                    _getPagedDataAsync(scope.pagingOptions.currentPage, scope.pagingOptions.pageSize, scope);
                }
                alert(result.msg);
                $modalInstance.close();
            });
        } else if (~title.indexOf("修改")) {
            var pkid = menuObj.pkid;
            var entity = new RightEntity("t_operation", menuObj,$http);
            delete entity.subMenus;
            entity.updated = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
            entity.update(function (result) {
                if(result.success){
                    Utils.extendOverride(scope.orginMenuData[parentId][pkid], menuObj);
                    _getPagedDataAsync(scope.pagingOptions.currentPage, scope.pagingOptions.pageSize, scope);
                }
                alert(result.msg);
                $modalInstance.close();
            });
        }
    };

    $scope.close = function (result) {
        $modalInstance.close(result);
    };
}