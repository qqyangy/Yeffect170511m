/**
 * Created by PC07 on 2017/2/28.
 */
define(function () {
    var TEMP = {};
    var widget = require("./widget").widget;
    var grid = require("./grid").grid;
    var CONFIG = require("./public").CONFIG;
    var maskBox = require("./maskBox").maskBox;
    var wallpaper = require("./wallpaper").wallpaper;
    var fn = require("./public").fn;
    var url = require("./public").url;
    var msgboxshow = require("./zylibs/zylibs").msgboxshow;
    var msgbox_hide = require("./zylibs/zylibs").msgbox_hide;
    var appbtnTemp = require("./templates").appbtnTemp;
    var addbtnTemp = require("./templates").addbtnTemp;
    var editFolderDialogTemp = require("./templates").editFolderDialogTemp;
    var folderViewTemp = require("./templates").folderViewTemp;
    var folderWindowTemp = require("./templates").folderWindowTemp;
    var windowTemp = require("./templates").windowTemp;
    var taskTemp = require("./templates").taskTemp;
    var dialog = require("./artDialog4.1.6/jquery.artDialog.source").dialog;


    var app = (function () {
        return {
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
                                        var _x = $(window).width();
                                        var _y = $(window).height();

                                        windows.create(j.attr("realid"), j.attr("type"), _x, _y);
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
                                    //alert(1);
                                    console.log(j.index());
                                    console.log(e);
                                    $.ajax({
                                        type: "PUT",

                                        // url: ajaxUrl,
                                        // data: "ac=updateMyApp&movetype=dock-folder&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.index() + "&to=" + e + "&desk=" + CONFIG.desk,
                                        url: fn.url + "desk/desktop",
                                        headers: {
                                            Authorization: 'Token ' + url.getToken()
                                        },
                                        // contentType: "application/json",
                                        dataType: "json",
                                        data: JSON.stringify({
                                            //"token": url.getToken(),
                                            // "sql_type": "update",
                                            "from_manager": "dock",
                                            "from_manager_id": 1,
                                            "to_manager": "folder",
                                            "to_manager_id": e,
                                            "child_id": j.attr("realid"),
                                            "child_type": j.attr("type")
                                            // "to_index": ""
                                            // "to_child_id": j.attr("realid"),
                                            // "to_child_type":j.attr("type")
                                            // "movetype": "dock-folder",
                                            // "id": j.attr("realid"),
                                            // "type": j.attr("type"),
                                            // "from": j.index(),
                                            // "to": e,
                                            // "desk": CONFIG.desk
                                        }),
                                        success: function (data) {
                                            if (data.code == 0) {
                                                console.log('静态模拟应用码头中APP应用到文件夹成功！')
                                                j.remove();
                                                deskTop.appresize();
                                                // console.log($("#qv_"+e),$("#qv_"+e,window.parent.document))
                                                if ($("#qv_" + e, window.parent.document).length != 0) {
                                                    folderView.init($("#d_folder_" + e, window.parent.document));
                                                }
                                                if ($("#w_folder_" + e, window.parent.document).length != 0) {
                                                    windows.updateFolder(e, "folder");
                                                }
                                            } else {
                                                //错误
                                                dialog({
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
                                    //alert(2);
                                    console.log("from:" + j.index(), "to:" + p)
                                    $.ajax({
                                        type: "PUT",
                                        // contentType: "application/json",
                                        dataType: "json",
                                        //  url: ajaxUrl,
                                        //  data: "ac=updateMyApp&movetype=dock-dock&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.index() + "&to=" + p + "&desk=" + CONFIG.desk,
                                        url: fn.url + "desk/desktop",
                                        headers: {
                                            Authorization: 'Token ' + url.getToken()
                                        },
                                        data: JSON.stringify({
                                            //"token": url.getToken(),
                                            // "sql_type": "update",
                                            "from_manager": "dock",
                                            "from_manager_id": 1,
                                            "to_manager": "dock",
                                            "to_manager_id": 1,
                                            "child_id": j.attr("realid"),
                                            "child_type": j.attr("type"),
                                            "to_index": p
                                            // "movetype": "dock-dock",
                                            // "id": j.attr("realid"),
                                            // "type": j.attr("type"),
                                            // "from": j.index(),
                                            // "to": p,
                                            // "desk": CONFIG.desk
                                        }),
                                        success: function (data) {
                                            if (data.code == 0) {
                                                console.log('静态模拟应用码头中APP应用到应用码头成功！')
                                                console.log(data)
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
                                                dialog({
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
                                        //alert(3);
                                        console.log(o + 1)
                                        $.ajax({
                                            type: "PUT",
                                            // contentType: "application/json",
                                            dataType: "json",
                                            //url: ajaxUrl,
                                            //data: "ac=updateMyApp&movetype=dock-desk&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.index() + "&to=" + (o + 1) + "&desk=" + CONFIG.desk,
                                            url: fn.url + "desktop",
                                            headers: {
                                                Authorization: 'Token ' + url.getToken()
                                            },
                                            data: JSON.stringify({
                                                //"token": url.getToken(),
                                                // "sql_type": "update",
                                                "from_manager": "dock",
                                                "from_manager_id": 1,
                                                "to_manager": "workspace",
                                                "to_manager_id": CONFIG.desk,
                                                "child_id": j.attr("realid"),
                                                "child_type": j.attr("type"),
                                                "to_index": (o + 1)
                                                // "movetype": "dock-desk",
                                                // "id": j.attr("realid"),
                                                // "type": j.attr("type"),
                                                // "from": j.index(),
                                                // "to": (o + 1),
                                                // "desk": CONFIG.desk
                                            }),
                                            success: function (data) {
                                                console.log('静态模拟应用码头中APP应用到桌面成功！')
                                                //$(CONFIG.dockContent).each(function (i) {
                                                //    alert(CONFIG.dockContent[i])
                                                //    if (CONFIG.dockContent[i] == 'd_' + j.attr("type") + '_' + j.attr("realid")) {
                                                //        // alert(CONFIG.dockContent[i])
                                                //        if (CONFIG.dockContent[i] == 'd_' + j.attr("type") + '_' + j.attr("realid")) {
                                                //            CONFIG.dockContent.splice(i, 1);
                                                //        }
                                                //    }
                                                //})
                                                //CONFIG.manager = "workspace"
                                                //fn.L_storage.setItem('CONFIG.dockContent', CONFIG.dockContent);
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
                                                    dialog({
                                                        lock: true,
                                                        id: 'list',
                                                        esc: false,
                                                        content: data.message

                                                    })
                                                }
                                                deskTop.appresize();
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                    return false;
                });
                var $desk=$("#desk .desktop-container").eq(0);
                function getPostionClass(x,y){
                  $desk.find(">li").removeClass("hover").each(function(){
                    var _this=$(this);
                    if(_this.attr("type")=="folder"){
                        var _L=parseInt(_this.css("left"))+$desk.offset().left;
                        var _T=parseInt(_this.css("top"))+$desk.offset().top;
                        if(Math.abs(x-_L)<30 && Math.abs(y-_T)<30){
                          _this.addClass("hover");
                        }
                    }
                  });
                }
                var clicktype=0;/*单击与双击判断时间戳*/
                $("#desk .desktop-container").off("mousedown", "li:not(.add)").on("mousedown", "li:not(.add)", function (f) {
                    f.preventDefault();
                    f.stopPropagation();
                    console.log(11111)
                    if (f.button == 0 || f.button == 1) {
                        var j = $(this),
                            h, g, b, a, k, i, d, c = $('<li id="shortcut_shadow">' + j.html() + "</li>");
                        if(j.hasClass("child")){
                            c.addClass("child");
                        }else{
                            c.removeClass("child");
                        }
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
                              getPostionClass(_l,_t);
                            }
                        }).on("mouseup", function () {
                            console.log("单击");
                            $(document).off("mousemove").off("mouseup");
                            c.remove();
                            if (typeof(d) !== "undefined") {
                                d.hide();
                            }
                            if (k == b && i == a) {
                                console.log("------------------------------------"+j.attr("type")+"---------------------------------------------------------")
                                switch (j.attr("type")) {
                                    case "app":
                                    case "papp":
                                        var gettime=Date.now();
                                        $("#desktop #desk-1 li").removeClass("hover");
                                        if(Math.abs(gettime-clicktype)>300){
                                          j.addClass("hover");
                                          clicktype=gettime;
                                        }else{
                                          j.removeClass("hover");
                                          var _x = $(window).width();
                                          var _y = $(window).height();
                                          windows.create(j.attr("realid"), j.attr("type"), _x, _y,j);
                                        }
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
                            var _lihover=$desk.find("li.hover");
                            if (e != null || _lihover.length>0) {
                                e=_lihover.attr("realid");
                                if (j.attr("type") != "folder") {
                                    //alert(4);
                                    console.log(CONFIG.desk, e, 'd_folder_' + e, j.attr("realid"), j.attr("type"),"sssssssssssssss")
                                    $.ajax({
                                        type: "PUT",
                                        // contentType: "application/json",
                                        dataType: "json",
                                        //url: ajaxUrl,
                                        //data: "ac=updateMyApp&movetype=desk-folder&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + (j.index() - 2) + "&to=" + e + "&desk=" + CONFIG.desk,
                                        url: fn.url + "desktop",
                                        headers: {
                                            Authorization: 'Token ' + url.getToken()
                                        },
                                        data: JSON.stringify({
                                            //"token": url.getToken(),
                                            // "sql_type": "update",
                                            "from_manager": "workspace",
                                            "from_manager_id": CONFIG.desk,
                                            "to_manager": "folder",
                                            "to_manager_id": e,
                                            "child_id": j.attr("realid"),
                                            "child_type": j.attr("type")
                                            // "to_index": ""
                                            // "to_child_id": j.attr("realid"),
                                            // "to_child_type":j.attr("type")
                                            // "movetype": "desk-folder",
                                            // "id": j.attr("realid"),
                                            // "type": j.attr("type"),
                                            // "from": (j.index() - 2),
                                            // "to": e,
                                            // "desk": CONFIG.desk
                                        }),
                                        success: function (data) {
                                            if (data.code == 0) {
                                                console.log("静态模拟桌面APP应用到文件夹成功！")
                                                j.remove();
                                                deskTop.appresize();
                                                console.log($("#qv_" + e).length, $("#w_folder_" + e).length);
                                                if ($("#qv_" + e).length != 0) {
                                                    folderView.init($("#d_folder_" + e));
                                                }
                                                if ($("#w_folder_" + e).length != 0) {
                                                    windows.updateFolder(e, "folder");
                                                }
                                              _lihover.addClass("child").find("p").append("<font class='appbtn"+j.attr("realid")+"' realid='"+j.attr("realid")+"' type='app'><img src='"+j.find("img").attr("src")+"'></font>");
                                            } else {
                                                //错误
                                                dialog({
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
                                    //alert(5)
                                    console.log(p + 1);


                                    $.ajax({
                                        type: "PUT",
                                        // contentType: "application/json",
                                        dataType: "json",
                                        //url: ajaxUrl,
                                        //data: "ac=updateMyApp&movetype=desk-dock&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + (j.index() - 2) + "&to=" + (p + 1) + "&desk=" + CONFIG.desk,
                                        url: fn.url + "desktop",
                                        headers: {
                                            Authorization: 'Token ' + url.getToken()
                                        },
                                        data: JSON.stringify({
                                            //"token": url.getToken(),
                                            // "sql_type": "update",
                                            "from_manager": "workspace",
                                            "from_manager_id": CONFIG.desk,
                                            "to_manager": "dock",
                                            "to_manager_id": 1,
                                            "child_id": j.attr("realid"),
                                            "child_type": j.attr("type"),
                                            "to_index": (p + 1)
                                            // "id": j.attr("realid"),
                                            // "type": j.attr("type"),
                                            // "from": (j.index() - 2),
                                            // "to": (p + 1)
                                        }),
                                        success: function (data) {

                                            if (data.code == 0) {
                                                console.log('静态模拟桌面APP应用到应用码头成功！')
                                                //CONFIG.dockContent.push(j.attr("id"));
                                                //fn.L_storage.setItem('CONFIG.dockContent', CONFIG.dockContent);

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
                                        //alert(6);
                                        $.ajax({
                                            type: "PUT",
                                            // contentType: "application/json",
                                            dataType: "json",
                                            //url: ajaxUrl,
                                            //data: "ac=updateMyApp&movetype=desk-desk&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + (j.index() - 2) + "&to=" + o + "&desk=" + CONFIG.desk,
                                            url: fn.url + "desktop",
                                            headers: {
                                                Authorization: 'Token ' + url.getToken()
                                            },
                                            data: JSON.stringify({
                                                //"token": url.getToken(),
                                                // "sql_type": "update",
                                                "from_manager": "workspace",
                                                "from_manager_id": CONFIG.desk,
                                                "to_manager": "workspace",
                                                "to_manager_id": CONFIG.desk,
                                                "child_id": j.attr("realid"),
                                                "child_type": j.attr("type"),
                                                "to_index": o
                                                // "movetype": "desk-desk",
                                                // "id": j.attr("realid"),
                                                // "type": j.attr("type"),
                                                // "from": (j.index() - 2),
                                                // "to": o,
                                                // "desk": CONFIG.desk
                                            }),
                                            success: function (data) {
                                                if (data.code == 0) {
                                                    console.log('静态模拟桌面APP应用到桌面成功！')
                                                    //$(CONFIG.dockContent).each(function (i) {
                                                    //    if (CONFIG.dockContent[i] == 'd_' + j.attr("type") + '_' + j.attr("realid")) {
                                                    //        if (CONFIG.dockContent[i] == 'd_' + j.attr("type") + '_' + j.attr("realid")) {
                                                    //            CONFIG.dockContent.splice(i, 1);
                                                    //        }
                                                    //    }
                                                    //})
                                                    //
                                                    //fn.L_storage.setItem('CONFIG.dockContent', CONFIG.dockContent);
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
                                    //alert(7);
                                    $.ajax({
                                        type: "PUT",
                                        // contentType: "application/json",
                                        dataType: "json",
                                        // url: ajaxUrl,
                                        //  data: "ac=updateMyApp&movetype=folder-folder&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.parents(".folder-window").attr("realid") + "&to=" + e + "&desk=" + CONFIG.desk,
                                        url: fn.url + "desktop",
                                        headers: {
                                            Authorization: 'Token ' + url.getToken()
                                        },
                                        data: JSON.stringify({
                                            //"token": url.getToken(),
                                            // "sql_type": "update",
                                            "from_manager": "folder",
                                            "from_manager_id": j.parents(".folder-window").attr("realid"),
                                            "to_manager": "folder",
                                            "to_manager_id": e,
                                            "child_id": j.attr("realid"),
                                            "child_type": j.attr("type")
                                            // "to_index": ""
                                            // "to_child_id": j.attr("realid"),
                                            // "to_child_type":j.attr("type")
                                            // "movetype": "folder-folder",
                                            // "id": j.attr("realid"),
                                            // "type": j.attr("type"),
                                            // "from": j.parents(".folder-window").attr("realid"),
                                            // "to": e,
                                            // "desk": CONFIG.desk
                                        }),
                                        success: function (data) {
                                            console.log(data);
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
                                                dialog({
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
                                    //alert(8);
                                    console.log(j.parents(".folder-window").attr("realid"))
                                    console.log(p + 1)
                                    $.ajax({
                                        type: "PUT",
                                        // contentType: "application/json",
                                        dataType: "json",
                                        //url: ajaxUrl,
                                        //data: "ac=updateMyApp&movetype=folder-dock&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.parents(".folder-window").attr("realid") + "&to=" + (p + 1) + "&desk=" + CONFIG.desk,
                                        url: fn.url + "desktop",
                                        headers: {
                                            Authorization: 'Token ' + url.getToken()
                                        },
                                        data: JSON.stringify({
                                            //"token": url.getToken(),
                                            // "sql_type": "update",
                                            "from_manager": "folder",
                                            "from_manager_id": j.parents(".folder-window").attr("realid"),
                                            "to_manager": "dock",
                                            "to_manager_id": (p + 1),
                                            "child_id": j.attr("realid"),
                                            "child_type": j.attr("type"),
                                            "to_index": (p + 1)
                                            // "to_child_id": j.attr("realid"),
                                            // "to_child_type":j.attr("type")
                                            // "movetype": "folder-dock",
                                            // "id": j.attr("realid"),
                                            // "type": j.attr("type"),
                                            // "from": j.parents(".folder-window").attr("realid"),
                                            // "to": (p + 1),
                                            // "desk": CONFIG.desk
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
                                                dialog({
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
                                        //alert(9);
                                        console.log(o + 1)
                                        $.ajax({
                                            type: "PUT",
                                            // contentType: "application/json",
                                            dataType: "json",
                                            //url: ajaxUrl,
                                            //data: "ac=updateMyApp&movetype=folder-desk&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.parents(".folder-window").attr("realid") + "&to=" + (o + 1) + "&desk=" + CONFIG.desk,
                                            url: fn.url + "desktop",
                                            headers: {
                                                Authorization: 'Token ' + url.getToken()
                                            },
                                            data: JSON.stringify({
                                                //"token": url.getToken(),
                                                // "sql_type": "update",
                                                "from_manager": "folder",
                                                "from_manager_id": j.parents(".folder-window").attr("realid"),
                                                "to_manager": "workspace",
                                                "to_manager_id": CONFIG.desk,
                                                "child_id": j.attr("realid"),
                                                "child_type": j.attr("type"),
                                                "to_index": (o + 1)
                                                // "to_child_id": j.attr("realid"),
                                                // "to_child_type":j.attr("type")
                                                // "movetype": "folder-desk",
                                                // "id": j.attr("realid"),
                                                // "type": j.attr("type"),
                                                // "from": j.parents(".folder-window").attr("realid"),
                                                // "to": (o + 1),
                                                // "desk": CONFIG.desk
                                            }),
                                            success: function (data) {
                                                var removdom=$(".appbtn"+j.attr("realid"));
                                                var removdomp=removdom.parents(".appbtn");
                                                $(".appbtn"+j.attr("realid")).remove();
                                                if(removdomp.find("font").length<1){
                                                  removdomp.removeClass("child");
                                                }

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
                                                    dialog({
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
            },
            updateXY: function (a, b) {
                //alert(a)
                $.ajax({
                    type: "PUT",
                    // contentType: "application/json",
                    dataType: "json",
                    url: fn.url + "user_config",
                    headers: {
                        Authorization: 'Token ' + url.getToken()
                    },
                    // data: "ac=setAppXY&appxy=" + a
                    data: JSON.stringify({
                        //"token": url.getToken(),
                        // "sql_type": "update",
                        "layout": a,
                        // "appxy": a
                        //contentType: "application/json",
                        // data: "ac=setAppXY&appxy=" + a


                    })
                }).done(function (data) {
                    if (data.code == 0) {
                        console.log("静态模拟桌面图标更新成功！");
                        CONFIG.appXY = a;
                        if (typeof(b) == "function") {
                            b();
                        }
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

                });
            },
            get: function () {
                var a = grid.getAppGrid(),
                    b = grid.getDockAppGrid();
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: fn.url + 'desktop',
                    headers: {
                        Authorization: 'Token ' + url.getToken()
                    },
                    data: {
                        //"token": url.getToken(),
                        // "sql_type": 'select'
                    }
                }).done(function (h) {
                    console.log("静态模拟桌面及应用码头获得APP列表：", h);
                    if (h.code == 0) {
                        if (h.result["dock"] != null) {
                            var c = "",
                                d = {};
                            for (var g = 0; g < h.result["dock"].length; g++) {
                                if (h.result["dock"][g]["folder"] != null) {
                                    c += appbtnTemp({
                                        "top": b[g]["startY"],
                                        "left": b[g]["startX"],
                                        "title": h.result["dock"][g]["folder"]["name"],
                                        "type": h.result["dock"][g]["folder"]["type"],
                                        "id": "d_" + h.result["dock"][g]["folder"]["type"] + "_" + h.result["dock"][g]["folder"]["id"],
                                        "realid": h.result["dock"][g]["folder"]["id"],
                                        "imgsrc": 'img/ui/' + fn.changeImgData(h.result["dock"][g]["folder"]["icon_url"])
                                    });
                                } else {
                                    c += appbtnTemp({
                                        "top": b[g]["startY"],
                                        "left": b[g]["startX"],
                                        "title": h.result["dock"][g]["name"],
                                        "type": h.result["dock"][g]["type"],
                                        "id": "d_" + h.result["dock"][g]["type"] + "_" + h.result["dock"][g]["id"],
                                        "realid": h.result["dock"][g]["id"],
                                        "imgsrc": fn.changeImgData(h.result["dock"][g]["icon_url"])
                                    });
                                }

                            }
                            $("#dock-bar .dock-applist").html("").append(c);
                        }
                        for (var f = 1; f <= 5; f++) {
                            var e = "",
                                d = {};
                            if (h.result["workspace_" + f] != null) {
                                for (var g = 0; g < h.result["workspace_" + f].length; g++) {
                                    if (h.result["workspace_" + f][g]['folder'] !== undefined) {
                                        var chilist=h.result["workspace_" + f][g]["children"];
                                        var listhtml="";
                                        for(var ls=0;ls<chilist.length;ls++){
                                            var _cho=chilist[ls];
                                          listhtml+='<font class="appbtn'+_cho.id+'" realid="'+_cho.id+'" type="'+_cho.type+'"><img src="'+_cho.icon_url+'"></font>';
                                        }
                                        e += appbtnTemp({
                                            "top": a[g]["startY"] + 7,
                                            "left": a[g]["startX"] + 16,
                                            "realid": h.result["workspace_" + f][g]['folder']["id"],
                                            "type": h.result["workspace_" + f][g]['folder']["type"],
                                            "id": "d_" + h.result["workspace_" + f][g]['folder']["type"] + "_" + h.result["workspace_" + f][g]['folder']["id"],
                                            "title": h.result["workspace_" + f][g]['folder']["name"],
                                            "imgsrc": 'img/ui/' + fn.changeImgData(h.result["workspace_" + f][g]['folder']["icon_url"]),
                                            "ullists":"<p>"+listhtml+"</p>",
                                            "classname":chilist.length>0?" child":""
                                        })
                                    } else {
                                        e += appbtnTemp({
                                            "top": a[g]["startY"] + 7,
                                            "left": a[g]["startX"] + 16,
                                            "realid": h.result["workspace_" + f][g]["id"],
                                            "type": h.result["workspace_" + f][g]["type"],
                                            "id": "d_" + h.result["workspace_" + f][g]["type"] + "_" + h.result["workspace_" + f][g]["id"],
                                            "title": h.result["workspace_" + f][g]["name"],
                                            "imgsrc": fn.changeImgData(h.result["workspace_" + f][g]["icon_url"])
                                        })
                                    }
                                }
                                //打开应用市场的按钮
                                e += addbtnTemp({"top": a[g]["startY"] + 7, "left": a[g]["startX"] + 16});

                                $("#desk-" + f + " li", window.parent.document).remove();
                                $("#desk-" + f, window.parent.document).append(e);
                                g = 0;
                            }

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
                    $("#desk", window.parent.document).off("click").on("click", "li.add", function () {
                        windows.createTemp({
                            id: "yysc",
                            title: "应用市场",
                            url: "appmarket/index.html",
                            width: 800,
                            height: 484,
                            isresize: false,
                            isflash: false
                        });
                    });
                    app.move();
                    dock.move();
                    app.getScrollbar();
                    app.moveScrollbar();
                    $("#desk", window.parent.document).on("contextmenu", ".appbtn:not(.add)", function (m) {

                        $(".popup-menu").hide();
                        $(".quick_view_container").remove();
                        switch ($(this).attr("type")) {
                            case "app":
                            case "widget":
                                var k = popupMenu.app($(this));
                                break;
                            case "papp":
                            case "pwidget":
                                var k = popupMenu.papp($(this));
                                break;
                            case "folder":
                                var k = popupMenu.folder($(this));
                                break;
                        }
                        var i = ($(document).width() - m.clientX) < k.width() ? (m.clientX - k.width()) : m.clientX;
                        var j = ($(document).height() - m.clientY) < k.height() ? (m.clientY - k.height()) : m.clientY;
                        k.css({left: i, top: j}).show();
                        return false;
                    });
                });

            },
            remove: function (c, b, a) {

                //var _manger = fn.L_storage.getItem('CONFIG.dockContent') || '';
                //console.log(_manger)
                //
                //alert('d_' + b + '_' + c)
                //if (_manger.indexOf(('d_' + b + '_' + c)) == -1) {
                //    CONFIG.manager = 'workspace'
                //} else {
                //    CONFIG.manager = 'dock'
                //}
                //alert(CONFIG.manager)

                //$.ajax({
                //    type: "GET",
                //    contentType: "",
                //    dataType: "json",
                //    url: fn.url + "desktop",
                //    data: {
                //        "token": url.getToken(),
                //        "sql_type": 'select'
                //    }
                //}).done(function (b) {
                //    console.log("获取所有应用及文件夹所在位置：", b);
                //    if (b.code == 0) {
                //        var dock_content = [];
                //        var folder_content = [];
                //
                //        for (var k in b.result) {
                //            if (b.result.dock != null) {
                //                for (var i = 0; i < b.result.dock.length; i++) {
                //                    if (b.result.dock[i].folder) {
                //                        dock_content.push(b.result.dock[i].folder.type + b.result.dock[i].folder.id)
                //                    } else {
                //                        dock_content.push(b.result.dock[i].type + b.result.dock[i].id)
                //                    }
                //                }
                //            }
                //            for (var f = 1; f <= 5; f++) {
                //                if (b.result["workspace_" + f] != null) {
                //                    for(var g = 0;g<b.result["workspace_" + f].length;g++){
                //                        if(b.result["workspace_" + f][g].folder){
                //                            folder_content.push(b.result["workspace_" + f][g].folder.type+b.result["workspace_" + f][g].folder.id)
                //                        }
                //                    }
                //                }
                //            }
                //
                //        }
                //
                //
                //    } else {
                //        //error
                //        //错误
                //        art.dialog({
                //            lock: true,
                //            id: 'list',
                //            esc: false,
                //            content: data.message
                //
                //        })
                //    }
                //
                //});


                art.dialog({
                    id: 'ajaxedit',
                    content: '确定删除我的应用？',
                    ok: function () {
                        //alert(c)
                        //alert(b)
                        $.ajax({
                            type: "DELETE",
                            //contentType: "application/json",
                            dataType: "json",
                            //url: ajaxUrl,
                            //data: "ac=delMyApp&id=" + c + "&type=" + b,
                            url: fn.url + 'desktop?child_id=' + c + '&child_type=' + b,
                            headers: {
                                Authorization: 'Token ' + url.getToken()
                            },
                            /*data: JSON.stringify({
                             // "sql_type": "delete",
                             //"token": url.getToken(),
                             //"manager": CONFIG.manager,
                             //"manager_id": CONFIG.desk,
                             "child_id": c,
                             "child_type": b
                             }),*/
                            success: function (data) {
                                //CONFIG.manager = "workspace";
                                if (data.code == 0) {
                                    if (b == "widget") {
                                        widget.removeCookie(c, b);
                                    }
                                    if (typeof(a) !== "undefined") {
                                        a();
                                    }
                                    console.log('静态模拟删除我的应用成功！', data);
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

                });
            },
            getScrollbar: function () {
                setTimeout(function () {
                    $("#desk .desktop-container").each(function () {
                        var b = $(this),
                            d = b.children(".scrollbar");
                        d.hide();
                        b.scrollLeft(0).scrollTop(0);
                        if (CONFIG.appXY == "x") {
                            var a = parseInt(b.children(".add").css("top")) + 108;
                            if (b.height() / a < 1) {
                                b.children(".scrollbar-y").height(b.height() / a * b.height()).css("top", 0).show();
                            }
                        } else {
                            var c = parseInt(b.children(".add").css("left")) + 106;
                            if (b.width() / c < 1) {
                                b.children(".scrollbar-x").width(b.width() / c * b.width()).css("left", 0).show();
                            }
                        }
                    });
                }, 500);
            },
            moveScrollbar: function () {
                $(".scrollbar").on("mousedown", function (g) {
                    var i, h, d, b, c, m, j, f;
                    var k = $(this),
                        a = k.parent(".desktop-container");
                    c = parseInt(a.children(".add").css("left")) + 106;
                    m = parseInt(a.children(".add").css("top")) + 108;
                    j = a.width() - k.width();
                    f = a.height() - k.height();
                    if (k.hasClass("scrollbar-x")) {
                        i = g.clientX - k.offset().left;
                    } else {
                        h = g.clientY - k.offset().top;
                    }
                    $(document).on("mousemove", function (n) {
                        if (k.hasClass("scrollbar-x")) {
                            if (CONFIG.dockPos == "left") {
                                d = n.clientX - i - 73 < 0 ? 0 : n.clientX - i - 73 > j ? j : n.clientX - i - 73;
                            } else {
                                d = n.clientX - i < 0 ? 0 : n.clientX - i > j ? j : n.clientX - i;
                            }
                            k.css("left", d / a.width() * c + d);
                            a.scrollLeft(d / a.width() * c);
                        } else {
                            if (CONFIG.dockPos == "top") {
                                b = n.clientY - h - 73 < 0 ? 0 : n.clientY - h - 73 > f ? f : n.clientY - h - 73;
                            } else {
                                b = n.clientY - h < 0 ? 0 : n.clientY - h > f ? f : n.clientY - h;
                            }
                            k.css("top", b / a.height() * m + b);
                            a.scrollTop(b / a.height() * m);
                        }
                    }).on("mouseup", function () {
                        $(this).off("mousemove").off("mouseup");
                    });
                });
                $("#desk .desktop-container").each(function (a) {
                    $("#desk-" + (a + 1)).on("mousewheel", function (d, f) {
                        var b = $(this),
                            e = parseInt(b.children(".add").css("top")) + 108,
                            c;
                        if (f < 0) {
                            c = b.scrollTop() + 200 > e - b.height() ? e - b.height() : b.scrollTop() + 200;
                        } else {
                            c = b.scrollTop() - 200 < 0 ? 0 : b.scrollTop() - 200;
                        }
                        b.stop(false, true).animate({scrollTop: c}, 300);
                        b.children(".scrollbar-y").stop(false, true).animate({top: c / e * b.height() + c}, 300);
                    });
                });
            }
        };
    })();
    var windows = (function () {
        return {
            createTemp: function (d) {
                $(".popup-menu").hide();
                $(".quick_view_container").remove();
                var a = "app",
                    e = typeof(d.id) == "undefined" || d.id == "" ? Date.parse(new Date()) : d.id;
                var c = false;
                $("#task-content-inner a.task-item").each(function () {
                    if ($(this).attr("realid") == e && $(this).attr("type") == a) {
                        c = true;
                        windows.show2top(e, a);
                    }
                });
                if (c == false) {
                    function b(g) {
                        var f = "#w_" + g.type + "_" + g.id;
                        // console.log($("#task-content-inner"),$("#task-content-inner", window.parent.document))
                        $("#task-content-inner").prepend(taskTemp({
                            "type": g.type,
                            "id": "t_" + g.type + "_" + g.id,
                            "realid": g.id,
                            "title": g.title,
                            "imgsrc": g.imgsrc
                        }));
                        $("#task-content-inner").css("width", $("#task-content-inner .task-item").length * 114);
                        taskbar.resize();
                        TEMP.windowTemp = {
                            "width": g.width,
                            "height": g.height,
                            "top": ($(window).height() - g.height) / 2 <= 0 ? 0 : ($(window).height() - g.height) / 2,
                            "left": ($(window).width() - g.width) / 2 <= 0 ? 0 : ($(window).width() - g.width) / 2,
                            "emptyW": $(window).width() - g.width,
                            "emptyH": $(window).height() - g.height,
                            "zIndex": CONFIG.createIndexid,
                            "type": g.type,
                            "id": "w_" + g.type + "_" + g.id,
                            "realid": g.id,
                            "title": g.title,
                            "url": locahref+g.url.split(".cn")[1],
                            "imgsrc": g.imgsrc,
                            "isresize": g.isresize == 1 ? true : false,
                            "istitlebar": g.isresize == 1 ? true : false,
                            "istitlebarFullscreen": g.isresize == 1 ? fullScreenApi.supportsFullScreen == true ? true : false : false,
                            "issetbar": g.issetbar == 1 ? true : false,
                            "isflash": g.isflash == 1 ? true : false
                        };

                        $("#desk", window.parent.document).append(windowTemp(TEMP.windowTemp));
                        $(f, window.parent.document).data("info", TEMP.windowTemp);
                        CONFIG.createIndexid += 1;
                        $(f).find("iframe").on("load", function () {
                            if (g.isresize) {
                                windows.resize($(f));
                            }
                            $(f + " .window-frame").children("div").eq(1).fadeOut();
                        });
                        $(f).on("contextmenu", function () {
                            return false;
                        });
                        windows.handle($(f));
                        windows.move($(f));
                        $(".window-mask", window.parent.document).off("click").on("click", function () {
                            windows.show2top($(this).parents(".window-container").attr("realid"), $(this).parents(".window-container").attr("type"));
                        });
                        windows.show2top(g.id, g.type);
                    }

                    b({
                        type: "app",
                        id: typeof(d.id) == "undefined" || d.id == "" ? Date.parse(new Date()) : d.id,
                        imgsrc: "img/ui/default_icon.png",
                        title: d.title,
                        url: d.url,
                        width: d.width,
                        height: d.height,
                        isresize: d.isresize,
                        issetbar: false,
                        isflash: typeof(d.isflash) == "undefined" || d.id == "" ? true : d.isflash
                    });
                }
            },
            //d为app_id，a为app_type
            create: function (d, a, _x, _y,ico) {
                ico=ico||null;////传入启动图标元素///
                $(".popup-menu").hide();
                $(".quick_view_container").remove();
                var c = false;
                $("#task-content-inner a.task-item", window.parent.document).each(function () {
                    if ($(this).attr("realid") == d && $(this).attr("type") == a) {
                        c = true;
                        windows.show2top(d, a);
                    }
                });
                if (c == false) {
                    if (a == "folder") {
                        msgboxshow("应用正在加载中，请耐心等待...", 6, 100000);
                        //$.getJSON(ajaxUrl + "?ac=getMyAppById&id=" + d + "&type=" + a, function(e) {
                        $.ajax({
                            type: 'GET',
                            //contentType: "application/json",
                            dataType: "json",
                            //url: 'interface/getMyAppById_folder.json',
                            //url: fn.url + 'getMyAppById.json',
                            url: fn.url + 'folder',
                            headers: {
                                Authorization: 'Token ' + url.getToken()
                            },
                            data: {
                                //"token": url.getToken(),
                                // "sql_type": 'select',
                                "folder_id": d
                            }
                        }).done(function (e) {
                            console.log("文件夹打开", e);
                            if (e.code == 0) {
                                msgbox_hide();
                                switch (e.result.folder.type) {
                                    case "app":
                                    case "papp":
                                    case "widget":
                                    case "pwidget":
                                        //b({
                                        //    type: e.result.type,
                                        //    id: e.result.id,
                                        //    title: e.result.name,
                                        //    imgsrc: e.result.icon_url,
                                        //    url: e.result.app_url,
                                        //    //width: fn.winW,
                                        //    //height: fn.winH,
                                        //    width: e.result.width,
                                        //    height: e.result.height,
                                        //    isresize: e.result.is_resizeable,
                                        //    issetbar: e.result.has_toolbar,
                                        //    isflash: e.result.isflash
                                        //});
                                        break;
                                    case "folder":
                                        //alert("11111")

                                        b({
                                            type: e.result.folder.type,
                                            id: e.result.folder.id,
                                            title: e.result.folder.name,
                                            imgsrc: 'img/ui/' + e.result.folder.icon_url,
                                            width: 650,
                                            height: 400
                                        });
                                        break;
                                }
                            } else {
                                msgboxshow("数据拉取失败", 5, 2000);
                                return false;
                            }
                        });

                    } else if (a == "app") {
                        msgboxshow("应用正在加载中，请耐心等待...", 6, 100000);
                        //$.getJSON(ajaxUrl + "?ac=getMyAppById&id=" + d + "&type=" + a, function(e) {
                        $.ajax({
                            type: 'GET',
                            //contentType: "application/json",
                            dataType: "json",
                            //url: 'interface/getMyAppById_folder.json',
                            //url: fn.url + 'getMyAppById.json',
                            url: fn.url + 'my_app',
                            headers: {
                                Authorization: 'Token ' + url.getToken()
                            },
                            data: {
                                //"token": url.getToken(),
                                // "sql_type": 'select',
                                "child_id": d
                            }
                        }).done(function (e) {
                          console.log("------打开应用333333-------")
                            console.log("应用打开", e);
                            if (e.code == 0) {
                                msgbox_hide();
                                switch (e.result.type) {
                                    case "app":
                                    case "papp":
                                    case "widget":
                                    case "pwidget":
                                        $("#task-bar, #nav-bar", window.parent.document).addClass("min-zIndex");
                                        var newtag=b({
                                            type: e.result.type,
                                            id: e.result.id,
                                            title: e.result.name,
                                            imgsrc: e.result.icon_url,
                                            url: e.result.app_url,
                                            //width: fn.winW,
                                            //height: fn.winH,
                                            width: e.result.width,
                                            height: e.result.height,
                                            isresize: e.result.is_resizeable,
                                            issetbar: e.result.has_toolbar,
                                            isflash: e.result.isflash
                                        });
                                      ///tag///console.log("HTML:",newtag.html());
                                      ////////实例化一个再classs.js文件中定义的‘任务栏标签类’////////
                                        if(ico){
                                            var _taskTag=new TaskTag(ico);///传入启动图标对象////
                                          _taskTag.tag=newtag;///绑定应用标签///
                                          taskContentC.addChild(_taskTag);//taskContentC为index.html文件中实例化的容器对象///
                                        }
                                        windows.max(e.result.id, e.result.type);
                                        break;
                                    case "folder":
                                        //b({
                                        //    type: e.result.type,
                                        //    id: e.result.id,
                                        //    title: e.result.name,
                                        //    imgsrc: e.result.icon_url,
                                        //    width: e.result.width,
                                        //    height: e.result.height
                                        //});
                                        break;
                                }
                            } else {
                                msgboxshow("数据拉取失败", 5, 2000);
                                return false;
                            }
                        });
                    }

                    function b(f) {
                      var newFrameBox=null;
                        console.log(f);
                        var e = "#w_" + f.type + "_" + f.id;
                        var g1 = "#t_" + f.type + "_" + f.id;
                        var i = ($(window.parent.document).height() - f.height) / 2 <= 0 ? 0 : ($(window.parent.document).height() - f.height) / 2;
                        var h = ($(window.parent.document).width() - f.width) / 2 <= 0 ? 0 : ($(window.parent.document).width() - f.width) / 2;

                        console.log('test', f)
                        switch (f.type) {
                            case "app":
                            case "papp":
                                $("#task-content-inner", window.parent.document).prepend(taskTemp({
                                    "type": f.type,
                                    "id": "t_" + f.type + "_" + f.id,
                                    "realid": f.id,
                                    "title": f.title,
                                    "imgsrc": f.imgsrc
                                }));
                                $("#task-content-inner", window.parent.document).css("width", $("#task-content-inner .task-item", window.parent.document).length * 114);
                                taskbar.resize();
                                //f.width = 1920;
                                //alert(f.width)
                                TEMP.windowTemp = {
                                    "width": f.width,
                                    "height": f.height,
                                    "top": i,
                                    "left": h,
                                    "emptyW": $(window).width() - f.width,
                                    "emptyH": $(window).height() - f.height,
                                    "zIndex": CONFIG.createIndexid,
                                    "type": f.type,
                                    "id": "w_" + f.type + "_" + f.id,
                                    "realid": f.id,
                                    "title": f.title,
                                    "url": locahref+f.url.split(".cn")[1],
                                    "imgsrc": f.imgsrc,
                                    "isresize": f.isresize == "True" ? true : false,
                                    "istitlebar": f.isresize == "True" ? true : false,
                                    "istitlebarFullscreen": f.isresize == "True" ? fullScreenApi.supportsFullScreen == true ? true : false : false,
                                    "issetbar": f.issetbar == "True" ? true : false,
                                    "isflash": f.isflash == "True" ? true : false
                                };
                                newFrameBox=$(windowTemp(TEMP.windowTemp));
                                $("#desk", window.parent.document).append(newFrameBox);

                                $(e, window.parent.document).data("info", TEMP.windowTemp);
                                CONFIG.createIndexid += 1;
                                $(e, window.parent.document).find("iframe").on("load", function () {
                                    if (f.isresize) {
                                        windows.resize($(e, window.parent.document));
                                    }
                                    $(e, window.parent.document).find(".window-frame").children("div").eq(1).fadeOut();
                                });
                                $(e, window.parent.document).on("contextmenu", function () {
                                    return false;
                                });
                                windows.handle($(e, window.parent.document), $(g1, window.parent.document));
                                windows.move($(e, window.parent.document));
                                $(".window-mask", window.parent.document).off("click").on("click", function () {
                                    windows.show2top($(this).parents(".window-container").attr("realid"), $(this).parents(".window-container").attr("type"));
                                });
                                windows.show2top(f.id, f.type);
                                break;
                            case "folder":
                                console.log("----------------");
                                console.log(f);
                                $("#task-content-inner").prepend(taskTemp({
                                    "type": f.type,
                                    "id": "t_" + f.type + "_" + f.id,
                                    "realid": f.id,
                                    "title": f.title,
                                    "imgsrc": f.imgsrc
                                }));
                                $("#task-content-inner").css("width", $("#task-content-inner .task-item").length * 114);
                                taskbar.resize();
                                TEMP.folderWindowTemp = {
                                    "width": f.width,
                                    "height": f.height,
                                    "top": i,
                                    "left": h,
                                    "emptyW": $(window).width() - f.width,
                                    "emptyH": $(window).height() - f.height,
                                    "zIndex": CONFIG.createIndexid,
                                    "type": f.type,
                                    "id": "w_" + f.type + "_" + f.id,
                                    "realid": f.id,
                                    "title": f.title,
                                    "imgsrc": f.imgsrc
                                };
                                $("#desk", window.parent.document).append(folderWindowTemp(TEMP.folderWindowTemp));
                                $(e).data("info", TEMP.folderWindowTemp);
                                CONFIG.createIndexid += 1;
                                // $.getJSON(ajaxUrl + "?ac=getMyFolderApp&folderid=" + f.id, function(k) {
                                $.ajax({
                                    type: 'GET',
                                    // contentType: "application/json",
                                    dataType: "json",
                                    //url: fn.url + 'getMyFolderApp.json',
                                    url: fn.url + 'folder',
                                    //url: fn.url + 'getMyAppById',
                                    //url: 'interface/getMyAppById.json',
                                    headers: {
                                        Authorization: 'Token ' + url.getToken()
                                    },
                                    data: {
                                        //"token": url.getToken(),
                                        "folder_id": f.id,
                                        // "sql_type": "select"
                                    },
                                    success: function (k) {
                                        console.log('文件夹中的APP:', k);
                                        if (k.code == 0) {
                                            for (var j = 0; j < k.result.children.length; j++) {
                                                switch (k.result.children[j]["type"]) {
                                                    case "app":
                                                    case "widget":
                                                        $(e).find(".folder_body").append(appbtnTemp({
                                                            "top": 0,
                                                            "left": 0,
                                                            "title": k.result.children[j]["name"],
                                                            "type": k.result.children[j]["type"],
                                                            "id": "d_" + k.result.children[j]["type"] + "_" + k.result.children[j]["id"],
                                                            "realid": k.result.children[j]["id"],
                                                            "imgsrc": k.result.children[j]["icon_url"]
                                                        }));
                                                        break;
                                                    case "folder":
                                                        $(e).find(".folder_body").append(appbtnTemp({
                                                            "top": 0,
                                                            "left": 0,
                                                            "title": k.result.children[j]["name"],
                                                            "type": k.result.children[j]["type"],
                                                            "id": "d_" + k.result.children[j]["type"] + "_" + k.result.children[j]["id"],
                                                            "realid": k.result.children[j]["id"],
                                                            "imgsrc": k.result.children[j]["icon"]
                                                        }));
                                                        break;
                                                }
                                            }
                                            app.move();
                                        } else {
                                            //错误
                                            art.dialog({
                                                lock: true,
                                                id: 'list',
                                                esc: false,
                                                content: data.message

                                            })
                                        }
                                        g();
                                    }
                                });

                            function g() {
                                $(e).on("contextmenu", function () {
                                    return false;
                                });
                                $(e + " .folder_body").on("contextmenu", ".appbtn", function (n) {
                                    $(".popup-menu").hide();
                                    $(".quick_view_container").remove();
                                    var m = popupMenu.app($(this));
                                    var j = ($(document).width() - n.clientX) < m.width() ? (n.clientX - m.width()) : n.clientX;
                                    var k = ($(document).height() - n.clientY) < m.height() ? (n.clientY - m.height()) : n.clientY;
                                    m.css({left: j, top: k}).show();
                                    return false;
                                });
                                windows.resize($(e));
                                $(e + " .window-frame").children("div").eq(1).fadeOut();
                                windows.handle($(e));
                                windows.move($(e));
                                $(".window-mask").off("click").on("click", function () {
                                    windows.show2top($(this).parents(".window-container").attr("realid"), $(this).parents(".window-container").attr("type"));
                                });
                                windows.show2top(f.id, f.type);
                            }

                                break;
                        }
                        return newFrameBox;
                    }

                    msgboxshow("应用正在加载中，请耐心等待...", 6, 100000);
                    //$.getJSON(ajaxUrl + "?ac=getMyAppById&id=" + d + "&type=" + a, function(e) {
                    // $.ajax({
                    //     type: 'GET',
                    //     //contentType: "application/json",
                    //     dataType: "json",
                    //     //url: 'interface/getMyAppById_folder.json',
                    //     //url: fn.url + 'getMyAppById.json',
                    //     url: fn.url + 'my_app',
                    //     data:{
                    //         "token":url.getToken(),
                    //         "sql_type": 'select',
                    //         "child_id": d
                    //     }
                    // }).done(function (e) {
                    //     console.log("应用打开", e);
                    //     if (e.code == 0) {
                    //         msgbox_hide();
                    //         switch (e.result.type) {
                    //             case "app":
                    //             case "papp":
                    //             case "widget":
                    //             case "pwidget":
                    //                 b({
                    //                     type: e.result.type,
                    //                     id: e.result.id,
                    //                     title: e.result.name,
                    //                     imgsrc: e.result.icon_url,
                    //                     url: e.result.app_url,
                    //                     //width: fn.winW,
                    //                     //height: fn.winH,
                    //                      width: e.result.width,
                    //                      height: e.result.height,
                    //                     isresize: e.result.is_resizeable,
                    //                     issetbar: e.result.has_toolbar,
                    //                     isflash: e.result.isflash
                    //                 });
                    //                 break;
                    //             case "folder":
                    //                 b({
                    //                     type: e.result.type,
                    //                     id: e.result.id,
                    //                     title: e.result.name,
                    //                     imgsrc: e.result.icon_url,
                    //                     width: e.result.width,
                    //                     height: e.result.height
                    //                 });
                    //                 break;
                    //         }
                    //     } else {
                    //         msgboxshow("数据拉取失败", 5, 2000);
                    //         return false;
                    //     }
                    // });
                    // msgboxshow("应用正在加载中，请耐心等待...", 6, 100000);

                    //msgboxshow("应用正在加载中，请耐心等待...", 6, 100000);
                    //$.getJSON(ajaxUrl + "?ac=getMyAppById&id=" + d + "&type=" + a, function(e) {
                    //$.ajax({
                    //    type: 'GET',
                    //    //contentType: "application/json",
                    //    dataType: "json",
                    //    //url: 'interface/getMyAppById_folder.json',
                    //    //url: fn.url + 'getMyAppById.json',
                    //    url: fn.url + 'my_app',
                    //    data:{
                    //        "token":url.getToken(),
                    //        "sql_type": 'select',
                    //        "child_id": d
                    //    }
                    //}).done(function (e) {
                    //    console.log("应用打开", e);
                    //    if (e.code == 0) {
                    //        msgbox_hide();
                    //        switch (e.result.type) {
                    //            case "app":
                    //            case "papp":
                    //            case "widget":
                    //            case "pwidget":
                    //                b({
                    //                    type: e.result.type,
                    //                    id: e.result.id,
                    //                    title: e.result.name,
                    //                    imgsrc: e.result.icon_url,
                    //                    url: e.result.app_url,
                    //                    //width: fn.winW,
                    //                    //height: fn.winH,
                    //                     width: e.result.width,
                    //                     height: e.result.height,
                    //                    isresize: e.result.is_resizeable,
                    //                    issetbar: e.result.has_toolbar,
                    //                    isflash: e.result.isflash
                    //                });
                    //                break;
                    //            case "folder":
                    //                b({
                    //                    type: e.result.type,
                    //                    id: e.result.id,
                    //                    title: e.result.name,
                    //                    imgsrc: e.result.icon_url,
                    //                    width: e.result.width,
                    //                    height: e.result.height
                    //                });
                    //                break;
                    //        }
                    //    } else {
                    //        msgboxshow("数据拉取失败", 5, 2000);
                    //        return false;
                    //    }
                    //});

                    //msgboxshow("应用正在加载中，请耐心等待...", 6, 100000);
                    //$.getJSON(ajaxUrl + "?ac=getMyAppById&id=" + d + "&type=" + a, function(e) {
                    //$.ajax({
                    //    type: 'GET',
                    //    //contentType: "application/json",
                    //    dataType: "json",
                    //    //url: 'interface/getMyAppById_folder.json',
                    //    //url: fn.url + 'getMyAppById.json',
                    //    url: fn.url + 'my_app',
                    //    data: {
                    //        "token": url.getToken(),
                    //        "sql_type": 'select',
                    //        "child_id": d
                    //    }
                    //}).done(function (e) {
                    //    console.log("应用打开", e);
                    //    if (e.code == 0) {
                    //        msgbox_hide();
                    //        switch (e.result.type) {
                    //            case "app":
                    //            case "papp":
                    //            case "widget":
                    //            case "pwidget":
                    //                b({
                    //                    type: e.result.type,
                    //                    id: e.result.id,
                    //                    title: e.result.name,
                    //                    imgsrc: e.result.icon_url,
                    //                    url: e.result.app_url,
                    //                    //width: fn.winW,
                    //                    //height: fn.winH,
                    //                    width: e.result.width,
                    //                    height: e.result.height,
                    //                    isresize: e.result.is_resizeable,
                    //                    issetbar: e.result.has_toolbar,
                    //                    isflash: e.result.isflash
                    //                });
                    //                break;
                    //            case "folder":
                    //                b({
                    //                    type: e.result.type,
                    //                    id: e.result.id,
                    //                    title: e.result.name,
                    //                    imgsrc: e.result.icon_url,
                    //                    width: e.result.width,
                    //                    height: e.result.height
                    //                });
                    //                break;
                    //        }
                    //    } else {
                    //        msgboxshow("数据拉取失败", 5, 2000);
                    //        return false;
                    //    }
                    //});

                }
            },
            close: function (d, c) {
                //alert(123123)
                var a = "#w_" + c + "_" + d,
                    b = "#t_" + c + "_" + d;

                $(a).removeData("info").html("").remove();
                $("#task-content-inner " + b).html("").remove();
                $("#task-content-inner").css("width", $("#task-content-inner .task-item").length * 114);
                $("#task-bar, #nav-bar").removeClass("min-zIndex");


                taskbar.resize();
            },

            hide: function (d, c) {
                windows.show2top(d, c);
                var a = "#w_" + c + "_" + d,
                    b = "#t_" + c + "_" + d;
                $(a, window.parent.document).css("display", "none");
                $("#task-content-inner " + b, window.parent.document).removeClass("task-item-current");
                if ($(a, window.parent.document).attr("ismax") == 1) {
                    $("#task-bar, #nav-bar", window.parent.document).removeClass("min-zIndex");
                }
            },

            max: function (d, c) {
                windows.show2top(d, c);
                var a = "#w_" + c + "_" + d,
                    b = "#t_" + c + "_" + d;
                //$(a + " .title-handle .ha-max", window.parent.document).hide().next(".ha-revert").show();
                $(a, window.parent.document).attr("ismax", 1).animate({
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0
                }, 200);
                $("#task-bar, #nav-bar", window.parent.document).addClass("min-zIndex");
            },
            revert: function (f, c) {
                windows.show2top(f, c);
                var a = "#w_" + c + "_" + f,
                    b = "#t_" + c + "_" + f;
                $(a + " .title-handle .ha-revert", window.parent.document).hide().prev(".ha-max").show();
                var d = $(a, window.parent.document),
                    e = d.data("info");
                d.attr("ismax", 0).animate({
                    width: e["width"],
                    height: e["height"],
                    left: e["left"],
                    top: e["top"]
                }, 500);
                $("#task-bar", window.parent.document).removeClass("min-zIndex");
                $("#nav-bar", window.parent.document).removeClass("min-zIndex");
            },

            show2top: function (d, c) {
                //d为3,c为app
                //CONFIG.createIndexid=PopupIframe.zIndex+2;
                var a = "#w_" + c + "_" + d,
                    b = "#t_" + c + "_" + d;
                $("#task-content-inner a.task-item").removeClass("task-item-current");
                $("#task-content-inner " + b).addClass("task-item-current");
                if ($(a, window.parent.document).attr("ismax") == 1) {
                    $("#task-bar, #nav-bar").addClass("min-zIndex");
                }
                $("#desk", window.parent.document).find('.window-current').removeClass('.window-current');
                $(a, window.parent.document).addClass("window-current").css({
                    "z-index": CONFIG.createIndexid,
                    "display": "block"
                });
                $("#desk", window.parent.document).find('.window-container').find('.window-mask').show();
                $(a + " .window-mask", window.parent.document).hide();
                $("#desk", window.parent.document).find('.window-container-flash').find('iframe').hide();
                $(a, window.parent.document).find("iframe").show();

            },
            updateFolder: function (d, c) {
                windows.show2top(d, c);
                var a = "#w_" + c + "_" + d,
                    b = "#t_" + c + "_" + d;
                //  $.getJSON(ajaxUrl + "?ac=getMyFolderApp&folderid=" + d, function(g) {

                $.ajax({
                    type: 'GET',
                    // contentType: "application/json",
                    dataType: "json",
                    url: fn.url + 'folder',
                    headers: {
                        Authorization: 'Token ' + url.getToken()
                    },
                    data: {
                        //'token': url.getToken(),
                        // 'sql_type': "select",
                        "folder_id": d
                    },
                    success: function (g) {
                        console.log('更新文件夹APP:', g);
                        if (g.code == 0) {
                            var e = "";
                            for (var f = 0; f < g.result.children.length; f++) {
                                console.log(g.result.children[f]);
                                switch (g.result.children[f].type) {
                                    case "app":
                                        e += appbtnTemp({
                                            "top": 0,
                                            "left": 0,
                                            "title": g.result.children[f].name,
                                            "type": g.result.children[f].type,
                                            "id": "d_" + g.result.children[f].type + "_" + g.result.children[f].id,
                                            "realid": g.result.children[f].id,
                                            "imgsrc": g.result.children[f].icon
                                        });
                                        break;
                                    case "widget":
                                        e += appbtnTemp({
                                            "top": 0,
                                            "left": 0,
                                            "title": g.result.children[f].name,
                                            "type": g.result.children[f].type,
                                            "id": "d_" + g.result.children[f].type + "_" + g.result.children[f].id,
                                            "realid": g.result.children[f].id,
                                            "imgsrc": g.result.children[f].icon
                                        });
                                        break;
                                }
                            }
                            $(a).find(".folder_body").html("").append(e).on("contextmenu", ".shortcut", function (j) {
                                $(".popup-menu").hide();
                                $(".quick_view_container").remove();
                                TEMP.AppRight = popupMenu.app($(this));
                                var h = ($(document).width() - j.clientX) < TEMP.AppRight.width() ? (j.clientX - TEMP.AppRight.width()) : j.clientX;
                                var i = ($(document).height() - j.clientY) < TEMP.AppRight.height() ? (j.clientY - TEMP.AppRight.height()) : j.clientY;
                                TEMP.AppRight.css({left: h, top: i}).show();
                                return false;
                            });
                            app.move();
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
            handle: function (a, g1) {
                a.on("dblclick", ".title-bar", function (b) {
                    if (a.find(".ha-max").is(":hidden")) {
                        a.find(".ha-revert").click();
                    } else {
                        a.find(".ha-max").click();
                    }
                }).on("click", ".ha-hide", function () {
                    windows.hide(a.attr("realid"), a.attr("type"));
                }).on("click", ".ha-max", function () {
                  wGlobal.exitFullscreen();////调用首页定义的退出全屏功能////
                    //windows.max(a.attr("realid"), a.attr("type"));
                }).on("click", ".ha-revert", function () {
                    windows.revert(a.attr("realid"), a.attr("type"));
                }).on("click", ".ha-fullscreen", function () {
                    wGlobal.launchFullscreen();////调用首页定义的进入全屏功能////
                    //fullScreenApi.requestFullScreen(window.parent.document.getElementById(a.find("iframe").attr("id")));
                }).on("click", ".ha-close", function () {

                    //windows.close(a.attr("realid"), a.attr("type"));
                    $(a).remove();
                    $(g1).remove();
                    windows.close(a.attr("realid"), a.attr("type"));
                }).on("click", ".refresh", function () {
                    windows.refresh(a.attr("realid"), a.attr("type"));
                }).on("click", ".help", function () {
                    var b = art.dialog({title: "帮助", follow: this, width: 196});
                    console.log("APPInfo:", a.data("info"))
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        dataType: "json",
                        //url: ajaxUrl,
                        //data: "ac=getAppRemark&id=" + a.data("info").realid,
                        url: fn.url + 'getAppHelp',
                        headers: {
                            Authorization: 'Token ' + url.getToken()
                        },
                        data: JSON.stringify({/*"token": url.getToken(), */"appid": a.data("info").realid}),
                        success: function (c) {
                            //b.content(c);
                            if (c.code == 0) {
                                b.content(c.result.remark);
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
                }).on("click", ".star", function () {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        dataType: "json",
                        // url: ajaxUrl,
                        //data: "ac=getAppStar&id=" + a.data("info").realid,
                        url: fn.url + "getAppStar",
                        headers: {
                            Authorization: 'Token ' + url.getToken()
                        },
                        data: JSON.stringify({/*"token": url.getToken(),*/ "appid": a.data("info").realid}),
                        success: function (b) {
                            console.log("得到分数：", b);
                            if (b.code == 0) {
                                $.dialog({
                                    title: "给“" + a.data("info").title + "”打分",
                                    width: 250,
                                    id: "star",
                                    content: starDialogTemp({
                                        "point": Math.floor(b.result.starnum),
                                        "realpoint": b.result.starnum * 20
                                    })
                                });
                                $("#star ul").data("id", a.data("info").realid);
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
                    $("body").off("click").on("click", "#star ul li", function () {
                        var b = $(this).attr("num");
                        var c = $(this).parent("ul").data("id");
                        if (!isNaN(b) && /^[1-5]$/.test(b)) {
                            $.ajax({
                                type: "POST",
                                contentType: "application/json",
                                dataType: "json",
                                // url: ajaxUrl,
                                //  data: "ac=updateAppStar&id=" + c + "&starnum=" + b,
                                url: fn.url + 'updateAppStar',
                                headers: {
                                    Authorization: 'Token ' + url.getToken()
                                },
                                data: JSON.stringify({/*"token": url.getToken(),*/ "appid": c, "starnum": b}),
                                success: function (d) {
                                    if (d.code == 0) {
                                        console.log("是否已经打过分：", d.result.isscore);
                                        art.dialog.list["star"].close();
                                        if (d.result.isscore == 0) {
                                            msgboxshow("打分成功！", 4, 2000);
                                        } else {
                                            msgboxshow("你已经打过分了！", 1, 2000);
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
                    });
                }).on("contextmenu", ".window-container", function () {
                    $(".popup-menu").hide();
                    $(".quick_view_container").remove();
                    return false;
                });
            },
            move: function (a) {
                a.on("mousedown", ".title-bar", function (d) {
                    console.log(d);
                    if (a.attr("ismax") == 1) {
                        return false;
                    }
                    windows.show2top(a.attr("realid"), a.attr("type"));
                    var f = a.data("info"),
                        c, b, g;
                    b = d.clientX - a.offset().left;
                    g = d.clientY - a.offset().top;
                    $(window.parent.document).on("mousemove", function (h) {
                        c = maskBox.desk();
                        c.show();
                        a.find(".ha-revert").hide().prev(".ha-max").show();
                        _l = h.clientX - b;
                        _t = h.clientY - g;
                        _w = f["width"];
                        _h = f["height"];
                        _t = _t <= 10 ? 0 : _t >= c.height() - 30 ? c.height() - 30 : _t;
                        a.css({width: _w, height: _h, left: _l, top: _t});
                        a.data("info").left = a.offset().left;
                        a.data("info").top = a.offset().top;
                    }).on("mouseup", function () {
                        $(this).off("mousemove").off("mouseup");
                        if (typeof(c) !== "undefined") {
                            c.hide();
                        }
                    });
                });
            },
            resize: function (a) {
                console.log(a.find("div.window-resize"));
                a.find("div.window-resize").on("mousedown", function (i) {
                    //alert("down")
                    var f = $(this),
                        d, b = i.clientX,
                        j = i.clientY,
                        c = a.width(),
                        g = a.height();
                    $(window.parent.document).on("mousemove", function (h) {
                        //alert("move")
                        d = maskBox.desk();
                        d.show();
                        //console.log(d,d.width());
                        _x = h.clientX;
                        _y = h.clientY;
                        _x = _x <= 10 ? 0 : _x >= (d.width() - 12) ? (d.width() - 2) : _x;
                        _y = _y <= 10 ? 0 : _y >= (d.height() - 12) ? d.height() : _y;
                        //console.log(c - b + _x);
                        var _a = a;
                        switch (f.attr("resize")) {
                            case "t":
                                g + j - _y > CONFIG.windowMinHeight ? _a.css({
                                    height: g + j - _y,
                                    top: _y
                                }) : _a.css({height: CONFIG.windowMinHeight});
                                break;
                            case "r":
                                //alert(1)
                                c - b + _x > CONFIG.windowMinWidth ? _a.css({width: c - b + _x}) : _a.css({width: CONFIG.windowMinWidth});
                                break;
                            case "b":
                                g - j + _y > CONFIG.windowMinHeight ? _a.css({height: g - j + _y}) : _a.css({height: CONFIG.windowMinHeight});
                                break;
                            case "l":
                                c + b - _x > CONFIG.windowMinWidth ? _a.css({
                                    width: c + b - _x,
                                    left: _x
                                }) : _a.css({width: CONFIG.windowMinWidth});
                                break;
                            case "rt":
                                g + j - _y > CONFIG.windowMinHeight ? _a.css({
                                    height: g + j - _y,
                                    top: _y
                                }) : _a.css({height: CONFIG.windowMinHeight});
                                c - b + _x > CONFIG.windowMinWidth ? _a.css({width: c - b + _x}) : _a.css({width: CONFIG.windowMinWidth});
                                break;
                            case "rb":
                                c - b + _x > CONFIG.windowMinWidth ? _a.css({width: c - b + _x}) : _a.css({width: CONFIG.windowMinWidth});
                                g - j + _y > CONFIG.windowMinHeight ? _a.css({height: g - j + _y}) : _a.css({height: CONFIG.windowMinHeight});
                                break;
                            case "lt":
                                c + b - _x > CONFIG.windowMinWidth ? _a.css({
                                    width: c + b - _x,
                                    left: _x
                                }) : _a.css({width: CONFIG.windowMinWidth});
                                g + j - _y > CONFIG.windowMinHeight ? _a.css({
                                    height: g + j - _y,
                                    top: _y
                                }) : _a.css({height: CONFIG.windowMinHeight});
                                break;
                            case "lb":
                                c + b - _x > CONFIG.windowMinWidth ? _a.css({
                                    width: c + b - _x,
                                    left: _x
                                }) : _a.css({width: CONFIG.windowMinWidth});
                                g - j + _y > CONFIG.windowMinHeight ? _a.css({height: g - j + _y}) : _a.css({height: CONFIG.windowMinHeight});
                                break;
                        }
                    }).on("mouseup", function () {
                        //alert("up");
                        if (typeof(d) !== "undefined") {
                            d.hide();
                        }
                        a.data("info").width = a.width();
                        a.data("info").height = a.height();
                        a.data("info").left = a.offset().left;
                        a.data("info").top = a.offset().top;
                        a.data("info").emptyW = $(window).width() - a.width();
                        a.data("info").emptyH = $(window).height() - a.height();
                        $(this).off("mousemove").off("mouseup");
                    });
                });
            }

        };
    })();
    var folderView = (function () {
        return {
            init: function (b) {
                var a = "";
                //$.getJSON(ajaxUrl + "?ac=getMyFolderApp&folderid=" + b.attr("realid"), function(j) {
                $.ajax({
                    type: "GET",
                    // contentType: "application/json",
                    dataType: "json",
                    // url: ajaxUrl,
                    // data: "ac=getMyFolderApp&folderid=" + b.attr("realid"),
                    //url: fn.url + 'getMyFolderApp.json',
                    url: fn.url + 'folder',
                    headers: {
                        Authorization: 'Token ' + url.getToken()
                    },
                    data: {
                        //"token": url.getToken(),
                        // "sql_type": "select",
                        "folder_id": b.attr("realid")
                    },
                    success: function (data) {
                        console.log("文件夹中的APP:", data);
                        if (data.code == 0) {
                            var c = 0;
                            if (data.result.children.length) {
                                for (var e = 0; e < data.result.children.length; e++) {
                                    switch (data.result.children[e]["type"]) {
                                        case "app":
                                        case "widget":
                                        case "papp":
                                        case "pwidget":
                                            a += appbtnTemp({
                                                "top": 0,
                                                "left": 0,
                                                "title": data.result.children[e]["name"],
                                                "type": data.result.children[e]["type"],
                                                "id": "d_" + data.result.children[e]["type"] + "_" + data.result.children[e]["id"],
                                                "realid": data.result.children[e]["id"],
                                                "imgsrc": data.result.children[e]["icon_url"]
                                            });
                                            break;
                                    }
                                }
                                if (data.result.children.length % 4 == 0) {
                                    c += Math.floor(data.result.children.length / 4) * 60;
                                } else {
                                    c += (Math.floor(data.result.children.length / 4) + 1) * 60;
                                }
                            } else {
                                a = "文件夹为空";
                                c += 30;
                            }
                            var h, g;
                            if (b.parent("div").hasClass("dock-applist")) {
                                h = b.offset().left + 60;
                                g = b.offset().top;
                            } else {
                                h = b.offset().left + 80;
                                g = b.offset().top - 20;
                            }
                            var d = false;
                            if (c + g + 46 > $(document).height()) {
                                var f = c + g + 46 - $(document).height();
                                if (f <= g) {
                                    g -= f;
                                } else {
                                    c -= f - g;
                                    g = 0;
                                    d = true;
                                }
                            }
                            $(".quick_view_container").remove();
                            if (h + 340 > $(document).width()) {
                                $("body").append(folderViewTemp({
                                    "id": "qv_" + b.attr("realid"),
                                    "realid": b.attr("realid"),
                                    "apps": a,
                                    "top": g,
                                    "left": h - 340 - 80,
                                    "height": c,
                                    "mlt": Math.ceil((c + 26) / 2),
                                    "mlm": false,
                                    "mlb": Math.ceil((c + 26) / 2),
                                    "mrt": b.offset().top - g,
                                    "mrm": true,
                                    "mrb": c + 26 - (b.offset().top - g) - 20
                                }));
                            } else {
                                $("body").append(folderViewTemp({
                                    "id": "qv_" + b.attr("realid"),
                                    "realid": b.attr("realid"),
                                    "apps": a,
                                    "top": g,
                                    "left": h,
                                    "height": c,
                                    "mlt": b.offset().top - g,
                                    "mlm": true,
                                    "mlb": c + 26 - (b.offset().top - g) - 20,
                                    "mrt": Math.ceil((c + 26) / 2),
                                    "mrm": false,
                                    "mrb": Math.ceil((c + 26) / 2)
                                }));
                            }
                            $("body").on("contextmenu", ".appbtn:not(.add)", function (m) {
                                $(".popup-menu").hide();
                                TEMP.AppRight = popupMenu.app($(this));
                                var i = ($(document).width() - m.clientX) < TEMP.AppRight.width() ? (m.clientX - TEMP.AppRight.width()) : m.clientX;
                                var k = ($(document).height() - m.clientY) < TEMP.AppRight.height() ? (m.clientY - TEMP.AppRight.height()) : m.clientY;
                                TEMP.AppRight.css({left: i, top: k}).show();
                                return false;
                            });
                            $(".quick_view_container_open").on("click", function () {
                                var _x = $(window).width();
                                var _y = $(window).height();
                                windows.create($(this).parents(".quick_view_container").attr("realid"), "folder", _x, _y);
                                $("#quick_view_container_" + $(this).parents(".quick_view_container").attr("realid")).remove();
                            });
                            folderView.getScrollbar(b.attr("realid"), d);
                            folderView.moveScrollbar(b.attr("realid"));
                            app.move();
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
            getScrollbar: function (d, b) {
                var a = "#quick_view_container_list_in_" + d;
                var c = "#quick_view_container_list_" + d + " .scrollBar";
                if (b) {
                    $("#quick_view_container_list_" + d + " .scrollBar_bgc").show();
                    $(c).show().height($(a).height() / (Math.ceil($(a).children().length / 4) * 60) * $(a).height());
                } else {
                    $("#quick_view_container_list_" + d + " .scrollBar_bgc").hide();
                    $(c).hide().height(0);
                }
            },
            moveScrollbar: function (c) {
                var a = "#quick_view_container_list_in_" + c;
                var b = "#quick_view_container_list_" + c + " .scrollBar";
                $(b).on("mousedown", function (i) {
                    var g = $("#quick_view_container_" + c).offset().top + 36;
                    var m, k, h, f;
                    var j = $(this),
                        d = $(a);
                    h = Math.ceil($(a).children().length / 4) * 60;
                    f = d.height() - j.height();
                    m = i.clientY - j.offset().top;
                    $(document).on("mousemove", function (n) {
                        k = n.clientY - m - g < 0 ? 0 : n.clientY - m - g > f ? f : n.clientY - m - g;
                        j.css("top", k);
                        d.scrollTop(k / d.height() * h);
                    }).on("mouseup", function () {
                        $(this).off("mousemove").off("mouseup");
                    });
                });
                $(a).off("mousewheel").on("mousewheel", function (f, h) {
                    var d = $(this),
                        g = Math.ceil($(a).children().length / 4) * 60,
                        e;
                    if (h < 0) {
                        e = d.scrollTop() + 40 > g - d.height() ? g - d.height() : d.scrollTop() + 40;
                    } else {
                        e = d.scrollTop() - 40 < 0 ? 0 : d.scrollTop() - 40;
                    }
                    d.stop(false, true).animate({scrollTop: e}, 300);
                    $(b).stop(false, true).animate({top: e / g * d.height()}, 300);
                });
            }
        };
    })();
    var deskTop = (function () {
        return {
            resize: function (a) {
                $.doTimeout("resize", a, function () {
                    if ($("#desktop").css("display") !== "none") {
                        dock.setPos();
                        deskTop.appresize();
                        deskTop.windowresize();
                        app.getScrollbar();
                    } else {
                        appmanage.resize();
                    }
                    wallpaper.set();
                });
            },
            appresize: function () {
                var b = grid.getAppGrid(),
                    c = grid.getDockAppGrid();

                //console.log("================");
                //console.log(b);
                //console.log(c);
                $("#dock-bar .dock-applist li").each(function (d) {
                    //console.log(c[d]["startX"]);
                    //console.log(c[d]["startY"]);
                    $(this).animate({"left": c[d]["startX"], "top": c[d]["startY"]}, 500);
                });
                for (var a = 1; a <= 5; a++) {
                    $("#desk-" + a + " li").each(function (d) {
                        $(this).animate({"left": b[d]["startX"] + 16, "top": b[d]["startY"] + 7}, 500);
                    });
                }
            },
            windowresize: function () {
                $("#desk div.window-container").each(function () {
                    var a = $(this).data("info");
                    console.log($(this), a);

                    currentW = $(window).width() - $(this).width();
                    currentH = $(window).height() - $(this).height();
                    _l = a["left"] / a["emptyW"] * currentW >= currentW ? currentW : a["left"] / a["emptyW"] * currentW;
                    _l = _l <= 0 ? 0 : _l;
                    _t = a["top"] / a["emptyH"] * currentH >= currentH ? currentH : a["top"] / a["emptyH"] * currentH;
                    _t = _t <= 0 ? 0 : _t;
                    $(this).animate({"left": _l, "top": _t}, 500);
                });
            }
        };
    })();
    var taskbar = (function () {
        return {
            init: function () {
                $("#task-content-inner").off("click").on("click", "a.task-item", function () {
                    if ($(this).hasClass("task-item-current")) {
                        windows.hide($(this).attr("realid"), $(this).attr("type"));
                    } else {
                        windows.show2top($(this).attr("realid"), $(this).attr("type"));
                    }
                }).off("contextmenu").on("contextmenu", "a.task-item", function (a) {
                    $(".popup-menu").hide();
                    $(".quick_view_container").remove();
                    taskbar.rightClick($(this), a.clientX, a.clientY);
                    return false;
                });
            },
            rightClick: function (c, a, d) {
                $(".popup-menu").hide();
                $(".quick_view_container").remove();
                var b = popupMenu.task(c);
                l = $(document).width() - a < b.width() ? a - b.width() : a;
                t = d - b.height();
                b.css({left: l, top: t}).show();
                return false;
            },
            pageClick: function (c, a) {
                var b = a - c;
                if (CONFIG.dockPos == "right") {
                    $("#task-content-inner").animate({marginLeft: 0}, 200);
                } else {
                    $("#task-content-inner").animate({marginRight: 0}, 200);
                }
                $("#task-next a").addClass("disable");
                $("#task-pre a").removeClass("disable");
                $("#task-next-btn").off("click").on("click", function () {
                    if ($(this).hasClass("disable") == false) {
                        if (CONFIG.dockPos == "right") {
                            var d = parseInt($("#task-content-inner").css("margin-left")) + 114;
                            if (d >= 0) {
                                d = 0;
                                $("#task-next a").addClass("disable");
                            }
                            $("#task-pre a").removeClass("disable");
                            $("#task-content-inner").animate({marginLeft: d}, 200);
                        } else {
                            var e = parseInt($("#task-content-inner").css("margin-right")) + 114;
                            if (e >= 0) {
                                e = 0;
                                $("#task-next a").addClass("disable");
                            }
                            $("#task-pre a").removeClass("disable");
                            $("#task-content-inner").animate({marginRight: e}, 200);
                        }
                    }
                });
                $("#task-pre-btn").off("click").on("click", function () {
                    if ($(this).hasClass("disable") == false) {
                        if (CONFIG.dockPos == "right") {
                            var d = parseInt($("#task-content-inner").css("margin-left")) - 114;
                            if (d <= b * -1) {
                                d = b * -1;
                                $("#task-pre a").addClass("disable");
                            }
                            $("#task-next a").removeClass("disable");
                            $("#task-content-inner").animate({marginLeft: d}, 200);
                        } else {
                            var e = parseInt($("#task-content-inner").css("margin-right")) - 114;
                            if (e <= b * -1) {
                                e = b * -1;
                                $("#task-pre a").addClass("disable");
                            }
                            $("#task-next a").removeClass("disable");
                            $("#task-content-inner").animate({marginRight: e}, 200);
                        }
                    }
                });
            },
            resize: function () {
                if (CONFIG.dockPos == "left") {
                    $("#task-bar").css({"left": 73, "right": 0});
                    $("#task-content-inner").removeClass("fl");
                } else {
                    if (CONFIG.dockPos == "right") {
                        $("#task-bar").css({"left": 0, "right": 73});
                        $("#task-content-inner").addClass("fl");
                    } else {
                        $("#task-bar").css({"left": 0, "right": 0});
                        $("#task-content-inner").removeClass("fl");
                    }
                }
                var a = $("#task-bar").width(),
                    c = $("#task-content-inner .task-item").length * 114,
                    b = a - 112;
                if (c >= b) {
                    $("#task-next, #task-pre").show();
                    $("#task-content").css("width", b);
                    taskbar.pageClick(b, c);
                } else {
                    $("#task-next, #task-pre").hide();
                    $("#task-content").css("width", "100%");
                    $("#task-content-inner").css({"margin-left": 0, "margin-right": 0});
                }
            }
        };
    })();
    var popupMenu = (function () {
        return {
            app: function (a) {
                if (!TEMP.popupMenuApp) {
                    TEMP.popupMenuApp = $('<div class="popup-menu app-menu" style="z-index:9990;display:none"><ul><li style="border-bottom:1px solid #F0F0F0"><a menu="open" href="javascript:;">打开应用</a></li><li><a menu="move" href="javascript:;">移动应用到<b class="arrow">»</b></a><div class="popup-menu" style="display:none"><ul><li><a menu="moveto" desk="1" href="javascript:;">桌面1</a></li><li><a menu="moveto" desk="2" href="javascript:;">桌面2</a></li><li><a menu="moveto" desk="3" href="javascript:;">桌面3</a></li><li><a menu="moveto" desk="4" href="javascript:;">桌面4</a></li><li><a menu="moveto" desk="5" href="javascript:;">桌面5</a></li></ul></div></li><li><b class="uninstall"></b><a menu="del" href="javascript:;">卸载应用</a></li></ul></div>');
                    $("body").append(TEMP.popupMenuApp);
                    $(".app-menu").on("contextmenu", function () {
                        return false;
                    });
                }
                $('.app-menu a[menu="moveto"]').removeClass("disabled");
                if (a.parent().hasClass("desktop-container")) {
                    $('.app-menu a[menu="moveto"]').each(function () {
                        if ($(this).attr("desk") == CONFIG.desk) {
                            $(this).addClass("disabled");
                        }
                    });
                }
                $(".app-menu li").off("mouseover").off("mouseout").on("mouseover", function () {
                    if ($(this).children("a").attr("menu") == "move") {
                        $(this).children("a").addClass("focus");
                        if ($(document).width() - $(".app-menu").offset().left > 250) {
                            $(this).children("div").css({left: 122, top: -2});
                        } else {
                            $(this).children("div").css({left: -126, top: -2});
                        }
                        $(this).children("div").show();
                    }
                }).on("mouseout", function () {
                    $(this).children("a").removeClass("focus");
                    $(this).children("div").hide();
                });
                $('.app-menu a[menu="moveto"]').off("click").on("click", function () {
                    var b = $(this).attr("desk");
                    $.ajax({
                        type: "PUT",
                        // contentType: "application/json",
                        dataType: "json",
                        //url: ajaxUrl,
                        //data: "ac=moveMyApp&id=" + a.attr("realid") + "&type=" + a.attr("type") + "&todesk=" + b,
                        //url: fn.url + 'moveMyApp.json',
                        url: fn.url + 'desktop',
                        headers: {
                            Authorization: 'Token ' + url.getToken()
                        },
                        data: JSON.stringify({
                            //"token": url.getToken(),
                            "sql_tupe": "update",
                            "from_child_id": a.attr("realid"),
                            "from_child_type": a.attr("type"),
                            "from_manager": "workspace",
                            "from_manager_id": b,
                            "to_manager": "workspace",
                            "to_manager_id": 2
                        }),
                        success: function (data) {
                            if (data.code == 0) {
                                console.log('静态模拟APP应用移动到其他桌面成功！');
                                $("#desk-" + b + " li.add").before(a);
                                deskTop.appresize();
                                app.getScrollbar();
                                //folderView.init();
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
                    $(".popup-menu").hide();
                });
                $('.app-menu a[menu="open"]').off("click").on("click", function () {
                    var _x = $(window).width();
                    var _y = $(window).height();
                    windows.create(a.attr("realid"), a.attr("type"), _x, _y);
                    $(".task-menu").hide();
                });
                $('.app-menu a[menu="del"]').off("click").on("click", function () {
                    app.remove(a.attr("realid"), a.attr("type"), function () {
                        //$(CONFIG.dockContent).each(function (i) {
                        //    if (CONFIG.dockContent[i] == a.attr("id")) {
                        //        CONFIG.manager = "dock";
                        //        CONFIG.dockContent.splice(i, 1);
                        //    }
                        //})
                        a.find("img, span").show().animate({opacity: "toggle", width: 0, height: 0}, 500, function () {
                            a.remove();
                            deskTop.resize(250);
                        });
                    });
                    $(".popup-menu").hide();
                });
                return TEMP.popupMenuApp;
            },
            folder: function (a) {
                if (!TEMP.popupMenuFolder) {
                    TEMP.popupMenuFolder = $('<div class="popup-menu folder-menu" style="z-index:9990;display:none"><ul><li><a menu="view" href="javascript:;">预览</a></li><li style="border-bottom:1px solid #F0F0F0"><a menu="open" href="javascript:;">打开</a></li><li><b class="edit"></b><a menu="rename" href="javascript:;">重命名</a></li><li><b class="del"></b><a menu="del" href="javascript:;">删除</a></li></ul></div>');
                    $("body").append(TEMP.popupMenuFolder);
                    $(".folder-menu").on("contextmenu", function () {
                        return false;
                    });
                }
                $('.folder-menu a[menu="view"]').off("click").on("click", function () {
                    folderView.init(a);
                    $(".popup-menu").hide();
                });
                $('.folder-menu a[menu="open"]').off("click").on("click", function () {
                    var _x = $(window).width();
                    var _y = $(window).height();
                    windows.create(a.attr("realid"), a.attr("type"), _x, _y);
                    $(".popup-menu").hide();
                });
                $('.folder-menu a[menu="del"]').off("click").on("click", function () {
                    dialog({
                        id: "delfolder",
                        title: "删除“" + a.find("span").text() + "”文件夹",
                        content: "删除文件夹的同时会删除文件夹内所有应用",
                        icon: "warning",
                        ok: function () {
                            app.remove(a.attr("realid"), a.attr("type"), function () {

                                //$(CONFIG.dockContent).each(function (i) {
                                //    if (CONFIG.dockContent[i] == a.attr("id")) {
                                //        CONFIG.manager = "dock";
                                //        CONFIG.dockContent.splice(i, 1);
                                //    }
                                //})
                                a.find("img, span").show().animate({
                                    opacity: "toggle",
                                    width: 0,
                                    height: 0
                                }, 500, function () {
                                    a.remove();
                                    deskTop.resize(250);
                                    app.get()
                                });
                            });
                        },
                        cancel: true
                    });
                    $(".popup-menu").hide();
                });
                $('.folder-menu a[menu="rename"]').off("click").on("click", function () {
                    dialog({
                        id: "addfolder",
                        title: "重命名“" + a.find("span").text() + "”文件夹",
                        padding: 0,
                        content: editFolderDialogTemp({
                            "name": a.find("span").text(),
                            "src": a.find("img").attr("src")
                        }),
                        ok: function () {
                            if ($("#folderName").val() != "") {
                                //alert($("#folderName").val())
                                $.ajax({
                                    type: "PUT",
                                    // contentType: "application/json",
                                    dataType: "json",
                                    // url: ajaxUrl,
                                    //  data: "ac=updateFolder&name=" + $("#folderName").val() + "&icon=" + $(".folderSelector img").attr("src") + "&id=" + a.attr("realid"),
                                    // url: fn.url + 'updateFolder.json',
                                    url: fn.url + 'folder',
                                    headers: {
                                        Authorization: 'Token ' + url.getToken()
                                    },
                                    data: {
                                        //"token": url.getToken(),
                                        // "sql_type": "update",
                                        "folder_name": $("#folderName").val(),
                                        // "icon": $(".folderSelector img").attr("src"),
                                        "folder_id": a.attr("realid")
                                    },
                                    success: function (e) {
                                        console.log("-----------------");
                                        console.log(e);
                                        if (e.code == 0) {
                                            console.log('修改文件夹信息成功!');
                                            app.get();
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
                                $(".folderNameError").show();
                                return false;
                            }
                        },
                        cancel: true
                    });
                    $(".folderSelector").off("click").on("click", function () {
                        $(".fcDropdown").show();
                    });
                    $(".fcDropdown_item").off("click").on("click", function () {
                        $(".folderSelector img").attr("src", $(this).children("img").attr("src")).attr("idx", $(this).children("img").attr("idx"));
                        $(".fcDropdown").hide();
                    });
                    $(".popup-menu").hide();
                });
                return TEMP.popupMenuFolder;
            },
            task: function (a) {
                if (!TEMP.popupMenuTask) {
                    TEMP.popupMenuTask = $('<div class="popup-menu task-menu" style="z-index:9990;display:none"><ul><li><a menu="max" href="javascript:;">最大化</a></li><li style="border-bottom:1px solid #F0F0F0"><a menu="hide" href="javascript:;">最小化</a></li><li><a menu="close" href="javascript:;">关闭</a></li></ul></div>');
                    $("body").append(TEMP.popupMenuTask);
                    $(".task-menu").on("contextmenu", function () {
                        return false;
                    });
                }
                $('.task-menu a[menu="max"]').off("click").on("click", function () {
                    windows.max(a.attr("realid"), a.attr("type"));
                    $(".popup-menu").hide();
                });
                $('.task-menu a[menu="hide"]').off("click").on("click", function () {
                    windows.hide(a.attr("realid"), a.attr("type"));
                    $(".popup-menu").hide();
                });
                $('.task-menu a[menu="close"]').off("click").on("click", function () {
                    windows.close(a.attr("realid"), a.attr("type"));
                    $(".popup-menu").hide();
                });
                return TEMP.popupMenuTask;
            }
        };
    })();
    var base = (function () {
        return {
            logout: function () {
                $.ajax({
                    type: "POST",
                    //contentType: "application/json",
                    dataType: "json",
                    //url: ajaxUrl,
                    //data: "ac=logout",
                    headers: {
                      Authorization: 'Token ' + url.getToken()
                    },
                    url: fn.url + "logout",
                    data: JSON.stringify({
                       // "token": url.getToken()
                    }),
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
        };
    })();
    var dock = (function () {
        return {
            move: function () {
                $("#dock-container").off("mousedown").on("mousedown", function (c) {

                    if (c.button == 0 || c.button == 1) {
                        var b = maskBox.dock(),
                            a;
                        $(document).on("mousemove", function (d) {
                            b.show();
                            if (d.clientY < b.height() * 0.2) {
                                a = "top";
                            } else {
                                if (d.clientX < b.width() * 0.5) {
                                    a = "left";
                                } else {
                                    a = "right";
                                }
                            }
                            $(".dock_drap_effect").removeClass("hover");
                            $(".dock_drap_effect_" + a).addClass("hover");
                        }).on("mouseup", function () {
                            $(document).off("mousemove").off("mouseup");
                            b.hide();
                            if (a != CONFIG.dockPos && typeof(a) != "undefined") {
                                dock.updatePos(a, function () {
                                    dock.setPos();
                                    deskTop.appresize();
                                    app.getScrollbar();
                                });
                            }
                        });
                    }
                });
            },
            updatePos: function (b, a) {
                $.ajax({
                    type: "PUT",
                    //contentType: "application/json",
                    dataType: "json",
                    //url: ajaxUrl,
                    //data: "ac=setDockPos&dock=" + b,
                    //url: fn.url + 'setDockPos.json',
                    url: fn.url + 'user_config',
                    headers: {
                        Authorization: 'Token ' + url.getToken()
                    },
                    data: {
                        //"token": url.getToken(),
                        // "sql_type": 'update',
                        "dock_pos": b
                    },
                    success: function (data) {
                        if (data.code == 0) {
                            console.log('应用码头更新成功！', data)
                            CONFIG.dockPos = b;
                            if (typeof(a) != "undefined") {
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
            getPos: function (a) {
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    //url: fn.url + 'getDockPos.json',
                    url: fn.url + 'user_config',
                    headers: {
                        Authorization: 'Token ' + url.getToken()
                    },
                    data: {
                        //"token": url.getToken(),
                        // "sql_type": 'select'
                    },
                    // url: ajaxUrl,
                    // data: "ac=getDockPos",
                    success: function (b) {
                        console.log('静态模拟应用码头显示位置：', b);
                        if (b.code == 0) {
                            CONFIG.dockPos = b.result.dock_pos;
                            CONFIG.appXY = b.result.layout;
                            dock.setPos();
                            if (typeof(a) != "undefined") {
                                a();
                            }
                        } else {
                            //错误
                            art.dialog({
                                lock: true,
                                id: 'list',
                                esc: false,
                                content: b.message
                            })
                        }

                    }
                });
            },
            setPos: function () {
                var d = $("#desk-" + CONFIG.desk, window.parent.document),
                    b = $("#desk .desktop-container", window.parent.document);

                var a = d.css("width", "100%").width(),
                    c = d.css("height", "100%").height();
                var e = $('#dock-container', window.parent.document).find('li');

                $("#dock-container", window.parent.document).removeClass("dock-top").removeClass("dock-left").removeClass("dock-right");
                $("#dock-bar", window.parent.document).removeClass("top-bar").removeClass("left-bar").removeClass("right-bar");
                if (CONFIG.dockPos == "top") {
                    var f = [];
                    e.each(function (i) {
                        f.push(e[i].offsetTop);
                        return f;
                    })
                    if (f[1] == 0) {
                        f = [];
                        e.each(function (i) {
                            f.push(e[i].offsetLeft);
                            return f
                        })
                    }
                    $("#dock-container", window.parent.document).removeClass("dock-top").removeClass("dock-left").removeClass("dock-right");
                    $("#dock-bar", window.parent.document).addClass("top-bar").children("#dock-container").addClass("dock-top");
                    b.css({"width": a, "height": c - 143, "left": a, "top": 73});
                    d.css({"left": 0});
                    e.each(function (i) {

                        $(this).css("left", f[i] + "px").css("top", 0).css("right", 0);
                    })
                } else {
                    if (CONFIG.dockPos == "left") {
                        var f = [];
                        e.each(function (i) {
                            f.push(e[i].offsetTop);
                            return f;
                        })
                        if (f[1] == 0) {
                            f = [];
                            e.each(function (i) {
                                f.push(e[i].offsetLeft);
                                return f
                            })
                        }

                        $("#dock-container", window.parent.document).removeClass("dock-top").removeClass("dock-left").removeClass("dock-right");
                        $("#dock-bar", window.parent.document).addClass("left-bar").children("#dock-container").addClass("dock-left");
                        e.each(function (i) {
                            $(this).css("top", f[i] + "px").css("left", 0).css("right", 0);
                        })

                        b.css({"width": a - 73, "height": c - 70, "left": a + 73, "top": 0});
                        d.css({"left": 73});
                    } else {
                        if (CONFIG.dockPos == "right") {
                            var f = [];
                            e.each(function (i) {
                                f.push(e[i].offsetTop);
                                return f;
                            })
                            if (f[1] == 0) {
                                f = [];
                                e.each(function (i) {
                                    f.push(e[i].offsetLeft);
                                    return f
                                })
                            }
                            $("#dock-container", window.parent.document).removeClass("dock-top").removeClass("dock-left").removeClass("dock-right");
                            $("#dock-bar", window.parent.document).addClass("right-bar").children("#dock-container").addClass("dock-right");
                            b.css({"width": a - 73, "height": c - 70, "left": a, "top": 0});
                            d.css({"left": 0});
                            e.each(function (i) {
                                $(this).css("top", f[i] + "px").css("right", 0).css("left", 0);
                            })
                        }
                    }
                }
                $("#dock-bar").show();
                taskbar.resize();
            }
        };
    })();


    exports.base = base;
    exports.dock = dock;
    exports.app = app;
    exports.windows = windows;
    exports.folderView = folderView;
    exports.deskTop = deskTop;
    exports.taskbar = taskbar;
    exports.popupMenu = popupMenu;


});