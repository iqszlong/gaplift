//流程(工单)模块总控制器
var flow = {
	flow_step_list:{},
	flow_id :'',
	tips:'无工单列表信息',
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
					if(flow_list != null && flow_list != undefined && flow_list.length != 0 ){
						console.log('flow_list',flow_list);
					//渲染
			        var html = template('flow_items',flow_list);
			        //console.log(html);
			        $('.flow_list').empty().append(html);
			    }else{
			    	 $('.flow_list').text(_self.tips);
			    }
					
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
					console.log('length',res.data.steps.length);
					//处理每个单步的数据
					for(var i=0;i<res.data.steps.length;i++){
							var step = res.data.steps[i];
				            var length = res.data.steps.length;
				            step.data = {
				                headers:step.headers,
				                footers:step.footers,
				                fields:step.fields
				            }
				            //steps[i]
				            var obj = {};
				            	obj.fields = step.fields;
				                // editForm.redata(obj.side);//console.log(obj);
				                obj.id = step.id;
				                obj.index = step.index;
				                obj.form_name = step.form_name;
				                obj.opt = step.flow_step_opt;
				                obj.is_notification = step.is_notification;
				                obj.job_status = step.job_status;
				            if(obj.opt == "COMMIT"){
				                obj.opt_name = "提交";
				            }else{
				                obj.opt_name = "审核";
				            }


				            
				            obj.fields = editForm.redata(obj.fields);
				            
				            for (var k = 0; k < obj.fields.length; k++) {
				            	editForm.chosenClassfiy(obj.fields[k]);
				            }


				            console.log('obj',obj);
				            _self.flow_step_list['step'+i]=obj;

				            // editForm.data.side = flow.data.sideGroup[ing_index];
				            // editForm.sideComponent(obj.side);
				            

					}

					console.log('flow_step_list',_self.flow_step_list);
					//渲染
			        var html = template('flow_item',res.data);
			        //console.log(html);
			        $('.flow_item').empty().append(html);
					break;
				default:
					app.showSnackbar(res.message);
			}
		});

        //查看权限控制
         $('body').on('click','.flow_step_disable',function(e){
             e.preventDefault();
             //弹窗
            var dialog = new mdc.dialog.MDCDialog(document.querySelector('#my-mdc-dialog'));
            dialog.show();

        });
	},
	//工单步骤详情
	stepdetail:function(){
		var _self = this;
		var now_flow_id = location.hash.split('/')[2];
		var now_step = location.hash.split('/')[3];

		app.navTo('flow_item_edit');
		console.log('now_step_data',_self.flow_step_list[now_step]);

        //渲染功能
        var opt = _self.flow_step_list[now_step];
        if(now_step=="step0"){
            opt.opt = '';//stop0 操作属性去掉
        }
        var opt_html = template('flow_item_toolbar',opt);
        //console.log(html);
        $('.flow_item_toolbar').empty().append(opt_html);

		//渲染数据
        var item_edit_html = htmlImport.tpl.flow_art_tpl;
        //console.log(html);
        $('.flow_item_edit').empty().append(item_edit_html);
        var fields = _self.flow_step_list[now_step].fields;
        for (var i = 0; i < fields.length; i++) {
           	var html = template('component-tpl',fields[i]);
           	$('.flow_item_edit').append(html);

            if(i == fields.length-1){
                editForm.initPlug();
                editForm.searchFeaturedata();
            }
        }

        //提交编辑
        $('body').on('click','.save_flow_step',function(e){
            e.preventDefault();
            var param = {step:{}};

            //流程id
            param.id = now_flow_id;
            param.opt = opt.opt;
            param.step.id = opt.id;
            //param.step.is_notification = true;
            
            var step_values =[];
            $('.component-html').each(function(){
                var step_value = {values:[]};
                //控件编号
                step_value.field_id = $(this).data('item').id;
                $(this).find('.form-inner').each(function(){

                    var item_obj = $(this).serializeObject();
                    step_value.values.push(item_obj);
                    //console.log('item_obj',item_obj);
                });
                step_values.push(step_value);
            });

            param.step.step_values = step_values;
            console.log('param',param);

            //提交接口保存该步骤
            var request = api.getPost('/workflow/job/update',param);
            request.then(function(res){
                console.log('flow_step_edit',res);
                switch(res.code){
                    case 0:
                        app.showSnackbar('编辑成功!');
                        break;
                    default:
                        app.showSnackbar(res.message);
                }
            });
        });
        
        //审核编辑
        $('body').on('click','.check_flow_step',function(e){
            e.preventDefault();
             //弹窗
            var dialog = new mdc.dialog.MDCDialog(document.querySelector('#my-mdc-dialog1'));
            dialog.show();
        });

        //审核通过
        $('body').on('click','.check_approve',function(e){
            e.preventDefault();
            
            var param = {step:{}};
            //流程id
            param.id = now_flow_id;
            param.opt = 'AUDIT-PASS';
            param.step.id = opt.id;
            //param.step.is_notification = true;
            param.step.opt_remark = $('#opt_remark').val();

            console.log('param',param);
            //提交接口保存该步骤
            var request = api.getPost('/workflow/job/update',param);
            request.then(function(res){
                console.log('flow_step_edit',res);
                switch(res.code){
                    case 0:
                        app.showSnackbar('审核通过!');
                        break;
                    default:
                        app.showSnackbar(res.message);
                }
            });
            
        });
        
        //审核不通过
       $('body').on('click','.check_no_pass',function(e){
            e.preventDefault();
            //弹窗
            
            var param = {step:{}};
            //流程id
            param.id = now_flow_id;
            param.opt = 'AUDIT-FAIL';
            param.step.id = opt.id;
            //param.step.is_notification = true;
            console.log($('#opt_remark'));
            param.step.opt_remark = $('#opt_remark').val();

            console.log('param',param);
            //提交接口保存该步骤
            var request = api.getPost('/workflow/job/update',param);
            request.then(function(res){
                console.log('flow_step_edit',res);
                switch(res.code){
                    case 0:
                        app.showSnackbar('审核驳回!');
                        break;
                    default:
                        app.showSnackbar(res.message);
                }
            });
            
        });
	},
	editForm:function(){
        var _self = this;
        var optData = $.fn.bootstrapTable.defaults.extend.editopt;
        var merchantList = localStorage.getItem('relevant_merchantList');
        var steps = optData.data.steps;
        var ing_index = optData.data.ing_index;
        editForm.setA4();

        for (var i = 0; i < steps.length; i++) {
            var step = steps[i];
            var length = steps.length;
            step.data = {
                headers:step.headers,
                footers:step.footers,
                fields:step.fields
            }
            //steps[i]
            var obj = invoiceTpl.rePagedata(step);
                editForm.redata(obj.side);//console.log(obj);
                obj.id = step.id;
                obj.index = step.index;
                obj.form_name = step.form_name;
                obj.opt = step.flow_step_opt;
                obj.is_notification = step.is_notification;
                obj.job_status = step.job_status;
                obj.merchant_list = JSON.parse(merchantList);
            if(obj.opt == "COMMIT"){
                obj.opt_name = "提交";
            }else{
                obj.opt_name = "审核";
            }
                // console.log('obj',obj);
            editForm.data.side = flow.data.sideGroup[ing_index];
            editForm.sideComponent(obj.side);
            if(i != 0){
                editForm.setgroup(obj);
            }else{
                editForm.setRows(obj);
            }
            
            if(i == length-1){
                
                editForm.initPlug();
                editForm.multiple();
                editForm.searchFeaturedata();


            }
        }
        
    },
    rePagedata:function(optData){
        var header = optData.data.headers;
        var footer = optData.data.footers;
        var field = optData.data.fields;

        var pageData = {
            side:[],
            header:[],
            footer:[],
            field:[]
        };


        if(header !== null){
            for (var i = 0; i < header.length; i++) {
                header[i].top = 1;
                
            }
            pageData['header'] = header;
            pageData.side = pageData.side.concat(header);
        }else{
            pageData['header'] = 0;
        }
        if(footer !== null){
            for (var i = 0; i < footer.length; i++) {
                footer[i].bottom = 1;
            }
            pageData['footer'] = footer;
            pageData.side = pageData.side.concat(footer);
        }else{
            pageData['footer'] = 0;
        }

        

        if(field != null){
            var _flag = 0;
            var _pageRow = [];
            for (var i = 0; i < field.length; i++) {
                var k = i + 1 < field.length ? i+1 : 0;
                //console.log(_flag);

                if(_flag){
                    _pageRow.push(field[i]);
                }

                if(field[i].row == field[k].row){
                    
                    _flag = 1;
                    _pageRow.push(field[i]);
                }else{
                    if(_pageRow.length > 0){
                        //console.log('pushRow');
                        pageData['field'].push(_pageRow);
                    }
                    if(!_flag){
                       //console.log('pushItem');
                        pageData['field'].push([field[i]]);
                    }
                    _flag = 0;
                    _pageRow =[];

                }
                
            }

            if(_pageRow.length > 0){
                pageData['field'].push(_pageRow);
                _pageRow =[];
            }

            // console.log('_pageRow',_pageRow);
            
            pageData.side = pageData.side.concat(field);

        }

        console.log('pageData',pageData);

        return pageData;
        
    },  

	init:function(){
		var _self = this;
		app.navTo('flow_list');

		_self.getFlowlist();
	}
}