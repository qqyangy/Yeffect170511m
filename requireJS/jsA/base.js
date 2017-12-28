define(function () {
    var taskbar = require('./common').taskbar
        /*,
        Util = require('./util').Util,
        navbar = require('./navbar').navbar,
        windows = require('./common').windows,
        zoom = require('./zoom').zoom,
        wallpaper = require('./wallpaper').wallpaper,
        dock = require('./common').dock,
        app = require('./app').app,
        c_app = require('./common').app,
        widget = require('./widget').widget,
        url = require('./public').url,
        fn = require('./public').fn,
        deskTop = require('./common').deskTop,
        dialog = require('./artDialog4.1.6/jquery.artDialog.source').dialog,
        popupMenu = require('./popupMenu').popupMenu,
        helpTemp = require('./templates').helpTemp;*/

    console.log(taskbar);
    var base = (function () {
        return {
            init: function () {
                if (!$.browser.msie) {
                    window.onbeforeunload = Util.confirmExit;
                }
                $("#desktop").on("click", function () {
                    $(".popup-menu").hide();
                    $(".quick_view_container").remove();
                });
                $("body").on("contextmenu", function () {
                    $(".popup-menu").hide();
                    return false;
                });
                base.resize();
                zoom.init();
                //wallpaper.set();
                wallpaper.get(function () {
                    wallpaper.set();
                });
                base.getSkin()
                navbar.init();
                taskbar.init();
                dock.getPos(function () {
                    app.getXY(function () {
                        c_app.get();
                    });
                });
                $(".dock-tool-pinyin").on("mousedown", function () {
                    return false;
                }).on("click", function () {
                    javascript: (function (a) {
                        a ? a.toggle() : function (c, b) {
                            b = c.createElement("script");
                            b.async = true;
                            b.src = "//ime.qq.com/fcgi-bin/getjs";
                            b.setAttribute("ime-cfg", "lt=2");
                            c = c.getElementsByTagName("head")[0];
                            c.insertBefore(b, c.firstChild);
                        }(document);
                    })(windowsQQWebIME);
                });
                //新增个人中心修改页面start
                $(".indicator-header-img").on("mousedown", function () {
                    return false;
                }).on("click", function () {
                    windows.createTemp({
                        id: "userCsz",
                        title: "密码修改",
                        url: "usercenter/index.html?token=" + url.getToken(),
                        width: 580,
                        height: 360,
                        isresize: false,
                        isflash: false
                    });
                });

                //新增个人中心修改页面end
                $(".dock-tool-style").on("mousedown", function () {
                    return false;
                }).on("click", function () {
                    windows.createTemp({
                        id: "ztsz",
                        title: "主题设置",
                        url: "wallpaper/index.html",
                        width: 580,
                        height: 520,
                        isresize: false,
                        isflash: false
                    });
                });
                $("#desk",window.parent.document).on("contextmenu", function (b) {
                    $(".popup-menu").hide();
                    $(".quick_view_container").remove();
                    var a = popupMenu.desk();
                    l = ($(document).width() - b.clientX) < a.width() ? (b.clientX - a.width()) : b.clientX;
                    t = ($(document).height() - b.clientY) < a.height() ? (b.clientY - a.height()) : b.clientY;
                    a.css({left: l, top: t}).show();
                    return false;
                });
                widget.reduction();
                base.help();
                (function (a) {
                    a["lock"] = true;
                    a["fixed"] = true;
                    a["resize"] = false;
                    a["background"] = "#000";
                    a["opacity"] = 0.5;
                })(dialog.defaults);
            },
            logout: function () {
                //alert(1)
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    //url: ajaxUrl,
                    //data: "ac=logout",
                    url: fn.url + "logout",
                    headers: {
                        Authorization:'Token '+url.getToken()
                    },
                    data: JSON.stringify({/*"token": url.getToken()*/}),
                    success: function (data) {
                        console.log('静态模拟注销成功！')
                        if (data.code == 0) {
                            location.href = "login.html";
                        } else {
                            //错误
                            art.dialog({
                                lock: true,
                                id: 'list',
                                esc: false,
                                content: data.message

                            })
                        }

                    }
                });
            },
            resize: function () {
                //调节窗口大小时，调用deskTop.resize(a)方法
                $(window).on("resize", function () {
                    deskTop.resize(200);
                });
            },
            getSkin: function () {
                return;
                console.log('}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}')
                $.ajax({
                    type: "GET",
                    //contentType: "application/json",
                    dataType: "json",
                    //url: ajaxUrl,
                    //data: "ac=getSkin",
                    url: fn.url + 'user_config',
                    headers: {
                        Authorization:'Token '+url.getToken()
                    },
                    data: {
                        // 'sql_type': 'select',
                        //'token': url.getToken()
                    },
                    success: function (b) {
                        if (b.code == 0) {
                            $("#window-skin",window.parent.document).remove();
                            var a = document.createElement("link");
                            a.rel = "stylesheet";
                            //a.href = "img/skins/" + b.result.skin + ".css?" + version;
                            a.href = "img/skins/" + b.result.skin + ".css";
                            a.id = "window-skin";
                            $("html",window.parent.document).find("head").append(a);
                        } else {
                            //错误
                            art.dialog({
                                lock: true,
                                id: 'list',
                                esc: false,
                                content: data.message

                            })
                        }

                    }
                });
            },
            help: function () {
                if ($.cookie("isLoginFirst") == null) {
                    $.cookie("isLoginFirst", "1", {expires: 95});
                    if (!$.browser.msie || ($.browser.msie && $.browser.version < 9)) {
                        $("body").append(helpTemp);
                        $("#step1").show();
                        $(".close").on("click", function () {
                            $("#help").remove();
                        });
                        $(".next").on("click", function () {
                            var b = $(this).parents(".step");
                            var a = b.attr("step");
                            b.hide();
                            $("#step" + (parseInt(a) + 1)).show();
                        });
                        $(".over").on("click", function () {
                            $("#help").remove();
                        });
                    }
                }
            }
        };
    })();

    exports.base = 300;
});