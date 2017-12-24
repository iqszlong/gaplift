var lift = {
	data:{},
	tips:'无电梯列表信息',
	elements:{
			registration_code:"注册代码",
			serial_number:"出厂编号",
			internal_number:"单位内部编号",
			code:"编号",
			building_level:"层数",
			level:"站数",
			category:"类型",
			brand:"品牌",
			vendor:"厂家",
			load:"载重量",
			speed:"出厂速度",
			district_id:"小区",
			relations:{
				merchants:"企业",
				employees:"员工"
			}

	},
	//获取电梯列表
	getLiftlist:function(){
		var _self = this;
		htmlImport.setItem(config.importFile,'msg_snackbar');
		_self.data = {};
		var request = api.getPost('/lift/list');


		request.then(function(res){
			//console.log('getLiftlist',res.data);
			switch(res.code){
				case 0:
					var lift_list = res.data.list;
				if(lift_list != null && lift_list != undefined && lift_list.length != 0 ){
					console.log('lift_list',lift_list);
					//渲染
			        var html = template('lift_items',lift_list);
			        //console.log(html);
			        $('.lift_list').empty().append(html);
			    }else{
					$('.lift_list').text(_self.tips);
			    }
			    break;
				default:
					app.showSnackbar(res.message);
			}	
		});
	},
	//获取电梯详情
	detail:function(){
		var _self = this;
		app.navTo('lift_item');

		var lift_id = location.hash.split('/')[2];

        if(_self.data.id){//data对象存在，直接填充数据，不请求接口
        	//console.log('111',_self.data);
        	var html = template('lift_info',_self.data);
			$('.lift_info').empty().append(html);

        }else{//无data对象，请求接口获取

        	var request = api.getPost('/lift/get',lift_id);
			request.then(function(res){
				console.log('getLiftinfo',res.data);
				switch(res.code){
					case 0:
						var lift_info = res.data;
						console.log('lift_info',lift_info);
					    //lift_info.category = _self.category[lift_info.category];
						//渲染
				        var html = template('lift_info',lift_info);
				        //console.log(html);
				        $('.lift_info').empty().append(html);
				        //存储电梯数据
				        _self.data = lift_info;
				        //扩展电梯数据(关联企业，关联小区)，方便提交存储
				        if(_self.data.relations.employees.length >0){
							var employee_array = new Array();  
							for(var i=0;i<_self.data.relations.employees.length;i++){  
							    employee_array.push(_self.data.relations.employees[i].employee_id);//向数组中添加元素
							};
							_self.data.relations.employee_ids = employee_array;
				        }

				        if(_self.data.relations.merchants.length >0){
				        	var merchant_array = new Array();
				        	for(var i=0;i<_self.data.relations.merchants.length;i++){
							    merchant_array.push(_self.data.relations.merchants[i].merchant_contact_id);//向数组中添加元素  
							};
							_self.data.relations.merchant_contact_ids = merchant_array;
				        }
				        console.log('selfdata',_self.data);
						break;
					default:
						app.showSnackbar(res.message);
				}
			});
        }

   
        //监听电梯提交编辑按钮
        $('.save_lift').on('click',function(e){
        	e.preventDefault();
        	console.log(_self.data);
        	var request = api.getPost('/lift/update',_self.data);
				request.then(function(res){
					//console.log('getLiftinfo',res.data);
					switch(res.code){
						case 0:
					        //清除对象数组data
					        //_self.data = {};
					        //location.hash = "#lift";
					        app.showSnackbar("保存成功!");
							break;
						default:
							app.showSnackbar(res.message);
					}
			});
        });
	},
	//添加电梯
	add:function(){
	  	var _self = this;
	  	app.navTo('lift_add');
	  	//渲染
      	var html = template('lift_add',_self.data);
      	var new_data = {
      		"registration_code":"",
    		"serial_number":"",
    		"internal_number":"",
    		"code":"",
    		"name":"",
    		"district_id":"",
    		"category":"",
    		"brand":"",
    		"vendor":"",
    		"load":"",
    		"speed":"",
    		"building_level":"",
    		"level":"",
   			"address_area_id":"",
    		"address":"",
    		"operating_status":"",
    		"relations":{}
      	};
      	//console.log(html);
     	$('.lift_add').empty().append(html);

      	//监听电梯提交编辑按钮
	    $('.save_add_lift').off().on('click',function(e){
	    	e.preventDefault();
	    	var add_data = $.extend(new_data,_self.data);
	    	add_data.name = add_data.code;

	    	console.log(123456789);

	    	if( add_data.name==''){
				app.showSnackbar("创建电梯编号不能为空!");
				return;  
	    	}

	    	var request = api.getPost('/lift/create',add_data);
				request.then(function(res){
					//console.log('getLiftinfo',res.data);
					switch(res.code){
						case 0:
					        //清除对象数组data
					        //_self.data = {};
					        //location.hash = "#lift";
					        app.showSnackbar(_self.data.code+"创建成功!");  
							break;
						default:
							app.showSnackbar(res.message);
					}
			});
	    });
	  

	},
	//文本编辑-对象存储，不提交
	editText:function(){
		var _self = this;
		var i_data = {};
		app.navTo('lift_item_edit');
		//字段编辑类型
		i_data.type = 'Text';
		//获取要处理字段的名字
		var text_field_name = location.hash.split('/')[2];
		//在对象data中获取待修改的值
		i_data.item_data = _self.data[text_field_name];
		i_data.item_text = _self.elements[text_field_name];
		i_data.text_field_name = text_field_name;
		//渲染
		var html = template('item_edit',i_data);
		$('.text_edit').empty().append(html);

		//监听编辑确定按钮
		$('#edit_updata_button').on('click',function(e){
			e.preventDefault();

			_self.data[text_field_name] = $('#'+text_field_name).val();
			//console.log(_self.data[text_field_name]);
			history.go(-1);

		});
		
	},
	//数字编辑-对象存储，不提交
	editNum:function(){
		var _self = this;
		var i_data = {};
		app.navTo('lift_item_edit');
		i_data.type = 'Text';
		var text_field_name = location.hash.split('/')[2];
		//var 
		//在对象data中获取待修改的值
		i_data.item_data = _self.data[text_field_name];
		i_data.item_text = _self.elements[text_field_name];
		i_data.text_field_name = text_field_name;
		//渲染
		var html = template('item_edit',i_data);
		$('.text_edit').empty().append(html);

		//监听编辑确定按钮

		$('#edit_updata_button').on('click',function(e){
			e.preventDefault();

			_self.data[text_field_name] = $('#'+text_field_name).val();
	
			history.go(-1);
		});
	},
	//时间编辑-对象存储，不提交
	editData:function(){
		var _self = this;
		app.navTo('lift_item_edit');
	},
	//下拉框编辑-对象存储，不提交
	editSelect:function(){
		var _self = this;
		var i_data = {};
		app.navTo('lift_item_edit');
		//字段编辑类型
		i_data.type = 'Select';
		//获取要处理字段的名字
		var text_field_name = location.hash.split('/')[2];
		//在对象data中获取待修改的值
        i_data.item_text = _self.elements[text_field_name];
        i_data.item_data = _self.data[text_field_name];
        i_data.text_field_name = text_field_name;

        switch(text_field_name){
        	case 'category'://类型
        		i_data.select_items = JSON.parse(localStorage.getItem('lift_category'));
        		break;
        	case 'operating_status'://运行状态
        		i_data.select_items = [{
									  "id": "TOK",
									  "name": "正常"
									}, {
									  "id": "TMODIFY",
									  "name": "维修状态"
									},{
									  "id": "TMAINTAIN",
									  "name": "保养状态"
									}];
				break;
			case 'district_id'://所属小区
				i_data.select_items = JSON.parse(localStorage.getItem('district'));
        	default:
        }

        console.log('i_data',i_data);
		//渲染
		var html = template('item_edit',i_data);
		$('.select_edit').empty().append(html);

	  	//监听确认提交按钮
	  	$('#edit_updata_button').on('click',function(e){
			e.preventDefault();
			//获取radio的文本内容
			var item = $('input[name='+text_field_name+']:checked').val(); 
			//console.log('item',item);  
			_self.data[text_field_name] = item;
			if(text_field_name == 'district_id'){//获取修改小区的名字

				var item_name = $('input[name='+text_field_name+']:checked').parent().next().html();
				_self.data['district_name'] = item_name;
			}
			history.go(-1);
		});
	  	
	},
	//下拉多选框编辑-对象存储，并且提交
	editSelectMul:function(){
		var _self = this;
		var i_data = {};
		app.navTo('lift_item_edit');
		//字段编辑类型
		i_data.type = 'Select-Multiple';
		//获取要处理字段的名字
		var text_field_name = location.hash.split('/')[2];
		
        i_data.text_field_name = text_field_name;

        switch(text_field_name){
        	case 'merchants'://获取关联企业列表
        		i_data.select_items = JSON.parse(localStorage.getItem('relevant_merchantList'));
        		//在对象data中获取待修改的值
        		i_data.item_text = _self.elements.relations[text_field_name];
        		i_data.item_data = _self.data.relations.merchants;
        		break;
        	case 'employees'://获取关联员工列表
        		i_data.select_items = JSON.parse(localStorage.getItem('employeeList'));
        		//在对象data中获取待修改的值
        		i_data.item_text = _self.elements.relations[text_field_name];
        		i_data.item_data = _self.data.relations.employees;
        		break;
        	default:
        }
        console.log('i_data',i_data);
		//渲染
		var html = template('item_edit',i_data);
		$('.select_edit').empty().append(html);

	  	//监听确认提交按钮
	  	$('#edit_updata_button').on('click',function(e){
			e.preventDefault();
			
			//获取多选框的值，组成用逗号隔开的字符串
			 var id_array = new Array();  
			 $('input[name="'+ text_field_name +'"]:checked').each(function(){  
			    id_array.push($(this).val());//向数组中添加元素  
			 });  
			 //var idstr=id_array.join(',');//将数组元素连接起来以构建一个字符串 
			 //console.log(idstr);
			 switch(text_field_name){
			 	case 'merchants':
			 		_self.data.relations.merchant_contact_ids = id_array;
			 		break;
			 	case 'employees':
					_self.data.relations.employee_ids = id_array;
			 		break;
			 }
			 console.log('data',_self.data);
			 //提交接口进行直接修改
			 var request = api.getPost('/lift/update',_self.data);
				 request.then(function(res){
					//console.log('getLiftinfo',res.data);
					switch(res.code){
						case 0:
					        //清除对象数组data
					        _self.data = {};
					        history.go(-1);
							break;
						default:
							app.showSnackbar(res.message);
					}
				});
			 
			 //history.go(-1);
		});
	  	
	},    
	//初始化
	init:function(){
		app.navTo('lift_list');
		this.getLiftlist();

	}
}