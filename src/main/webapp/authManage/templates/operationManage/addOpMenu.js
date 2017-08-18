function AddMenuCtrl($scope, $filter, $cookieStore,$http) {

    $scope.save = function (menuObj) {
        var parentId = $scope.currentTab.pkid;

        var userInfo = $cookieStore.get("USER_INFO");

        var entity = new RightEntity("t_operation", menuObj,$http);

        entity.appId = userInfo.app_id;
        entity.userId = userInfo.pkid;
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