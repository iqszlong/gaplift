var editForm = {
    root: '/dtadmin/admin/',
    listMethod:'/workflow/term/list',
    getMethod:'/workflow/term/get',
    activeClass: 'active',
    editing: 'on-edit',
    draging:'on-drag',
    dragOn: 'drag-on',
    dragAllow:'drag-allow',
    maxRow: 12,
    initData:{},
    data: {
        "side": [],
        "recycle": [],
        "page":1
    },
    components: {
        "static": [{
            "name": "是否",
            "type": "BOOL",
            "default_values": [
                {
                    "value":"false"
                }
            ]
        }, {
            "name": "数值",
            "type": "NUMERIC",
            "default_values": [
                {
                    "value":"0",
                    "unit": "KM/h"
                }
            ],
            "unit": "KM/h"
        }, {
            "name": "文字",
            "type": "TEXT",
            "sub_type": "TEXT-TITLE", //TEXT-TITLE标题 | TEXT-PHRASE短语 | TEXT-CONTENT正文
            "default_values": [
                {
                    "value":"标题"
                }
            ]
        }, {
            "name": "时间",
            "type": "TIME",
            "sub_type": "TIME-EDIT", //TIME-EDIT自定义时间 | TIME-CREATE表单提交时间
            "format": "DATE", //DATE日期 | TIME时间 | DATE-TIME日期时间 | INTERVAL 计时
            "unit": "second",
            "default_values": [
                {
                    "value":"2018-02-03 00:00:00"
                }
            ]
        }, {
            "name": "文件",
            "type": "FILE",
            "default_values": [
                {
                    "value":""
                }
            ]
        }, {
            "name": "位置",
            "type": "POSITION",
            "sub_type": "POS-EDIT", //POS-EDIT自定义 | POS-REFER系统数据
            "format": "MAP-HIDE", //MAP-HIDE隐藏地图 | MAP-SHOW显示地图
            "default_values": [
                {
                    "value":"110101",//地区ID           | DISTRICT小区ID | LIFT电梯ID | DEVICE设备ID | EMPLOYEE员工
                    "sub_value":"街道地址"//具体地址
                }
            ]
        }],
        "features": [{
            "name": "电梯",
            "type": "LIFT",
            "cols": ["code"],
            "opt":1,
            "opts":[1,2]
        }, {
            "name": "设备",
            "type": "DEVICE",
            "cols": ["code"],
            "opt":1,
            "opts":[1,2]
        }, {
            "name": "小区",
            "type": "DISTRICT",
            "cols": ["name"],
            "opt":1,
            "opts":[1,2]
        }, {
            "name": "员工",
            "type": "EMPLOYEE",
            "cols": ["name"],
            "opt":1,
            "opts":[1,2]
        }, {
            "name": "企业",
            "type": "MERCHANT",
            "cols": ["name"],
            "opt":1,
            "opts":[1,2]
        }, 
        // {
        //     "name": "分组",
        //     "type": "WORKGROUP",
        //     "cols": ["title"],
        //     "opts":[1,2]
        // }, 
        {
            "name": "部门",
            "type": "ORGAN",
            "cols": ["name"],
            "opt":1,
            "opts":[1,2]
        }, {
            "name": "流程",
            "type": "WORKFLOW",
            "cols": ["name"],
            "opt":1,
            "opts":[1,2]
        }],
        "hardware": [{
            "name": "GPS(地图位置)",
            "type": "GPS",
            "default_values": [
                {
                    "value":"获取中……"
                }
            ]
        }],
        "type": [{
            "name": "系统ID",
            "type": "REFER-FORM-ID",
            "default_values": [
                {
                    "value":"doc_4484117"
                }
            ]
        }, {
            "name": "单据ID",
            "type": "REFER-TABLE-ID",
            "default_values": [
                {
                    "value":"order_3317"
                }
            ]
        }, {
            "name": "单号ID",
            "type": "REFER-JOB-ID",
            "default_values": [
                {
                    "value":"order_3317"
                }
            ]
        },{
            "name": "企业",
            "type": "REFER-MERCHANT",
            "default_values": [
                {
                    "value":"order_3317"
                }
            ]
        }, {
            "name": "页数",
            "type": "REFER-PAGE",
            "default_values": [
                {
                    "value":"1"
                }
            ]
        }, {
            "name": "创建人",
            "type": "REFER-EMPLOYEE",
            "default_values": [
                {
                    "value":"admin"
                }
            ]
        }],
    },
    fields: {
        "TEXT": {
            "sub_type": [{
                "label": "标题",
                "val": "TEXT-TITLE"
            }, {
                "label": "短语",
                "val": "TEXT-PHRASE"
            }, {
                "label": "正文",
                "val": "TEXT-CONTENT"
            }]
        },
        "TIME": {
            "sub_type": [{
                "label": "自定义时间",
                "val": "TIME-EDIT"
            }, {
                "label": "表单提交时间",
                "val": "TIME-CREATE"
            }],
            "format": [{
                "label": "日期",
                "val": "DATE"
            }, {
                "label": "时间",
                "val": "TIME"
            }, {
                "label": "日期时间",
                "val": "DATE-TIME"
            }, {
                "label": "计时",
                "val": "INTERVAL"
            }],
            "units": [{
                "label": "单位"
            }, {
                "label": "年",
                "val": "year"
            }, {
                "label": "月",
                "val": "month"
            }, {
                "label": "天",
                "val": "day"
            }, {
                "label": "时",
                "val": "hour"
            }, {
                "label": "分",
                "val": "minute"
            }, {
                "label": "秒",
                "val": "second"
            }]
        },
        "POSITION":{
            "sub_type": [{
                "label": "自定义",
                "val": "POS-EDIT"
            }, {
                "label": "系统数据",
                "val": "POS-REFER"
            }],
            "format": [{
                "label": "隐藏地图",
                "val": "MAP-HIDE"
            }, {
                "label": "显示地图",
                "val": "MAP-SHOW"
            }],
        },
        "LIFT": [{
                "col": "id",
                "name": "ID",
                "readonly": true,
                "input_type": "text"
            },{
                "col": "registration_code",
                "name": "注册代码",
                "readonly": false,
                "input_type": "text"
            },
            {
                "col": "code",
                "name": "编号",
                "readonly": false,
                "input_type": "text"
            },
            {
                "col": "category",
                "name": "类型",
                "readonly": false,
                "input_type": "select",
                "datalist":JSON.parse(localStorage.getItem('lift_category'))
            },
            {
                "col": "brand",
                "name": "品牌",
                "readonly": false,
                "input_type": "droptext",
                "datalist":JSON.parse(localStorage.getItem('lift_brand'))

            },
            // {
            //     "col": "model",
            //     "name": "型号",
            //     "readonly": false,
            //     "input_type": "droptext"
            // },
            {
                "col": "load",
                "name": "载重",
                "readonly": false,
                "input_type": "numeric"
            },
            {
                "col": "speed",
                "name": "出厂速度",
                "readonly": false,
                "input_type": "numeric"
            },
            {
                "col": "building_level",
                "name": "所在建筑层数",
                "readonly": false,
                "input_type": "numeric"
            },
            {
                "col": "level",
                "name": "电梯站数",
                "readonly": false,
                "input_type": "numeric"
            },
            {
                "col": "serial_number",
                "name": "出厂编号",
                "readonly": false,
                "input_type": "text"
            },
            {
                "col": "internal_number",
                "name": "单位内部编号",
                "readonly": false,
                "input_type": "text"
            },
            {
                "col": "vendor",
                "name": "厂商",
                "readonly": false,
                "input_type": "text"
            },
            {
                "col": "operating_status",
                "name": "运营状态",
                "readonly": false,
                "input_type": "select",
                "datalist":[{
                    name:'正常',
                    id:'TOK'
                },{
                    name:'维修',
                    id:'TMODIFY'
                },{
                    name:'保养',
                    id:'TMAINTAIN '
                }]
            },
            {
                "col": "running_state",
                "name": "运行状态",
                "readonly": false,
                "input_type": "select",
                "datalist":[{
                    name:'正常',
                    id:'TOK'
                },{
                    name:'停梯',
                    id:'TSTOP'
                }]
            }
        ],
        "DEVICE": [{
            "col": "id",
            "name": "ID",
            "readonly": true,
            "input_type": "text"
        }, {
            "col": "code",
            "name": "编号",
            "readonly": false,
            "input_type": "text"
        }, {
            "col": "brand",
            "name": "品牌",
            "readonly": false,
            "input_type": "text"
        },{
            "col": "state",
            "name": "状态",
            "readonly": false,
            "input_type": "select",
            "datalist":[{
                name:'正常',
                id:'TOK'
            },{
                name:'报废',
                id:'TSCRAP'
            }]
        },{
            "col": "running_state",
            "name": "运行状态",
            "readonly": false,
            "input_type": "select",
            "datalist":[{
                name:'正常',
                id:'TWORK'
            },{
                name:'异常',
                id:'TFAULT'
            }]
        }],
        "DISTRICT": [{
            "col": "id",
            "name": "ID",
            "readonly": true,
            "input_type": "text"
        }, {
            "col": "name",
            "name": "名称",
            "readonly": false,
            "input_type": "text"
        }, {
            "col": "address",
            "name": "具体地址",
            "readonly": false,
            "input_type": "text"
        }, {
            "col": "status",
            "name": "状态",
            "readonly": true,
            "input_type": "select",
            "datalist":[{
                name:'启用',
                id:'SENABLE'
            },{
                name:'禁用',
                id:'SDISABLE'
            },{
                name:'已删除',
                id:'SDELETE'
            }]
        }],
        "EMPLOYEE": [{
            "col": "id",
            "name": "ID",
            "readonly": true,
            "input_type": "text"
        }, {
            "col": "name",
            "name": "名字",
            "readonly": false,
            "input_type": "text"
        }, {
            "col": "phone",
            "name": "手机",
            "readonly": false,
            "input_type": "text"
        }, {
            "col": "code",
            "name": "员工号",
            "readonly": false,
            "input_type": "text"
        }, {
            "col": "email",
            "name": "邮箱",
            "readonly": false,
            "input_type": "text"
        }, {
            "col": "address",
            "name": "具体地址",
            "readonly": false,
            "input_type": "text"
        }, {
            "col": "is_on_job",
            "name": "是否在职",
            "readonly": false,
            "input_type": "select"
        }, {
            "col": "status",
            "name": "状态",
            "readonly": true,
            "input_type": "select",
            "datalist":[{
                name:'正常',
                id:'SENABLE'
            },{
                name:'禁用',
                id:'SDISABLE'
            },{
                name:'已删除',
                id:'SDELETE'
            }]
        }],
        "MERCHANT": [{
            "col": "id",
            "name": "ID",
            "readonly": true,
            "input_type": "text"
        }, {
            "col": "name",
            "name": "企业名称",
            "readonly": false,
            "input_type": "text"
        }, {
            "col": "short_name",
            "name": "企业简称",
            "readonly": false,
            "input_type": "text"
        }, {
            "col": "merchant_type",
            "name": "企业类型",
            "readonly": false,
            "input_type": "select"
        }, {
            "col": "address",
            "name": "地址",
            "readonly": false,
            "input_type": "text"
        }, {
            "col": "user_name",
            "name": "负责人",
            "readonly": true,
            "input_type": "select"
        }, {
            "col": "user_phone",
            "name": "联系电话",
            "readonly": true,
            "input_type": "select"
        }, {
            "col": "status",
            "name": "状态",
            "readonly": true,
            "input_type": "select",
            "datalist":[{
                name:'正常',
                id:'SENABLE'
            },{
                name:'禁用',
                id:'SDISABLE'
            },{
                name:'已删除',
                id:'SDELETE'
            }]
        }],
        "WORKGROUP": [{
            "col": "id",
            "name": "ID",
            "readonly": false,
            "input_type": "text"
        }, {
            "col": "title",
            "name": "名称",
            "readonly": false,
            "input_type": "text"
        }, {
            "col": "parent_id",
            "name": "父级",
            "readonly": false,
            "input_type": "select"
        }, {
            "col": "create_time",
            "name": "创建时间",
            "readonly": true,
            "input_type": "select"
        }, {
            "col": "merchant_id",
            "name": "企业id",
            "readonly": true,
            "input_type": "text"
        }, {
            "col": "is_private",
            "name": "私有",
            "readonly": true,
            "input_type": "bool"
        }],
        "ORGAN": [{
            "col": "id",
            "name": "ID",
            "readonly": true,
            "input_type": "text"
        }, {
            "col": "name",
            "name": "名称",
            "readonly": false,
            "input_type": "text"
        },{
            "col": "employee_counts",
            "name": "员工数",
            "readonly": true,
            "input_type": "select"
        }],
        "WORKFLOW": [{
            "col": "id",
            "name": "ID",
            "readonly": true,
            "input_type": "text"
        }, {
            "col": "name",
            "name": "流程名称",
            "readonly": false,
            "input_type": "text"
        }, {
            "col": "version",
            "name": "版本",
            "readonly": true,
            "input_type": "text"
        }, {
            "col": "is_delete",
            "name": "已删除",
            "readonly": true,
            "input_type": "text"
        }]
    },
    relation:{
    	"LIFT":["DEVICE","DISTRICT","EMPLOYEE","MERCHANT","WORKGROUP","ORGAN","WORKFLOW"],
    	"DEVICE":["LIFT","DISTRICT","EMPLOYEE","MERCHANT","WORKGROUP","ORGAN","WORKFLOW"],
    	"DISTRICT":["LIFT","DEVICE","EMPLOYEE","MERCHANT","WORKGROUP","ORGAN","WORKFLOW"],
    	"EMPLOYEE":["LIFT","DEVICE","DISTRICT","MERCHANT","WORKGROUP","ORGAN","WORKFLOW"],
    	"MERCHANT":["LIFT","DEVICE","DISTRICT","EMPLOYEE","WORKGROUP","ORGAN","WORKFLOW"],
    	"WORKGROUP":["LIFT","DEVICE","DISTRICT","EMPLOYEE","MERCHANT","ORGAN","WORKFLOW"],
    	"ORGAN":["LIFT","DEVICE","DISTRICT","EMPLOYEE","MERCHANT","WORKGROUP","WORKFLOW"],
    	"WORKFLOW":["LIFT","DEVICE","DISTRICT","EMPLOYEE","MERCHANT","WORKGROUP","ORGAN"]
    },
    setA4: function(data) {
        var a4html = template('a4', data);
        $('#pages').append(a4html);
    },
    setgroup:function(data){
        var grouphtml = template('group', data);
        $('#pages .page-bottom').before(grouphtml);
    },
    setRows:function(data){
        var _self = this;
        var rowhtml = template('field-row', data);
        $('#pages .page-top').after(rowhtml);
        _self.cutPage();
    },
    addRow: function() {

        var _self = this;
        //var rowLength = 1;
        
        var html = template('row');
        $('button.add-row').before(html);

        _self.cutPage();
        
    },
    cutPage: function() {
        var _self = this;
        var max = _self.maxRow;
        var gap = template('gap');
        var rowLength = $('.page-row').not('.page-top,.page-bottom').length;
        // console.info('rowLength', rowLength);
        if (rowLength % max == 0) {
            _self.data.page++;
            _self.updatePage();
            $('button.add-row').before(gap);
            // $(this).hide();
            // _self.newPage();
            //rowLength = 1;
        }
    },
    delPage: function(row) {
        var pageLength = $('.a4').length;
        //console.log('pageLength',pageLength);
        if (pageLength > 1) {
            $('.a4').last().remove();
        }
    },
    setEvent: function() {
        var _self = this;
        //添加事件
        
        //打印事件
        $('.printMe').on('click', function() {
            $('#pages').printThis({
                // debug:true,
                base: _self.root,
                pageTitle: $('#pages .inner h1').text(),
                header:$('#pages .page-top'),
                footer:$('#pages .page-bottom'),
                importStyle: true
            });
        });
        //页面事件
        $('#pages').on('click','.add-row',function() {
            _self.addRow();
        }).on('click', '.btn-col', function() {
            var cols = $(this).data('col');
            var target = $(this).closest('.page-row');
            var items = target.find('.col');
            var itemSize = items.length;
            var data = [];


            $(this).addClass(_self.activeClass).siblings('.btn-col').removeClass(_self.activeClass);

            if (cols > itemSize) {
                var max = cols - itemSize;
                for (var i = 0; i < max; i++) {
                    data.push({ "index": i + 1 });
                }
                var html = template('cols', data);

                target.append(html);
            }
            if (cols < itemSize) {

                var max = itemSize - cols;

                for (var i = itemSize; i >= cols; i--) {
                    items.eq(i).remove();
                }
            }

            // console.log(html);


        }).on('click', '.action', function() {
            var actions = $(this).data('action');
            var target = $(this).closest('.page-row');
            switch (actions) {
                case 'hide':
                    if (target.hasClass(actions)) {
                        target.removeClass(actions);
                        $(this).removeClass(_self.activeClass);
                    } else {
                        target.addClass(actions);
                        $(this).addClass(_self.activeClass);
                    }
                    break;
                case 'del':
                    if (confirm("确定删除这一行？")) {
                        var index = target.index();
                        var rowLength = $('.gap').prevAll('.page-row').not('.page-top,.page-bottom').length;
                        var max = _self.maxRow;
                        //删除行内元素
                        target.find('.component-html').each(function(){
                            var _id = $(this).data('item').id;
                            var _obj = _self.hadItem(_id,_self.data.side);
                            _self.recycleComponent(_obj);
                            
                        });
                        console.log(rowLength);
                        if (rowLength != 0 && rowLength % max == 0) {
                            //target.next('.add-row').show();
                            //_self.delPage();
                            //console.log(target.next('.gap'));
                            _self.data.page--;
                            _self.updatePage();
                            target.siblings('.gap')[0].remove();
                            //target.remove();
                        }
                        target.remove();
                    }
                    break;
                case 'see':
                case 'add':
                case 'modify':
                    $(this).addClass(_self.activeClass).find('input').prop('checked',true).end().siblings('.action').removeClass(_self.activeClass).find('input').prop('checked',false);
                    break;
                case 'remove_relate':
   
                	$(this).closest('.form-item').remove();


                	break;
                default:
                    console.log('未定义actions');
            }
        }).on('click', '.col', function() {
            if($(this).children().length > 0){
                $(this).addClass(_self.activeClass);
                $('body').addClass(_self.editing);
                _self.formSelect(this);
                //console.log('col',_self.data.side);
            }
        }).on('click', '.form-btn', function(e) { //提交修改
            e.preventDefault();
        
            var target = $(e.target).closest('.component-btn');

            var _side_index = target.index();
            var targetObj = _self.data.side[_side_index];

            var objData = _self.getFormdata();

            //console.log('targetObj',targetObj);
            //关系
            if ('relate' in objData) {
            	if(typeof objData.relate == 'string'){
            		var _array = [];
            		_array.push(objData.relate);
            		objData.relate = _array;
            	}
            	// console.log(objData.relate);
            	objData.relations =[];
            	for (var i = 0; i < objData.relate.length; i++) {
            		var side_el = _self.hadItem(objData.relate[i],_self.data.side);
            		var relation_data = {};
            			relation_data.to_field_id= objData.relate[i];
            			relation_data.to_field_title = side_el.title;
    					relation_data.to_flow_id = '';
    					relation_data.default_job_id = '';
    					relation_data.to_field_index = '';
            		
            		objData.relations.push(relation_data);
            	}
            }
            console.info('objData',objData);
            // /return;
 
             for (property in objData) {
            	console.log(property,targetObj[property],objData[property]);
                if (objData[property] !== '' && targetObj[property] != objData[property]) {
                    targetObj[property] = objData[property];
                }

            }
            



            console.log('targetObj',targetObj);

            _self.update(targetObj);
            _self.exitEdit();
            
        })//编辑
        // .on('input', '[name=val]', function(e) {
        //     var target = $(e.target);
        //     // console.log(target.val());
        //     target.closest('.component-html').data('default', target.val());
        // }).on('input', '[name=sub_val]', function(e) {
        //     var target = $(e.target);
        //     // console.log(target.val());
        //     target.closest('.component-html').data('sub_default', target.val());
        // });

       

        //遮罩
        $('.mask').on('click', function() {
            //console.log('mask',_self.data.side);
            var is_change = false;
            var _side_index = $('.component-btn.active').index();
            console.log(_self.data.side);
            var targetObj = _self.data.side[_side_index];
            
            var objData = _self.getFormdata();

            //console.log('default_val',default_val);
            console.log(objData,targetObj);
            if (targetObj !== undefined) {
                for (property in objData) {
                	var t = targetObj[property];
                	var o = objData[property];
                    
                	if(o !== '' && typeof o !== 'string'){
                		t = JSON.stringify(t).toString();
                		o = JSON.stringify(o).toString();
                	}
                	console.log(property,o,t);
                    if (o != '' && t != o) {
                        is_change = true;
                    }
                }
                if (is_change && !confirm('表单已经发生变化，确定取消？取消将丢失修改数据')) {
                    return;
                }

                _self.update();
            }
            _self.exitEdit();

        })

        //切换类型
        $('.toolbar a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
            var name = $(e.target).attr('href').replace(/#/, '');
            var target = $('#components');
            if (name in _self.components) {
                for (var i = 0; i < _self.components[name].length; i++) {
                    _self.components[name][i].classify = name;
                }
                var componentshtml = template('component-btn', _self.components[name]);
                target.empty().append(componentshtml);
            } else {
                console.error('数据未定义');
                return;
            }

        }).first().tab('show');

        

        //搜索功能数据
        //_self.searchFeaturedata();

        //复用
        //_self.multiple();
    },
    getFormdata:function(){
        var target = $('.col.active');
        var objData = $('.component-btn.active').find('.pop-form').serializeObject();
        var opt_ctrl = target.find('.col-ctrl').serializeObject();
        var form_inner =target.find('.form-inner');

        objData.is_multiple = objData.is_multiple == '' ? false : true;
        objData.is_title_hide = objData.is_title_hide == '' ? false : true;

        Object.assign(objData,opt_ctrl);


        if(typeof objData.cols == 'string'){
            objData.cols = [objData.cols];
        }

        objData.default_values=[];
        form_inner.each(function(){
            var default_form = $(this).serializeObject();
            if('search-field' in default_form){
                delete default_form['search-field'];
            }
            //为空删除
            if(default_form.value == ''){
               delete default_form.value;
            }
            //组件values转义
            if('values' in default_form && default_form.values.indexOf('{')>-1){
                default_form.values = JSON.parse(default_form.values);
            }
            if('unit' in default_form){
                objData.unit = default_form.unit;
            }
            //如果内容不为空
            if(Object.keys(default_form).length > 0){
                objData.default_values.push(default_form);
            }


        });
        if(objData.default_values.length == 0){
            delete objData.default_values;
        }
    console.log(objData);
        return objData;
    },
    multiple:function(){
        var _self = this;
        var _delbtn = '<button type="button" class="btn-del-group"><i class="fa fa-minus"></i></button>';
        var _hideinput = '<input type="hidden" name="val" value="">';
        $('#pages').on('click','.btn-copy-group',function(){
            var _parent = $(this).closest('.component-html');
            var _target = $(this).closest('.form-body');
            var _s_index = _parent.data('item').side_index;
            console.log(_self.data.side);
            // return;
            var _data = _self.data.side[_s_index];

            var copyhtml = '';
            if(_data.cols === null || _data.cols === undefined){
                //非功能组件
                copyhtml = template('static_field',_data);
                copyhtml = copyhtml + _delbtn;
            }else{
                copyhtml = template('field',_data.feilds[0]);
                copyhtml = _hideinput + copyhtml + _delbtn;
            }
            copyhtml = $('<form class="form-inner"></form>').append(copyhtml).prop('outerHTML');
            //console.log(copyhtml);
            _target.append(copyhtml);
            _self.initPlug();
        }).on('click','.btn-del-group',function(){
            var _target = $(this).closest('.form-inner');
            if (confirm("确定删除？")) {
                _target.remove();
            }
        });
    },
    //边栏下拉框
    formSelect: function(obj) {
        var _self = this;

        var _obj = $(obj).children('.component-html').data('item');
        var _target = $('#side').find('.component-btn').eq(_obj.side_index);

        //var _target = $('#side').find('.component-btn.active');
        var _selectCols = _obj.cols;
        var _selecter = _target.find('.field-select');

        var _type = _selecter.data("type");
        var _sub_type = _selecter.data("sub-type");
        var _multiple = _selecter.attr("multiple");

        var _format_selecter = _target.find('.format-select');

        var _opData = '';
        var _selecterOptions = {};

        if (_selecter.length > 0) {

            if (_sub_type !== undefined && _sub_type !== '') {
                _opData = JSON.stringify(_self.fields[_type].sub_type);
            } else {
                _opData = JSON.stringify(_self.fields[_type]);
                
            }

            _opData = JSON.parse(_opData);

            console.log('_selectCols',_selectCols,_sub_type)

            if (_opData.length > 0) {
                for (var i = 0; i < _opData.length; i++) {

                    if (_selectCols !== null && _selectCols !== undefined ) {
                        _opData[i].label = _opData[i].name;
                        _opData[i].val = _opData[i].col;


                        for (var k = 0; k < _selectCols.length; k++) {
                            if (_selectCols[k] == _opData[i].col) {
                                _opData[i].selected = true;
                            }
                        }

                        _selecterOptions.title = "请选择字段";
                        _selecterOptions.name = "cols";
                    }

                    if (_obj.sub_type !== undefined && _obj.sub_type !== '') {
                        if (_obj.sub_type == _opData[i].val) {
                            _opData[i].selected = true;
                        }

                        _selecterOptions.title = "请选择类型";
                        _selecterOptions.name = "sub_type";

                    }
                }
            }
            // console.log('_multiple',_multiple);
            _selecterOptions.index = 1;
            _selecterOptions.options = _opData;

            //console.log(_type);

            // console.log('_selecterOptions',_selecterOptions);
            if (_multiple !== undefined) { _selecterOptions.multiple = 1; }

            chosen.setItem(_selecter, _selecterOptions);
        }

        if (_format_selecter.length > 0) {

            _opData = _self.fields[_type].format;
            if (_opData !== undefined && _obj.format !== undefined) {
                for (var i = 0; i < _opData.length; i++) {
                    _opData[i].selected = false;
                    if (_obj.format == _opData[i].val) {
                        _opData[i].selected = true;
                    }
                }
            }

            //console.log('_format_selecter',_opData)

            _selecterOptions.index = 2;
            _selecterOptions.title = "请选择格式";
            _selecterOptions.name = "format";
            _selecterOptions.options = _opData;

            chosen.setItem(_format_selecter, _selecterOptions);
        }


        _target.addClass(_self.activeClass).siblings('.component-btn').removeClass(_self.activeClass);

    },
    //搜索功能数据
    searchFeaturedata:function(){
        var _self = this;
        var ts;
        

        $('.main-content').off('input','[name=search-field]').on('input','[name=search-field]',function(){
            var target = $(this);
            var val = target.val();
            clearTimeout(ts);
            if(val != ''){
                console.log(val);
                var wait = 1000;
                ts = setTimeout(function(){
                    
                    var parent = target.closest('.component-html');
                    var _data = parent.data('item');
                    var _type = _data.type;
                        if(_type == 'MERCHANT'){_type = 'MERCHANT-CONTACT'};
                        if(_type == 'WORKFLOW'){_type = 'FLOW'};
                    var _cols = _data.cols;
                    var _scols = [];
                        _scols.push('id');
                        _scols = _scols.concat(_cols);
                        //console.log(_scols);
                    var data = {
                        type:_type,
                        keyword:val,
                        columns:_scols
                    };
                    api.getPost(_self.listMethod,data).then(function(res){
                        if(res.code){
                            toastr.error(res.message);
                        }else{
                            console.log(res.data);
                            return res.data;
                        }
                    }).then(function(data){
                        if(data !== null){
                            for (var i = 0; i < data.list.length; i++) {
                                target.editableSelect('add',function(){
                                    var text = data.list[i].code;
                                    if(text === undefined){
                                        text = data.list[i].name;
                                    }
                                    console.log(text);
                                    $(this).text(text).data('id',data.list[i].id).data('type',_type).data('cols',_cols);
                                });
                            }
                            target.editableSelect('show');
                            
                        }else{
                            toastr.warning('搜索结果为空');
                        }
                    });
                },wait);
            }
            
            
            
        });
    },
    //获得功能数据
    getFeaturedata:function(data,obj,index){
        var _self = this;
        var _target = obj;
        var _side_index = index;

        // console.log(_target);
        api.getPost(_self.getMethod,data).then(function(res){
            if(res.code){
                toastr.error(res.message);
            }else{
                console.log(res.data);
                return res.data;
            }
        }).then(function(data){
            //_self.data.side[_side_index].values=[];
            //_self.data.side[_side_index].default_values=[];
            var vObj = {value:data['id'],values:{}};
            for(prop in data){
                _target.find('[name='+prop+']').val(data[prop]);
                
                    
                if(prop == 'id'){
                    _target.find('[name=value]').val(data[prop]);
                }else{

                    vObj.values[prop] = data[prop]; 
                }
                

                // for (var i = 0; i < _self.data.side[_side_index].feilds.length; i++) {
                //     if(_self.data.side[_side_index].feilds[i].col == prop){
                //         _self.data.side[_side_index].feilds[i].value = data[prop];
                //     }
                // }
            }
            var _values = JSON.stringify(vObj.values);
            if(_target.find('[name="values"]').length == 0){
                _target.append($('<input type="hidden" name="values" value='+_values+'>'))
            }else{
                _target.find('[name="values"]').val(_values);
            }
            //_self.data.side[_side_index].values.push(vObj);
            //_self.data.side[_side_index].default_values.push(vObj);


        });
    },
    drag: function() {
        var _self = this;

        var drake = dragula([components, side, recycle, pages], {
            isContainer: function(el) {
                return el.classList.contains('col');
            },
            moves: function(el, source, handle, sibling) {
                //console.log(source);
                return el.classList.contains('drag-container') && !el.classList.contains('active') && !source.classList.contains('active');
            },
            copy: function(el, source) {
                return el.classList.contains('drag-container') && source === $('#components')[0] || source === $('#side')[0] || source === $('#recycle')[0];
            },
            accepts: function(el, target, source, sibling) {
                return target !== $('#components')[0] && target !== $('#pages')[0] && target !== $('#side')[0] && target !== $('#recycle')[0];
            }
        }).on('drop', function(el,target, sibling) {
            //更新样式
            $(el).removeClass('draging');
            $('.component-btn').removeClass('draging');
            if($('.col').hasClass(_self.dragAllow)){
                $('.col').removeClass(_self.dragAllow);
                //$('body').removeClass(_self.draging);
            }


            //获得数据
            var data = $(el).data('item');

            var _sibling = $(sibling).attr('id');
            var _row = $(target).closest('.page-row');
            var _target_type = $(target).find('.component-html').data('type');
            var _target_id = $(target).find('.component-html').data('id');

            // console.log(_row.index());

            data.row = _row.index();
            data.col = $(target).index();
            data.sibling = _sibling;
            data.index = $(el).data('index');
            data.is_multiple = false;
            data.is_title_hide = false;


            //data.rowspan = 4;
            // data.colspan = _row.find('.col').length;

            
            if(_row.hasClass('page-top')){data.top = 1;}else{data.top = 0;}
            if(_row.hasClass('page-bottom')){data.bottom = 1;}else{data.bottom = 0;}

            // console.log('data',data);

            
            
        	
        	
            if ($(target).children().length > 1) {
            	// console.log('sibling',sibling);
            	// console.log('el',el);
            	if(_sibling == 'side'){
            		
            		if(_classify == 'features'){
                        //建立关系
            			if(_self.relationAllow(_type,_target_type)){
            				//console.log('_target_id',_target_id);
            				var side_el = _self.hadItem(_id,_self.data.side);
							var side_obj = _self.hadItem(_target_id,_self.data.side);

            				var _array = 'relations' in side_obj ? side_obj.relations :[];
            				if(_array.length > 0){
            					for (var i = 0; i < _array.length; i++) {
            						if(_array[i].to_field_id == _id){
            							console.warn('关联已存在！');
            							$(el).remove();
            							return;
            						}
            					}
							}


							var relation_data = {}
            					relation_data.to_field_id = _id;
            					relation_data.to_field_title = side_el.title;
            					relation_data.to_flow_id = '';
            					relation_data.default_job_id = '';
            					relation_data.to_field_index = '';

            				_array.push(relation_data);

            				side_obj.relations = _array;

            				var html = template('component-tpl', side_obj);
                			$(target).empty().append(html);
            				
            				//console.log(side_obj);
            				_self.sideComponent(_self.data.side);
            				
            			}
            		}
						
            		
            		$(el).remove();
            		return;
            	}else{
                    if(_sibling == 'side'){
	            	  $(_sibling).append(el);
                    }
	                $(target).find(el).remove();
	                return;
                }
                
            }


            if (_sibling == 'recycle') {
                _self.data.recycle.splice(data.recycle_index, 1);
                var re_html = template('component-btn', _self.data.recycle);
                $('#recycle').empty().append(re_html);
                delete data.recycle_index;
                //console.log(_self.data.recycle);

                 _self.data.side.push(data);
                 _self.sideComponent(_self.data.side);
                 var html = template('component-tpl', data);
                        $(target).empty().append(html);
                    _self.initPlug();

            }else{ 
                if (target !== null && target.classList.contains('col')) {
                
                    _self.chosenClassfiy(data);
                    


                    if(!el.classList.contains('component-html')){
                        data.id = '_' + _self.rndNum(5);
                        _self.data.side.push(data);
                    }else{
                        _self.data.side[data.side_index] = data;
                    }
                    _self.sideComponent(_self.data.side);

                    var html = template('component-tpl', data);
                        $(target).empty().append(html);
                    _self.initPlug();

                }
            }


        }).on('cancel', function(el, container) {
            if (confirm("确定删除这一项？")) {
                $(el).remove();
                var _id = $(el).data('item').id;
                var obj = _self.hadItem(_id, _self.data.side);
                _self.recycleComponent(obj);
                
            }

        }).on('over', function(el, container, source) {
            if (!$(container).hasClass(_self.dragOn)) {
                $(container).addClass(_self.dragOn);
            }
            $(el).hide();
            // if ($(container).children().length > 0 && container.classList.contains('col')) {
            //     $(container).children().hide();
            // }
        }).on('out', function(el, container, source) {
            if ($(container).hasClass(_self.dragOn)) {
                $(container).removeClass(_self.dragOn);
            }
            $(el).show();
            // if ($(container).children().length > 0 && container.classList.contains('col')) {
            //     $(container).children().show();
            // }
        }).on('drag',function(el, source) {
        	
        	var classify = $(el).data('classify');
        	var _id = $(el).data('id');
        	var type = $(el).data('type');

        	$(el).addClass('draging');

        	if(classify == 'features' && $(source).attr('id') != 'components' &&  $(source).attr('id') == 'side'){
        		$('.component-html').each(function(){
        			var component_type = $(this).data('type');
        			if(_self.relationAllow(type,component_type)){
        				$(this).closest('.col').addClass(_self.dragAllow);
        				//$('body').addClass(_self.draging);
        			}
        		});
        		
        	}
        });

        return drake;
    },
    relationAllow:function(eltype,coltype){
    	var _self = this;
    	var relArray = _self.relation[eltype];
    	for (var i = 0; i < relArray.length; i++) {
    		if(relArray[i] == coltype){
    			return true;
    		}
    	}
    },
    
    setFeilds:function(obj){
        var _self = this;
        
        var _default_values = obj.default_values == undefined ? obj.values : obj.default_values;
            _default_values = _default_values == null ? [] : _default_values;
        console.log('_default_values',_default_values);
        obj.feilds = [];
        for (var i = 0; i < _default_values.length; i++) {
            var _fieldData = {
                type:obj.type
            };
            if(obj.sub_type !== undefined){
               _fieldData.sub_type=obj.sub_type;
            }
            if('unit' in obj){
                _fieldData.unit = obj.unit;
            }
            Object.assign(_fieldData,_default_values[i]);
            obj.feilds.push(_fieldData);
            //console.log(obj);

        }
    },
    updateFields: function(obj, type) {
        var _self = this;

        var _cols = obj.cols;
        
        var _array = [];
        
        var _fields = JSON.stringify(_self.fields[type]);
            _fields = JSON.parse(_fields);
        var _values = obj.values;
        var _default = obj.default_values;
        var _inArray = [];
        var _data = {};
        // console.log('updateFields',obj);
        var _vals = false;
        //默认值
        if(_default !== undefined){_vals = _default}
        //取值
        if(_values !== undefined){_vals = _values}    

        //console.log(_vals);

        if(_vals){
         for (var d = 0; d < _vals.length; d++) {
            

            for (var i = 0; i < _cols.length; i++) {
                for (var k = 0; k < _fields.length; k++) {
                    if (_fields[k].col == _cols[i]) {
                        _data = JSON.stringify(_fields[k]);
                        _data = JSON.parse(_data);
                        _data.opt = obj.opt;

                        //console.log(_data);
                            //组件字段传值
                            for (prop in _vals[d].values) {
                                if (_data.col == prop) {
                                    console.log(prop);
                                    _data.value = _vals[d].values[prop];
                                }
                            }

                        _inArray.push(_data);
                    }
                }
            }


            console.log(_inArray);
            _array.push(_inArray);
        }

        }else{
            for (var i = 0; i < _cols.length; i++) {
                for (var k = 0; k < _fields.length; k++) {
                    if (_fields[k].col == _cols[i]) {
                        _data = JSON.stringify(_fields[k]);
                        _data = JSON.parse(_data);
                        _data.opt = obj.opt;

                        

                        _inArray.push(_data);
                    }
                }
            }
            _array.push(_inArray);
        }
        
        

        
        // console.log(_array);


        return _array;


    },
    update: function(data) {
        var _self = this;
        var _index = $('.component-btn.active').index();
        //console.log('updata',data);
        data = data === undefined ? _self.data.side[_index] : data;

        _self.chosenClassfiy(data);

        var html = template('component-tpl', data);


        $('.col.active').empty().append(html);
        _self.initPlug();
        _self.sideComponent(_self.data.side);

    },
    setDateinput: function() {
        var target = $('.component-html').find('.form-date');
        var _format = target.data('format');
        //DATE日期 | TIME时间 | DATE-TIME日期时间 | INTERVAL 计时
        switch (_format) {
            case 'DATE':
                _format = 'YYYY-MM-DD';
                break;
            case 'TIME':
                _format = 'HH:mm:ss';
                break;
                // case 'DATE-TIME':
                //     _format = 'YYYY-MM-DD HH:MM:SS';
                // break;
            default:
                _format = 'YYYY-MM-DD HH:mm:ss';;
        }
        //console.log('target',target);
        if (target.length > 0) {
            target.datetimepicker({
                format: _format,
                icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-arrow-up",
                    down: "fa fa-arrow-down"
                }
            });
        }
    },
    setPcd:function(){
        var target = $('.component-html').find('.area-place');
        if(target.length > 0){
            pcd.init();
        }
    },
    setSearch:function(){
        var _self = this;
        var target = $('.component-html').find('[name=search-field]');
        if(target.length > 0){
            target.editableSelect({
                effects: 'slide' 
            }).off().on('select.editable-select', function (e, li) {
                var data ={};
                    data = {
                        id: $(li).data('id'),
                        type:$(li).data('type'),
                        columns:$(li).data('cols')
                    };
                var index = $(li).closest('.component-html').data('item').side_index;
                var obj = $(li).closest('.form-inner');
                // console.log('select.editable-select');
                //return;
                _self.getFeaturedata(data,obj,index);
            });
        }
    },
    initPlug:function(){
        console.log('initPlug');
        this.setDateinput();
        this.setPcd();
        this.setSearch();
    },

    exitEdit: function() {
        var _self = this;
        if ($('body').hasClass(_self.editing)) {
            $('body').removeClass(_self.editing);
            $('.col.active').removeClass(_self.activeClass);
            $('.component-btn.active').removeClass(_self.activeClass);

        }
    },
    sideComponent: function(data) {

        for (var i = 0; i < data.length; i++) {
            if (!('parent' in data[i])) {
                data[i].parent = 'side';
            }else{
                continue;
            }
            data[i].side_index = i;
        }
        // console.log('side-data', data);
        var list_html = template('component-btn', data);
        $('#side').empty().append(list_html);
    },
    recycleComponent:function(obj){
        var _self = this;
        //console.log(obj.side_index);
        var removeArray = _self.data.side.splice(obj.side_index, 1);
            removeArray[0].recycle_index = _self.data.recycle.length;
            delete obj.side_index;
            _self.data.recycle = _self.data.recycle.concat(removeArray);
            console.log('回收站', _self.data.recycle);
        var re_html = template('component-btn', _self.data.recycle);
            $('#recycle').empty().append(re_html);

        _self.sideComponent(_self.data.side);
    },
    hadItem: function(id, data) {
        var _self = this;
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                // data[i].side_index = i;
                return data[i];
            }
        }
        return false;
    },
    chosen: function() {
        chosen.setItem($('#process-select'), this.data.process_select);
        chosen.setItem($('#form-select'), this.data.form_select);
    },
    rndNum: function(n) {
        var rnd = "";
        for (var i = 0; i < n; i++) {

            rnd += Math.floor(Math.random() * 10);
        }
        return rnd;
    },
    returnData:function(){
        var _self = this;
        var _side = JSON.stringify(_self.data.side);
            _side = JSON.parse(_side);
        var _fields =[];
            
        var _formData = {
            "headers":[],
            "footers":[]
        };

        //console.log(_side,_self.data.side);
        for (var i = 0; i < _self.data.side.length; i++) {
            if(_self.data.side[i].top == 1){
                _formData.headers.push(_self.data.side[i]);
                _side[i] = '';
            }
            if(_self.data.side[i].bottom == 1){
                _formData.footers.push(_self.data.side[i]);
                _side[i] = '';
            }
        }

        for (var i = 0; i < _side.length; i++) {
            if(_side[i] != ''){
                _fields.push(_side[i]);
            }
        }
        _formData.fields = _fields;

        console.log('结果',_formData);

        return _formData;
    },
    updatePage:function(){
        var _self = this;
        if($('.REFER-PAGE').length>0){
            $('.REFER-PAGE .form-body .end').text(_self.data.page);
        
            for (var i = 0; i < _self.data.side.length; i++) {
                if(_self.data.side[i].type == 'REFER-PAGE'){
                    _self.data.side[i].val = _self.data.page;
                }
            }
        }
    },
    redata:function(data){
        var _self = this;

        var components = _self.components;
        for (var k = 0; k < data.length; k++) {
            //返回种类classify
            for (property in components) {
                var class_data = components[property];
                for (var i = 0; i < class_data.length; i++) {
                
                    if(data[k].type == class_data[i].type){
                        data[k].classify = property;
                    }
                }
                
            }
            //返回默认值
            var defVal = '';
            if('default_values' in data[k]){defVal = 'default_values';}
            if('values' in data[k]){defVal = 'values';}
            //else{data[k].values = data[k].default_values;}


            if(data[k][defVal] !== undefined && data[k][defVal] !== null){
                data[k].feilds = [];
                
                for (var i = 0;  i < data[k][defVal].length; i++) {
                    var vdata = {
                        is_readonly:data[k].is_readonly,
                        is_required:data[k].is_required,
                        sub_type:data[k].sub_type,
                        type:data[k].type
                    };
                    if('unit' in data[k]){
                        vdata.unit = data[k].unit;
                    }

                    Object.assign(vdata,data[k][defVal][i]);
                    
                    data[k].feilds.push(vdata);
                }
                
            }

            //返回组件字段
            if ('cols' in data[k] && data[k].cols !== null) {
                data[k].feilds = _self.updateFields(data[k], data[k].type);
            }

            data[k].opts = [1,2];

            


        }
        // console.log("data",data);

        return data;

    },
    returnPagetpl:function(data){
        var _self = this;
        _self.data.side = _self.redata(data.side);
        _self.sideComponent(_self.data.side);
        //console.log('side',_self.data.side);
        this.setA4(data);
    },
    initRow:function(){
        this.initData = {
            bottom:0,
            classify:"static",
            col:1,
            index:2,
            name:"文字",
            parent:"side",
            row:1,
            is_title_hide:false,
            is_multiple:false,
            top:0,
            type:'TEXT',
            sub_type:'TEXT-TITLE',
            default_values:[{
                value:"标题"
            }]
        }
        this.initData.id = '_' + this.rndNum(5);
        this.chosenClassfiy(this.initData);
        //console.log(this.initData);
        this.data.side.push(this.initData);
        this.sideComponent(this.data.side);


        var _data = {field:[]};
            _data.field.push(this.data.side);
        this.setRows(_data);
    },
    chosenClassfiy:function(obj){
        var _self = this;
        switch(obj.classify){
            case 'features':
                obj.feilds = _self.updateFields(obj,obj.type);
                break;
            case 'hardware':
                _self.setFeilds(obj);
                break;
            case 'type':
                _self.setFeilds(obj);
                break;
            //静态
            default:
               _self.setFeilds(obj);


        }
    },
    init: function() {
        this.data.side =[];
        this.setA4();
        this.setEvent();
        this.drag();
        this.initRow();
        //this.chosen();

    }
}


$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {

        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    var $radio = $('input[type=radio],input[type=checkbox]',this);
    $.each($radio,function(){
        if(!o.hasOwnProperty(this.name)){
            o[this.name] = '';
        }
    });
    return o;
};

