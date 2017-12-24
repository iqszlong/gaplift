var socket = {
    ws:'',
    connectMax:3,
    host: config.wshost,
    SocketCreated: false,
    sessionid: localStorage.getItem('sessionid'),
    connect: function() {
        var _self = this;
        if (typeof(WebSocket) == undefined) {
            toastr.warn("不支持websocket，消息功能无法使用","请更换浏览器重新登录！");
            return;
        }
        if (!_self.SocketCreated) {
            console.log("准备连接到服务器 ...");
            try {
                _self.ws = new WebSocket(_self.host+'/message/ws');
                _self.SocketCreated = true;
            } catch (ex) {
                console.log(ex, "ERROR");
                return;
            }

            _self.ws.onopen = _self.WSonOpen;
            _self.ws.onmessage = _self.WSonMessage;
            _self.ws.onclose = _self.WSonClose;
            _self.ws.onerror = _self.WSonError;
        }
    },
    WSonOpen: function() {
        var _self = socket;
        console.log("连接已经建立。", "OK");
        var _data = {type:"AUTH",sessionid:_self.sessionid};
            _data = JSON.stringify(_data);   
        _self.ws.send(_data);
        console.log("正在授权……");
    },
    WSonMessage: function(event) {
        //console.log(event.data);
        var _self = socket;
        
        var res = JSON.parse(event.data);
        if(res.result_message != ''){
            console.info(res.result_message);
        }
        if(res.result_code == 0){
            _self.common(res);
        }
        
        
    },
    WSonClose: function() {
        console.log("连接关闭。", "ERROR");
        socket.SocketCreated = false;
        var count = 10;
        var connect_times = 0;

        var t = setInterval(function(){
            if(count > 0){
                console.log(count+"秒后重新连接");
                count--;
            }
            if(count == 0){
                if(connect_times < socket.connectMax){
                    clearInterval(t);
                    console.log("连接中");
                    socket.connect();
                    connect_times++;
                }else{
                    console.log("连接中断");
                }
            }
        },1000);
        
    },
    common:function(data){
        var _self = this;
        var _type = data.type;

        switch(_type){
            case 'RSP-AUTH'://授权成功
                console.log("正在获取消息列表……");
                _self.getListdata();
                
            break;
            case 'GROUPS': //获取列表成功
                //console.log(data.groups);
                if('notice' in window){
                    notice.getList(data);
                }
            break;
            case 'MSGS':
                console.log(data);
                if('notice' in window){
                    notice.getDetail(data);
                }
            break;
            case 'RSP-SEND':
                console.log(data);
                if('notice' in window){
                    //notice.getDetail(data);
                }
            break;
            default:;
        }
    },
    getListdata:function(){
        var _self = this;
        var _data = {type:"GET-GROUPS"};
            _data = JSON.stringify(_data);
        _self.ws.send(_data);
    },
    getMsgdata:function(data){
        var _self = this;
        var _data = {type:"GET-MESSAGES"};
            Object.assign(_data,data);
            _data = JSON.stringify(_data);
            console.log('_data',_data);
        _self.ws.send(_data);
    },
    setRead:function(msgid){
        var _self = this;
        var _data = {type:"SET-MSG-READ",message_ids:msgid};
            _data = JSON.stringify(_data);
        _self.ws.send(_data);
        //_self.getListdata();
    },
    sendMsg:function(data){
        var _self = this;
        var _data = {type:"SEND-MSG"};
            Object.assign(_data,data);
            _data = JSON.stringify(_data);
            console.log('_data',_data);
        _self.ws.send(_data);
    },
    init: function() {
        this.connect();
    }

}