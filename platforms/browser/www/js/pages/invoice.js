//单据模块总控制器
var invoice = {
	//获取单据列表
	getInvoicelist:function(){
		var _self = this;
		_self.data = {};
		var request = api.getPost('/workflow/table/list');

		request.then(function(res){
			console.log('getInvoicelist',res.data);
			switch(res.code){
				case 0:
					var invoice_list = res.data.list;
					console.log('invoice_list',invoice_list);
					//渲染
			        var html = template('invoice_items',invoice_list);
			        //console.log(html);
			        $('.invoice_list').empty().append(html);
					break;
				default:
					app.showSnackbar(res.message);
			}	
		});

	},
	//获取单据详情
	detail:function(){
		//获取单据编号
		var invoice_id = location.hash.split('/')[2];
		console.log('invoice_id',invoice_id);

		var request = api.getPost('/workflow/table/get',invoice_id);
		request.then(function(res){
			console.log('getInvoiceinfo',res.data);
			switch(res.code){
				case 0:
					//渲染
			        var html = template('invoice_item',res.data.fields);
			        //console.log(html);
			        $('.invoice_item').empty().append(html);

					break;
				default:
					app.showSnackbar(res.message);
			}
		});
		
		app.navTo('invoice_item');
	},
	init:function(){
		var _self = this;
		app.navTo('invoice_list');

		_self.getInvoicelist();
	}
}