/**
 * Created by web on 2017/2/21.
 */
/*
 * zoom 方法
 */
define(function () {
    var swfobject = require('./zylibs/zylibs').swfobject;

    var zoom = (function () {
        return {
            init: function () {
                $("body").append('<div id="zoombox"></div>');
                swfobject.embedSWF("js/zoom.swf?onchange=zoom.check", "zoombox", "10", "10", "6.0.0", "expressInstall.swf", "", {
                    allowScriptAccess: "always",
                    wmode: "transparent",
                    scale: "noScale"
                }, {id: "accessory_zoom", name: "zoom_detect"});
            },
            check: function (c) {
                var b = c.scale,
                    a = b > 1 ? "放大" : "缩小";
                if (b != 1) {
                    zoomlevel = b;
                    $("#zoom-tip").show().find("span").text("您的浏览器目前处于" + a + "状态，会导致显示不正常，您可以键盘按“ctrl+数字0”组合键恢复初始状态！");
                } else {
                    if (b != zoomlevel) {
                        $("#zoom-tip").fadeOut();
                    }
                }
            },
            close: function () {
                $("#zoom-tip").remove();
            }
        };
    })();

    exports.zoom = zoom;
});