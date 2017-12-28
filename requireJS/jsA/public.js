define(function () {
    var $ = require("./jquery-1.8.1").jQuery;
    var CONFIG =  {
        desk: 1,
        dockPos: "top",
        appXY: "y",
        appButtonTop: 20,
        appButtonLeft: 20,
        createIndexid: 1,
        windowMinWidth: 215,
        windowMinHeight: 59,
        wallpaper: "",
        wallpaperWidth: 1920,
        wallpaperHeight: 1080,
        wallpaperType: "",
        wallpaperState: 1,
        //dockContent:[],
        //manager:"workspace"
    };
    var url = (function() {
        return {
            getUrl: function() {
                var temp_url = decodeURI(window.location.href);
                var tempJson = fn.unEscapeToJson(temp_url);
                return tempJson;
            },
            getToken: function() {
                var token = fn.storage.getItem('token');
                return token;
            }
        };
    })();
    var fn = {
        winH: window.innerHeight,
        winW: window.innerWidth,
        winS_h: window.screen.height,
        storage: window.sessionStorage,
        L_storage: window.localStorage,
        // url : 'http://192.168.2.189/mos/interface/',
        //url : 'http://localhost/mos/interface/',
        // url: 'http://192.168.2.190:5000/api/v1/',
        //url: 'http://testapios.moviewisdom.cn/api/v1/',
        // url: 'http://testapios.moviewisdom.cn/yunos/desk/',
        url: locahref+'/yunos/desk/',//测试环境
        urluc: locahref+'/yunos/uc/',//测试环境
        // url: 'https://tangdou.moviewisdom.cn/yunos/desk/',//生产环境
        // urluc: 'https://tangdou.moviewisdom.cn/yunos/uc/',//生产环境


        // menuLineTop : $('.menuLine').position().top + 1,
        //menuLineH : $('.menuLine').height(),
        menuLineH: $('.menuLine').length ? parseInt((window.innerHeight - 220) / $('.menuLine').length) : 0,
        menuLineTop: $('.menuLine').length ? $('.menuLine').position().top + 1 : 0,
        commonWindow: function (msg) {
            var result = "<div class='mark' id='mark'></div>" +
                "<div class='workInfo' > " +
                    // "<h3>温馨提示</h3>" +
                "<div class='workContext p14'>" +
                "<ul class='error_message'>" + msg + "</ul>" +
                "</div>" +
                "<div class='work_btns'>" +
                "<button class='work_suc p16'>返回</button>" +
                    // "<button class='work_cancel p16'>取消</button>" +
                "</div>" +
                "</div>";
            $('body').append(result);
            $('.work_btns').on('click', function () {
                $('.workInfo, .mark, ._loading').hide();
            })
        },

        commonWindowSur: function (msg) {
            var result = "<div class='mark' id='mark'></div>" +
                "<div class='workInfo' > " +
                    // "<h3>温馨提示</h3>" +
                "<div class='workContext p14'>" +
                "<ul class='error_message'>" + msg + "</ul>" +
                "</div>" +
                "<div class='work_btns'>" +
                "<button class='commonBtn_suc p16'>是</button>" +
                "<button class='commonBtn_cancel p16'>否</button>" +
                "</div>" +
                "</div>";
            $('body').append(result);
            // $('.commonBtn_cancel').on('click', function() {
            //     $('.workInfo, .mark, ._loading').hide();
            //     return;
            // });
            // $('.commonBtn_suc').on('click', function() {
            //     $('.workInfo, .mark, ._loading').hide();
            // })
        },
        // 判断设备类型：
        versions: function () {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile/) || !!u.match(/Windows Phone/) || !!u.match(/Android/) || !!u.match(/MQQBrowser/),
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),

        //base64图片转换：
        changeImgData: function (imgData) {
            if (imgData.indexOf('data:image')) {
                var startLength = imgData.indexOf('data:image');
                imgData = imgData.substring(startLength);
            }
            return imgData;
        },


        /**
         * 图片预加载
         * @name   initImg
         */
        initImg: function (fn) {
            var imgCount = 0;
            var imgs = document.getElementsByTagName("img");
            var img_length = imgs.length;
            for (var i = 0; i < img_length; i++) {
                var tu = imgs[i];
                if (tu.complete) {
                    imgCount++;
                    if (imgCount == img_length) {
                        $(".mark").hide();
                        $(".loading").hide();
                        $("body").show(30, function () {
                            if (fn) {
                                fn();
                            }
                        });

                    }
                    continue;
                }
                tu.onload = function () {
                    imgCount++;
                    if (imgCount == img_length) {
                        $(".mark").hide();
                        $(".loading").hide();
                        $("body").show(30, function () {
                            if (fn) {
                                fn();
                            }
                        });
                    }
                };
            }
        },
        changeTab: function () {
            if ($('.changeTab li').length) {
                $('.changeTab li').on('click', function () {
                    var index = $('.changeTab li').index(this);
                    $(this).addClass('on').siblings().removeClass('on');
                    $('.info_member').eq(index).show().siblings('.info_member').hide();
                })
            }
        },
        /**
         * 过滤字符串
         * 留言板提交时过滤掉标签
         */
        removeHTMLTag: function (str) {
            str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
            str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
            //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
            str = str.replace(/ /ig, '');//去掉
            return str;
        },
        /**
         * 将页面地址的url后面所带的参数列表获取到，并且转换为json格式
         * @name    unEscapeToJson
         * @param   {String} url地址
         * @return  {json}
         */
        unEscapeToJson: function (url) {
            var postData = url.substring(url.indexOf("?") + 1, url.length).split("&");
            var temp_json = {};
            for (var i = 0; i < postData.length; i++) {
                var temp_text = postData[i];
                var key = temp_text.substring(0, temp_text.indexOf("="));
                var val = temp_text.substring(temp_text.indexOf("=") + 1, temp_text.length);
                temp_json[key] = val;
            }
            return temp_json;
        },

        /*
         **ajaxFun ajax返回成功后的参数
         **param (String) url :请求地址url连接
         **param (String) type :请求类型：GET/POST
         **param (Json) param : post参数
         */
        ajaxFun: function (url, type, param) {
            $.ajax({
                url: url, //后台处理程序
                type: type, //数据发送方式
                data: param,
                dataType: 'json',
                async: true,
                success: function (data) {
                    // console.log(data)
                    ajaxCallbackFun(data);
                },
                errror: function (data) {

                }
            });
        },

        /*时间差比较：
         interval ：D表示查询精确到天数的之差
         interval ：H表示查询精确到小时之差
         interval ：M表示查询精确到分钟之差
         interval ：S表示查询精确到秒之差
         interval ：T表示查询精确到毫秒之差
         */
        dateDiff: function (interval, date1, date2) {
            var objInterval = {'D': 1000 * 60 * 60 * 24, 'H': 1000 * 60 * 60, 'M': 1000 * 60, 'S': 1000, 'T': 1};
            interval = interval.toUpperCase();
            //var dt1 = new  Date(Date.parse(date1.replace(/-/g, '/')));
            //var dt2 = new  Date(Date.parse(date2.replace(/-/g, '/')));
            var dt1 = new Date(Date.parse(date1.replace(/-/g, '/')));
            var dt2 = new Date(Date.parse(date2.replace(/-/g, '/')));
            try {
                return Math.round((dt2.getTime() - dt1.getTime()) / eval('objInterval.' + interval));
            } catch (e) {
                return e.message;
            }
        },

        /**
         * 显示Loading
         */
        showLoading: function () {
            $('.mark').show();
            $('._loading').show();
        },

        /**
         * 隐藏Loading
         */
        hideLoading: function () {
            $('.mark').hide();
            $('._loading').hide();
            if ($('.non_reslut').length) {
                $('.non_reslut').hide();
            }
        }
    }

    exports.fn = fn;
    exports.url = url;
    exports.CONFIG = CONFIG;
});