/**
 * 对象过滤器
 * @author kui.liu
 * @since 2013-10-16
 */
var objectFilter = angular.module('objectFilter', []);

// 初始化系统用户名
objectFilter.filter('initSysUser', function () {
    return function (input, type) {
        if (type == "增加") {
            return input;
        } else {
            return undefined;
        }
    };
});