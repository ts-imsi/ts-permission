/**
 * 根据登录用户权限动态加载按钮指令
 * Date: 13-11-21
 * Time: 下午3:04
 * @author : kui.liu
 */
angular.module("dynamic-buttons", []).directive("dynamicButton", function ($http, $compile) {
    var buttonMapper = {
        "查询": {
            text: "查询",
            flag: "searchExist",
            class: "icon-search",
            method: "query()"
        },
        "详细查询": {
            text: "详细查询",
            flag: "detailExist",
            class: "icon-zoom-in",
            method: "detailQuery('详细查询')"
        },
        "增加": {
            text: "增加",
            flag: "insertExist",
            class: "icon-plus-sign",
            method: "insert('增加')"
        },
        "修改": {
            text: "修改",
            flag: "updateExist",
            class: "icon-edit",
            method: "update('修改')"

        },
        "删除": {
            text: "删除",
            flag: "delExist",
            class: "icon-minus-sign",
            method: "del()"
        },
        "下载本页": {
            text: "下载本页",
            flag: "downloadExist",
            class: "icon-cloud-download",
            method: "download()"
        },
        "申请": {
            text: "申请",
            flag: "applyExist",
            class: "icon-user",
            method: "apply()"
        },
        "我的申请": {
            text: "我的申请({{applyCount}})",
            flag: "applyExist",
            class: "icon-list",
            method: "applications('apply')"
        },
        "待审批": {
            text: "待审批({{approveCount}})",
            flag: "approveExist",
            class: "icon-list",
            method: "applications('approve')"
        },
        "查看密码": {
            text: "查看密码",
            flag: "checkPassExist",
            class: "icon-unlock",
            method: "checkPass()"
        }
    };

    return {
        scope: true,
        compile: function () {
            return {
                pre: function ($scope, iElement, iAttrs) {
                    var userInfo = $scope.$eval(iAttrs.dynamicButton);
                    $http.post("/permissions/verify/getUserOps", userInfo).success(function (result) {

                        var buttonTemplate = '<div class="btn-group">';
                        angular.forEach(result.data, function (button, i) {
                            var buttonObj = buttonMapper[button.name];
                            $scope.$parent[buttonObj.flag] = true;
                            buttonTemplate += '<button type="button" class="btn" ng-click="' + buttonObj.method + '"><i class="' + buttonObj.class + '"></i>' + buttonObj.text + '</button>';
                        });
                        buttonTemplate += "</div>";
                        iElement.append($compile(buttonTemplate)($scope));
                        // 发射buttonLoaded事件，调用者可以监听该事件
                        $scope.$parent.$emit("buttonsLoaded");
                    });
                }
            };

        }
    }
});