String.prototype.trim = function () {
    // 用正则表达式将前后空格
    // 用空字符串替代。
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

var Utils = {
    // 获取源对象非function的所有属性集
    getPropsWithoutFun: function (source, excludeEmpty) {
        var properties = {};
        for (var p in source) {
            var propValue = source[p];
            var frontParam = typeof(propValue) != "undefined" && propValue != null;
            var isEmpty = excludeEmpty ? frontParam && propValue != '' : frontParam;
            if (isEmpty) {
                if (typeof propValue === "string") {
                    propValue = propValue.trim();
                }
                if (typeof propValue != "function") {
                    properties[p] = propValue;
                }
            }

        }
        return properties;
    },

    // 继承源对象所有属性
    extend: function (destination, source) {
        for (var p in source) {
            destination[p] = source[p];
        }
        return destination;
    },

    // 继承源对象属性，目标对象已有的属性不会被复写
    extendNoOverride: function (destination, source) {
        for (var p in source) {
            if (destination[p] == null) {
                destination[p] = source[p];
            }
        }
        return destination;
    },

    // 继承源对象属性，并复写目标对象的已有属性
    extendOverride: function (dest, source) {
        for (var p in source) {
            dest[p] = source[p];
        }
    },

    // 包装原生ajax请求
    ajaxRequest: function (url, postParams, succCallBack) {
        var xmlhttp = null;
        if (window.XMLHttpRequest) {// code for Firefox, Opera, IE7, etc.
            xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xmlhttp != null) {
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {// 4 = "loaded"
                    if (xmlhttp.status == 200) {// 200 = "OK"
                        var response = eval("(" + xmlhttp.responseText + ")");
                        if (response.success) {
                            succCallBack.call(this, response);
                        } else {
                            alert("ajax request failed ：" + response.msg);
                        }
                    } else {
                        alert("Problem retrieving data:" + xmlhttp.statusText);
                    }
                }
            };
            xmlhttp.open("POST", url, true);
            xmlhttp.send(postParams);
        } else {
            alert("Your browser does not support XMLHTTP.");
        }
    }
};

var DictUtil = {
    getCustomerDict: function (succCallBack) {
        var queryParams = {
            _tableName: "tb_customer_dict",
            _operation: "group",
            _fields: [ "type", "code", "name" ],
            group: ["type", "code"]
        };
        var filterEntity = new Entity("tb_customer_dict", queryParams);
        filterEntity.datasource = "customer";
        filterEntity.groupList(function (result) {
            succCallBack.call(this, result);
        });
    },

    getRelationDict: function (succCallBack) {
        var queryParams = {
            _tableName: "tb_relation_dict",
            _operation: "group",
            _fields: [ "type", "code", "name" ],
            group: ["type", "code"]
        };
        var filterEntity = new Entity("tb_customer_dict", queryParams);
        filterEntity.groupList(function (result) {
            succCallBack.call(this, result);
        });
    },

    getRightDict: function (succCallBack) {
        var queryParams = {
            _tableName: "tb_right_dict",
            _operation: "group",
            _fields: [ "type", "code", "name" ],
            group: ["type", "code"]
        };
        var filterEntity = new Entity("tb_right_dict", queryParams);
        filterEntity.datasource = "rights";
        filterEntity.groupList(function (result) {
            succCallBack.call(this, result);
        });
    },

    getDictTemplete: function (succCallBack) {
        var queryParams = {
            _tableName: "tb_templete_define",
            _operation: "group",
            _fields: [ "pkid", "rel_module"],
            group: ["pkid"]
        };
        var filterEntity = new Entity("tb_templete_define", queryParams);
        filterEntity.groupList(function (result) {
            result = {
                pkid: result
            };
            succCallBack.call(this, result);
        });
    }
};

//json工具类
var JsonUtil = {
    // get values of the special key in jsonArray
    getNoDuplicateValues: function (jsonArray, key) {
        var values = [];

        var _hasDuplicateValue = function (array, value) {
            for (var i in array) {
                if (array[i] == value) {
                    return array[i];
                }
            }
            return false;
        };

        for (var i in jsonArray) {
            var json = jsonArray[i];
            var value = json[key];
            if (!value) {
                continue;
            }
            if (!_hasDuplicateValue(values, value)) {
                values.push(value);
            }
        }

        return values;
    },

    jsonObject2Array: function (jsonObject) {
        var array = [];
        for (var i in jsonObject) {
            array.push(jsonObject[i]);
        }
        return array;
    }
};

//cookie工具类
var CookieUtil = {

    getCookie: function (key) {
        var cookieArray = document.cookie.split(";");
        var cookie = {};

        for (var i in cookieArray) {
            var c = cookieArray[i];
            var cKey = (c.split("=")[0]).trim();
            var cValue = decodeURI(c.split("=")[1]);
            cookie[cKey] = cValue;
        }

        return cookie[key];
    }
};

var StringUtil = {
    letterArray: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
};

var ObjectUtil = {

    isEmpty: function (object) {
        for (var p in object) {
            return false;
        }
        return true;
    }
};