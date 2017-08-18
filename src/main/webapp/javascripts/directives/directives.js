/**
 * @since : 13-12-20 下午4:08
 * @author : kui.liu
 */
angular.module("directives", ["directives/datepicker.html"]).directive("datePicker", ["$timeout", "$filter", function ($timeout, $filter) {
    return {
        restrict: "E",
        require: "ngModel",
        replace: true,
        templateUrl: "directives/datepicker.html",
        link: function (scope, elem, attrs, ngModel) {
            $datePicker = elem.find("input");

            $datePicker.attr("ng-model", attrs.ngModel);
            $datePicker.attr("value", $filter('date')(scope.$eval(attrs.ngModel), "yyyy-MM-dd"));

            $datePicker.datepicker({
                format: "yyyy-mm-dd",
                autoclose: true
            }).on("hide", function () {// 选中之后绑定日期值
                    ngModel.$setViewValue($(this).val());
                    $timeout(function () {
                        scope.$apply();
                    }, 500);
                });

            // 图标动作
            elem.find(".add-on:has(.icon-calendar)").click(function () {
                $datePicker.datepicker("show");
            });

            // 判断是否需要加required
            if (attrs.hasOwnProperty("required")) {
                $(".input-append input").attr("required", "required");
            }
        }
    }
}]);

angular.module("directives/datepicker.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("directives/datepicker.html",
        "<div class=\"input-append\">"
        + "     <input type=\"text\" readonly=\"readonly\"/>"
        + "     <span class=\"add-on\"><i class=\"icon-calendar\"></i></span>"
        +"</div>"
    );
}]);
