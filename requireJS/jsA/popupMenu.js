/**
 * Created by web on 2017/2/21.
 */
/*
 * popupMenu 方法
 */
define(function () {
    var app = require('./common').app;
    var base = require('./common').base;
    var deskTop = require('./common').deskTop;
    var dock = require('./common').dock;
    var taskbar = require('./common').taskbar;
    var folderView = require('./common').folderView;
    var c_windows = require('./common').windows;
    var windows = require('./windows').windows;
    var url = require('./public').url;
    var editFolderDialogTemp = require('./templates').editFolderDialogTemp;
    var CONFIG = require('./public').CONFIG;
    var grid = require('./grid').grid;
    var wallpaper = require('./wallpaper').wallpaper;
    var maskBox = require('./maskBox').maskBox;
    var dialog = require('./artDialog4.1.6/jquery.artDialog.source').dialog;
    var fn = require('./public').fn;
    var TEMP = {};

    var popupMenu = (function () {
        return {
            papp: function (a) {
                if (!TEMP.popupMenuApp) {
                    TEMP.popupMenuApp = $('<div class="popup-menu papp-menu" style="z-index:9990;display:none"><ul><li style="border-bottom:1px solid #F0F0F0"><a menu="open" href="javascript:;">打开应用</a></li><li><a menu="move" href="javascript:;">移动应用到<b class="arrow">»</b></a><div class="popup-menu" style="display:none"><ul><li><a menu="moveto" desk="1" href="javascript:;">桌面1</a></li><li><a menu="moveto" desk="2" href="javascript:;">桌面2</a></li><li><a menu="moveto" desk="3" href="javascript:;">桌面3</a></li><li><a menu="moveto" desk="4" href="javascript:;">桌面4</a></li><li><a menu="moveto" desk="5" href="javascript:;">桌面5</a></li></ul></div></li><li><b class="edit"></b><a menu="edit" href="javascript:;">编辑</a></li><li><b class="del"></b><a menu="del" href="javascript:;">删除应用</a></li></ul></div>');
                    $("body").append(TEMP.popupMenuApp);
                    $(".papp-menu").on("contextmenu", function () {
                        return false;
                    });
                }
                $('.papp-menu a[menu="moveto"]').removeClass("disabled");
                if (a.parent().hasClass("desktop-container")) {
                    $('.papp-menu a[menu="moveto"]').each(function () {
                        if ($(this).attr("desk") == CONFIG.desk) {
                            $(this).addClass("disabled");
                        }
                    });
                }
                $(".papp-menu li").off("mouseover").off("mouseout").on("mouseover", function () {
                    if ($(this).children("a").attr("menu") == "move") {
                        $(this).children("a").addClass("focus");
                        if ($(document).width() - $(".papp-menu").offset().left > 250) {
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
                $('.papp-menu a[menu="moveto"]').off("click").on("click", function () {
                    var b = $(this).attr("desk");
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        dataType: "json",
                        //url: ajaxUrl,
                        //data: "ac=moveMyApp&id=" + a.attr("realid") + "&type=" + a.attr("type") + "&todesk=" + b,
                        //url: fn.url + 'moveMyApp.json',
                        url: fn.url + 'moveMyApp',
                        headers: {
                            Authorization:'Token '+url.getToken()
                        },
                        data: JSON.stringify({
                            //"token": url.getToken(),
                            "id": a.attr("realid"),
                            "type": a.attr("type"),
                            "todesk": b
                        }),
                        success: function (data) {
                            if (data.code == 0) {
                                $("#desk-" + b + " li.add").before(a);
                                deskTop.appresize();
                                app.getScrollbar();
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
                $('.papp-menu a[menu="open"]').off("click").on("click", function () {
                    switch (a.attr("type")) {
                        case "papp":
                            c_windows.create(a.attr("realid"), a.attr("type"));
                            break;
                        case "pwidget":
                            widget.create(a.attr("realid"), a.attr("type"));
                            break;
                    }
                    $(".popup-menu").hide();
                });
                // $('.papp-menu a[menu="edit"]').off("click").on("click", function() {
                //     function b(c) {
                //         $.dialog({
                //             id: "addfolder",
                //             title: "编辑私人应用“" + c.title + "”",
                //             padding: 0,
                //             content: editPappDialogTemp({ "id": c.id, "name": c.title, "url": c.url, "width": c.width, "height": c.height }),
                //             ok: function() {
                //                 var f = $("#addpappName").val(),
                //                     e = $("#addpappUrl").val(),
                //                     g = $("#addpappWidth").val(),
                //                     d = $("#addpappHeight").val();
                //                 if (f != "" && e != "" && g != "" && d != "") { $.ajax({ type: "POST", url: ajaxUrl, data: "ac=updatePapp&name=" + f + "&url=" + e + "&width=" + g + "&height=" + d + "&id=" + c.id, success: function(h) { app.get(); } }); } else { alert("信息填写不完整"); }
                //             },
                //             cancel: true
                //         });
                //     }
                //     ZENG.msgbox.show("数据读取中，请耐心等待...", 6, 100000);

                //     $.getJSON(ajaxUrl + "?ac=getMyAppById&id=" + a.attr("realid") + "&type=" + a.attr("type"), function(c) {
                //         //     $.ajax({
                //         //     type : 'POST',
                //         //     url : 'interface/getMyAppById.json',
                //         //     data : {}
                //         // }).done(function(c){
                //         //     console.log("应用打开",c);
                //         if (c != null) {
                //             ZENG.msgbox._hide();
                //             switch (c["type"]) {
                //                 case "papp":
                //                 case "pwidget":
                //                     b({ id: c["id"], title: c["name"], url: c["url"], width: c["width"], height: c["height"], });
                //                     break;
                //             }
                //         } else {
                //             ZENG.msgbox.show("数据拉取失败", 5, 2000);
                //             return false;
                //         }
                //     });
                //     $(".popup-menu").hide();
                // });
                $('.papp-menu a[menu="del"]').off("click").on("click", function () {
                    app.remove(a.attr("realid"), a.attr("type"), function () {
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
                    c_windows.create(a.attr("realid"), a.attr("type"));
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
                                a.find("img, span").show().animate({
                                    opacity: "toggle",
                                    width: 0,
                                    height: 0
                                }, 500, function () {
                                    a.remove();
                                    deskTop.resize(250);
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
                                        Authorization:'Token '+url.getToken()
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
            desk: function () {
                if (!TEMP.popupMenuDesk) {
                    TEMP.popupMenuDesk = $('<div class="popup-menu desk-menu" style="z-index:9990;display:none"><ul><li><a menu="hideall" href="javascript:;">显示桌面</a></li><li><b class="refresh"></b><a menu="refresh" href="javascript:;">刷新</a></li><li style="border-bottom:1px solid #F0F0F0"><a menu="closeall" href="javascript:;">关闭所有应用</a></li><li><a href="javascript:;">新建<b class="arrow">»</b></a><div class="popup-menu" style="display:none"><ul><li><b class="folder"></b><a menu="addfolder" href="javascript:;">新建文件夹</a></li></ul></div></li><!--li style="border-bottom:1px solid #F0F0F0"><b class="upload"></b><a menu="uploadfile" href="javascript:;">上传文件</a></li--><li><b class="themes"></b><a menu="themes" href="javascript:;">主题设置</a></li><li><b class="setting"></b><a menu="setting" href="javascript:;">桌面设置</a></li><li style="border-bottom:1px solid #F0F0F0"><a href="javascript:;">图标设置<b class="arrow">»</b></a><div class="popup-menu" style="display:none"><ul><li><b class="hook"></b><a menu="orderby" orderby="x" href="javascript:;">横向排列</a></li><li><b class="hook"></b><a menu="orderby" orderby="y" href="javascript:;">纵向排列</a></li></ul></div></li><li><a menu="logout" href="javascript:;">注销</a></li></ul></div>');
                    $("body").append(TEMP.popupMenuDesk);
                    $(".desk-menu").on("contextmenu", function () {
                        return false;
                    });
                    $(".desk-menu li").off("mouseover").off("mouseout").on("mouseover", function () {
                        if ($(this).children("a").next() != "") {
                            $(this).children("a").addClass("focus");
                            if ($(document).width() - $(".desk-menu").offset().left > 250) {
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
                    $('.desk-menu a[menu="orderby"]').off("click").on("click", function () {
                        var a = $(this).attr("orderby");
                        if (CONFIG.appXY != a) {
                            app.updateXY(a, function () {
                                deskTop.appresize();
                                app.getScrollbar();
                            });
                        }
                        $(".popup-menu").hide();
                    });
                    $('.desk-menu a[menu="refresh"]').on("click", function () {
                        app.get();
                        $(".popup-menu").hide();
                    });
                    $('.desk-menu a[menu="hideall"]').on("click", function () {
                        windows.hideAll();
                        $(".popup-menu").hide();
                    });
                    $('.desk-menu a[menu="closeall"]').on("click", function () {
                        windows.closeAll();
                        $(".popup-menu").hide();
                    });
                    $('.desk-menu a[menu="addfolder"]').on("click", function () {
                        dialog({
                            id: "addfolder",
                            title: "新建文件夹",
                            padding: 0,
                            content: editFolderDialogTemp({"name": "新建文件夹", "src": "default-folder.png"}),
                            ok: function () {
                                if ($("#folderName").val() != "") {
                                    //alert("new1")
                                    $.ajax({
                                        type: "POST",
                                        // contentType: "application/json",
                                        dataType: "json",
                                        // url: ajaxUrl,
                                        //data: "ac=addFolder&name=" + $("#folderName").val() + "&icon=" + $(".folderSelector img").attr("src"),
                                        //url: fn.url + "addFolder.json",
                                        url: fn.url + "desktop",
                                        headers: {
                                            Authorization:'Token '+url.getToken()
                                        },
                                        data:JSON.stringify({
                                            // 'sql_type':'insert',
                                            'workspace_id':CONFIG.desk,
                                            'child_type':'folder',
                                            //"token": url.getToken(),
                                            "folder_name": $("#folderName").val(),
                                            "icon_url": $(".folderSelector img").attr("src")
                                        }),
                                        success: function (a) {
                                            CONFIG.manager = "workspace"
                                            if (a.code == 0) {
                                                app.get();
                                            }else {
                                                //错误
                                                art.dialog({
                                                    lock: true,
                                                    id: 'list',
                                                    esc: false,
                                                    content: a.message

                                                })
                                            }
                                            // if (a.code == 0) {
                                            //     alert("new2")
                                            //     console.log('新建文件夹成功！');
                                            //     $.ajax({
                                            //         type: "POST",
                                            //         // contentType: "application/json",
                                            //         dataType: "json",
                                            //         // url: ajaxUrl,
                                            //         // data: "ac=addMyApp&id=" + a.reult.folderid + "&type=folder&desk=" + CONFIG.desk,
                                            //         //url: fn.url + "addMyApp.json",
                                            //         url: fn.url + "desktop",
                                            //         data: {
                                            //             'sql_type':'insert',
                                            //             'workspace_id':CONFIG.desk,
                                            //             'child_type':'app',
                                            //             "token": url.getToken()
                                            //             // "folderid": a.result.folderid,
                                            //             // "desk": CONFIG.desk
                                            //         },
                                            //         success: function (data) {
                                            //             console.log(data)
                                            //             if (data.code == 0) {
                                            //                 console.log("重新获得桌面APP应用！")
                                            //                 app.get();
                                            //             } else {
                                            //                 //错误
                                            //                 art.dialog({
                                            //                     lock: true,
                                            //                     id: 'list',
                                            //                     esc: false,
                                            //                     content: data.message
                                            //
                                            //                 })
                                            //             }
                                            //
                                            //         }
                                            //     });
                                            // } else {
                                            //     //错误
                                            //     art.dialog({
                                            //         lock: true,
                                            //         id: 'list',
                                            //         esc: false,
                                            //         content: data.message
                                            //
                                            //     })
                                            // }

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
                    $('.desk-menu a[menu="uploadfile"]').on("click", function () {
                        uploadFile.getDialog();
                        $(".popup-menu").hide();
                    });
                    $('.desk-menu a[menu="themes"]').on("click", function () {
                        c_windows.createTemp({
                            id: "ztsz",
                            title: "主题设置",
                            url: "wallpaper/index.html",
                            width: 580,
                            height: 520,
                            isresize: false,
                            isflash: false
                        });
                        $(".popup-menu").hide();
                    });
                    $('.desk-menu a[menu="setting"]').on("click", function () {
                        c_windows.createTemp({
                            id: "zmsz",
                            title: "桌面设置",
                            url: "desksetting/index.html",
                            width: 750,
                            height: 450,
                            isresize: false,
                            isflash: false
                        });
                        $(".popup-menu").hide();
                    });
                    $('.desk-menu a[menu="logout"]').on("click", function () {

                      baslogout();
                    });
                }
                $('.desk-menu a[menu="orderby"]').each(function () {
                    $(this).prev().hide();
                    if ($(this).attr("orderby") == CONFIG.appXY) {
                        $(this).prev().show();
                    }
                    $(".popup-menu").hide();
                });
                return TEMP.popupMenuDesk;
            }
        };
    })();
      window.baslogout=function(){
        base.logout();
        $(".popup-menu").hide();
      }
    exports.popupMenu = popupMenu;
});