angular.module('loadRightDirective',[]).directive('ngRight',function($http, $compile){
	return {
		restrict : 'A',
		require : 'ngModel', 
		compile : function compile(elem, attrs) {
			return {
				post : function postLink(scope, elem , attrs, ngModel){
					var loadInfos = eval("(" + attrs.ngRight + ")");
					var op = loadInfos.op;
					var queryParams = {
							_tableName : "tb_right_dict",
							_operation : "find",
							_fields : [ "name", "code" ],
							type : loadInfos.type
					};

					// 是否有效
					var isValid = loadInfos.isValid;
					if(isValid){
						queryParams["isValid"] = isValid;
					}

					var html = "";
					var entity = new Entity("tb_right_dict", queryParams);
					entity.getList(function(result) {
						angular.forEach(result, function(data) {
							html += ("<option value='" + data["code"] + "' >" + data["name"] + "</optoin>");
						});
						if (op === "query"){
							html = "<option value=''>全部</option>" + html;
						}
						elem.html(html);
						// 当绑定下拉框初始值为空时，默认绑定加载的第一个option
						if(attrs.value == ''){
							attrs.value = result[0]["code"];
							ngModel.$setViewValue(attrs.value);
						} else {
							// 使用当前选中的值
							elem.val(attrs.value);
						}
					});
				}
			};
		}
	};
}).directive('buttonLink',function($http, $compile){
	return function (scope, element, attrs) {
		var id = attrs["buttonLink"];
		element.on("click",function(){
			document.getElementById(id).click();
		});
	};
});