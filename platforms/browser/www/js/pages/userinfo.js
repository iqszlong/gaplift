var userinfo = {
	getUserinfo:function(){
		var _self = this;
		var request = api.getPost('/user/current');
		var newUser = '';
		var new_merchant_id ;
		var new_service_id ;

        request.then(function(res){
            switch(res.code){
            	case 0:
            	    newUser = res.data.user;
            	    //获取用户所属企业的服务列表
            	    newUser.merchant_service_list = JSON.parse(localStorage.getItem('merchant_service_list'));
            	    //获取当前系统企业与服务ID
            	    newUser.app_merchant_id = localStorage.getItem('app_merchant_id');
            	    console.log('newUser',newUser);

	                var loginUser = localStorage.getItem('login_user');
	                if(JSON.stringify(newUser) != loginUser){
		                localStorage.setItem('login_user',JSON.stringify(newUser));
		 			}
            	    break;
            	default: 
            		app.showSnackbar(res.message);
            }
             //渲染
            var html = template('user', newUser);
            document.getElementById('content1').innerHTML = html;

            
        });

        //退出
        $('body').on('click','.loginout',function(e){
        	e.preventDefault();
        	localStorage.clear();
            app.navTo('user_login');
        });
        //服务与企业ID切换
        $('body').on('click','.change',function(e){
        	new_merchant_id = $(this).data('merchant-id');
        	new_service_id = $(this).data('service-id');
        	new_service_name = '';

        	if(new_service_id=='001'){
        		new_service_name = '物业管理系统';
        	}else{
        		new_service_name = '维保管理系统';
        	}
        	var new_merchant_name = $(this).data('merchant-name');

        	var dialog = new mdc.dialog.MDCDialog(document.querySelector('#my-mdc-dialog'));
        	$('.mdc-dialog__body').html(new_merchant_name +'--'+ new_service_name);
        	dialog.show();
        });
        //确定切换
        $('body').on('click','.mdc-dialog__footer__button--accept',function(e){
        	e.preventDefault();

        	localStorage.setItem('app_merchant_id',new_merchant_id);
        	localStorage.setItem('app_service_id',new_service_id);

        	userinfo.init();
        });
        
	},
	avatar:function(){
        app.navTo('edit_avatar');
        htmlImport.setItem(config.importFile,'msg_snackbar');
        this.setUpload();
        //编辑头像之前的初始值
        var info = JSON.parse(localStorage.getItem('login_user'));
        var tpl = htmlImport.tpl['edit_avatar'];
        var html  = template.render(tpl,info);
        console.log(html);

        $('#edit_avatar_form').submit(function(e){
        	e.preventDefault();

        	var objData ={};
			$.map($(this).serializeArray(), function(item, index) {
                _name = item['name'];
                objData[_name] = $('[name=' + item['name'] + ']').val();
               
            });
            console.log(objData);   
			var base = api.getPost("/user/base/update",objData);
			 	base.then(function(res){
			 		console.log(res);
			 		 switch(res.code){
			 		 	case 0:
			 		 	  	app.showSnackbar('编辑成功');
			 		 	  	//更新浏览器缓存用户信息
	                  //    var _t = setTimeout(function(){
		              //                clearTimeout(_t);
		              //                window.history.back(-1);
	                  //             },1500);
			 		 	break;
			 		 }
			 	});
        });
	},
	//初始化上传头像控件
	setUpload:function(){
		$("#img-avatar").IMGUploader({
	        trigger_btn_id:"avatar",
	        img_label:'请选择照片',
	        img_limit : false,
	        img_width: '100%',
	        img_height:'100%'
	    });
	},
	init:function(){
		htmlImport.setItem(config.importFile,'frame');
		app.nav();
		app.dropmenu();
		
		htmlImport.setItem(config.importFile,'userinfo');
		this.getUserinfo();
	}
}