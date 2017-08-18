var app = angular.module('menu', [ 'yunat-modal', 'yunat-grid', 'attrDirective', 'displayFilter', 'AuthMenu', 'loadRightDirective', 'ngCookies']);
function MenuCtrl($scope, $menu, $cookieStore,$window,$http) {

	var userInfo = $cookieStore.get("USER_INFO");
	if(!userInfo){
		$window.location.href = "/login.html";
		return;
	}
	
    var appId = userInfo.app_id;

    // 获取操作管理菜单
    $menu.wrapMenu(appId, function (result) {
        $scope.orginMenuData = result;
        $scope.groups = result["0"];
    });

    // 获取角色列表
    $menu.loadRoleMenu(appId, function (result) {
        $scope.roles = result;
    });
    
    $scope.userManage = [];
    if(userInfo.permission==1){
    	$scope.userManage = [{
    	   head: "管理用户",
    	   tabUrl: "/authManage/templates/userManage/manageUsers/manageUsers.html",
    	   id: "manageUser"
       },{
    	   head: "操作用户",
    	   tabUrl: "/authManage/templates/userManage/operateUsers/OperateUsersList.html",
    	   id: "opUser"
       }];
    }else{
    	$scope.userManage = [{
    		head: "操作用户",
  	        tabUrl: "/authManage/templates/userManage/operateUsers/OperateUsersList.html",
  	        id: "opUser"
  	     }];
    }

    $scope.tabs = {};

    /***************************** 通用tab页 ******************/
        // 增加tab页
    $scope.addTab = function (subMenuObj) {
        var head = subMenuObj.head;
        var pkid = subMenuObj.pkid;
        if (!$scope.tabs[head] || $scope.tabs[head].pkid != pkid) {// 如果该tab页未加载或tab页名称一样但内容不一致
            $scope.tabs[head] = subMenuObj;
            // 选中tab页
            $scope.tabs[head].active = true;
        } else {
            // 选中tab页
            $scope.tabs[head].active = true;
        }
    };

    // 移除tab页
    $scope.remove = function (head) {
        delete $scope.tabs[head];
    };

    /******************************* 父目录按钮操作 ****************************/
        // 增加目录
    $scope.addMenu = function (group) {
        var tab = {
            tabUrl: "/authManage/templates/operationManage/addOpMenu.html"
        };

        if (group) {
            tab.pkid = group.pkid;
            tab.head = "新增" + group.head + "目录";
        } else {
            tab.pkid = 0;
            tab.head = "新增操作目录";
        }

        $scope.addTab(tab);
    };

    // 删除目录
    $scope.delMenu = function (groupId) {
        if (confirm("删除目录会同时删除所有子模块，此过程不可逆转，确认删除？")) {
            // 删除目录
            var menuEntity = new RightEntity("t_operation",null,$http);
            menuEntity.pkid = groupId;
            menuEntity.del(function (result) {
                if(result.success){
                    delete $scope.groups[groupId];
                    setTimeout(function () {
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    }, 100);
                }

                alert(result.msg);
            });
        }
    };

    // 编辑目录
    $scope.editMenu = function (group) {
        var tab = {
            tabUrl: "/authManage/templates/operationManage/editOpMenu.html"
        };

        if (group) {
            tab.pkid = group.pkid;
            tab.head = "编辑" + group.head + "目录";
        } else {
            tab.pkid = 0;
            tab.head = "编辑操作目录";
        }

        $scope.addTab(tab);
    };


    /****************** 角色管理 *********************/
        // 编辑角色
    $scope.editRole = function () {
        var tab = {
            head: "角色管理",
            id: "editRole",
            tabUrl: "/authManage/templates/roleManage/roleManage.html"
        };
        $scope.addTab(tab);
    };

    // 关联角色操作
    $scope.loadRoleOpsTree = function (role) {
        var tab = {
            head: "关联角色操作",
            id: "opRole",
            tabUrl: "/authManage/templates/opAuthTree/opAuthTree.html"
        };
        $scope.currentRoleName = role.head;
        $scope.currentRoleId = role.pkid;
        $scope.addTab(tab);
    };
}