var area = {
	data: {
		title:'小区',
		page:'area',
		tips:'无小区列表信息',
		createMethod:'/district/create',
		getMethod:'/district/get',
		updateMethod:'/district/update',
		addopt:[
				{
				lab:'基础',
				type:'hr',
			},{
                label:'小区名称',
                name:'name',
                type:'text'
            },{
                label:'省、市、区',
                name:'address_area_id',
          		type:'area-place'
            },{
                label:'详细地址',
                name:'address',
                type:'text'
			},{
	            label:'状态',
	            name:'status',
	            type:'status',
            },{
                lab:'关系',
                type:'hr'
            },{
                label:'员工',
                name:'employees',
                type:'Select-Multiple',
                //datalist:"JSON.parse(localStorage.getItem('employeeList'))"
            },{
                label:'企业',
                name:'merchants',
                type:'Select-Multiple',
                //datalist:"JSON.parse(localStorage.getItem('relevant_merchantList'))"
            }]
	},
	obj:{},
	//获取小区列表
	getLiftlist:function(){
		var _self = this;

		$.each(_self.data.addopt,function(i,n){
			if('value' in n){
				n.value = "";
			}
		})
		_self.obj = {};
		var request = api.getPost('/district/list');

			request.then(function(res){
				console.log(res);
			console.log('getarealist',res.data);
			switch(res.code){
				case 0:
					var area_list = res.data.list;
					if(area_list != null && area_list != undefined && area_list.length != 0 ){
						area_list.page = _self.data.page;
						area_list.title = _self.data.title;
					console.log('area_list',area_list);
					//渲染
			        var html = template('lift_items',area_list);
			        var title = template('lift_title',area_list);
			        var add = template('add',area_list);

			        $('[role=toolbars]').empty().append(add);
			        $('.lift_list').append(html);
			        $('.lift_titles').append(title);
					}else{
						var sign_none = {};
						sign_none.page = _self.data.page;
						sign_none.tips =  _self.data.tips;
						sign_none.title = _self.data.title;
						console.log(sign_none);
				        var title = template('lift_title',sign_none);
				        var add = template('add',sign_none);
				         $('.mdc-list').empty();
				        $('[role=toolbars]').empty().append(add);
				        $('.lift_list').text(sign_none.tips);
				        $('.lift_titles').empty().append(title);

					
					}
					break;
				default:
					app.showSnackbar(res.message);
			}

			
		});
	},
	//获取小区详情
	detail:function(){
		var _self = this;
		app.navTo('list_info');
		var id = location.hash.split('/')[2];
		console.log(id);
		
		
		

	 	if(!$.isEmptyObject(_self.obj)){//data对象存在，直接填充数据，不请求接口
        	console.log('111',_self.obj);
        	var html = template('lift_info',_self.obj);
			$('.lift_info').empty().append(html);

        }else{//无data对象，请求借口获取
        	var arealist = api.getPost(this.data.getMethod,id);
				arealist.then(function(res){
					console.log(res);
			switch(res.code){

				case 0:
					var lift_info = res.data;
					lift_info = JSON.stringify(lift_info);
					localStorage.setItem("area_info",lift_info);
					lift_info = JSON.parse(lift_info);
					console.log('lift_info',lift_info);
					var data = _self.data.addopt;
					//渲染
					var key = '';
					var val = '';
					var objData = {};
					$.each(data,function(i,n){
						$.each(lift_info,function(a,e){
							if(n.name == a){
										console.log(data[i]);
										data[i].value = e;
								}
								if(n.name == "address_area_id"){
									data[i].value = lift_info.address_province + lift_info.address_town + lift_info.address_area;
								}
								// if(n.name == "status"){
								// 	if(data[i].value == "SENABLE"){
								// 		data[i].value = "启用";
								// 	}else{
								// 		data[i].value = "禁用"
								// 	}
									
								// }
								if(a == "relations"){
									if(n.name == "employees"){
										data[i].value = lift_info.relations.employees;
									}
									if(n.name == "merchants"){
										data[i].value = lift_info.relations.merchants;
									}

								}

						})
					})
					objData.title = _self.data.title;
					objData.page = _self.data.page; 
					objData.data = _self.data.addopt;
					objData.item = "edit"
					console.log('objData',objData);
			        var html = template('lift_info',objData);
			        var title = template('info_title',objData);
			        var item = template('sub',objData);

			 
			        $('.mdc-list').empty();
			        $('[role=toolbar]').empty().append(item);
			        $('.lift_info').empty().append(html);
			        $('.info_titles').empty().append(title);

			        //存储电梯数据
			       	_self.obj = objData;
			       	console.log(_self.obj);

			       		var formData = {};
			       		var relations ={};

			       		var employee= [];
			       		var merchant_contact = [];
			       		var address_area_id = '';
					$('.edit').on('click',function(){
							var objData = {};
							$.each($('span[name]'),function(i,n){
									var _name =$(n).attr('name');
									var _val = $(n).text()

									
					
					
							if(_name == "employees"){
										console.log(_self.obj);
									if(_self.obj.hasOwnProperty('relations') == true){
										if(_self.obj.relations.employee_ids == '' || _self.obj.relations.employee_ids == 'undefined'){
											
											$.each(_self.obj.data,function(i,n){
												if(n.name == "employees"){
													$.each(n.value,function(a,e){
														console.log(employee_ids);
														employee.push(e.employee_id);
													})
														relations.employee_ids = employee;
														objData.relations = relations;
												}
											})
										}else{
												var employee_ids = _self.obj.relations.employee_ids;
												console.log(employee_ids);
												relations.employee_ids = employee_ids;
												objData.relations = relations;
										}
									}
										
								}else if(_name == "merchants"){
									if(_self.obj.hasOwnProperty('relations') == true){
										if(_self.obj.relations.merchant_contact_ids == '' || _self.obj.relations.merchant_contact_ids == undefined){
											
											$.each(_self.obj.data,function(i,n){
												if(n.name == "merchants"){
													$.each(n.value,function(a,e){
														merchant_contact.push(e.merchant_contact_id);
													})
														relations.merchant_contact_ids = merchant_contact;
														objData.relations = relations;
												}
											})
										}else{
											var merchant_contact_ids = _self.obj.relations.merchant_contact_ids;
											console.log(merchant_contact_ids);
											relations.merchant_contact_ids = merchant_contact_ids;
											objData.relations = relations;
										}
									}
								}else if(_name == "address_area_id"){
										$.each(_self.obj.data,function(i,n){
											if(n.name == "address_area_id"){
												console.log(n.id);
												objData.address_area_id = n.id;
											}
										})
										
								}else{
									objData[_name] = _val;	
								}
								console.log('objData11111111111111',objData);
							})

							console.log('objData',objData);
							objData.id= id;
							var sub = api.getPost(_self.data.updateMethod,objData);
								sub.then(function(res){
									console.log(res);
								})
								var t = setTimeout(function() {
						            location.hash = "#area";
						       	}, 100);
							return false;
					})
				break;
				default:
					app.showSnackbar(res.message);
			}
		});
	}


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
		console.log(text_field_name);
		//在对象data中获取待修改的值
		i_data.item_data =$("[name="+text_field_name+"]").text();
		i_data.item_text =$("[name="+text_field_name+"]").attr('text');

		i_data.text_field_name = text_field_name;
		//渲染
		var html = template('item_edit',i_data);
		$('.text_edit').empty().append(html);
		
		//监听编辑确定按钮
		var sub_type = location.hash.split('/')[3];
		$('#edit_updata_button').on('click',function(e){
			e.preventDefault();
			if(sub_type == "edit"){
				$.each(_self.obj.data,function(i,n){
				console.log(n);
					if(n.name == text_field_name){
						n.value = $('#'+text_field_name).val();
					}
				})
			}else if(sub_type == "add"){
				var data = {};
				data[text_field_name] = $('#'+text_field_name).val();
				_self.obj.data = $.extend({},data,_self.obj.data);
			}
			
			console.log(_self.obj);
			history.go(-1);
		});
		
	},

	create:function(){
		var _self = this;
		
		console.log('addopt',_self.data.addopt);
		console.log('create');
		app.navTo('list_info');
		var objData = {};
		objData.title = _self.data.title;
		objData.page = _self.data.page; 
		objData.item = "add"

		
		
		objData.data = _self.data.addopt;
		$.each(objData.data,function(i,n){
			//console.log(n);

			for(var keys in _self.obj.data){
				if(n.name == keys){
					n.value = _self.obj.data[keys];
				}
			}
		})
		console.log('objData',objData);
        var html_info = template('lift_info',objData);
        var title_info = template('info_title',objData);
        var item_info = template('sub',objData);

        $('.mdc-list').empty();
        $('[role=toolbar]').empty().append(item_info);
        $('.lift_info').empty().append(html_info);
        $('.info_titles').empty().append(title_info);


			
	$("input[type='checkbox']").change(function(){
		if($(this).is(':checked')){
			status = 'SENABLE'
			$.each(_self.obj.data,function(i,n){
				if(n.name == "status"){
					n.value = status;
				}
			})
		};
	})
      

        $('.add').on('click',function(){
				var formData = {};
				var relations = {};
				var employee = [];
				var merchant_contact = []; 
				var status = '';
				var address_area_id = '';
					$.each(_self.obj.data,function(i,n){
						formData[n.name] = n.value
						if(n.name == "employees"){
							$.each(n.value,function(a,e){
									employee.push(e.employee_id);	
							})
							relations.employee_ids = employee;
							
						}
						if(n.name == "merchants"){
							$.each(n.value,function(a,e){
								merchant_contact.push(e.merchant_contact_id);
							})
							relations.merchant_contact_ids = merchant_contact;
						}
						if(n.name == "address_area_id"){
							address_area_id = n.id;
						}
						if(n.name == "status"){
							if($("input[type='checkbox']").is(':checked')){
								status = 'SENABLE'
							};
						}

					})
					formData.relations = relations;
					formData.status = status;
					formData.address_area_id = address_area_id;
					console.log('formData',formData);

					var sub = api.getPost(_self.data.createMethod,formData);
						sub.then(function(res){
							console.log(res);
						})
								
								//history.back(-1);
							  	var t = setTimeout(function() {
						            location.hash = "#area";
						       	}, 100);
						})
					return false;

			

	},
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
        		i_data.item_text = "企业";
        		$.each(_self.data.addopt,function(i,n){
        			if(n.name == "merchants"){
        				i_data.item_data = n.value; 
        			}
        		})
        		//i_data.item_data = _self.data.relations.merchants;
        		break;
        	case 'employees'://获取关联员工列表
        		i_data.select_items = JSON.parse(localStorage.getItem('employeeList'));
        		//在对象data中获取待修改的值
        		i_data.item_text = "员工";
        		$.each(_self.data.addopt,function(i,n){
        			if(n.name == "employees"){
        				i_data.item_data = n.value; 
        			}
        		})
        		//i_data.item_data = _self.data.relations.employees;
        		break;
        	default:
        }
        console.log('i_data',i_data);
		//渲染
		var html = template('item_edit',i_data);
		$('.select_edit').empty().append(html);

	  	//监听确认提交按钮
	  	var relations = {};
	 	var merchant_contact_ids = [];
	 	var employee_ids = [];
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
			 		//_self.obj.relations.merchant_contact_ids = id_array;
			 		merchant_contact_ids = id_array;
					relations.merchant_contact_ids = merchant_contact_ids;
					_self.obj.relations = relations;  


					$.each(_self.obj.data,function(p,o){
						if(o.name=="merchants"){
							o.value = [];
						}
					})


					var merchant_num =JSON.parse(localStorage.getItem('relevant_merchantList'));
					//var	two = {};
					$.each(merchant_num,function(a,e){
						$.each(id_array,function(i,n){
							console.log(e.id == n);
								if(e.id == n){
									var objem = {
										merchant_contact_id:e.id,
										merchant_contact_name:e.name
									}
									$.each(_self.obj.data,function(p,o){
										if(o.name=="merchants"){
											o.value.push(objem);
											console.log(o.value);
										}
									})
									
								}
						})
					})
					history.go(-1)
			 	break;
			 	case 'employees':
					employee_ids = id_array;
					relations.employee_ids = employee_ids;
					_self.obj.relations = relations;


					$.each(_self.obj.data,function(p,o){
						if(o.name=="employees"){
							o.value = [];
						}
					})


					var employees_num =JSON.parse(localStorage.getItem('employeeList'));
					//var	two = {};
					$.each(employees_num,function(a,e){
						$.each(id_array,function(i,n){
							console.log(e.id == n);
								if(e.id == n){
									var objem = {
										employee_id:e.id,
										employee_name:e.name
									}
									$.each(_self.obj.data,function(p,o){
										if(o.name=="employees"){
											o.value.push(objem);
											console.log(o.value);
										}
									})
									
								}
						})
					})
					
					history.go(-1)
			 	break;
			 }
			 console.log('data',_self.obj);
			
		});
	  	
	},  

	place:function(){
		var _self = this;
			console.log('省市区');
			app.navTo('lift_item_edit');

			var i_data = {};

			i_data.type = 'place';
			var  operate = location.hash.split('/')[3];  //判断是创建还是修改
			console.log(operate);
			
				var text_field_name = location.hash.split('/')[2];

	        	i_data.text_field_name = text_field_name;

	        	if(operate == "edit"){
	        	var area_info = JSON.parse(localStorage.getItem('area_info'));
	 
	        	console.log(area_info);
	        	i_data.area_info = area_info;
	        	var html = template('item_edit',i_data);
				$('.select_edit').empty().append(html);
				
				pcd.init();
				$('#edit_updata_button').on('click',function(){
						var area_id = $('[name=address_area_id] option:selected').val();

						$.each(_self.obj.data,function(i,n){
							if(n.name == "address_area_id"){
								n.value = $('[rel=province] option:selected').text()+$('[rel=city] option:selected').text()+$('[rel=area] option:selected').text();
								
								n.id = area_id;
							}
						})
						history.go(-1);
				})
			}else if(operate == "add"){
			
				var html = template('item_edit',i_data);
				$('.select_edit').empty().append(html);
				pcd.init();
				var data = _self.data.addopt;
				_self.obj.data = data;
				console.log(_self.obj.data);
				
				$('#edit_updata_button').on('click',function(){
						var area_id = $('[name=address_area_id] option:selected').val();
						$.each(_self.obj.data,function(i,n){

							if(n.name == "address_area_id"){
								
								n.id = $('[name=address_area_id] option:selected').val();
								n.value =  $('[rel=province] option:selected').text()+$('[rel=city] option:selected').text()+$('[rel=area] option:selected').text();
							
							}
						})
						history.go(-1);
				})
			
			}
			
	},  	
	//
	init:function(){

		//htmlImport.setItem(config.importFile,'modal_form');
		app.navTo('modal_form');
		this.getLiftlist();
	}
}