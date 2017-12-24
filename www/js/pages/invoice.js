//单据模块总控制器
var invoice = {
	tips:'无单据信息',
	//获取单据列表
	inData:{}, //全部数据临时存储
	oneData:{},//单条数据临时存储
	getInvoicelist:function(){
		var _self = this;
		_self.data = {};
		var request = api.getPost('/workflow/table/list');

		request.then(function(res){
			console.log('getInvoicelist',res.data);
			switch(res.code){
				case 0:
					var invoice_list = res.data.list;
					if(invoice_list != null && invoice_list != undefined && invoice_list.length != 0 ){
						console.log('invoice_list',invoice_list);
					//渲染
			        var html = template('invoice_items',invoice_list);
			        //console.log(html);
			        $('.invoice_list').empty().append(html);
					}else{
						 $('.invoice_list').text(_self.tips);
					}
					
					break;
				default:
					app.showSnackbar(res.message);
			}	
		});

	},
	//获取单据详情
	detail:function(){
		//获取单据编号
		
		var _self = this;
		var invoice_id = location.hash.split('/')[2];
		console.log('invoice_id',invoice_id);
		app.navTo('invoice_item_list')
		var request = api.getPost('/workflow/table/get',invoice_id);
		request.then(function(res){
			console.log('getInvoiceinfo',res.data);
			_self.inData = res.data;
			switch(res.code){
				case 0:
					//渲染
					var obj = res.data.fields;
					
					obj = editForm.redata(obj);

			        var item_edit_html = htmlImport.tpl.flow_art_tpl;
			        //console.log(html);
			        $('.flow_item_edit').empty().append(item_edit_html);
			       

			        for (var k = 0; k < obj.length; k++) {
		            	editForm.chosenClassfiy(obj[k]);
		            	
		            	$.each(obj[k].feilds,function(i,n){
		            		n.disabled = 'disabled';
		            	})
		            	console.log(obj[k]);
		            	var html = template('component-tpl',obj[k]);
			           	$('.flow_item_edit').append(html);
			           	pcd.init();
		            }
		            
					break;
				default:
					app.showSnackbar(res.message);
			}
		});
		
		app.navTo('invoice_item');
	},

	// editText:function(){
		
		
	// 	// var _self = this;
	// 	// var i_data = {};
	// 	// app.navTo('invoice_item_list');
	// 	// //var arr = [];
	// 	// var arr = $('.mdc-list-item');
	// 	// var text_field_index = location.hash.split('/')[2];
	// 	// console.log(arr);
	// 	// console.log(text_field_index);

	// 	// var value = $(arr[text_field_index]).children('.invoice_item_info').text();
	// 	// console.log(value);

	// 	// var item = $(arr[text_field_index]).children('.invoice_name').text();
	// 	// console.log(item);
	// 	// var text_field_type = location.hash.split('/')[3];
	// 	// var text_field_subType = location.hash.split('/')[4];
	// 	// i_data.value =value;
	// 	// i_data.item = item;
	// 	// i_data.type = text_field_type;
	// 	// i_data.sub_type = text_field_subType; 

	// 	// console.log(_self.inData);
	// 	// var html = template('item_edit',i_data);
	// 	// $('.text_edit').empty().append(html);
	// 	// pcd.init();

	// 	var _self = this;
		

	// 	app.navTo('flow_item_edit');
	// 	console.log('now_step_data',_self.flow_step_list[now_step]);

 //        //渲染功能
 //        var opt = _self.flow_step_list[now_step];
 //        // if(now_step=="step0"){
 //        //     opt.opt = '';//stop0 操作属性去掉
 //        // }
 //        var opt_html = template('flow_item_toolbar',opt);
 //        //console.log(html);
 //        $('.flow_item_toolbar').empty().append(opt_html);

	// 	//渲染数据
 //        var item_edit_html = htmlImport.tpl.flow_art_tpl;
 //        //console.log(html);
 //        $('.flow_item_edit').empty().append(item_edit_html);
 //        var fields = _self.flow_step_list[now_step].fields;
 //        for (var i = 0; i < fields.length; i++) {
 //           	var html = template('component-tpl',fields[i]);
 //           	$('.flow_item_edit').append(html);

 //            if(i == fields.length-1){
 //                editForm.initPlug();
 //                editForm.searchFeaturedata();
 //            }
 //        }
		
	// },
	init:function(){
		var _self = this;
		app.navTo('invoice_list');

		_self.getInvoicelist();
	}
}