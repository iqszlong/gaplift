var notice = {
	noReadcount:0,
	noticeList:'',
	page:'notice',
	data:{
		response_uid:'',//当前回话对象编号
		response_connect:false //当前回话是否是第一次打开
	},
	
	//获取消息列表组
	getList:function(data){
		console.log('getNoticeList',data);
		if(data.groups === undefined){return;}
		var _self = this;

		//会话关系还原
		_self.data.response_uid = '';
		_self.data.response_connect = false;

		_self.updateList(data);
	    _self.setEvent();//事件集合

	},
	updateList:function(data){
		//console.log('N-updateList',data);
		var _self = this;
		var url = location.hash;

		if( url=='#notice'){
			var list = $(document).find('.notice-list');
			if(data != undefined){
				var html = template('notice_item',data);
				list.empty().append(html);
			}else{
				socket.getListdata();
			}
		}
		
	},
	createnotice:function(){
		app.navTo('notice_detail');
	},
	//获取对话双方消息列表
	getDetail:function(data){
		var _self = this;
		var msg_item = $(document).find('.comment-list');
		console.log('getnoticeDetail',data);

		if(data != undefined){
			console.log('1',_self.data.response_uid);
			console.log('2',data.from_user_id);

			if(_self.data.response_uid == data.from_user_id){//当前列表与新获取消息是同一个人所发
				console.log('response_connect',_self.data.response_connect);
				if(_self.data.response_connect){//第一次进入会话列表
					//将消息排序
					if(data.messages){
						data.messages = data.messages.sort(function (a, b) { return new Date(a.create_time).getTime() - new Date(b.create_time).getTime() });
					}
					var html = template('notice_comment_item',data);
					msg_item.empty().append(html);
					_self.data.response_connect = false;

					//消息列表渲染出来之后，将未读消息设置为已读
					if('messages' in data){
						var msgids = [];
						for (var i = 0; i < data.messages.length; i++) {
							if(!data.messages[i].read){
								msgids.push(data.messages[i].id);
							}
						}
						console.log(msgids);
						//标记已读
						socket.setRead(msgids);
					}

					//滚动条默认停在最下面
					_self.for_bottom();
				}else{//是收到新会话
					var funcName1 = location.hash.split('/')[1];//防止系统消息通知出错
					if(funcName1 =='createnotice'){
						var text = data.messages[0].content;
				        str  = '<li class="mdc-list-item send">';
				        str += '<div class="img-box mdc-list-item__start-detail" data-word="{{val.word}}"><div class="inner from_user_avatar" style="background-image: url('+ data.from_user_avatar+')"></div></div>';
				        str += '<div class="notice-detail">';
				        str += '<div class="notice-name"></div>';
				        str += '<div class="notice-comment">'+text+'</div>'
				        str += '</div></li>';

				        $('.mdc-list').append(str);

				        //滚动条默认停在最下面
						_self.for_bottom();

					}else{
						console.log(009990099);
						var funcName = location.hash;
						if(funcName =='#notice'){//刷新当前列表
							socket.getListdata();
						}
					}
				}
				
			}else{//当前列表与新获取消息不是同一个人所发
				//如果用户在消息页面，则刷新消息列表
				console.log(009990099);
				var funcName = location.hash;
				if(funcName =='#notice'){//刷新当前列表
					socket.getListdata();
				}

				
			}
			
		}else{
			socket.getListdata();
		}

		

	},
	sendNotification: function(title, options) {
        // Memoize based on feature detection.
        if ("Notification" in window) {
            sendNotification = function(title, options) {
                return new Notification(title, options);
            };
        } else if ("mozNotification" in navigator) {
            sendNotification = function(title, options) {
                // Gecko < 22
                return navigator.mozNotification
                    .createNotification(title, options.body, options.icon)
                    .show();
            };
        } else {
            sendNotification = function(title, options) {
                alert(title + ": " + options.body);
            };
        }
        return sendNotification(title, options);
    },
    updateRead:function(){
		console.log('updateRead');
		var _self = this;
		var count = $('.top-bar').find('.ulink[href=#notice]>.badge');
			count.text(_self.noReadcount);
		if(_self.noReadcount == 0){
			count.hide();
		}else{
			count.show();
		}
	},
	sendmsg:function(){
        var _self = this;
        var avatar = JSON.parse(localStorage.getItem('login_user')).avatar;

	    var text = $('.mdc-textfield input').val();
	        str  = '<li class="mdc-list-item send my ">';
	        str += '<div class="img-box mdc-list-item__start-detail" data-word="{{val.word}}"><div class="inner from_user_avatar" style="background-image: url('+ avatar +')"></div></div>';
	        str += '<div class="notice-detail">';
	        str += '<div class="notice-name"></div>';
	        str += '<div class="notice-comment">'+text+'</div>'
	        str += '</div></li>';

	        $('.mdc-list').append(str);
	        $('.mdc-textfield input').val('');
	        //$('.write_box input').focus();
	        //autoWidth();
	        _self.for_bottom();

	    var msg_data = {}

	    msg_data.user_id = _self.data.response_uid;
	    msg_data.message_content = text;
	    msg_data.message_type = 'TMSG';

	    socket.sendMsg(msg_data);

	},
	for_bottom:function(){
		var mdc_list_height = $('.comment-list')[0].scrollHeight;
		//console.log(mdc_list_height);
		$('.comment-list').animate({scrollTop:mdc_list_height},500);
	},
	autoWidth:function(){
		$('.question_text').css('max-width',$('.question').width()-60);
	},
	//事件集合
	setEvent:function(){
		var _self = this;

		$('.notice-item').off().on('click',function(e){
			e.preventDefault();
			
			var data ={};
			var event_type = $(this).data('event-type');//事件消息
			var message_type = $(this).data('message-type');//普通消息
			var fuid = $(this).data('from-user-id').toString();
					
			data.user_id = fuid;
			//_self.sameItem(fuid);
			if(message_type != ''){
				data.message_type = message_type;
			}
			if(event_type != ''){
				data.event_type = event_type;
			}
			//信息数目
			data.skip = 0;
			data.size = 50;
			//console.log('data11',data);
			//请求回话详情
			socket.getMsgdata(data);
			//添加跳转链接
		    location.hash = "#notice/createnotice/"+fuid;
		    //设置当前回话用户ID
		    _self.data.response_uid = fuid;
		    //设置当前回话是第一次进入列表
		    _self.data.response_connect = true;
		    console.log('self11',_self);
		});
	},
	init:function(){
		app.checkLogin();
		htmlImport.setItem(config.importFile,'frame');
		//this.getPageAPI();
		htmlImport.setItem(config.importFile,'notice');
		app.nav();
		app.dropmenu();
		//默认赋值,因为第一遍加载不会有值
		socket.sessionid = localStorage.getItem('sessionid');
       	if(!socket.SocketCreated){
           socket.init();
        }else{
           socket.getListdata();
        }
	}
}