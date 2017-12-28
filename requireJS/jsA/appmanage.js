/**
 * Created by cd on 2017/2/13.
 */
/*
 * appmanage模块
 */
define(function(){
    var url = require('./public').url;
    var grid = require('./grid').grid;
    var fn = require('./public').fn;
    var app = require('./common').app;
    var maskBox = require('./maskBox').maskBox;
    var CONFIG = require('./public').CONFIG;
    var windows = require('./common').windows;

    var appmanage = (function () {
        return {
            init: function () {
                $("#amg_dock_container").html("").append($("#dock-container .dock-applist li").clone());
                $("#desk .desktop-container").each(function (a) {
                    $("#amg_folder_container .folderItem:eq(" + a + ") .folderInner").html("");
                    $(this).children(".appbtn:not(.add)").each(function () {
                        $("#amg_folder_container .folderItem:eq(" + a + ") .folderInner").append($(this).clone());
                    });
                });
                $("#desktop").hide();
                $("#appmanage").show();
                $("#amg_folder_container .folderItem").show().addClass("folderItem_turn");
                $("#amg_folder_container").height($(document).height() - 80);
                $("#appmanage .amg_close").off("click").on("click", function () {
                    appmanage.close();
                });
                appmanage.appresize();
                appmanage.move();
                appmanage.getScrollbar();
                appmanage.moveScrollbar();
            },
            getScrollbar: function () {
                setTimeout(function () {
                    $("#amg_folder_container .folderItem").each(function () {
                        var a = $(this).find(".folderInner"),
                            b = parseInt(a.children(".shortcut:last").css("top")) + 41,
                            c = a.next(".scrollBar");
                        c.hide();
                        a.scrollTop(0);
                        if (a.height() / b < 1) {
                            c.height(a.height() / b * a.height()).css("top", 0).show();
                        }
                    });
                }, 500);
            },
            moveScrollbar: function () {
                $(".scrollBar").on("mousedown", function (d) {
                    var h, g, c, b;
                    var f = $(this),
                        a = f.prev(".folderInner");
                    c = parseInt(a.children(".shortcut:last").css("top")) + 41;
                    b = a.height() - f.height();
                    h = d.clientY - f.offset().top;
                    $(document).on("mousemove", function (i) {
                        g = i.clientY - h - 80 < 0 ? 0 : i.clientY - h - 80 > b ? b : i.clientY - h - 80;
                        f.css("top", g);
                        a.scrollTop(g / a.height() * c);
                    }).on("mouseup", function () {
                        $(this).off("mousemove").off("mouseup");
                    });
                });
                $("#amg_folder_container .folderInner").off("mousewheel").on("mousewheel", function (c, e) {
                    var a = $(this),
                        d = parseInt(a.children(".shortcut:last").css("top")) + 41,
                        b;
                    if (e < 0) {
                        b = a.scrollTop() + 120 > d - a.height() ? d - a.height() : a.scrollTop() + 120;
                    } else {
                        b = a.scrollTop() - 120 < 0 ? 0 : a.scrollTop() - 120;
                    }
                    a.stop(false, true).animate({scrollTop: b}, 300);
                    a.next(".scrollBar").stop(false, true).animate({top: b / d * a.height()}, 300);
                });
            },
            appresize: function () {
                var b = grid.getManageDockAppGrid();
                $("#amg_dock_container li").each(function (d) {
                    $(this).animate({"left": b[d]["startX"], "top": 10}, 500);
                });
                for (var a = 0; a < 5; a++) {
                    var c = grid.getManageAppGrid();
                    $("#amg_folder_container .folderItem:eq(" + a + ") .folderInner li").each(function (d) {
                        $(this).animate({"left": 0, "top": c[d]["startY"]}, 500).attr("desk", a);
                    });
                }
            },
            close: function () {
                $("#amg_dock_container").html("");
                $("#amg_folder_container .folderInner").html("");
                $("#desktop").show();
                $("#appmanage").hide();
                $("#amg_folder_container .folderItem").removeClass("folderItem_turn");
                app.get();
            },
            resize: function () {
                $("#amg_folder_container").height($(document).height() - 80);
                appmanage.getScrollbar();
            },
            move: function () {
                $("#amg_dock_container").off("mousedown").on("mousedown", "li", function (f) {
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
                                appmanage.close();
                                switch (j.attr("type")) {
                                    case "widget":
                                    case "pwidget":
                                        widget.create(j.attr("realid"), j.attr("type"));
                                        break;
                                    case "app":
                                    case "papp":
                                    case "folder":
                                        windows.create(j.attr("realid"), j.attr("type"));
                                        break;
                                }
                                return false;
                            }
                            var n, e;
                            var o = $("#amg_folder_container .folderItem:eq(" + j.attr("desk") + ") .folderInner li").length == 0 ? -1 : $("#amg_folder_container .folderItem:eq(" + j.attr("desk") + ") .folderInner li").index(j);
                            var p = $("#amg_dock_container").html() == "" ? -1 : $("#amg_dock_container li").index(j);
                            if (a <= 80) {
                                e = grid.searchManageDockAppGrid(b);
                                if (e != null && e != j.index()) {
                                    //全局视图应用码头中app相互换位
                                    $.ajax({
                                        type: "PUT",
                                        // contentType: "application/json",
                                        dataType: "json",
                                        //url: ajaxUrl,
                                        //data: "ac=updateMyApp&movetype=dock-dock&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.index() + "&to=" + e + "&desk=" + CONFIG.desk,
                                        url: fn.url + "desktop",
                                        headers: {
                                            Authorization:'Token '+url.getToken()
                                        },
                                        data:JSON.stringify({
                                            //"token": url.getToken(),
                                            // "sql_type": "update",
                                            "from_manager": "dock",
                                            "from_manager_id": 1,
                                            "to_manager": "dock",
                                            "to_manager_id": 1,
                                            "child_id": j.attr("realid"),
                                            "child_type": j.attr("type"),
                                            "to_index":e
                                            // "token": url.getToken(),
                                            // "movetype": "dock-dock",
                                            // "id": j.attr("realid"),
                                            // "type": j.attr("type"),
                                            // "from": j.index(),
                                            // "to": e,
                                            // "desk": CONFIG.desk
                                        }),
                                        success: function (data) {
                                            if (data.code == 0) {
                                                console.log('静态模拟应用码头中APP应用到应用码头成功2！');
                                                console.log(data);
                                                if (e < p) {
                                                    $("#amg_dock_container li:eq(" + e + ")").before(j);
                                                } else {
                                                    if (e > p) {
                                                        $("#amg_dock_container li:eq(" + e + ")").after(j);
                                                    }
                                                }
                                                appmanage.appresize();
                                                appmanage.getScrollbar();
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
                                var m = parseInt(b / ($(document).width() / 5));
                                n = grid.searchManageAppGrid(a - 90, m);

                                if (n != null) {
                                    console.log(n+1)
                                    //全局视图码头内app移动到不同桌面
                                    $.ajax({
                                        type: "PUT",
                                        // contentType: "application/json",
                                        dataType: "json",
                                        //url: ajaxUrl,
                                        //data: "ac=updateMyApp&movetype=dock-desk&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.index() + "&to=" + (n + 1) + "&desk=" + (m + 1),
                                        url: fn.url + "desktop",
                                        headers: {
                                            Authorization:'Token '+url.getToken()
                                        },
                                        data:JSON.stringify({
                                            //"token": url.getToken(),
                                            // "sql_type": "update",
                                            "from_manager": "dock",
                                            "from_manager_id": 1,
                                            "to_manager": "workspace",
                                            "to_manager_id": (m + 1),
                                            "child_id": j.attr("realid"),
                                            "child_type": j.attr("type"),
                                            "to_index": (n + 1)
                                            // "token": url.getToken(),
                                            // "movetype": "dock-desk",
                                            // "id": j.attr("realid"),
                                            // "type": j.attr("type"),
                                            // "from": j.index(),
                                            // "to": (n + 1),
                                            // "desk": (m + 1)
                                        }),
                                        success: function (data) {
                                            if (data.code == 0) {
                                                console.log('静态模拟应用码头中APP应用到桌面成功2！');
                                                if (n < o) {
                                                    $("#amg_folder_container .folderItem:eq(" + m + ") .folderInner li:eq(" + n + ")").before(j);
                                                } else {
                                                    if (n > o) {
                                                        $("#amg_folder_container .folderItem:eq(" + m + ") .folderInner li:eq(" + n + ")").after(j);
                                                    } else {
                                                        if (o == -1) {
                                                            $("#amg_folder_container .folderItem:eq(" + m + ") .folderInner").append(j);
                                                        }
                                                    }
                                                }
                                                appmanage.appresize();
                                                appmanage.getScrollbar();
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
                        });
                    }
                    return false;
                });
                $("#amg_folder_container").off("mousedown", "li.appbtn:not(.add)").on("mousedown", "li.appbtn:not(.add)", function (f) {
                    f.preventDefault();
                    f.stopPropagation();
                    if (f.button == 0 || f.button == 1) {
                        var j = $(this),
                            h, g, b, a, k, i, d, c = $('<li id="shortcut_shadow2">' + j.html() + "</li>");
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
                                appmanage.close();
                                switch (j.attr("type")) {
                                    case "widget":
                                    case "pwidget":
                                        widget.create(j.attr("realid"), j.attr("type"));
                                        break;
                                    case "app":
                                    case "papp":
                                    case "folder":
                                        windows.create(j.attr("realid"), j.attr("type"));
                                        break;
                                }
                                return false;
                            }
                            var n, e;
                            var o = $("#amg_folder_container .folderItem:eq(" + j.attr("desk") + ") .folderInner li").length == 0 ? -1 : $("#amg_folder_container .folderItem:eq(" + j.attr("desk") + ") .folderInner li").index(j);
                            var p = $("#amg_dock_container").html() == "" ? -1 : $("#amg_dock_container li").index(j);
                            if (a <= 80) {
                                e = grid.searchManageDockAppGrid(b);
                                //全局视图桌面移动到应用码头中
                                if (e != null) {
                                    $.ajax({
                                        type: "PUT",
                                        // contentType: "application/json",
                                        dataType: "json",
                                        //url: ajaxUrl,
                                        //data: "ac=updateMyApp&movetype=desk-dock&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.index() + "&to=" + (e + 1) + "&desk=" + (parseInt(j.attr("desk")) + 1),
                                        url: fn.url + "desktop",
                                        headers: {
                                            Authorization:'Token '+url.getToken()
                                        },
                                        data:JSON.stringify({
                                            //"token": url.getToken(),
                                            // "sql_type": "update",
                                            "from_manager": "workspace",
                                            "from_manager_id": (parseInt(j.attr("desk")) + 1),
                                            "to_manager": "dock",
                                            "to_manager_id": 1,
                                            "child_id": j.attr("realid"),
                                            "child_type": j.attr("type"),
                                            "to_index": (e + 1)
                                            // "to_child_id": j.attr("realid"),
                                            // "to_child_type": j.attr("type")
                                            // "token": url.getToken(),
                                            // "movetype": "desk-dock",
                                            // "id": j.attr("realid"),
                                            // "type": j.attr("type"),
                                            // "from": j.index(),
                                            // "to": (e + 1),
                                            // "desk": (parseInt(j.attr("desk")) + 1)
                                        }),
                                        success: function (data) {

                                            if (data.code == 0) {
                                                // alert(parseInt(j.attr("desk")) + 1);
                                                console.log('静态模拟桌面图标到应用码头成功2！')
                                                if (e < p) {
                                                    $("#amg_dock_container li:eq(" + e + ")").before(j);
                                                } else {
                                                    if (e > p) {
                                                        $("#amg_dock_container li:eq(" + e + ")").after(j);
                                                    } else {
                                                        if (p == -1) {
                                                            $("#amg_dock_container").append(j);
                                                        }
                                                    }
                                                }
                                                if ($("#amg_dock_container li.shortcut").length > 7) {
                                                    if ($("#amg_folder_container .folderItem:eq(" + j.attr("desk") + ") .folderInner li").length == 0) {
                                                        $("#amg_folder_container .folderItem:eq(" + j.attr("desk") + ") .folderInner").append($("#amg_dock_container li").last());
                                                    } else {
                                                        $("#amg_folder_container .folderItem:eq(" + j.attr("desk") + ") .folderInner li").last().after($("#amg_dock_container li").last());
                                                    }
                                                }
                                                appmanage.appresize();
                                                appmanage.getScrollbar();
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
                                var m = parseInt(b / ($(document).width() / 5));
                                n = grid.searchManageAppGrid(a - 90, m);
                                //全局视图内app桌面之间移动
                                if (n != null) {
                                    // alert("unknow")
                                    console.log("j.index从第几个位置来："+j.index())
                                    console.log("到第几个桌面去："+(m + 1))
                                    console.log("放到第几个位置去"+n)
                                    console.log("从第几个桌面来："+(parseInt(j.attr("desk")) + 1))
                                    if (m == j.attr("desk")) {
                                        console.log(n)
                                        $.ajax({
                                            type: "PUT",
                                            // contentType: "application/json",
                                            dataType: "json",
                                            //url: ajaxUrl,
                                            //data: "ac=updateMyApp&movetype=desk-desk&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.index() + "&to=" + n + "&desk=" + (m + 1),
                                            url: fn.url + "desktop",
                                            headers: {
                                                Authorization:'Token '+url.getToken()
                                            },
                                            data:JSON.stringify({
                                                //"token": url.getToken(),
                                                // "sql_type": "update",
                                                "from_manager": "workspace",
                                                "from_manager_id": (parseInt(j.attr("desk")) + 1),
                                                "to_manager": "workspace",
                                                "to_manager_id": (m + 1),
                                                "child_id": j.attr("realid"),
                                                "child_type": j.attr("type"),
                                                "to_index": (n + 1)
                                                // "to_child_id": j.attr("realid"),
                                                // "to_child_type": j.attr("type")
                                                // "token": url.getToken(),
                                                // "movetype": "desk-desk",
                                                // "id": j.attr("realid"),
                                                // "type": j.attr("type"),
                                                // "from": j.index(),
                                                // "to": n,
                                                // "desk": (m + 1)
                                            }),
                                            success: function (data) {
                                                if (data.code == 0) {
                                                    console.log('静态模拟桌面APP应用到桌面成功！');
                                                    if (n < o) {
                                                        $("#amg_folder_container .folderItem:eq(" + m + ") .folderInner li:eq(" + n + ")").before(j);
                                                    } else {
                                                        if (n > o) {
                                                            $("#amg_folder_container .folderItem:eq(" + m + ") .folderInner li:eq(" + n + ")").after(j);
                                                        } else {
                                                            if (o == -1) {
                                                                $("#amg_folder_container .folderItem:eq(" + m + ") .folderInner").append(j);
                                                            }
                                                        }
                                                    }
                                                    appmanage.appresize();
                                                    appmanage.getScrollbar();
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
                                        //全局视图内文件夹桌面之间移动
                                        $.ajax({
                                            type: "PUT",
                                            // contentType: "application/json",
                                            dataType: "json",
                                            //url: ajaxUrl,
                                            //data: "ac=updateMyApp&movetype=desk-otherdesk&id=" + j.attr("realid") + "&type=" + j.attr("type") + "&from=" + j.index() + "&to=" + n + "&desk=" + (parseInt(j.attr("desk")) + 1) + "&otherdesk=" + (m + 1),
                                            url: fn.url + "desktop",
                                            headers: {
                                                Authorization:'Token '+url.getToken()
                                            },
                                            data:JSON.stringify({
                                                //"token": url.getToken(),
                                                // "sql_type": "update",
                                                "from_manager": "workspace",
                                                "from_manager_id": (parseInt(j.attr("desk")) + 1),
                                                "to_manager": "workspace",
                                                "to_manager_id": (m + 1),
                                                "child_id": j.attr("realid"),
                                                "child_type": j.attr("type"),
                                                "to_index":(n + 1)
                                                // "to_child_id": j.attr("realid"),
                                                // "to_child_type": j.attr("type")
                                                // "token": url.getToken(),
                                                // "movetype": "desk-otherdesk",
                                                // "id": j.attr("realid"),
                                                // "type": j.attr("type"),
                                                // "from": j.index(),
                                                // "to": n,
                                                // "desk": (parseInt(j.attr("desk")) + 1),
                                                // "otherdesk": (m + 1)
                                            }),
                                            success: function (data) {
                                                if (data.code == 0) {
                                                    // alert(m+1)
                                                    console.log('静态模拟桌面APP应用到桌面成功2！');
                                                    if (n != -1) {
                                                        $("#amg_folder_container .folderItem:eq(" + m + ") .folderInner li:eq(" + n + ")").before(j);
                                                    } else {
                                                        $("#amg_folder_container .folderItem:eq(" + m + ") .folderInner").append(j);
                                                    }
                                                    appmanage.appresize();
                                                    appmanage.getScrollbar();
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
            }
        };
    })();


    exports.appmanage = appmanage;
});
