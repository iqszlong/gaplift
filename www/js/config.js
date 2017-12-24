var config = {
    apiip:'http://192.168.8.240:8090/',
    wshost:'ws://192.168.8.240:8090',
    //apiip:'http://http://120.76.84.82:8080/',
    //wshost:'ws://http://120.76.84.82:8080',
    //pagesRoot: '../pages/',
    importJs: [
        // 'libs/webcomponentsjs/webcomponents-lite.js',
        //'libs/material-components-web/dist/material-components-web.min.js'
    ],
    importFile: [{
            name:'frame',
            path:'public/framework.html',
            dom:'body',
            mode:'replace'
        },{
            name: 'empty',
            path: 'public/empty.html',
            dom: '#main',
            mode:'replace'
        },{
            name:'msg_snackbar',
            path:'public/snackbar.html',
            dom:'body'
        },{
            name: 'modal',
            path: 'public/modal_page.html',
            dom: 'body'
        },{
            name: 'index',
            path: 'pages/index.html',
            dom: '',
            mode:'replace'
        },{
            name: 'notice',
            path: 'pages/notice.html',
            dom: '#main',
            mode:'replace'
        },{
            name: 'notice_detail',
            path: 'pages/noticedetail.html',
            dom: '.modal-page',
            mode:'replace'
        },{
            name:'userinfo',
            path: 'pages/userinfo.html',
            dom:'#main',
            mode:'replace'
        },{
            name:'addressbook',
            path:'pages/addressbook.html',
            dom:'#main',
            mode:'replace'
        },{
            name:'addressbook_item',
            path:'pages/addressbookitem.html',
            dom:'body',
            mode:'replace'
        },{
            name:'work',
            path:'pages/work.html',
            dom:'#main',
            mode:'replace'
        },{
            name:'repair',
            path:'pages/repair.html',
            dom:'body',
            mode:'replace'
        },{
            name:'repair_detail',
            path:'pages/repairdetail.html',
            dom:'body',
            mode:'replace'
        },{
            name:'repair_detail_info',
            path:'pages/repairdetail_info.html',
            dom:'body',
            mode:'replace'
        },{
            name:'choosemaster',
            path:'pages/choosemaster.html',
            dom:'body',
            mode:'replace'
        },{
            name:'add_master',
            path:'pages/choosemaster_add.html',
            dom:'body',
            mode:'replace'
        },{
            name:'masterquote',
            path:'pages/masterquote.html',
            dom:'body',
            mode:'replace'
        },{
            name:'user_login',
            path:'pages/user_login.html',
            dom:'body',
            mode:'replace'
        },{
            name:'user_register',
            path:'pages/user_register.html',
            dom:'body',
            mode:'replace'
        },{
            name:'edit_avatar',
            path:'pages/edit_avatar.html',
            dom:'body',
            mode:'replace'
        },{
            name:'lift_list',
            path:'pages/lift_list.html',
            dom:'body',
            mode:'replace'
        },{
            name:'lift_item',
            path:'pages/lift_item.html',
            dom:'body',
            mode:'replace'
        },{
            name:'lift_item_edit',
            path:'pages/lift_item_edit.html',
            dom:'body',
            mode:'replace'          
        },{
            name:'modal_form',
            path:'public/modal_form.html',
            dom:'body',
            mode:'replace'
        },{
            name:'list_info',
            path:'public/list_info.html',
            dom:'body',
            mode:'replace'
        },{
            name:'sign_add',
            path:'pages/sign_add.html',
            dom:'body',
            mode:'replace'
        },{
            name:'invoice_list',
            path:'pages/invoice_list.html',
            dom:'body',
            mode:'replace'
        },{
            name:'invoice_item',
            path:'pages/invoice_item.html',
            dom:'body',
            mode:'replace'
        },{
            name:'flow_list',
            path:'pages/flow_list.html',
            dom:'body',
            mode:'replace'
        },{
            name:'flow_item',
            path:'pages/flow_item.html',
            dom:'body',
            mode:'replace'
        }
    ]
}

