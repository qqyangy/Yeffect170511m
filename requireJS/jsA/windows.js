/**
 * Created by web on 2017/2/21.
 */
/*
 * windows 方法
 */
define(function () {
    //alert(123123123)
    var taskbar = require('./common').taskbar;
    var c_windows = require('./common').windows;
    var fn = require('./public').fn;
    var url = require('./public').url;
    var windowTemp = require('./templates').windowTemp;
    var taskTemp = require('./templates').taskTemp;
    var folderWindowTemp = require('./templates').folderWindowTemp;
    var appbtnTemp = require('./templates').appbtnTemp;
    var starDialogTemp = require('./templates').starDialogTemp;
    var CONFIG = require('./public').CONFIG;
    var maskBox = require('./maskBox').maskBox;
    var grid = require('./grid').grid;
    var msgboxshow = require('./zylibs/zylibs').msgboxshow;
    var msgbox_hide = require('./zylibs/zylibs').msgbox_hide;

    var TEMP = {};

    var windows = (function () {
        return {
            //d为app_id，a为app_type
            closeAll: function () {
                $("#desk .window-container").each(function () {
                    c_windows.close($(this).attr("realid"), $(this).attr("type"));
                });
            },
            hideAll: function () {
                $("#task-content-inner a.task-item").removeClass("task-item-current");
                $("#desk-" + CONFIG.desk).nextAll("div.window-container").css("visibility", "hidden");
            },
            refresh: function (d, c) {
                windows.show2top(d, c);
                var a = "#w_" + c + "_" + d,
                    b = "#t_" + c + "_" + d;
                if ($(a + "_iframe").length != 0) {
                    $(a + "_iframe").attr("src", $(a + "_iframe").attr("src"));
                } else {
                    windows.updateFolder(d, c);
                }
            }
        };
    })();

    exports.windows = windows;
});