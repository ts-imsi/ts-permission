angular.module("AuthMenu", []).service("$menu", ["$http", "$q", "$cookieStore", function ($http, $q,$cookieStore) {

//    var userInfo = $cookieStore.get("USER_INFO");
//    console.log(userInfo);

    // 包装菜单信息
    this.wrapMenu = function (appId, fetchMenuCallback) {
        var deferred = $q.defer();

        // 重新绑定原始数据中的各子菜单之间的关系
        var _rebindOrginMenu = function (result) {

            var orginMenus = result.data.data;

            for (var i in orginMenus) {
                var rootData = orginMenus[i];
                for (var j in rootData) {
                    var subData = rootData[j];
                    subData.subMenus = orginMenus[j];
                }
            }

            deferred.resolve(orginMenus);
            return deferred.promise;
        };

        var _wrapMenu = function (orginMenus) {

            // get parent menus
            var parentMenusIndex = "0";
            var rootMenu = orginMenus[parentMenusIndex];

            for (var i in rootMenu) {
                var Nametype="";
                if(rootMenu[i].type=="1"){
                    Nametype="菜单权限";
                }else if(rootMenu[i].type=="2"){
                    Nametype="数据权限";
                }else{
                    Nametype="";
                }
                var menu = {
                    head: rootMenu[i].name,
                    pkid: rootMenu[i].pkid,
                    px: rootMenu[i].px,
                    type:Nametype,
                    icon:rootMenu[i].icon,
                    translate:rootMenu[i].translate,
                    subMenus: rootMenu[i].subMenus
                };
                rootMenu[i] = menu;
                var subMenus = rootMenu[i].subMenus;
                for (var j in subMenus) {
                    var subMenu = {
                        head: subMenus[j].name,
                        tabUrl: "/authManage/templates/operationManage/opManageList.html",
                        pkid: subMenus[j].pkid,
                        parentId: subMenus[j].parentId,
                        url: subMenus[j].url,
                        translate:subMenus[j].translate,
                        px: subMenus[j].px,
                        operations: subMenus[j].subMenus
                    };
                    subMenus[j] = subMenu;
                }
            }
            deferred.resolve(orginMenus);
            return deferred.promise;
        };

        $http.post("/permissions/manage/getMenu", {appId: appId}).then(_rebindOrginMenu).then(_wrapMenu).then(fetchMenuCallback);
    };

    // 获取角色列表
    this.loadRoleMenu = function (appId, fetchRolesCallback) {

        $http.post("/permissions/manage/getRoles", {appId: appId}).success(function (result) {
            var roles = [];
            var roleDatas = result.data;
            for (var i in roleDatas) {
                var data = roleDatas[i];
                var role = {};
                role.pkid = data.pkid;
                role.head = data.name;
                roles.push(role);
            }
            fetchRolesCallback.call(this, roles);
        });
    };
}]);