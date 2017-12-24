//////////////////////////////////////
// file:[{
// 		name:'test',
// 		path:'test.html',
// 		dom:'body',
// 		init:1
// }]
//////////////////////////////////////
var htmlImport = {
    tpl: {},
    jswebcomponent: 'bower_components/webcomponentsjs/webcomponents-lite.js',
    jswebcomponentPf: 'bower_components/webcomponents-platform/webcomponents-platform.js',
    file: [{
        name: 'test',
        path: 'test.html',
        dom: 'body',
        init: 1
    }],
    msg: {
        support: '支持导入!',
        nosupport: '不支持导入|-_-)',
        errorsupport: '导入错误：',
        savedone: '本地保存完成',
        alreadysave: '本地已存在',
        cantfindobj:'obj对象没找到！',
        importready:'所有导入已经加载完成！',
        allready:'导入加载已经完成，元素已经注册！',
        masthasname:'必须指定名称',
        maststring:'必须是字符串',
        updatesuccess:'更新成功！'
    },
    supportsImports: function() {
        return 'import' in document.createElement('link');
    },
    getFile: function(file) {

        var _self = this;
        
        file = typeof(file) == 'undefined' ? _self.file : file;
        if (file.length > 0) {
            _self.getData(file);
        }
    },
    start: function(file) {
        var _self = this;

        if (_self.supportsImports()) {
            console.log(_self.msg.support);
            //_self.getFile(file);
        } else {
            console.log(_self.msg.nosupport);
            //core.addScript(_self.jswebcomponent,_self.getFile(file));
        }
        // _self.getFile(file);
        
        core.addScript(_self.jswebcomponent,_self.getFile(file));
        //core.addScript(_self.jswebcomponentPf,_self.getFile(file));
        
    },
    tplImport: function(param) {
        var _self = this;
        var link = document.createElement('link');
        link.rel = 'import';
        link.id = param.name;
        link.href = param.path;
        link.onload = function(e) {
            // console.log('Loaded import: ' + e.target.href);
            var _target = e.target.import;
            // console.log(_target.children);
            var bodyHTML = typeof(_target.body) == 'undefined' ? _target.innerHTML : _target.body.innerHTML;

            if (typeof(_target.head) != 'undefined' && _target.head != '' && bodyHTML == '') {
                bodyHTML = _target.head.innerHTML;
            }else if(typeof(_target.head) != 'undefined' && _target.head != '' && bodyHTML != ''){
                bodyHTML = _target.head.innerHTML + bodyHTML;
            }
            //MAC safari bug
            if (bodyHTML == '') {
                for (var i = 0; i < _target.children.length; i++) {
                    bodyHTML = bodyHTML + _target.children[i].outerHTML;
                }
            }

            

            //console.log(bodyHTML);

            bodyHTML = _self.replaceNote(bodyHTML);


            _self.tpl[param.name] = bodyHTML;

            //var oldHTML = localStorage.getItem(param.name);
            // console.log(oldHTML);

            //if (oldHTML != bodyHTML) {
                //localStorage.removeItem(param.name);
                //localStorage.setItem(param.name, bodyHTML);
                //console.log(param.name + ' ' + _self.msg.savedone);

            //} else {
                //console.log(param.name + ' ' + _self.msg.alreadysave);
            //}

            // console.info(param.dom);
            if (typeof(param.dom) != 'undefined' && param.init) {
                _self.setdom(param);
            }
            // console.log(localStorage);
            //加载完成后清除头部引用
            if (!link.readyState || 'link' === link.readyState || 'complete' === link.readyState) {
                link.onload = link.onreadystatechange = null;
                link.parentNode.removeChild(link);
            }

        };
        link.onerror = function(e) {
            console.error(_self.msg.errorsupport + e.target.href);
            return;
        };
        document.head.appendChild(link);

    },
    getData: function(data) {
        var _self = this;
        // console.log(data);
        for (var i in data) {
            var param = {};
            param.name = data[i].name;
            param.path = data[i].path;
            param.dom = data[i].dom;
            param.mode = data[i].mode;
            param.init = data[i].init;
            _self.tplImport(param);

            if (data[i].child !== undefined) {
                _self.getData(data[i].child);
            }
        }
    },
    getItem: function(data, name) {
        var _self = this;
        var _val = false;
        name = name === undefined ? '' : name;
        for (var i in data) {
            var _name = data[i].name;
            if (_name == name) {
                _val = data[i];
                return _val;
            }
        }
        // console.log(_val);
    },
    setItem: function(data, name) {
        //console.log('htmlImport','setItem');
        var _self = this;
        var _val = _self.getItem(data, name);

        if (_val) {

            _self.setdom(_val);

            if (_val.child !== undefined) {
                for (var n in _val.child) {
                    _self.setdom(_val.child[n]);
                }
            }
        }
    },
    updateItem: function(name, str) {
        if (name === undefined || name == '') { console.warn(name, this.msg.masthasname); return; }
        if (typeof str != 'string') { console.warn(str, this.msg.maststring); return; }
        this.tpl[name] = str;
        localStorage.setItem(name, str);
        console.info(name,this.msg.updatesuccess);
    },
    // 去注释以及style script 换行符 标签空格
    replaceNote: function(str) {
        return str.replace(/(\n)/g, '')
            .replace(/(\t)/g, '')
            .replace(/(\r)/g, '')
            .replace(/<!--[\s\S]*?--\>/g, '')
            .replace(/<style[^>]*>[\s\S]*?<\/[^>]*style>/gi, '')
            //.replace(/<script[^>]*>[\s\S]*?<\/[^>]*script>/gi,'')
            .replace(/>\s*/g, '>')
            .replace(/\s*</g, '<');
    },
    setdom: function(param) {
        var _wrapper = param.dom == '' || param.dom == 'body' ? 'body' : 'body ' + param.dom;

       // var _dom = localStorage.getItem(param.name);
       var _dom = htmlImport.tpl[param.name];
        var _target = document.querySelector(_wrapper);
        var _mode = typeof(param.mode) == 'undefined' ? 'add' : param.mode;
        // console.log(_dom);
        if (_target) {

            switch (_mode) {
                case 'replace':
                    _target.innerHTML = _dom;
                    break;
                case 'add':
                    _target.innerHTML += _dom;
                    break;
                case 'before':
                    _target.innerHTML = _dom + _target.innerHTML;
                    break;
                default:
                    _target.innerHTML += _dom;
            }

            console.info(param.name + ' 读取成功，写入到 ' + _wrapper);
            // console.log(_target.innerHTML);
        } else {
            console.warn(_wrapper + ' 没找到！' + param.name + ' 写入不成功');
            return false;
        }

    },
    ready: function(obj, fn) {
        var _self = this;
    
        if(typeof(obj) == 'undefined'){
        	console.warn(_self.msg.cantfindobj);
        	return;
        }

        //console.log(window.WebComponents);
        //读取成功后
        window.addEventListener('HTMLImportsLoaded', function(e) {
            console.info(_self.msg.importready);
            obj[fn]();
      
        });

        
        // window.addEventListener('WebComponentsReady', function(e) {
        //     console.info(_self.msg.allready);
        //     obj[fn]();
           
        // });
        
       


    },
    addStyle: function() {
        var importDoc = document.currentScript.ownerDocument;
        var style = importDoc.querySelectorAll('link[rel=stylesheet]');
        for (var i = 0; i < style.length; i++) {
            document.head.appendChild(style[i]);
        }
    },
    init: function() {
        this.start();
        
    }
}


// htmlImport.init();
// htmlImport.ready(htmlImport,'init');