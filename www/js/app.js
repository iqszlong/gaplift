var app = {
    dropmenu: function () {
        var menuEl = document.querySelector('#demo-menu');
        var menu = new mdc.menu.MDCSimpleMenu(menuEl);
        var toggle = document.querySelector('.toggle');
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            menu.open = !menu.open;
        });


        var menuE2 = document.querySelector('#more-menu');
        var more_menu = new mdc.menu.MDCSimpleMenu(menuE2);
        var more_buttom = document.querySelector('.more_buttom');
        more_buttom.addEventListener('click', function (e) {
            e.preventDefault();
            more_menu.open = !more_menu.open;
        });

        $('.scan').click(function (e) {
            // app.genQrCode('abcdefgh');
            app.scan();
        });

    },
    getApi: function () {
        //电梯类型
        var lift_category = localStorage.getItem('lift_category');
        if (lift_category == null || location.hash == '#lift') {
            api.getPost('/lift/category/list').then(function (res) {
                console.log('234', res.code);
                if (res.code == 0) {
                    localStorage.setItem('lift_category', JSON.stringify(res.data.list));
                } else {
                    app.showSnackbar(res.message);
                }
            });
        }

        //获取员工列表
        var employeeList = localStorage.getItem('employeeList');
        if (employeeList == null || location.hash == '#employee') {
            api.getPost('/employee/list').then(function (res) {
                if (res.code == 0) {
                    localStorage.setItem('employeeList', JSON.stringify(res.data.list));
                } else {
                    app.showSnackbar(res.message);
                }
            });
        }
        //获取关联企业
        var relevant_merchantList = localStorage.getItem('relevant_merchantList');
        if (relevant_merchantList == null || location.hash == '#merchant') {
            api.getPost('/merchant/list').then(function (res) {
                if (res.code == 0) {
                    localStorage.setItem('relevant_merchantList', JSON.stringify(res.data.list));
                } else {
                    app.showSnackbar(res.message);
                }
            });
        }
        //获取小区列表
        var district = localStorage.getItem('district');
        if (location.hash == '#area' || district == null) {
            api.getPost('/district/list').then(function (res) {
                if (res.code == 0) {
                    localStorage.setItem('district', JSON.stringify(res.data.list));
                } else {
                    app.showSnackbar(res.message);
                }
            });
        }

    },
    nav: function () {
        var iconTextTabBar = new mdc.tabs.MDCTabBar($('#icon-text-tab-bar')[0]);
        var _page = location.hash;
        switch (_page) {
            case '#notice':
            case '#work':
            case '#addressbook':
            case '#userinfo':
                var activeIndex = $('#icon-text-tab-bar a').index($('[href=' + _page + ']'));
                if (activeIndex >= 0) {
                    iconTextTabBar.activeTabIndex = activeIndex;
                }
                break;
            default:
                ;
        }
        // console.log(_page,activeIndex);
    },
    navTo: function (name, xhttp) {
        var _self = this;
        var modalTpl = htmlImport.tpl.modal;
        var modalRender = template.compile(modalTpl);
        var targetTpl = htmlImport.tpl[name];
        var _page = location.hash.split('#')[1];
        var _id = _page.replace(/\//g, '-');

        var _data = {"id": _id, "content": targetTpl};
        var tpl = modalRender(_data);

        var shown = function () {
            // if(!$('body').hasClass('in')){
            // 	$('body').addClass('in');
            // }
            if ($('#modal-' + _id).length > 0) {
                $('#modal-' + _id).addClass('in').find('a[href=back]').off().on('click', function (e) {
                    _self.closeModal(e)
                });
            }

        }

        console.log(tpl);
        if ($('#modal-' + _id).length == 0) {
            $(document.body).append(tpl);
            mdc.autoInit(document, function () {
            });
        }

        if (xhttp != undefined) {
            xhttp.then(function () {
                shown();
            });
        } else {
            var t = setTimeout(function () {
                clearTimeout(t);
                shown();
            }, 100);
        }

    },
    closeModal: function (event) {

        event.preventDefault();
        history.go(-1);


    },
    showSnackbar: function (message) {
        var MDCSnackbar = mdc.snackbar.MDCSnackbar;
        //console.log(document.getElementById('snackbar'));
        var snackbar = new MDCSnackbar(document.getElementById('snackbar'));

        var show = function (sb) {
            snackbar.dismissesOnAction = false
            var data = {
                message: message,
                multiline: true,
                timeout: 2750
            };
            sb.show(data);
        };
        show(snackbar);
    },
    checkLogin: function () {
        var user_info = localStorage.getItem('login_user');
        if (user_info === null) {
            location.hash = '#user/login';
            return false;
        }

    },
    scan: function () {
        alert(JSON.stringify(cordova));
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);
            },
            function (error) {
                alert("Scanning failed: " + error);
            },
            {
                preferFrontCamera: false, // iOS and Android
                showFlipCameraButton: true, // iOS and Android
                showTorchButton: true, // iOS and Android
                torchOn: true, // Android, launch with the torch switched on (if available)
                saveHistory: true, // Android, save scan history (default false)
                prompt: "Place a barcode inside the scan area", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true, // iOS
                disableSuccessBeep: false // iOS and Android
            }
        );
    },
    genQrCode: function (text, fn) {
        cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, text, function (success) {
                alert(JSON.stringify(success));
                var filePath = "";
                if (device.platform.toUpperCase() == 'IOS') {
                    var strs = success.file.split('/');
                    var filename = strs[strs.length - 1];
                    filePath = cordova.file.applicationStorageDirectory + 'tmp/' + filename;
                } else if (device.platform.toUpperCase() == 'ANDROID') {
                    var strs = success.file.split('/');
                    var filename = strs[strs.length - 1];
                    filePath = cordova.file.applicationStorageDirectory + 'cache/' + strs[strs.length - 2] + '/' + filename;
                }
                console.log(filePath);
                app.getFileContentAsBase64(filePath, function (base64Image) {
                    // window.open(base64Image);
                    console.log(base64Image);
                    // Then you'll be able to handle the myimage.png file as base64
                    fn && fn(base64Image);
                });
            }, function (fail) {
                alert("encoding failed: " + fail);
            }
        );
    },
    getFileContentAsBase64: function (path, callback) {
        window.resolveLocalFileSystemURL(path, function (entry) {
            app.readFile(entry, callback);
        }, function (error) {
            alert('Cannot found requested file:' + path);
        });
    },
    readFile: function (fileEntry, callback) {
        fileEntry.file(function (file) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                var content = this.result;
                callback(content);
            };
            // The most important point, use the readAsDatURL Method from the file plugin
            reader.readAsDataURL(file);
        });
    },
    listDir: function (path) {
        window.resolveLocalFileSystemURL(path,
            function (fileSystem) {
                var reader = fileSystem.createReader();
                reader.readEntries(
                    function (entries) {
                        console.log(entries);
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            }, function (err) {
                alert(err);
            }
        );
    },
    init: function () {
        this.checkLogin();
        routing.init();
        api.session();
        //如果有企业编号与服务编号在处理
        var user_info = localStorage.getItem('login_user');
        if (user_info = null) {
            this.getApi();
        }


        htmlImport.setItem(config.importFile, 'msg_snackbar');
    }

}


htmlImport.ready(app, 'init');