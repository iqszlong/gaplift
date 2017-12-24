var user = {
	countdown:60,
	login:function(){
        var _self = this;
        htmlImport.setItem(config.importFile,'user_login');
        htmlImport.setItem(config.importFile,'msg_snackbar');
        setTimeout(function(){
            mdc.autoInit(document,function(){});
            _self.loginSubmit();
        },100);
        
	},
	register:function(){
        app.navTo('user_register');
        this.regSubmit();
	},
    regSubmit:function(){
    	$('#register-form').submit(function(e){
    		e.preventDefault();
	        var _self = this;
	        var regData = {}
	        regData['captcha'] = $('#register-form [name=captcha]').val();
	        regData['password'] = $('#register-form [name=password]').val();

	        var regRequest = api.getPost('/user/register',regData);
            console.log(regData);
	        regRequest.then(function(res){
	            console.log(res);
	            switch(res.data){
	                case true:
	                    app.showSnackbar('注册成功!返回登录界面');
	                    var _t = setTimeout(function(){
	                         clearTimeout(_t);
	                         location.hash = 'user/login';
	                    },3000);
	                break;
	            };
	            switch(res.code){
                    case 10003:
                       app.showSnackbar('未知错误,请您重新注册！');
	                case 10106:
	                   app.showSnackbar('验证码验证失败');
	                   // var _t = setTimeout(function(){
	                   //       clearTimeout(_t);
	                   //       _self.jumpPage('pages/sign_up.html');
	                   //  },3000);
	                   break;
	            }
	        });  
    	    
    	})
  
    },
    loginSubmit:function(){

    	$('#login-form').submit(function(e){
    		e.preventDefault();

    		var _self = this;
            var logData ={};
                logData['phone'] = $('#login-form [name=phone]').val();
                logData['password'] = $('#login-form [name = password]').val();

            var loginRequest = api.getPost('/user/login',logData);

	        loginRequest.then(function(res){
	            switch(res.code){
    	            case 0 :
    		              app.showSnackbar('登录成功！');
    		              var old_userinfo = localStorage.getItem('login_user');
    		              var new_userinfo = JSON.stringify(res.data.user);
    		              if(old_userinfo === null){
    		                  localStorage.setItem('login_user',new_userinfo);
    		              }
    		              location.hash = 'notice';
    		              //获取用户企业+服务ID信息
                          var param = {'is_app':true};
                          api.getPost('/user/merchant/list',param).then(function(res){
                            console.log('res.code11111',res.data);
                              if(res.code == 0 && res.data.total >= 1){
                                //保存员工所在企业及其服务列表
                                var merchant_service_list = localStorage.setItem('merchant_service_list',JSON.stringify(res.data.list));
                                
                                //找到第一家已开通服务的企业
                                var app_service_id;
                                var app_merchant_id;
                                for(var i=0;i<res.data.total;i++){
                                    //判断企业是否开通服务
                                    if(res.data.list[i].services){
                                        app_merchant_id = res.data.list[i].id;//企业ID
                                        app_service_id = res.data.list[i].services[0].id;//服务ID
                                        
                                        localStorage.setItem('app_service_id',app_service_id);
                                        localStorage.setItem('app_merchant_id',app_merchant_id);
                                        app.getApi();
                                        break;
                                    };
                                }
                              }else{
                                app.showSnackbar('您未属于任何公司或所在公司未创建服务！');
                              }

                          });
                          
    		              break;
    	            case 10103 : 
    	                  app.showSnackbar('用户不存在或密码错误!'); 
    	                  break;
    	            case 10003 : 
    	                  app.showSnackbar('用户不存在,请检查是否输入有误！');
    	                  break;
    	            default: app.showSnackbar('状态码不明');
	         }
	        });

    	})
        
    },
	sendSms:function(obj){
        var _self = this;
        var _phone = $('#register-form [name=phone]').val();
        
        //console.log(/^1[34578]\d{9}$/.test(_phone));

        if(_phone.length == 0 || !/^1[34578]\d{9}$/.test(_phone)){
           app.showSnackbar('请您先填写正确的手机号！');
           return ;
        }

        _self.settime(obj);

        var registerRequest = api.getPost('/user/register/request',_phone);

        registerRequest.then(function(res){
            console.log(res);
              switch(res.code){
                case 0:
                  app.showSnackbar('验证码：'+res.data);
                  break;
                case 10105: 
                  app.showSnackbar('手机号已经注册过,去登录吧！');
                  break;
            }
        })
    },
    settime:function(obj){
        var _self = this;
        if (_self.countdown == 0) { 
            obj.removeAttribute("disabled");
            $(obj).val("免费获取验证码");
            _self.countdown = 60;
            clearTimeout(t);
        } else { 
            obj.setAttribute("disabled", true);
            $(obj).val("重新发送(" + _self.countdown + ")");
            _self.countdown--; 

            var t = setTimeout(function() { _self.settime(obj) },1000);
        } 
    },
    checkPasswords:function(){
        var pass1 = $("#register-form #password")[0];
        var pass2 = $("#register-form #confirm_password")[0];
        //console.log(pass1.value,pass2.value);
        if(pass1.value != pass2.value){
           pass2.setCustomValidity('两次输入的密码不匹配');
        }else{
           pass2.setCustomValidity('');
        }
    },
	init:function(){
		//htmlImport.setItem(config.importFile,'user_login');
		//mdc.autoInit();
	}
}