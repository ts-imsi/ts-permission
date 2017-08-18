//所有CRUD操作对象的父类
var Entity = function (tableName, properties) {
    var args = Array.prototype.slice.call(arguments, 1);
    var self = this;
    self.tableName = tableName;
    if (args) {
        for (var i in args) {
            var argument = args[i];
            if (typeof argument === "string") { //参数为数据源
                self.datasource = argument;
            } else if (typeof argument === "object") { // 参数为子属性
                Utils.extend(self, argument);
            }
        }
    }
};

Entity.prototype = {
    // 新增
    insert: function (insertSuccCallBack) {
        // 获取操作对象所有非function的属性
        var properties = Utils.getPropsWithoutFun(this, true);
        // 删除无用的属性
        delete properties.tableName;

        // 构建ajax请求参数json
        var params = {
            _tableName: this.tableName,
            _operation: "insert"
        };
        Utils.extend(params, properties);
        Utils.ajaxRequest.call(this, "/dynamic/dbEntity/execute", angular.toJson(params), insertSuccCallBack);
    },

    // 删除
    del: function (delSuccCallBack) {
        // 获取操作对象所有非function的属性
        var properties = Utils.getPropsWithoutFun(this, false);
        var datasource = properties.datasource;
        // 删除无用的属性
        delete properties.tableName;
        delete properties.datasource;

        // 如果待删除对象不包含pkid则不允许删除
        if (ObjectUtil.isEmpty(properties)) {
            delSuccCallBack.call(this, false);
        } else {
            properties.datasource = datasource;
            // 构建ajax请求参数json
            var params = {
                _tableName: this.tableName,
                _operation: "delete"
            };
            Utils.extend(params, properties);

            Utils.ajaxRequest.call(this, "/dynamic/dbEntity/execute", angular.toJson(params), delSuccCallBack);
        }
    },

    // 修改
    update: function (updateSuccCallBack) {
        // 获取操作对象所有非function的属性
        var properties = Utils.getPropsWithoutFun(this, false);
        // 删除无用的属性
        delete properties.tableName;
        delete properties.primaryKey;
        // 构建ajax请求参数json
        var params = {
            _tableName: this.tableName,
            _operation: "update"
        };
        Utils.extend(params, properties);

        Utils.ajaxRequest.call(this, "/dynamic/dbEntity/execute", angular.toJson(params), updateSuccCallBack);
    },

    // 修改(如果修改的数据不存在就insert)
    saveOrUpdate: function (succCallBack) {
        // 获取操作对象所有非function的属性
        var properties = Utils.getPropsWithoutFun(this, false);
        // 删除无用的属性
        delete properties.tableName;
        delete properties.primaryKey;
        // 构建ajax请求参数json
        var params = {
            _tableName: this.tableName,
            _operation: "saveOrUpdate"
        };
        Utils.extend(params, properties);

        Utils.ajaxRequest.call(this, "/dynamic/dbEntity/execute", angular.toJson(params), succCallBack);
    },

    // 查询全部
    getList: function (getListCallBack) {
        // 获取操作对象所有非function的属性
        var properties = Utils.getPropsWithoutFun(this, true);
        var tableName = properties.tableName;
        var datasource = properties.datasource;
        // 删除表名属性
        delete properties.tableName;
        // 构建ajax请求参数json
        var params = {
            _tableName: this.tableName,
            _operation: "find"
        };
        Utils.extend(params, properties);

        // 将页面用于显示的每一条数据包装成Entity对象，内部方法
        var _wrapData2Obj = function (data) {
            for (var i in data) {
                data[i] = Utils.extend(data[i], Entity.prototype);
                data[i].tableName = tableName;
                data[i].datasource = datasource;
            }
            return data;
        };

        // ajax提交
        Utils.ajaxRequest.call(this, "/dynamic/dbEntity/execute", angular.toJson(params), function (responseObj) {
            getListCallBack.call(responseObj.data.condition.total, _wrapData2Obj(responseObj.data.result));
        });
    },

    groupList: function (groupCallBack) {
        var args = Array.prototype.slice.call(arguments, 1);

        // 获取操作对象所有非function的属性
        var properties = Utils.getPropsWithoutFun(this, true);
        var tableName = properties.tableName;
        var datasource = properties.datasource;
        // 删除表名属性
        delete properties.tableName;
        // 构建ajax请求参数json
        var params = {
            _tableName: this.tableName,
            _operation: "group",
            group: args
        };
        Utils.extend(params, properties);

        // 将页面用于显示的每一条数据包装成Entity对象，内部方法
        var _wrapData2Obj = function (data) {
            for (var i in data) {
                data[i] = Utils.extend(data[i], Entity.prototype);
                data[i].tableName = tableName;
                data[i].datasource = datasource;
            }
            return data;
        };

        // ajax提交
        Utils.ajaxRequest.call(this, "/dynamic/dbEntity/execute", angular.toJson(params), function (responseObj) {
            groupCallBack.call(responseObj.data.condition.total, _wrapData2Obj(responseObj.data.result));
        });
    }
};


var EntityGroup = function (baseTableName) {
    var self = this;

    var entityInfos = Array.prototype.slice.call(arguments, 1);

    var _unionAndWrapData = function (baseResult, entityInfos, index, length, total, getListCallBack) {
        if (index < length) {
            var entityInfo = entityInfos[index];
            var relativeField = entityInfo.relativeField;
            var relativeValues = JsonUtil.getNoDuplicateValues(baseResult, relativeField); // 用于in查询的值数组

            var nextResult;
            var nextEntity = new Entity(entityInfo.tableName);

            if (entityInfo.queryFields) {
                nextEntity["_fields"] = entityInfo.queryFields;
            }

            if (entityInfo.condition) {
                Utils.extend(nextEntity, entityInfo.condition); // 加入查询条件
            }

            nextEntity[relativeField + ":in"] = relativeValues;

            if (entityInfo.groupCon) {
                nextEntity.groupList(function (result) {
                    nextResult = result;
                    for (var i in baseResult) {
                        var json = baseResult[i];
                        Utils.extend(json, nextResult[i]);
                    }
                    _unionAndWrapData(baseResult, entityInfos, index + 1, length, total, getListCallBack);
//                  getListCallBack.call(total, baseResult);
                }, entityInfo.group);
            } else {
                nextEntity.getList(function (result) {
                    nextResult = result;
                    for (var i in baseResult) {
                        var json = baseResult[i];
                        Utils.extend(json, nextResult[i]);
                    }
                    _unionAndWrapData(baseResult, entityInfos, index + 1, length, total, getListCallBack);
                    //	getListCallBack.call(total, baseResult);
                });
            }
        } else {
            getListCallBack.call(total, baseResult);
        }
    };

    this.getList = function (getListCallBack) {
        var baseEntity = new Entity(baseTableName);
        var baseResult;
        var total;

        baseEntity.pageSize = self.pageSize;
        baseEntity.currentPage = self.currentPage;
        baseEntity.getList(function (result) {
            total = this;
            baseResult = result;
            if (total == 0) {
                getListCallBack.call(total, baseResult);
            } else {
                _unionAndWrapData(baseResult, entityInfos, 0, entityInfos.length, total, getListCallBack);
            }
        });
    };
};