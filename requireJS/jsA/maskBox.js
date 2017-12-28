/**
 * Created by web on 2017/2/21.
 */
/*
 * maskBox 方法
 */
define(function () {
    var TEMP = {};

    var maskBox = (function () {
        return {
            desk: function () {
                if (!TEMP.maskBoxDesk) {
                    TEMP.maskBoxDesk = $('<div id="maskbox"></div>');
                    $("body",window.parent.document).append(TEMP.maskBoxDesk);
                }
                return TEMP.maskBoxDesk;
            },
            dock: function () {
                if (!TEMP.maskBoxDock) {
                    TEMP.maskBoxDock = $('<div style="z-index:1000000003;display:block;cursor:default;background:none;width:100%;height:100%;position:absolute;top:0;left:0"><div id="docktop" class="dock_drap_effect dock_drap_effect_top"></div><div id="dockleft" class="dock_drap_effect dock_drap_effect_left"></div><div id="dockright" class="dock_drap_effect dock_drap_effect_right"></div><div id="dockmask" class="dock_drap_mask"><div class="dock_drop_region_top"></div><div class="dock_drop_region_left"></div><div class="dock_drop_region_right"></div></div></div>');
                    $("body").append(TEMP.maskBoxDock);
                }
                return TEMP.maskBoxDock;
            }
        };
    })();

    exports.maskBox = maskBox;
});