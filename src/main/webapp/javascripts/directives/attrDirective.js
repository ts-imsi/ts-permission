angular.module('attrDirective', []).directive('ngLoad',function ($http, $compile) {
    return {
        restrict: 'A',
        require: 'ngModel',
        compile: function compile(elem, attrs) {
            return {
                post: function postLink(scope, elem, attrs, ngModel) {
                    _wrapOptions(scope, elem, attrs, ngModel, "tb_relation_dict", "ngLoad");
                }
            };
        }
    };
}).directive("customerLoad",function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            compile: function compile(elem, attrs) {
                return {
                    post: function postLink(scope, elem, attrs, ngModel) {
                        _wrapOptions(scope, elem, attrs, ngModel, "tb_customer_dict", "customerLoad", "customer");
                    }
                };
            }
        };
    }).directive("rightLoad",function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            compile: function compile(elem, attrs) {
                return {
                    post: function postLink(scope, elem, attrs, ngModel) {
                        _wrapOptions(scope, elem, attrs, ngModel, "tb_right_dict", "rightLoad", "rights");
                    }
                };
            }
        };
    }).directive('buttonLink',function ($http, $compile) {
        return function (scope, element, attrs) {
            var id = attrs["buttonLink"];
            element.on("click", function () {
                document.getElementById(id).click();
            });
        };
    }).directive('evalScript',function () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs, ctrl) {
                elem.hide();
                var code = elem.html();
                var executeF = new Function(code);
                executeF();
            }
        };
    }).directive('accordionShow',function () {
        // 当accordion内容为空时，移除accordion的body部分
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var parentElem = $(elem);
                if ($.trim(parentElem.find(".accordion-inner").text()) == "") {
                    parentElem.find(".accordion-body").remove();
                }
            }
        };
    }).directive('addIcons',function ($compile) {
        return {
            restrict: 'A',
            controller: "IconsCtrl",
            link: function (scope, elem, attrs, ctrl) {
                var parentElem = $(elem);
                var parentScope = scope.$parent;
                var icons = $compile("<icons><i class='icon-plus' ng-click='addEvent(parentScope.group)'></i><i class='icon-minus' ng-click='delEvent()'></i><i class='icon-edit' ng-click='editEvent()'></i></icons>")(scope);
                parentElem.find(".accordion-heading").append(icons);
            }
        };
    }).directive('uiBlur', function () {
        return function (scope, elem, attrs) {
            elem.bind('blur', function () {
                scope.$apply(attrs.uiBlur);
            });
        };
    });

var _wrapOptions = function (scope, elem, attrs, ngModel, tableName, directiveName, datasource) {
    var loadInfos = eval("(" + attrs[directiveName] + ")");

    var op = loadInfos.op;
    var queryParams = {
        _tableName: tableName,
        _operation: "find",
        _fields: [ "name", "code" ],
        type: loadInfos.type
    };

    // 是否有效
    var isValid = loadInfos.isValid;
    if (isValid) {
        queryParams["isValid"] = isValid;
    }

    var entity = new Entity(tableName, queryParams);
    entity.datasource = datasource;

    entity.getList(function (result) {
        var elemOptions = elem[0].options;
        if (op === "query") {
            elemOptions.add(new Option("全部", ""));
        }
        angular.forEach(result, function (data) {
            elemOptions.add(new Option(data["name"], data["code"]));
        });
        elemOptions.remove(0); // 删除第一个空的键值为null的option
        // 当绑定下拉框初始值为空时，默认绑定加载的第一个option
        if (attrs.value == '') {
        	attrs.value = result[0]["code"];
            ngModel.$setViewValue(attrs.value);
        } else {
            // 使用当前选中的值
            elem.val(attrs.value);
        }
    });
};