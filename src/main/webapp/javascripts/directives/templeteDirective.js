angular.module('templeteDirective',[]).directive('ngLoadTemplete',function($http, $compile){
	return {
		restrict: 'A',
		compile : function compile(elem, attrs) {
			return {
				post : function preLink(scope, elem , attrs){
					var loadInfos = eval("(" + attrs.ngLoadTemplete + ")");
					var text = loadInfos.text;
					var val = loadInfos.value;
					var op = loadInfos.op;
					var queryParams = {
							_tableName : "tb_templete_define",
							_operation : "find",
							_fields : [ loadInfos.text, loadInfos.value ]
					};
					
					// 是否有效
					var isValid = loadInfos.isValid;
					if(isValid){
						queryParams["isValid"] = isValid;
					}
					
					var html = "";
					var entity = new Entity("tb_templete_define", queryParams);
					entity.getList(function(result) {
						angular.forEach(result, function(data) {
							html += ("<option value='" + data[val] + "' >" + data[text] + "</optoin>");
						});
						if (op === "query"){
							html = "<option value=''>全部</option>" + html;
						}
						elem.html(html);
						// 使用当前选中的值
						elem.val(attrs.value);
					});
				}
			}
		}
//		link : function (scope, elem, attrs){
//			var loadInfos = eval("(" + attrs.ngLoad + ")");
//			var text = loadInfos.text;
//			var value = loadInfos.value;
//			var op = loadInfos.op;
//			var queryParams = {
//					_tableName : "twf_dict",
//					_operation : "find",
//					_fields : [ loadInfos.text, loadInfos.value ],
//					type : loadInfos.type
//			};
//
//			var html = "";
//			var entity = new Entity("twf_dict", queryParams);
//			entity.getList(function(result) {
//				angular.forEach(result, function(data) {
//					html += ("<option value='" + data[value] + "' >" + data[text] + "</optoin>");
//				});
//				if (op === "query"){
//					html = "<option value=''>全部</option>" + html;
//				}
//				elem.html(html);
//			});
//			$compile(elem.contents())(scope);
//		}
	}
}).directive('buttonLink',function($http, $compile){
	return function (scope, element, attrs) {
        var id = attrs["buttonLink"];
        element.on("click",function(){
            document.getElementById(id).click();
        });
    };
});