
define(function () {

    var fn = require('./public').fn;
    var url = require('./public').url;
    var CONFIG = require('./public').CONFIG;
    var wallpaper = (function () {
        return {
            get: function (a,noreturn) {
                  if (typeof(a) != "undefined") {
                    window.setWallpaper=a;
                  }
                  if(!noreturn) return;
                $.ajax({
                    type: "GET",
                    //contentType: "",
                    dataType: "json",
                    //url: ajaxUrl,
                    //url: fn.url + 'getWallpaper.json',
                    url: fn.url + "user_config",
                    // url: fn.url + "user_wallpaper",
                    // url: "http://yundesktest.moviewisdom.cn/yunos/uploads/user_wallpaper",
                    headers: {
                        Authorization:'Token '+url.getToken()
                    },
                    // data: JSON.stringify({
                        //"token": url.getToken(),
                        // "sql_type":'select'
                    // })
                    success: function (c) {
                        //alert("success")
                        console.log("获取壁纸", c);
                        //var b = c.split("<{|}>");
                        //console.log(b[0])
                        if (c.code == 0) {
                            //CONFIG.wallpaperState = c.result.wallpaperstate;
                            //switch (c.result.wallpaperstate) {
                            //    case 1:
                            //    case 2:
                                    CONFIG.wallpaper = c.result.wallpaper.url;
                                    CONFIG.wallpaperType = c.result.wallpaper_style;
                                    localStorage.wallpaperUrl=CONFIG.wallpaper;
                            //alert(CONFIG.wallpaper)

                            //CONFIG.wallpaperWidth = c.result.width;
                                    //CONFIG.wallpaperHeight = c.result.height;
                            //        break;
                            //    case 3:
                            //        CONFIG.wallpaper = c.result.wallpaper.url;
                            //        break;
                            //}
                            if (typeof(a) != "undefined") {
                                a();
                            }
                        } else {
                            //错误
                            art.dialog({
                                lock: true,
                                id: 'list',
                                esc: false,
                                content: c.message

                            })
                        }
                    }

                });
            },
            set: function (f) {
                var f = typeof(f) == "undefined" ? true : f;
                if (f) {
                    $("#zoomWallpaperGrid",window.parent.document).remove();
                }
                var b = $(window.parent.document).width(),
                    e = $(window.parent.document).height();
                // setInterval(function(){
                //   console.log(CONFIG.wallpaper)
                // },1000)

                // alert(CONFIG.wallpaperHeight)
                //alert( CONFIG.wallpaper);
                //switch (CONFIG.wallpaperState) {
                //    case 1:
                //    case 2:
                if(localStorage["wallpaperUrl"]){
                    CONFIG.wallpaper=localStorage["wallpaperUrl"];
                }
                        switch (CONFIG.wallpaperType) {
                            case "pingpu":
                                if (f) {
                                    $("body", window.parent.document).append('<div id="zoomWallpaperGrid" style="position:absolute;z-index:-10;top:0;left:0;height:100%;width:100%;background:url(' + CONFIG.wallpaper + ') repeat"></div>');
                                }
                                break;
                            case "juzhong":
                                if (f) {
                                    $("body", window.parent.document).append('<div id="zoomWallpaperGrid" style="position:absolute;z-index:-10;top:0;left:0;height:100%;width:100%;background:url(' + CONFIG.wallpaper + ') no-repeat 50% 50%"></div>');
                                }
                                break;
                            case "tianchong":
                                var c = (e - CONFIG.wallpaperHeight) / 2,
                                    a = (b - CONFIG.wallpaperWidth) / 2;
                                if (f) {
                                    $("body", window.parent.document).append('<div id="zoomWallpaperGrid" style="position:absolute;z-index:-10;left:0;top:0;overflow:hidden;height:' + e + "px;width:" + b + 'px"><img id="zoomWallpaper" style="position:absolute;height:' + CONFIG.wallpaperHeight + "px;width:" + CONFIG.wallpaperWidth + "px;top:" + c + "px;left:" + a + 'px"><div style="position:absolute;height:' + e + "px;width:" + b + 'px;background:#fff;opacity:0;filter:alpha(opacity=0)"></div></div>');
                                    $("#zoomWallpaper", window.parent.document).attr("src", CONFIG.wallpaper).on("load", function () {
                                        $(this).show();
                                    });
                                } else {
                                    $("#zoomWallpaperGrid, #zoomWallpaperGrid div").css({
                                        height: e + "px",
                                        width: b + "px"
                                    });
                                    $("#zoomWallpaper").css({top: c + "px", left: a + "px"});
                                }
                                break;
                            case "shiying":
                                var g, d, c, a;
                                if (CONFIG.wallpaperHeight / CONFIG.wallpaperWidth > e / b) {
                                    g = e;
                                    d = CONFIG.wallpaperWidth * (e / CONFIG.wallpaperHeight);
                                    c = 0;
                                    a = (b - d) / 2;
                                } else {
                                    if (CONFIG.wallpaperHeight / CONFIG.wallpaperWidth < e / b) {
                                        d = b;
                                        g = CONFIG.wallpaperHeight * (b / CONFIG.wallpaperWidth);
                                        a = 0;
                                        c = (e - g) / 2;
                                    } else {
                                        g = CONFIG.wallpaperHeight;
                                        d = CONFIG.wallpaperWidth;
                                        c = a = 0;
                                    }
                                }
                                if (f) {
                                    $("body", window.parent.document).append('<div id="zoomWallpaperGrid" style="position:absolute;z-index:-10;left:0;top:0;overflow:hidden;height:' + e + "px;width:" + b + 'px"><img id="zoomWallpaper" style="position:absolute;height:' + g + "px;width:" + d + "px;top:" + c + "px;left:" + a + 'px"><div style="position:absolute;height:' + e + "px;width:" + b + 'px;background:#fff;opacity:0;filter:alpha(opacity=0)"></div></div>');
                                    $("#zoomWallpaper",window.parent.document).attr("src", CONFIG.wallpaper).on("load", function () {
                                        $(this).show();
                                    });
                                } else {
                                    $("#zoomWallpaperGrid, #zoomWallpaperGrid div",window.parent.document).css({
                                        height: e + "px",
                                        width: b + "px"
                                    });
                                    $("#zoomWallpaper",window.parent.document).css({
                                        height: g + "px",
                                        width: d + "px",
                                        top: c + "px",
                                        left: a + "px"
                                    });
                                }
                                break;
                            case "lashen":
                                if (f) {
                                    $("body", window.parent.document).append('<div id="zoomWallpaperGrid" style="position:absolute;z-index:-10;left:0;top:0;overflow:hidden;height:' + e + "px;width:" + b + 'px"><img id="zoomWallpaper" style="position:absolute;height:' + e + "px;width:" + b + 'px;top:0;left:0"><div style="position:absolute;height:' + e + "px;width:" + b + 'px;background:#fff;opacity:0;filter:alpha(opacity=0)"></div></div>');
                                    $("#zoomWallpaper",window.parent.document).attr("src", CONFIG.wallpaper).on("load", function () {
                                        $(this).show();
                                    });
                                } else {
                                    $("#zoomWallpaperGrid",window.parent.document).css({
                                        height: e + "px",
                                        width: b + "px"
                                    }).children("#zoomWallpaper, div").css({height: e + "px", width: b + "px"});
                                }
                                break;
                          default:
                            if (f) {
                              $("body", window.parent.document).append('<div id="zoomWallpaperGrid" style="position:absolute;z-index:-10;left:0;top:0;overflow:hidden;height:' + e + "px;width:" + b + 'px"><img id="zoomWallpaper" style="position:absolute;height:' + e + "px;width:" + b + 'px;top:0;left:0"><div style="position:absolute;height:' + e + "px;width:" + b + 'px;background:#fff;opacity:0;filter:alpha(opacity=0)"></div></div>');
                              $("#zoomWallpaper",window.parent.document).attr("src", CONFIG.wallpaper).on("load", function () {
                                $(this).show();
                              });
                            } else {
                              $("#zoomWallpaperGrid",window.parent.document).css({
                                height: e + "px",
                                width: b + "px"
                              }).children("#zoomWallpaper, div").css({height: e + "px", width: b + "px"});
                            }
                        }
                        //break;
                    //case 3:
                //所有壁纸设置在页面添加元素的方法都写在这里
                //        if (f) {
                //            $("body",window.parent.document).append('<div id="zoomWallpaperGrid" style="position:absolute;z-index:-10;top:0;left:0;height:1080px;width:1920px;overflow:hidden"><div></div><iframe id="iframeWallpaper" frameborder="no" border="0" class="iframeWallpaper" style="position:absolute;left:0;top:0;overflow:hidden;width:100%;height:100%" src="' + CONFIG.wallpaper + '"></iframe></div>');
                //        }
                        //break;
                //}
            },
            update: function (b, c, a, d) {
                console.log('+++++++++++++++++++++++');
                console.log(b, c, a, d);

                $.ajax({
                    type: "PUT",
                    //contentType: "application/json",
                    dataType: "json",
                    //url: fn.url + 'setWallpaper.json',
                    url: fn.url + 'user_config',
                    // url: fn.url + 'user_wallpaper',
                    // url: 'http://yundesktest.moviewisdom.cn/yunos/uploads/user_wallpaper',
                    headers: {
                        Authorization:'Token '+url.getToken()
                    },
                    data: JSON.stringify({
                        // "sql_type":"update",
                        //"token": url.getToken(),
                        "wallpaper_type": b,
                        "wallpaper_style": c,
                        //"wallpaper": a,
                        "wallpaper_id": d
                    }),

                    //url: "http://api/desktop/moviewisdom.cn/setWallpaper"
                    // data: "ac=setWallpaper&wpstate=" + b + "&wptype=" + c + "&wp=" + a,
                    success: function (data) {
                        console.log('静态模拟壁纸更新成功！',data)
                        if (data.code == 0) {
                            wallpaper.get(function () {
                                // 追加的代码开始 后期得取消
                                CONFIG.wallpaperState = b;
                                CONFIG.wallpaper = a;
                                CONFIG.wallpaperType = c;
                                //alert(b)
                                // 追加的代码结束 后期得取消
                              localStorage.wallpaperUrl=CONFIG.wallpaper;
                              console.log(CONFIG.wallpaper,'urldizhi')
                                wallpaper.set();
                            },true);
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
            }
        };
    })();


    exports.wallpaper = wallpaper;
});