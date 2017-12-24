var addressbook = {
    getSortData:function(){
        var _self = this;

        //暂无通信录功能,调用企业员工列表
        var getAddressBook = api.getPost('/employee/list');

        getAddressBook.then(function(res){
            //console.log('getLiftlist',res.data);
            switch(res.code){
                case 0:
                    var employee_list = res.data.list;
                    console.log('employee_list',employee_list);
                    //渲染
                    var html = template('employee_list',employee_list);
                    //console.log(html);
                    $('.employee_list').empty().append(html);
                    break;
                default:
                    app.showSnackbar(res.message);
            }

        });

        api.getPost('/workgroup/list',{parent_id:"005"}).then(function(res){
            if(res.code){
                app.showSnackbar(res.message);
            }else{
                return res.data.list;
            }
        }).then(function(data){
            console.log(data);
            var html = template('group_list',data);
            $('.group_list').empty().append(html);
        });



        //阻止选卡切换默认地址栏提交
        $(".addressbook .mdc-tab").on('click',function(e){
            e.preventDefault();

            var index = $(this).index(); //获取被按下按钮的索引值，需要注意index是从0开始的
            $(".panels > div").eq(index).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
        });
    },
    detail:function(){
        app.navTo('addressbook_item');

        //获取员工详细信息
        var employee_id = location.hash.split('/')[2];

        api.getPost('/employee/get',employee_id).then(function(res){
            console.log('employee_info',res.data);
            switch(res.code){
                case 0:
                    var employee_info = res.data;
                    //渲染
                    var html = template('contacts',employee_info);
                    //console.log(html);
                    $('.contacts').empty().append(html);

                    //如果会话连接断开，请求重连
                    if(!socket.SocketCreated){
                        socket.init();
                    }
                    //notice.init();
                    notice.setEvent();
                    break;
                default:
                    app.showSnackbar(res.message);
            }

        });
    },
	init:function(){
        htmlImport.setItem(config.importFile,'frame');
		htmlImport.setItem(config.importFile,'addressbook');
        
        var t =setTimeout(function(){
            addressbook.getSortData();
            app.nav();
            app.dropmenu();
            //初始化选卡切换
            var dynamicTabBar = window.dynamicTabBar = new mdc.tabs.MDCTabBar(document.querySelector('#dynamic-tab-bar'));
        },100);

		

       
	}
}