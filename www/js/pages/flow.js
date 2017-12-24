//流程(工单)模块总控制器
var flow = {
	//获取工单列表
	getFlowlist:function(){
		var _self = this;
		_self.data = {};
		var request = api.getPost('/workflow/job/list');

		request.then(function(res){
			console.log('getFlowlist',res.data);
			switch(res.code){
				case 0:
					var flow_list = res.data.list;
					console.log('flow_list',flow_list);
					//渲染
			        var html = template('flow_items',flow_list);
			        //console.log(html);
			        $('.flow_list').empty().append(html);
					break;
				default:
					app.showSnackbar(res.message);
			}	
		});

	},
	//工单详情
	detail:function(){
		var _self = this;
		app.navTo('flow_item');
		//获取单据编号
		var flow_id = location.hash.split('/')[2];
		console.log('flow_id',flow_id);

		var request = api.getPost('/workflow/job/get',flow_id);
		request.then(function(res){
			console.log('getFlowinfo',res.data);
			switch(res.code){
				case 0:
					//渲染
			        var html = template('flow_item',res.data);
			        //console.log(html);
			        $('.flow_item').empty().append(html);
					break;
				default:
					app.showSnackbar(res.message);
			}
		});

		


	},
	init:function(){
		var _self = this;
		app.navTo('flow_list');

		_self.getFlowlist();
	}
}