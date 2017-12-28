/**
 * Created by web on 2017/2/21.
 */
/*
 * app 方法
 */
define(function(){
    var CONFIG = require('./public').CONFIG;
    var url = require('./public').url;
    var grid = require('./grid').grid;
    var fn = require('./public').fn;
    var windows = require('./common').windows;
    var dock = require('./common').dock;
    var folderView = require('./common').folderView;
    var deskTop = require('./common').deskTop;
    var maskBox = require('./maskBox').maskBox;
    var widget = require('./widget').widget;
    var popupMenu = require('./popupMenu').popupMenu;
    var appmanage = require('./appmanage').appmanage;
    var wallpaper = require('./wallpaper').wallpaper;
    var addbtnTemp = require('./templates').addbtnTemp;
    var appbtnTemp = require('./templates').appbtnTemp;


    var app = (function () {
        return {
            getXY: function (a) {
              //return;
                $.ajax({
                    type: "GET",
                    contentType: "",
                    dataType: "json",
                    url: fn.url + "desktop",
                    headers: {
                        Authorization:'Token '+url.getToken()
                    },
                    data:{
                        //"token": url.getToken(),
                        // "sql_type":'select'
                    }
                }).done(function (b) {
                    console.log("静态模拟桌面图标的排放位置（X：横向，Y：纵向）：", b);
                    if (b.code == 0) {
                        //alert(b.result.layout)
                        //CONFIG.appXY = b.result.layout;
                    } else {
                        //error
                        //错误
                        art.dialog({
                            lock: true,
                            id: 'list',
                            esc: false,
                            content: data.message

                        })
                    }

                    if (typeof(a) == "function") {
                        a();
                    }
                });
            },
            add: function (c, b, a) {
                         $.ajax({
                             type: "POST",
                             dataType: "json",
                             // url: ajaxUrl,
                             //  data: "ac=addMyApp&id=" + c + "&type=" + b + "&desk=" + CONFIG.desk,
                             url: fn.url + "desktop",
                             headers: {
                                 Authorization:'Token '+url.getToken()
                             },
                             data: JSON.stringify({
                                 //"token": url.getToken(),
                                 // "sql_type": "insert",
                                 "child_id": c,
                                 "workspace_id": CONFIG.desk,
                                 "child_type": "app"
                             }),
                             success: function (data) {
                                 if (data.code == 0) {
                                     console.log('静态模拟桌面图标添加成功!',data);
                                     if (typeof(a) !== "undefined") {
                                         a();
                                     }
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
            move: function () {
                $("#dock-bar .dock-applist").off("mousedown", "li").on("mousedown", "li", function (f) {
                    f.preventDefault();
                    f.stopPropagation();
                    if (f.button == 0 || f.button == 1) {
                        var j = $(this),
                            h, g, b, a, k, i, d, c = $('<li id="shortcut_shadow">' + j.html() + "</li>");

                        k = b = f.clientX;
                        i = a = f.clientY;
                        h = k - j.offset().left;
                        g = i - j.offset().top;
                        $(document).on("mousemove", function (m) {
                            $("body").append(c);
                            d = maskBox.desk();
                            d.show();
                            b = m.clientX <= 0 ? 0 : m.clientX >= $(document).width() ? $(document).width() : m.clientX;
                            a = m.clientY <= 0 ? 0 : m.clientY >= $(document).height() ? $(document).height() : m.clientY;
                            _l = b - h;
                            _t = a - g;
                            if (k != b || i != a) {
                                c.css({left: _l, top: _t}).show();
                            }
                        }).on("mouseup", function () {
                            $(document).off("mousemove").off("mouseup");
                            c.remove();
                            if (typeof(d) !== "undefined") {
                                d.hide();
                            }
                            if (k == b && i == a) {
                                switch (j.attr("type")) {
                                    case "app":
                                    case "papp":
                                        windows.create(j.attr("realid"), j.attr("type"));
                                        break;
                                    case "widget":
                                    case "pwidget":
                                        widget.create(j.attr("realid"), j.attr("type"));
                                        break;
                                    case "folder":
                                        folderView.init(j);
                                        break;
                                }
                                return false;
                            }
                            var e = grid.searchFolderGrid(b, a);
                            if (e != null) {
                                if (j.hasClass("folder") == false) {
                                    //alert("app1");
                                    $.ajax({
                                        type: "POST",

                                        // url: ajaxUrl,
                                        // data: "ac=updateMyApp&movetype=dock-folder&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.index() + "&to=" + e + "&desk=" + CONFIG.desk,
                                        url: fn.url + "updateMyApp",
                                        contentType: "application/json",
                                        dataType: "json",
                                        headers: {
                                            Authorization:'Token '+url.getToken()
                                        },
                                        data: JSON.stringify({
                                            //"token": url.getToken(),
                                            "movetype": "dock-folder",
                                            "id": j.attr("realid"),
                                            "type": j.attr("type"),
                                            "from": j.index(),
                                            "to": e,
                                            "desk": CONFIG.desk
                                        }),
                                        success: function (data) {
                                            if (data.code == 0) {
                                                console.log('静态模拟应用码头中APP应用到文件夹成功！')
                                                j.remove();
                                                deskTop.appresize();
                                                // console.log($("#qv_"+e),$("#qv_"+e,window.parent.document))
                                                if ($("#qv_"+e,window.parent.document).length != 0) {
                                                    folderView.init($("#d_folder_" + e, window.parent.document));
                                                }
                                                if ($("#w_folder_" + e, window.parent.document).length != 0) {
                                                    windows.updateFolder(e, "folder");
                                                }
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
                            } else {
                                var o, p;
                                var s = $("#desk-" + CONFIG.desk + " li.appbtn:not(.add)", window.parent.document).length == 0 ? -1 : $("#desk-" + CONFIG.desk + " li", window.parent.document).index(j);
                                var n = $("#dock-bar .dock-applist").html() == "" ? -1 : $("#dock-bar .dock-applist li").index(j);
                                var q = CONFIG.dockPos == "left" ? 0 : CONFIG.dockPos == "top" ? ($(window).width() - $("#dock-bar .dock-applist").width() - 20) / 2 : $(window).width() - $("#dock-bar .dock-applist").width();
                                var u = CONFIG.dockPos == "top" ? 0 : ($(window).height() - $("#dock-bar .dock-applist").height() - 20) / 2;
                                p = grid.searchDockAppGrid(b - q, a - u);
                                if (p != null && p != j.index()) {
                                    //alert("app2");
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json",
                                        dataType: "json",
                                        //  url: ajaxUrl,
                                        //  data: "ac=updateMyApp&movetype=dock-dock&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.index() + "&to=" + p + "&desk=" + CONFIG.desk,
                                        url: fn.url + "updateMyApp",
                                        headers: {
                                            Authorization:'Token '+url.getToken()
                                        },
                                        data: JSON.stringify({
                                            //"token": url.getToken(),
                                            "movetype": "dock-dock",
                                            "id": j.attr("realid"),
                                            "type": j.attr("type"),
                                            "from": j.index(),
                                            "to": p,
                                            "desk": CONFIG.desk
                                        }),
                                        success: function (data) {
                                            if (data.code == 0) {
                                                console.log('静态模拟应用码头中APP应用到应用码头成功！')
                                                if (p < n) {
                                                    $("#dock-bar .dock-applist li:eq(" + p + ")").before(j);
                                                } else {
                                                    if (p > n) {
                                                        $("#dock-bar .dock-applist li:eq(" + p + ")").after(j);
                                                    }
                                                }
                                                deskTop.appresize();
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
                                } else {
                                    var m = CONFIG.dockPos == "left" ? 73 : 0;
                                    var r = CONFIG.dockPos == "top" ? 73 : 0;
                                    o = grid.searchAppGrid(b - m, a - r);
                                    if (o != null) {
                                        //alert("app3");
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json",
                                            dataType: "json",
                                            //url: ajaxUrl,
                                            //data: "ac=updateMyApp&movetype=dock-desk&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.index() + "&to=" + (o + 1) + "&desk=" + CONFIG.desk,
                                            url: fn.url + "updateMyApp",
                                            headers: {
                                                Authorization:'Token '+url.getToken()
                                            },
                                            data: JSON.stringify({
                                                //"token": url.getToken(),
                                                "movetype": "dock-desk",
                                                "id": j.attr("realid"),
                                                "type": j.attr("type"),
                                                "from": j.index(),
                                                "to": (o + 1),
                                                "desk": CONFIG.desk
                                            }),
                                            success: function (data) {
                                                console.log('静态模拟应用码头中APP应用到桌面成功！')
                                                if (data.code == 0) {
                                                    if (o < s) {
                                                        $("#desk-" + CONFIG.desk + " li:not(.add):eq(" + o + ")").before(j);
                                                    } else {
                                                        if (o > s) {
                                                            $("#desk-" + CONFIG.desk + " li:not(.add):eq(" + o + ")").after(j);
                                                        } else {
                                                            if (s == -1) {
                                                                $("#desk-" + CONFIG.desk + " li.add").before(j);
                                                            }
                                                        }
                                                    }
                                                    deskTop.appresize();
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
                                }
                            }
                        });
                    }
                    return false;
                });
                $("#desk .desktop-container").off("mousedown", "li:not(.add)").on("mousedown", "li:not(.add)", function (f) {
                    f.preventDefault();
                    f.stopPropagation();
                    if (f.button == 0 || f.button == 1) {
                        var j = $(this),
                            h, g, b, a, k, i, d, c = $('<li id="shortcut_shadow">' + j.html() + "</li>");
                        console.log("APP应用拖动时原有信息:", j);
                        k = b = f.clientX;
                        i = a = f.clientY;
                        h = k - j.offset().left;
                        g = i - j.offset().top;
                        $(document).on("mousemove", function (m) {
                            $("body").append(c);
                            d = maskBox.desk();
                            d.show();
                            b = m.clientX <= 0 ? 0 : m.clientX >= $(document).width() ? $(document).width() : m.clientX;
                            a = m.clientY <= 0 ? 0 : m.clientY >= $(document).height() ? $(document).height() : m.clientY;
                            _l = b - h;
                            _t = a - g;
                            if (k != b || i != a) {
                                c.css({left: _l, top: _t}).show();
                            }
                        }).on("mouseup", function () {
                            $(document).off("mousemove").off("mouseup");
                            c.remove();
                            if (typeof(d) !== "undefined") {
                                d.hide();
                            }
                            if (k == b && i == a) {
                                switch (j.attr("type")) {
                                    case "app":
                                    case "papp":
                                        windows.create(j.attr("realid"), j.attr("type"));
                                        break;
                                    case "widget":
                                    case "pwidget":
                                        widget.create(j.attr("realid"), j.attr("type"));
                                        break;
                                    case "folder":
                                        folderView.init(j);
                                        break;
                                }
                                return false;
                            }
                            var e = grid.searchFolderGrid(b, a);
                            if (e != null) {
                                if (j.attr("type") != "folder") {
                                    //alert("app4");
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json",
                                        dataType: "json",
                                        //url: ajaxUrl,
                                        //data: "ac=updateMyApp&movetype=desk-folder&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + (j.index() - 2) + "&to=" + e + "&desk=" + CONFIG.desk,
                                        url: fn.url + "updateMyApp",
                                        headers: {
                                            Authorization:'Token '+url.getToken()
                                        },
                                        data: JSON.stringify({
                                            //"token": url.getToken(),
                                            "movetype": "desk-folder",
                                            "id": j.attr("realid"),
                                            "type": j.attr("type"),
                                            "from": (j.index() - 2),
                                            "to": e,
                                            "desk": CONFIG.desk
                                        }),
                                        success: function (data) {
                                            if (data.code == 0) {
                                                console.log("静态模拟桌面APP应用到文件夹成功！")
                                                j.remove();
                                                deskTop.appresize();
                                                if ($("#qv_" + e).length != 0) {
                                                    folderView.init($("#d_folder_" + e));
                                                }
                                                if ($("#w_folder_" + e).length != 0) {
                                                    windows.updateFolder(e, "folder");
                                                }
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
                            } else {
                                var o, p;
                                var s = $("#desk-" + CONFIG.desk + " li.appbtn:not(.add)", window.parent.document).length == 0 ? -1 : $("#desk-" + CONFIG.desk + " li", window.parent.document).index(j);
                                var n = $("#dock-bar .dock-applist").html() == "" ? -1 : $("#dock-bar .dock-applist li").index(j);
                                var q = CONFIG.dockPos == "left" ? 0 : CONFIG.dockPos == "top" ? ($(window).width() - $("#dock-bar .dock-applist").width() - 20) / 2 : $(window).width() - $("#dock-bar .dock-applist").width();
                                var u = CONFIG.dockPos == "top" ? 0 : ($(window).height() - $("#dock-bar .dock-applist").height() - 20) / 2;
                                p = grid.searchDockAppGrid(b - q, a - u);
                                if (p != null) {
                                    //alert("app5");
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json",
                                        dataType: "json",
                                        //url: ajaxUrl,
                                        //data: "ac=updateMyApp&movetype=desk-dock&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + (j.index() - 2) + "&to=" + (p + 1) + "&desk=" + CONFIG.desk,
                                        url: fn.url + "updateMyApp",
                                        headers: {
                                            Authorization:'Token '+url.getToken()
                                        },
                                        data: JSON.stringify({
                                            //"token": url.getToken(),
                                            "movetype": "desk-dock",
                                            "id": j.attr("realid"),
                                            "type": j.attr("type"),
                                            "from": (j.index() - 2),
                                            "to": (p + 1),
                                            "desk": CONFIG.desk
                                        }),
                                        success: function (data) {
                                            if (data.code == 0) {
                                                console.log('静态模拟桌面APP应用到应用码头成功！')
                                                if (p < n) {
                                                    $("#dock-bar .dock-applist li:eq(" + p + ")").before(j);
                                                } else {
                                                    if (p > n) {
                                                        $("#dock-bar .dock-applist li:eq(" + p + ")").after(j);
                                                    } else {
                                                        if (n == -1) {
                                                            $("#dock-bar .dock-applist").append(j);
                                                        }
                                                    }
                                                }
                                                if ($("#dock-bar .dock-applist li").length > 7) {
                                                    $("#desk-" + CONFIG.desk + " li.add").before($("#dock-bar .dock-applist li").last());
                                                }
                                                deskTop.appresize();
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
                                } else {
                                    var m = CONFIG.dockPos == "left" ? 73 : 0;
                                    var r = CONFIG.dockPos == "top" ? 73 : 0;
                                    o = grid.searchAppGrid(b - m, a - r);
                                    if (o != null && o != (j.index() - 2)) {
                                        //alert("app6");
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json",
                                            dataType: "json",
                                            //url: ajaxUrl,
                                            //data: "ac=updateMyApp&movetype=desk-desk&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + (j.index() - 2) + "&to=" + o + "&desk=" + CONFIG.desk,
                                            url: fn.url + "updateMyApp",
                                            headers: {
                                                Authorization:'Token '+url.getToken()
                                            },
                                            data: JSON.stringify({
                                                //"token": url.getToken(),
                                                "movetype": "desk-desk",
                                                "id": j.attr("realid"),
                                                "type": j.attr("type"),
                                                "from": (j.index() - 2),
                                                "to": o,
                                                "desk": CONFIG.desk
                                            }),
                                            success: function (data) {
                                                if (data.code == 0) {
                                                    console.log('静态模拟桌面APP应用到桌面成功！')
                                                    if (o < s) {
                                                        $("#desk-" + CONFIG.desk + " li:not(.add):eq(" + o + ")").before(j);
                                                    } else {
                                                        if (o > s) {
                                                            $("#desk-" + CONFIG.desk + " li:not(.add):eq(" + o + ")").after(j);
                                                        } else {
                                                            if (s == -1) {
                                                                $("#desk-" + CONFIG.desk + " li.add").before(j);
                                                            }
                                                        }
                                                    }
                                                    deskTop.appresize();
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
                                }
                            }
                        });
                    }
                });
                $(".folder_body, .quick_view_container", window.parent.document).off("mousedown", "li").on("mousedown", "li", function (f) {
                    f.preventDefault();
                    f.stopPropagation();
                    if (f.button == 0 || f.button == 1) {
                        var j = $(this),
                            h, g, b, a, k, i, d, c = $('<li id="shortcut_shadow">' + j.html() + "</li>");
                        k = b = f.clientX;
                        i = a = f.clientY;
                        h = k - j.offset().left;
                        g = i - j.offset().top;
                        $(document).on("mousemove", function (m) {
                            $("body").append(c);
                            d = maskBox.desk();
                            d.show();
                            b = m.clientX <= 0 ? 0 : m.clientX >= $(document).width() ? $(document).width() : m.clientX;
                            a = m.clientY <= 0 ? 0 : m.clientY >= $(document).height() ? $(document).height() : m.clientY;
                            _l = b - h;
                            _t = a - g;
                            if (k != b || i != a) {
                                c.css({left: _l, top: _t}).show();
                            }
                        }).on("mouseup", function () {
                            $(document).off("mousemove").off("mouseup");
                            c.remove();
                            if (typeof(d) !== "undefined") {
                                d.hide();
                            }
                            if (k == b && i == a) {
                                switch (j.attr("type")) {
                                    case "app":
                                    case "papp":
                                        windows.create(j.attr("realid"), j.attr("type"));
                                        break;
                                    case "widget":
                                    case "pwidget":
                                        widget.create(j.attr("realid"), j.attr("type"));
                                        break;
                                }
                                return false;
                            }
                            var e = grid.searchFolderGrid(b, a);
                            if (e != null) {
                                if (j.parents(".folder-window").attr("realid") != e) {
                                    //alert("app7");
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json",
                                        dataType: "json",
                                        // url: ajaxUrl,
                                        //  data: "ac=updateMyApp&movetype=folder-folder&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.parents(".folder-window").attr("realid") + "&to=" + e + "&desk=" + CONFIG.desk,
                                        url: fn.url + "updateMyApp",
                                        headers: {
                                            Authorization:'Token '+url.getToken()
                                        },
                                        data: JSON.stringify({
                                            //"token": url.getToken(),
                                            "movetype": "folder-folder",
                                            "id": j.attr("realid"),
                                            "type": j.attr("type"),
                                            "from": j.parents(".folder-window").attr("realid"),
                                            "to": e,
                                            "desk": CONFIG.desk
                                        }),
                                        success: function (data) {
                                            if (data.code == 0) {
                                                console.log('静态模拟文件夹中APP应用到文件夹成功！');
                                                j.remove();
                                                deskTop.appresize();
                                                if ($("#qv_" + e).length != 0) {
                                                    folderView.init($("#d_folder_" + e));
                                                }
                                                if ($("#w_folder_" + e).length != 0) {
                                                    windows.updateFolder(e, "folder");
                                                }
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
                            } else {
                                var o, p;
                                var s = $("#desk-" + CONFIG.desk + " li.appbtn:not(.add)", window.parent.document).length == 0 ? -1 : $("#desk-" + CONFIG.desk + " li", window.parent.document).index(j);
                                var n = $("#dock-bar .dock-applist").html() == "" ? -1 : $("#dock-bar .dock-applist li").index(j);
                                var q = CONFIG.dockPos == "left" ? 0 : CONFIG.dockPos == "top" ? ($(window).width() - $("#dock-bar .dock-applist").width() - 20) / 2 : $(window).width() - $("#dock-bar .dock-applist").width();
                                var u = CONFIG.dockPos == "top" ? 0 : ($(window).height() - $("#dock-bar .dock-applist").height() - 20) / 2;
                                p = grid.searchDockAppGrid(b - q, a - u);
                                if (p != null) {
                                    //alert("app8");
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json",
                                        dataType: "json",
                                        //url: ajaxUrl,
                                        //data: "ac=updateMyApp&movetype=folder-dock&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.parents(".folder-window").attr("realid") + "&to=" + (p + 1) + "&desk=" + CONFIG.desk,
                                        url: fn.url + "updateMyApp",
                                        headers: {
                                            Authorization:'Token '+url.getToken()
                                        },
                                        data: JSON.stringify({
                                            //"token": url.getToken(),
                                            "movetype": "folder-dock",
                                            "id": j.attr("realid"),
                                            "type": j.attr("type"),
                                            "from": j.parents(".folder-window").attr("realid"),
                                            "to": (p + 1),
                                            "desk": CONFIG.desk
                                        }),
                                        success: function (data) {
                                            if (data.code == 0) {
                                                console.log('静态模拟文件夹中APP应用到应用码头成功！')
                                                var v = j.parents(".folder-window").attr("realid");
                                                if (p < n) {
                                                    $("#dock-bar .dock-applist li.appbtn:not(.add):eq(" + p + ")", window.parent.document).before(j);
                                                } else {
                                                    if (p > n) {
                                                        $("#dock-bar .dock-applist li.appbtn:not(.add):eq(" + p + ")", window.parent.document).after(j);
                                                    } else {
                                                        if (n == -1) {
                                                            $("#dock-bar .dock-applist", window.parent.document).append(j);
                                                        }
                                                    }
                                                }
                                                if ($("#dock-bar .dock-applist li", window.parent.document).length > 7) {
                                                    $("#desk-" + CONFIG.desk + " li.add", window.parent.document).before($("#dock-bar .dock-applist li", window.parent.document).last());
                                                }
                                                deskTop.appresize();
                                                if ($("#qv_" + v, window.parent.document).length != 0) {
                                                    folderView.init($("#d_folder_" + v, window.parent.document));
                                                }
                                                if ($("#w_folder_" + v, window.parent.document).length != 0) {
                                                    windows.updateFolder(v, "folder");
                                                }
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
                                } else {
                                    var m = CONFIG.dockPos == "left" ? 73 : 0;
                                    var r = CONFIG.dockPos == "top" ? 73 : 0;
                                    o = grid.searchAppGrid(b - m, a - r);
                                    if (o != null) {
                                        //alert("app9");
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json",
                                            dataType: "json",
                                            //url: ajaxUrl,
                                            //data: "ac=updateMyApp&movetype=folder-desk&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.parents(".folder-window").attr("realid") + "&to=" + (o + 1) + "&desk=" + CONFIG.desk,
                                            url: fn.url + "updateMyApp",
                                            headers: {
                                                Authorization:'Token '+url.getToken()
                                            },
                                            data: JSON.stringify({
                                                //"token": url.getToken(),
                                                "movetype": "folder-desk",
                                                "id": j.attr("realid"),
                                                "type": j.attr("type"),
                                                "from": j.parents(".folder-window").attr("realid"),
                                                "to": (o + 1),
                                                "desk": CONFIG.desk
                                            }),
                                            success: function (data) {
                                                if (data.code == 0) {
                                                    console.log('静态模拟文件夹中APP应用到桌面成功！');
                                                    var v = j.parents(".folder-window").attr("realid");
                                                    if (o < s) {
                                                        $("#desk-" + CONFIG.desk + " li.appbtn:not(.add):eq(" + o + ")").before(j);
                                                    } else {
                                                        if (o > s) {
                                                            $("#desk-" + CONFIG.desk + " li.appbtn:not(.add):eq(" + o + ")").after(j);
                                                        } else {
                                                            if (s == -1) {
                                                                $("#desk-" + CONFIG.desk + " li.add").before(j);
                                                            }
                                                        }
                                                    }
                                                    deskTop.appresize();
                                                    if ($("#qv_" + v).length != 0) {
                                                        folderView.init($("#d_folder_" + v));
                                                    }
                                                    if ($("#w_folder_" + v).length != 0) {
                                                        windows.updateFolder(v, "folder");
                                                    }
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
                                }
                            }
                        });
                    }
                });
            }
        };
    })();

    exports.app = app;
});