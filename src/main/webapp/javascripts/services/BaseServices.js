/**
 * 封装ui.bootstrap.modal,创建$yunatModal服务
 * @author kui.liu
 * @since 2013/09/12
 */
var modal = angular.module("yunat-modal", ['ui.bootstrap']);

modal.service("$yunatModal", ["$modal", function ($modal) {

    /**
     * 生成并弹出modal
     * @param modalOptions modal配置
     * @param objPass2Controller 需要传到modal的controller中的对象
     */
    this.open = function (modalOptions, objPass2Controller) {
        // 初始化modal配置
        var defaultConfigs = {
            templateUrl: 'myModalContent.html',
            controller: modalController,
            resolve: {
                modalObj: function () {
                    return objPass2Controller;
                }
            }
        };

        if (modalOptions) {
            Utils.extendNoOverride(modalOptions, defaultConfigs);
        } else {
            modalOptions = defaultConfigs;
        }

        // 生成modal
        $modal.open(modalOptions).result.then(function (result) {
            if (result) {
                console.log('selectedItem: ' + result);
            }
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    }
}]);

//the modal is injected in the specified controller
var modalController = function ($scope, $modalInstance, $yunatGrid, $rootScope, modalObj, $filter) {

    // 获取当前登录用户名
    $scope.sys_user_name_cn = CookieUtil.getCookie("sys_user_name_cn");

    // 绑定表单对象
    $scope.operationObj = modalObj.operationObj;
    $scope.title = modalObj.title;

    $scope.save = function (operationObj) {
        var title = $scope.title;
        var opEntitys = Array.prototype.slice.call(arguments);

        if (~title.indexOf("增加")) {
            var count = opEntitys.length;
            for (var i in opEntitys) {
                var tableName = modalObj.scope.opTables ? modalObj.scope.opTables[i] : $rootScope.tableName;
                var opEntity = new Entity(tableName, opEntitys[i]);
                // TODO add datasource property
                var currentDate = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
                opEntity.created = currentDate;
                opEntity.updated = currentDate;
                opEntity.insert(function (result) {
                    if (count == 1) {
                        alert("新增成功！");
                    }
                    count--;
                });
            }
            $yunatGrid.refresh(modalObj.scope, modalObj.scope.queryEntity);
        } else if (~title.indexOf("修改")) {
            var count = opEntitys.length;
            for (var i in opEntitys) {
                var tableName = modalObj.scope.opTables ? modalObj.scope.opTables[i] : $rootScope.tableName;
                var opEntity = new Entity(tableName, opEntitys[i]);
                opEntity.updated = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
                opEntity.saveOrUpdate(function (result) {
                    if (count == 1) {
                        alert("修改成功！");
                        modalObj.scope.mySelection[0] = null;
                    }
                    count--;
                });
            }
            $yunatGrid.refresh(modalObj.scope, modalObj.scope.queryEntity);
        } else if (~title.indexOf("详细查询")) {
            if (!operationObj) {
                $yunatGrid.refresh(modalObj.scope);
            } else {
                angular.extend(operationObj, modalObj.scope.orginQueryEntity);
                $yunatGrid.refresh(modalObj.scope, operationObj);
            }
        }
        $modalInstance.close();
    };

    $scope.close = function (result) {
        $modalInstance.close(result);
    };
}


/**
 * 封装ngGrid，创建$yunatGrid服务
 * @author kui.liu
 * @since 2013/09/11
 */
angular.module("yunat-grid", ['ngGrid', 'yunat-modal']).service("$yunatGrid", ["$rootScope", "$yunatModal", function ($rootScope, $yunatModal) {

    var self = this;

    // 初始化grid配置
    this.initConfig = function (gridOptions, scope) {
        scope.mySelection = []; // 将当前选中条目设定成全局并与mySelection绑定，供修改删除使用
        scope.totalServerItems = 0;
        scope.pagingOptions = {
            pageSizes: [10, 20, 50],
            pageSize: 20,
            currentPage: 1
        };

        // 默认配置
        var defaultGridConfigs = {
            data                  : 'myData', // 展示数据
            i18n                  : 'zh-cn', // 设置显示语言
            enablePaging          : true,
            multiSelect           : false,
            showFooter            : true,
            enableColumnReordering: true, // 列是否可排序
            enableColumnResize    : true, // 列是否可拉伸
            enableHighlighting    : true, // 表格数据是否可选择
            selectedItems         : scope.mySelection, // 选中条目
            totalServerItems      : 'totalServerItems', // 数据总条数
            pagingOptions         : scope.pagingOptions // 页面配置
        };

        // 绑定配置
        Utils.extendNoOverride(gridOptions, defaultGridConfigs);
        scope.gridOptions = gridOptions;
    };

    // 初始化基本操作方法，可复写
    this.initOpFunc = function (scope) {
        // 查询全部
        if (!scope.query) {
            scope.query = function () {
                self.refresh(scope);
            };
        }
        // 详细查询
        if (!scope.detailQuery) {
            scope.detailQuery = function (title) {
                $yunatModal.open({
                    templateUrl: 'detailQuery.html'
                }, {
                    title: title,
                    scope: scope
                });
            };
        }
        // 删除
        if (!scope.del) {
            scope.del = function () {
                if (scope.mySelection[0] == null) {
                    alert("请选择要删除的数据！");
                    return false;
                }
                if (confirm("删除操作不可逆转，你确定删除该条数据？？")) {
                    scope.mySelection[0].del(function (result) {
                        alert("删除成功！");
                        self.refresh(scope, scope.queryEntity);
                    });
                }
            };
        }
        // 新增
        if (!scope.insert) {
            scope.insert = function (title) {
                $yunatModal.open({}, {
                    title: title,
                    scope: scope
                });
            };
        }
        // 修改
        if (!scope.update) {
            scope.update = function (title) {
                if (scope.mySelection[0] == null) {
                    alert("请选择要修改的数据！！");
                    return false;
                }
                var modalObj = {
                    title: title,
                    operationObj: angular.copy(scope.mySelection[0]),
                    scope: scope
                };
                $yunatModal.open({}, modalObj);
            };
        }
    };

    /*
     * 初始化grid
     */
    this.init = function (gridOptions, scope) {

        // 初始化配置
        self.initConfig(gridOptions, scope);

        // 初始化方法
        self.initOpFunc(scope);

        if (!scope.queryEntity) {
            scope.queryEntity = new Entity($rootScope.tableName);
            scope.queryEntity.datasource = $rootScope.datasource;
            scope.queryEntity.order = gridOptions.order;
        }

        scope.orginQueryEntity = angular.copy(scope.queryEntity);

        // 监听页面表格变化，根据变化刷新表格
        scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage || newVal.pageSize !== oldVal.pageSize) {
                _getPagedDataAsync(scope.pagingOptions.currentPage, scope.queryEntity, scope);
            }
        }, true);
    };

    /*
     * 刷新表格方法，并将当前页码置为1
     */
    this.refresh = function (scope, queryEntity,currentPage) {
        if (!queryEntity) {
            queryEntity = new Entity($rootScope.tableName);
            queryEntity.datasource = $rootScope.datasource;
            queryEntity.order = scope.queryEntity.order;
        }
        if(!currentPage){
            scope.pagingOptions.currentPage = 1;
        }
        scope.queryEntity = queryEntity; // 绑定queryEntity，参见scope.$watch('pagingOptions'....
        _getPagedDataAsync(currentPage, queryEntity, scope);
    };

    // 获取数据并填充表格
    var _getPagedDataAsync = function (currentPage, queryEntity, scope) {
        setTimeout(function () {
            queryEntity.pageSize = scope.pagingOptions.pageSize;
            queryEntity.currentPage = currentPage;
            queryEntity.getList(function (result) {
                scope.myData = result;
                scope.totalServerItems = this;
                if (!scope.$$phase) {
                    scope.$apply();
                }
            });
        }, 100);
    };
}]);