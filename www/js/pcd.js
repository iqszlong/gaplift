var pcd = {
	address:'',
	method : '/common/address/area',
	item :'{{each $data val}}<option value="{{val.id}}" {{val.selected}}>{{val.name}}</option>{{/each}}',
	max:'',
	count:0,
	initItem:function(target){
		let _self = this;
		let jdata = {
			"level":1,
			"parent_id":""
		};

		let obj = target.find('select').eq(0);

		_self.max = target.find('select').size();

		target.find('select').each(function(i){
			$(this).data('level',i+1);
		});

        _self.getPost(obj,jdata);
        _self.setEvent(target);
			
		
        
	},
	getPost:function(obj,jdata){
		let _self = this;
		let post = api.getPost(_self.method,jdata);
		let parent = obj.parents('.area-place');
		let setId = parent.data('value');
		post.then(function(res){
			switch(res.code){
				case 0:
					let data = '';
					if(_self.address == '' || _self.address == null){
						data = res.data
						console.log(data);
					}else{
					  	data =_self.setItem(_self.address,obj,res.data);
					}

					if(setId != undefined && setId != '' && _self.count < _self.max){
						let _str = setId.toString();
						let pid = _str.slice(0,2);
						let cid = _str.slice(0,4);

						//console.log(setId,pid,cid);

						for (var i = 0; i < data.length; i++) {
							if(pid == data[i].id || cid == data[i].id || setId == data[i].id){
								data[i].selected = 'selected';
							}
							
						}

						_self.count++;

					}

					let render = template.compile(_self.item);
					let html = render(data);
					obj.empty().append(html);
					obj.trigger('change');
					
				break;

				default: Toastr.error(res.message);
			}
		});
	},
	setItem:function(address,obj,data){
		let _self = this;
		address = JSON.parse(address);
		let _rel = obj.attr('rel');
		let _data = data;
		
			for (prototype in address) {
				if(_rel == prototype){
					let name = address[prototype];
					// console.log(name);
					for (var i = 0; i < _data.length; i++) {
						if(_data[i].name == name){
							_data[i].selected = 'selected';
							if(window['Backend'] != undefined){
								Backend.PCD[prototype] = name;
								Backend.PCD[prototype+'Id'] = _data[i].id;
							}
						}
					}		

					return _data;		
				}
			}
			
			

	},
	setEvent:function(parent){
		let _self = this;
		//let max = parent.find('select').size();
		parent.on('change','select',function(e){
			let obj = $(e.target);
			let _rel = obj.attr('rel');
			let _link = obj.data('link');
            let _target = parent.find('[rel='+_link+']');
            let _level = _target.data('level');


            if(_level <= _self.max){

				let jdata ={};
					jdata.level = _level;
					jdata.parent_id = $(e.target).val();

            	_self.getPost(_target,jdata);
            	
            }
		});
		
	},
	init:function(parent) {
		var _self = this;
		console.log('省市区PCD');
		var target = $('.area-place');
		if(parent != undefined && typeof(parent) == 'object'){
			target = parent.find('.area-place');
		}
		
		if(target.length>=2){
			target.each(function(){
				_self.initItem($(this));
			})
		}else{
			_self.initItem(target);
		}
		
	}
}