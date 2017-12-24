var sign = {
	data: {
		title:'签到',
		page:'sign',
		createMethod:'/checkin/record/create',
		getMethod:'/checkin/record/get',
		addopt:[
				{
				label:'员工',
				name:'template_id',
				type:'employee',
			},{
                label:'签到地址',
                name:'address',
                type:'text'
            },{
                label:'小区',
                name:'district_name',
          		type:'area-place'
            }]
	},
	obj:{},
	//获取签到列表
	getLiftlist:function(){
		var _self = this;
		
		$.each(_self.data.addopt,function(i,n){
			if('value' in n){
				n.value = "";
			}
		})
		_self.obj = {};
		var signData = {};
		signData.is_app = true;
		var request = api.getPost('/checkin/template/list',signData);

			request.then(function(res){
				console.log(res);
			console.log('getarealist',res.data);
			switch(res.code){
				case 0:
					var area_list = res.data.list;
						area_list.page = _self.data.page;
						area_list.title = _self.data.title;
					console.log('area_list',area_list);
					//渲染
			        var html = template('lift_items',area_list);
			        var title = template('lift_title',area_list);
			        var add = template('add',area_list);
			         $('.mdc-list').empty();
			        $('[role=toolbars]').empty().append(add);
			        $('.lift_list').append(html);
			        $('.lift_titles').append(title);
			       

					break;
				default:
					app.showSnackbar(res.message);
			}

			
		});
	},

	detail:function(){
		var _self = this;
		
		app.navTo('sign_add');
		var objId = {};
		var template_id = location.hash.split('/')[2]; //模板ID
		objId.template_id = template_id;
		console.log(template_id);
		var ctrlData = {};
		var request = api.getPost('/checkin/record/get',objId);
			request.then(function(res){
				console.log(res);
				switch(res.code){
					case 0:
						var actual_checkin_time =  res.data.actual_checkin_time;
						var	is_timeout = res.data.is_timeout;
						var actual_distance = res.data.actual_distance;
						$('#sign').val('已签到').attr('disabled',true);
						$('#actual_checkin_time').text(actual_checkin_time);
						if(is_timeout == true){
							$('#is_timeout').text('超时');
						}else{
							$('#is_timeout').text('未超时');
						}
						$('#actual_distance').text(actual_distance);
						$('#distance').text(res.data.distance);
						 $('#Refresh').hide();
						ctrlData = res.data;
						ctrlData = JSON.stringify(ctrlData);
						localStorage.setItem('ctrlData',ctrlData);
						sign.load();

							
					break;
					default:

					_self.loadScript();
						$('#Refresh').on('click',function(){
							sign.setLocationByBaidu();
						})
				}
			})
		
	},
	load:function() {  
		var _self = this;
	  	var script = document.createElement("script");  
	  	script.src = "http://api.map.baidu.com/api?v=2.0&ak=2rdlw1uifgr5nncsPspZRz3&callback=sign.setBaidu";
	  	document.body.appendChild(script);  
	}, 
	setBaidu:function(latId, lngId, distanceCallback){
			var _self = this;
			var ctrlData = localStorage.getItem('ctrlData');
				ctrlData = JSON.parse(ctrlData);
			var long = ctrlData.long;
			var lat = ctrlData.lat;
			console.log(ctrlData);
			var map = new BMap.Map("allmap");
			var point = new BMap.Point(116.331398,39.897445);
			map.centerAndZoom(point,12);
			var geolocation = new BMap.Geolocation();
			map.enableScrollWheelZoom(true);
			var geoc = new BMap.Geocoder();    
 			geolocation.getCurrentPosition(function (r) {
				   	map.clearOverlays(); 
					var new_point = new BMap.Point(long,lat);
					var marker = new BMap.Marker(new_point);  // 创建标注
					map.addOverlay(marker);              // 将标注添加到地图中
					map.panTo(new_point); 

					console.log(r);
					console.log(point);
					var pt = r.point;
					geoc.getLocation(pt, function(rs){
						var addComp = rs.addressComponents;
						console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
						var address = addComp.province + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
						console.log($('#address'));
						$('#address').text(address);
					});
 			}, {enableHighAccuracy: true});
	},
	submit:function(longitude,latitude){
		var _self = this;
		

		
		$('#sign').on('click',function(){
			var objData = {};
		var template_id = location.hash.split('/')[2]; //模板ID
		console.log(template_id);
		objData.template_id = template_id;
		objData.long=longitude;
		objData.lat = latitude;
		console.log('objData',objData);
			var sub = api.getPost(_self.data.createMethod,objData);
			sub.then(function(res){
				console.log(res);
			})
				var t = setTimeout(function() {
						    location.hash = "#sign";
				}, 100);
		})
		
	},
	setLocationByBaidu:function(latId, lngId, distanceCallback) {  
		var _self = this;
	 	 	var latitude = '-1';
		    var longitude = '-1';
		    // 百度地图API功能
		    var map = new BMap.Map("allmap");
		    var geolocation = new BMap.Geolocation();
		    var geoc = new BMap.Geocoder();  
		    map.centerAndZoom(new BMap.Point(116.331398,39.897445),11);
		    map.setZoom(14); 
			map.enableScrollWheelZoom(true);
		

		    geolocation.getCurrentPosition(function (r) {
		        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
		            console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
		            latitude = r.point.lat;
		            longitude = r.point.lng;
		            console.log("baidu-bd09--lon--lat--" + longitude + "--" + latitude);
		            $("#setLocation1").html("位置获取成功");
		            $("#setLocation2").html("位置获取成功");
		            if (distanceCallback != null && typeof(distanceCallback) == 'function') {
		                distanceCallback(r.point);
		            }
		        } else {
		            $.toast('failed' + this.getStatus());
		        }
		        console.log($("#latitude"));
		        $("#latitude").val(latitude);
		        $("#longitude").val(longitude);
		        map.clearOverlays(); 
				var new_point = new BMap.Point(longitude,latitude);
				var marker = new BMap.Marker(new_point);  // 创建标注
				map.addOverlay(marker);              // 将标注添加到地图中
				map.panTo(new_point); 

				var template_id = location.hash.split('/')[2];
				api.getPost('/checkin/template/get',template_id).then(function(res){
						console.log(res);
						//var map = new BMap.Map("allmap");
						console.log(); 
						var mPoint = new BMap.Point(res.data.long,res.data.lat);//在地图上确定范围 
						//map.enableScrollWheelZoom(); 
						map.centerAndZoom(mPoint,11);
						map.setZoom(14); 
						var circle = new BMap.Circle(mPoint,res.data.distance,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
					    map.addOverlay(circle);
					    var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}});  
					    local.searchNearby(map.addOverlay(marker),mPoint,res.data.distance);
				})
				

				var pt = r.point;
				geoc.getLocation(pt, function(rs){
					var addComp = rs.addressComponents;
					console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
					var address = addComp.province + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
					console.log($('#address'));
					$('#address').text(address);
					$('#actual_checkin_time').parent().remove();
					$('#is_timeout').parent().remove();
					$('#actual_distance').parent().remove();
					$('#distance').parent().remove();
				});
				console.log(latitude);
				_self.submit(longitude,latitude);
		    }, {enableHighAccuracy: true});
	},
	
	loadScript:function() {  
	  var script = document.createElement("script");  
	  script.src = "http://api.map.baidu.com/api?v=2.0&ak=2rdlw1uifgr5nncsPspZRz3k&callback=sign.setLocationByBaidu";
	  document.body.appendChild(script);  
	}, 
	   
	
	//
	init:function(){

		//htmlImport.setItem(config.importFile,'modal_form');
		app.navTo('modal_form');
		this.getLiftlist();
	}
}