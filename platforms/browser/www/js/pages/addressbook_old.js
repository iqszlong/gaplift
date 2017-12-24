var addressbook = {
    getSortData:function(){
        var _self = this;
        var api = config.apiip + 'public/addressbook.json';
        var getAddressBook = Promise.resolve($.get(api));

        getAddressBook.then(function(data){
            data = JSON.parse(data);
            var varterArr = [];
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data.length; j++){
                    if (data[i].flag < data[j].flag){
                        var temp = data[i];
                        data[i] = data[j];
                        data[j] = temp;
                    }
                }
            }
            //console.log(data);
            if (_self.f_check_uppercase(data[0].flag)){
                varterArr.push(data[0].flag)
            } else {
                varterArr.push('常')
            }
            for (var i = 0; i < data.length; i++) {
                if(_self.f_check_uppercase(data[0].flag)){
                   data[0].flagLetter = data[0].flag
                } else {
                   data[0].flagLetter = '常用'
                }
                if (i>0) {
                    if (data[i].flag !== data[i-1].flag){
                        if (_self.f_check_uppercase(data[i].flag)) {
                            data[i].flagLetter = data[i].flag;
                            varterArr.push(data[i].flag)
                        } else {
                            data[i].flagLetter = '#';
                            varterArr.push('#')
                        }
                    }
                }
            }
            //console.log(data);
            //侧边栏
            var str = '' ;
            for (var i = 0; i < varterArr.length; i++) {
              str += '<a ontouchstart="addressbook.anchorJump(this)"  >'+ varterArr[i] +'</a>'
            }
            $('.slidePage div').html(str)
            //通信录详细数据
            // var name='addressbook_item';
            // var itemTpl = '';
            // for(var i in data){
            //     var addressbookData = data[i];
            //     addressbookData.varter = addressbookData.flagLetter ===undefined?'':'<p id="'+addressbookData.flagLetter+'" class="groupTitle">'+addressbookData.flagLetter+'</p>'
            //     var _tpl = htmlImport.tpl[name] === undefined ? localStorage.getItem(name): htmlImport.tpl[name];
            //     itemTpl += _self.changeTplVal(addressbookData,_tpl);
            // }
            // var list = $(document).find('.addressbook-item');
            // list.empty().append(itemTpl);
            //console.log(data);
            //渲染
            //var addressbooklist = JSON.stringify(data);
            var html = template('addressbook-item',data);
            $(document).find('.addressbook-item').empty().append(html);
        });

        //阻止选卡切换默认地址栏提交
        $(".addressbook .mdc-tab").on('click',function(e){
            e.preventDefault();

            var index = $(this).index(); //获取被按下按钮的索引值，需要注意index是从0开始的
            $(".panels > div").eq(index).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
        });
    },
    //模板替换
    changeTplVal:function(obj,tpl){
        for(property in obj){
             // console.log(property);
             var _rex =  new RegExp("{" + property + "}", "gi");
             tpl = tpl.replace(_rex,obj[property]);
        }
        return tpl;
    },
	// 滑动结束
    // touchEnd:function() {
    //     var opcityNum = 1;
    //     setInterval(function () {
    //         opcityNum -= 0.1;
    //         if (opcityNum > 0) {
    //             $('.varter').css({'opacity': opcityNum})
    //         } else {
    //             clearInterval();
    //         }
    //     },50)
    // },
    // 手指滑动
    move:function(){
       //  获取开始点击的位置
       //  每滑动一个a标签的高度切换一个锚点
        event.preventDefault();
        anchorJump(document.elementFromPoint(event.changedTouches[0].clientX,event.changedTouches[0].clientY))
    },
    // 跳转锚点
    // anchorJump:function(n) {
    // 	console.log(11111);
    //     var text = $(n).text();
    //     if (text.length < 2) {
    //         $('.varter').text(text)
    //         $('.varter').css({'opacity':' 1'})
    //         location.hash = '#' + text
    //     }
    // },
    // 点击事件
    clickInfo:function(ele) {
        alert($(ele).find('.name').text())
    },
    // 判断是否是字母
    f_check_uppercase:function(obj) {
       if (/[A-Z]/.test(obj))    {   
          return true;   
       }    
       return false;   
    },
	init:function(){
        htmlImport.setItem(config.importFile,'frame');
        app.nav();
        app.dropmenu();
		htmlImport.setItem(config.importFile,'addressbook');
		this.getSortData();
        //初始化选卡切换
        var dynamicTabBar = window.dynamicTabBar = new mdc.tabs.MDCTabBar(document.querySelector('#dynamic-tab-bar'));
	}
}