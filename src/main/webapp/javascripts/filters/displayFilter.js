/**
 * 字段展示时使用的过滤器
 * @author kui.liu
 * @since 2013-09-27
 */
var displayFilter = angular.module('displayFilter', []);
displayFilter.filter('checkmark', function () {
    return function (input) {
        return input ? '\u2713' : '\u2718';
    };
});

//将数字表示的类型转换成中文展示
displayFilter.filter('num2Cn', function () {
    return function (input, typeInfos) {
        var type = typeInfos.type;
        var typeNameArray = typeInfos.array;
        var name = typeInfos.name;
        if (!name) {
            name = "name";
        }

        if (typeof (typeNameArray[type][input]) == 'undefined') {
            return "";
        }

        return typeNameArray[type][input][name];
    };
});

/**
 * 格式化日期，默认格式为"yyyy-MM-dd", angularJs已经内置了dateFilter,
 * <a>http://docs.angularjs.org/api/ng.filter:date<a>
 */
displayFilter.filter('dateFormat', function () {
    return function (input, fmt) {
        if (!input) {
            return "";
        }
        var format = fmt;
        if (!format) {
            format = "yyyy-MM-dd";
        }
        return new Date(input).Format(format);
    };
});

//日期格式化
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}