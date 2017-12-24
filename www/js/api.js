var api ={
	host:config.apiip,
	getPost:function(method,param){
		var _self = this;
		var id = localStorage.getItem('sessionid');
		
		var _jsonData = {};
		if(id != null){
			_jsonData["sessionid"]=id;
		}
		_jsonData["method"]=method;
		_jsonData["param"]=param;

		//企业编号+服务编号
		_jsonData["service_id"] = localStorage.getItem('app_service_id');
		_jsonData["merchant_id"] = localStorage.getItem('app_merchant_id');
		_jsonData = JSON.stringify(_jsonData);
		var post = Promise.resolve($.post(_self.host,_jsonData));

		return post;
	},
	example:function(){
		var a = this.getPost('/common/address/area',{"level":1,"parent_id":""});
		a.then(function(res){
			console.log(res);
		})
	},
	session:function(){
		var sessionid = localStorage.getItem('sessionid');
			if(sessionid != null){ return;}
		var method = '/web/info';
		var userSession = api.getPost(method);
		userSession.then(function(res){
			 console.log(res);
			switch(res.code){
				case 0:localStorage.setItem('sessionid',res.data.sessionid);break;
				case 10001 : Toastr.error('请求参数错误，要么格式不对，要么字段不合要求'); break;
				case 10002 : Toastr.error('http请求异常，用户记录后端的http请求异常'); break;
				case 10003 : Toastr.error('未知错误'); break;
				case 10004 : Toastr.error('会话异常'); break;
				case 10101 : Toastr.error('用户未登录'); break;
				case 10102 : Toastr.error('用户没有对应操作权限'); break;
				case 10103 : Toastr.error('用户不存在或者密码错误，登录失败'); break;
				case 10104 : Toastr.error('用户不存在'); break;
				case 10105 : Toastr.error('用户已经存在，用于注册异常返回'); break;
			}
		});
	},
	init:function(){
		this.example();
	}
}

