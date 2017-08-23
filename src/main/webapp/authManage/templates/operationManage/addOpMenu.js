function AddMenuCtrl($scope, $filter, $cookieStore,$http) {

    $scope.save = function (menuObj) {
        var parentId = $scope.currentTab.pkid;

        var userInfo = $cookieStore.get("USER_INFO");
        var entity = new RightEntity("t_operation", menuObj,$http);
        var typeName="";
        if($scope.typeDict!=null&&$scope.typeDict!=""){
            entity.type=$scope.typeDict.code;
            if($scope.typeDict.code==1){
                typeName="菜单权限";
            }else{
                typeName="数据权限";
            }

        }else{
            if(parentId==0){
                entity.type="1";
                typeName="菜单权限";
            }
        }

        entity.appId = userInfo.app_id;
        entity.operator = userInfo.pkid;
        entity.parentId = parentId;
        entity.created = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
        entity.insert(function (result) {
            if(result.success){
                // 插入目录，返回新插入数据的pkid
                var pkid = result.data.id;
                var need2InsertMenu = {
                    head: menuObj.name,
                    url: menuObj.url,
                    px: menuObj.px,
                    url:menuObj.url,
                    type:typeName,
                    icon:menuObj.icon,
                    translate:menuObj.translate,
                    pkid: pkid
                };
                need2InsertMenu.subMenus = {};

                // 更新数据绑定
                $scope.orginMenuData[parentId][pkid] = need2InsertMenu;
                $scope.orginMenuData[pkid] = need2InsertMenu.subMenus;
            }

            // 应用绑定
            setTimeout(function () {
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }, 100);

            alert(result.msg);
        });
    };
}