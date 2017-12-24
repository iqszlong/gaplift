var routing = {
	nav:'.nav a',
	modalId:'',
	activeClass:'mdc-temporary-drawer--selected',
	docTitle:document.title,
	root:'',
	setNavEvent:function(obj,event){
		var _self = this;
		
		$(obj).on(event,function(e) {
			//e.preventDefault();
			var title = $(this).find('.mdc-tab__icon-text').text();
			//start.onload();
			// var _name = $(this).data('name');
			// _self.setLocation(_name);
			_self.changeTitle(title);
		});
	},

	changeTitle:function(title){
		document.title ='';
		document.title = title +' - '+ this.docTitle;
		$(document.body).find('.catalog-title').text(title);
	},
	backCtrl:function(){
		var _self = this;
		var _target = $(document.body).find('.top-bar .back');
		var _name = location.hash.split('#')[1];

		switch(_name){
			case 'uc_user_info':
			case 'uc_user_phone':
			case 'uc_user_identity':
			case 'uc_user_bank':
			case 'uc_user_address':
			case 'uc_user_company':

				_target.addClass('show');
			break;

			default: _target.removeClass('show');
					// console.log('隐藏返回');
		}

		_target.off().on('click',function(){
			history.go(-1);
		})
	},
	setNavClass:function(name){
		var _self = this;
		$(_self.nav).each(function(){
			var _name = $(this).attr('href').split('#')[1];
			var _title = $(this).find('.mdc-tab__icon-text').text();
			//var _parentObj = $(this).parent();
			if(name == _name){
				$(this).addClass(_self.activeClass).siblings().removeClass(_self.activeClass);
				//_parentObj.addClass(_self.activeClass).siblings().removeClass(_self.activeClass);
				_self.changeTitle(_title);
				
			}
		})
	},
	initLocation:function(){

	},
	setLocation:function(_name){
		var _self = this;
		var _page = location.hash.split('#')[1];
		if( _name == undefined){
			_name = _page;
		}
		if(_name == '' || _name == 'undefined'){
			console.log(_name);
			_self.setLocation('notice');
			return;
		}else{
			location.hash = _name;
			this.setPage(_name);
			this.setNavClass(_name);
		}

	},
	setPage:function(page){

		if(page==undefined){return;}

		var _self = this;
		var _fn = 'init';


		if( page.indexOf('/') > -1){
			var step = page.split('/');
				page = step[0];
				_fn = step[1];

		// 	_id = step[2];
		}


		var _objName = page.replace(/\_(\w)/g, function(all, varter) { return varter.toUpperCase(); })
		
		if (window[_objName]) {
			var _obj = core.evil(_objName);
			_obj[_fn]();
		}else{
			console.error(_objName,'不存在，请检查是否存在该对象');
		}
	},
	removeModal:function(page){
		if(page==undefined){return;}
		var showClass = 'in';
		var	_id = page.replace(/\//g,'-');
		var target = $('.modal-page').last();
		if(target.hasClass(showClass)){
			target.removeClass(showClass);
			var t =setTimeout(function() {
				clearTimeout(t);
				target.remove();
			},300);
		}
	},
	changePage:function(_obj,_name){
		var _self = this;
		_self.oldchange();
		window.addEventListener("hashchange", function(){
			var _page = location.hash.split('#')[1];
			//start.onload();
			_self.setLocation(_page);
			_self.backCtrl();
			_self.removeModal(_page);
			api.session();
		}, false);

	},
	oldchange:function(){
		if ( "onhashchange" in window.document.body ) { return; }

		  var location = window.location,
		    oldURL = location.href,
		    oldHash = location.hash;

		  // 每隔100ms检测一下location.hash是否发生变化
		  setInterval(function() {
		    var newURL = location.href,
		      newHash = location.hash;

		    // 如果hash发生了变化,且绑定了处理函数...
		    if ( newHash != oldHash && typeof window.onhashchange === "function" ) {
		      // execute the handler
		      window.onhashchange({
		        type: "hashchange",
		        oldURL: oldURL,
		        newURL: newURL
		      });

		      oldURL = newURL;
		      oldHash = newHash;
		    }
		  }, 100);
	},
	init:function(){
		//var _self = this;
		//var _link = this.nav;
	
		//this.setNavEvent(_link,'click');
		this.setLocation();
		this.changePage();


	}

}