$(function (factory) {
        "use strict";
        factory(jQuery)
    }(function ($, undefined) {
        IMGUploader = {
            config: {
                data_attach_key: "_CP_ATTACH_KEY"
            }
        };

        $.fn.IMGUploader = function (data) {
            var cp = $(this).data(IMGUploader.config.data_attach_key);
            if (cp == undefined) {
                cp = new IMGUploader.core($(this));
                cp.init(data);
                $(this).data(IMGUploader.config.data_attach_key,cp);
            }
            return cp;
        };

        IMGUploader.core = function (root) {
            this._root = root;
        };

        IMGUploader.core.prototype = {
            init: function (data) {
                this.trigger_btn_id = data.trigger_btn_id;
                this.img_width = data.img_width;
                this.img_height = data.img_height;
                this.img_label = data.img_label;
                if (data.img_limit != undefined) this.img_limit = data.img_limit;
                else this.img_limit = true;
                if (data.url != undefined && data.url != ""){
                    this.url = data.url;

                }
                this.create_ui();
                this.create_uploader();
            },
            create_ui: function () {
                var path = this._root.data('value');

                if (this.img_label != undefined) {
                    text = this.img_label;
                }
                this._imgBtn = $("<a class='file-view' title="+text+"/>").attr("id", this.trigger_btn_id);
                // text = "" + this.img_width + "X" + this.img_height;
                
                this._input = $("<input type='hidden'/>").attr("name",this.trigger_btn_id);
                
                var width = "";
                if (this.img_width == 'auto'){
                    width = "100%";
                }else{
                    width = "" + this.img_width + "px";
                }
                this._noimg_view = $("<div class='inner'/>")

                if( path != ''){
                    this._input.val(path);
                    this._noimg_view.css('background-image','url('+path+')');
                    this._root.removeClass('uploading').addClass('uploaded');
                }
                // .css({
                //     "width": width,
                //     "height": "" + this.img_height + "px",
                //     "background": "#eeeeee",
                //     "border": "2px solid #111111"
                // })
                // .append($("<label/>").css({
                //     "width": width,
                //     "line-height": this.img_height + "px",
                //     "text-align": "center",
                //     "vertical-align": "middle"
                // }).text(text));
                // this._prevImg = $("<img />").css({
                //     "border": "2px solid #111111",
                //     "width": width,
                //     "height": "" + this.img_height + "px"
                // });
                this._progress = $("<div/>").css({width: "0%"}).attr("aria-valuemax", "100").attr("aria-valuemin", "0")
                .attr("role", "progressbar").attr("class", "progress-bar");
                // this._progress = $("<div/>").attr("class", "progress-bar").css({
                //     "width": width
                // }).append(this._progress_item);
                this._root.append(this._imgBtn.append(this._noimg_view),this._input);
                // this._root.append(this._imgBtn.append(this._prevImg));
                this._root.append(this._progress);
                // this._root.css({
                //     // "width": this.img_width
                //     "width": width
                // });
                // if (this.url != undefined && this.url != ""){
                    //this.setUrl(this.url);
                // }else{
                    // this._prevImg.hide();
                    // this._progress.hide();
                    
                // }
            },
            upload: function (file, data) {
                var url = "http://" + data.host + "/" + data.filename;
                this.url = url;
                this.uploader.setOption({
                    'url': url,
                    // 'multipart_params': new_multipart_params
                    'headers': {
                        "x-oss-date": data.date,
                        "Host": data.host,
                        "Authorization": data.authorization,
                        "x-oss-security-token": data.token,
                        "Content-Type": file.type
                    },
                    'http_method': "PUT",
                    'multipart': false,
                });
                this.uploader.start();
            },
            start_upload: function (file) {
                var my = this;
                var objData ={};
                var type = file.type;
                var name = file.name;
                    objData.filename = name;
                    objData.content_type  = type;
                var postImg = api.getPost('/user/image/token',objData);
                postImg.then(function(res){
                    switch(res.code){
                        case 0:
                           my.upload(file,res.data);
                        break;
                        default: Toast.error(res.message);
                    }
                });
                // $.ajax({
                //     type: "GET",
                //     url: "http://120.76.84.82:8086/vender/sts/webauth?content_type=" + file.type + "&filename=" + file.name,
                //     dataType: "json",
                //     success: function (data) {
                //         if (data.code == 0) {
                //             // callback(data.token);
                            
                //             my.upload(file, data.data);

                //         } else {
                //             alert("获取token失败",data.message);
                //         //     Toast("错误", "获取图片上传token失败", "error");
                //         }
                //     },
                //     error: function () {
                //         //Toast("错误", "获取图片上传token失败", "error");
                //     }
                // });
            },
            // clear:function () {
            //     this.url = "";
            //     this._prevImg.hide();
            //     this._noimg_view.show();
            // },
            // setUrl:function (url) {
            //     this.url = url;
            //     this._prevImg.attr("src", this.url);
            //     this._prevImg.show();
            //     this._noimg_view.hide();
            // },
            create_uploader: function () {
                (function (my) {
                    plupload.addFileFilter('img_scale_limit', function (wh, file, cb) {
                        var self = this, img = new o.Image();
                        function finalize(result) {
                            // cleanup
                            img.destroy();
                            img = null;

                            // if rule has been violated in one way or another, trigger an error
                            if (!result) {
                                self.trigger('Error', {
                                    code: -10001,
                                    message: "图片比例不合要求",
                                    file: file
                                });
                            }
                            cb(result);
                        }

                        img.onload = function () {
                            // check if resolution cap is not exceeded
                            var ns = img.width / img.height;
                            finalize(ns == wh);
                        };

                        img.onerror = function () {
                            finalize(false);
                        };

                        img.load(file.getSource());
                    });

                    var fileters = {
                        mime_types: [
                            {title: "Image files", extensions: "jpg,gif,png,bmp,gif,jpeg"}
                        ]
                    };
                    if (my.img_limit){
                        fileters.img_scale_limit = my.img_width / my.img_height;
                    }

                    my.uploader = new plupload.Uploader({
                        runtimes: 'html5,flash,silverlight,html4',
                        browse_button: my.trigger_btn_id,
                        container: my._root[0],
                        flash_swf_url: 'js/plupload/js/Moxie.swf',
                        silverlight_xap_url: 'js/plupload/js/Moxie.xap',
                        url: 'http://oss.aliyuncs.com',
                        filters: fileters,
                        init: {
                            PostInit: function () {
                            },

                            FilesAdded: function (up, files) {
                                // my._progress.show();
                                
                                if(!my._root.hasClass('uploading')){
                                    my._root.removeClass('uploaded').addClass('uploading');
                                }
                               
                                my.start_upload(files[0]);
                            },

                            BeforeUpload: function (up, file) {
                            },

                            UploadProgress: function (up, file) {
                                // pwidth = 2*file.percent;
                                my._progress.attr("style", "width:" + file.percent + '%');
                                my._progress.attr('aria-valuenow', "" + file.percent);
                            },
                            FileUploaded: function (up, file, info) {
                                //my._progress.hide();
                                if (info.status == 200) {
                                    // my._prevImg.attr("src", my.url);
                                    // my._prevImg.show();
                                    // my._noimg_view.hide();
                                    my._noimg_view.css('background-image','url('+my.url+')');
                                    my._input.val(my.url);
                                    my._root.removeClass('uploading').addClass('uploaded');
                                    my._progress.attr("style", "width:" + 0 + '%');
                                }
                                else {
                                    alert("上传失败");
                                }
                            },
                            Error: function (up, err) {
                                alert(err.message);
                                // document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
                            }
                        }
                    });


                    my.uploader.init();
                }(this));
            }
        }
    })
);


