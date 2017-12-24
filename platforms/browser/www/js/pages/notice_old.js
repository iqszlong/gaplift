var notice = {
	noReadcount:0,
	noticeList:'',
	page:'notice',
	// getPageAPI:function(){
	// 	var _self = this;
	// 	var api = config.apiip + 'public/notice.json';
	// 	var getNotice = Promise.resolve($.get(api));

	// 	getNotice.then(function(data){
	// 		data = JSON.parse(data);
	// 		var listdata = data.content;
	// 		_self.noReadcount = data.noreads;
	// 		var name = 'notice_item';
	// 		var itemTpl ='';

	// 		for (var i in listdata) {
	// 			// data[i]
	// 			// var pageData = listdata[i];
	// 			// 	pageData.word = pageData.name.split("")[0];

	// 			listdata[i].word = listdata[i].name.split("")[0];
	// 			// console.log(pageData);
	// 			// var	_tpl = htmlImport.tpl[name] === undefined ? localStorage.getItem(name): htmlImport.tpl[name];
	// 			// 	itemTpl += _self.changeTplVal(pageData,_tpl);
	// 		}

	// 		itemTpl = template(name, listdata);
			
	// 		_self.noticeList = itemTpl;

	// 		// console.log(itemTpl);
			
	// 	}).then(function(){
	// 		// var name = 'notice';
	// 		// var _title = '消息(<span>'+ _self.noReadcount +'</span>)';
	// 		// if($(document).find('.fixed-win.notice').length == 0){
	// 		// 	win.add(name,_title,_self.noticeList);
	// 		// 	// commonBar.setTpl('common');
	// 		// 	_self.updateAPI();
	// 		// }else{
	// 		// 	_self.updateAPI();
	// 		// }
	// 		// 
	// 		_self.updateAPI();
	// 		mdc.autoInit(document,function(){});
	// 	})
	// },
	getList:function(data){//获取消息列表
		console.log('getList',data);
		if(data.groups === undefined){return;}
		var _self = this;

		_self.updateList(data);
	  //_self.setEvent();

	},
	updateList:function(data){
		console.log('updateList',data);
		var _self = this;
		var list = $(document).find('.notice-list');
		if(data != undefined){
			var html = template('notice_item',data);
			list.empty().append(html);
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

	// updateAPI:function(){
	// 	var _self = this;
	// 	//var count = $(document).find('.ulink[href=#notice]>.badge');
	// 	//var titleCount = $(document).find('.notice>.title>span');
	// 	var list = $(document).find('.notice-list');
	// 		//count.text(_self.noReadcount);
	// 		//titleCount.text(_self.noReadcount);
		
	// 		list.empty().append(_self.noticeList);
	// 	// if(_self.noReadcount == 0){
	// 	// 	count.hide();
	// 	// }else{
	// 	// 	count.show();
	// 	// }
	// 	// console.log(list);
	// },
	// changeTplVal:function(obj,tpl){
	// 	for(property in obj){
	// 		 // console.log(property);
	// 		 var _rex =  new RegExp("{" + property + "}", "gi");
	// 		 tpl = tpl.replace(_rex,obj[property]);
	// 	}
	// 	return tpl;
	// },
	detail:function(){
		var _self = this;

		var name ='notice_comment_item';
		app.navTo('notice_detail');
	},
	// sendmsg:function(){
 //        var _self = this;
	//     var text = $('.mdc-textfield input').val();
	//         str  = '<li class="mdc-list-item send my ">';
	//         str += '<div class="img-box mdc-list-item__start-detail" data-word="{{val.word}}"><div class="inner" style="background-image: url()"></div></div>';
	//         str += '<div class="notice-detail">';
	//         str += '<div class="notice-name">{{val.name}}</div>';
	//         str += '<div class="notice-comment">'+text+'</div>'
	//         str += '</div></li>';

	//         $('.mdc-list').append(str);
	//         $('.mdc-textfield input').val('');
	//         //$('.write_box input').focus();
	//         //autoWidth();
	//         _self.for_bottom();
	//         setTimeout(function(){
	//             var ans  = '<div class="answer"><div class="heard_img left"><img src="images/dglvyou.jpg"/></div>';
	//             	ans += '<div class="answer_text"><p>您发送的文字是：'+text+'</p><i></i>';
	//         		ans += '</div></div>';
	//         	$('.speak_box').append(ans);
	// 			_self.for_bottom();
	//         },1000);

	// },
	// for_bottom:function(){
	// 	var speak_height = $('.mdc-list').height();
	// 	//console.log(speak_height);
	// 	$('.mdc-list,.comment-list').animate({scrollTop:speak_height},500);
	// },
	// autoWidth:function(){
	// 	$('.question_text').css('max-width',$('.question').width()-60);
	// },
	init:function(){
		app.checkLogin();
		htmlImport.setItem(config.importFile,'frame');
		//this.getPageAPI();
		htmlImport.setItem(config.importFile,'notice');
		app.nav();
		app.dropmenu();

		socket.init();
	}
}