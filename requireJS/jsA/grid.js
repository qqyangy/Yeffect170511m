/**
 * Created by web on 2017/2/21.
 */
/*
 * grid方法
 */
define(function(){
    var CONFIG = require('./public').CONFIG;

    var grid = (function () {
        return {
            getAppGrid: function () {
                var d, a;
                d = $("#desk-" + CONFIG.desk,window.parent.document).width() - CONFIG.appButtonLeft;
                a = $("#desk-" + CONFIG.desk,window.parent.document).height() - CONFIG.appButtonTop;
                var b = [],
                    f = CONFIG.appButtonTop,
                    e = CONFIG.appButtonLeft;
                for (var c = 0; c < 10000; c++) {
                    b.push({startY: f, endY: f + 100, startX: e, endX: e + 120});
                    if (CONFIG.appXY == "x") {
                        e += 120;
                        if (e + 100 > d) {
                            f += 100;
                            e = CONFIG.appButtonLeft;
                        }
                    } else {
                        f += 100;
                        if (f + 70 > a) {
                            f = CONFIG.appButtonTop;
                            e += 120;
                        }
                    }
                }

                return b;
            },
            searchAppGrid: function (a, g) {
                var f = grid.getAppGrid(),
                    d = f.length;
                var b = 0,
                    c = $("#desk-" + CONFIG.desk + " li.appbtn:not(.add)").length - 1;
                for (var e = 0; e < d; e++) {
                    if (a >= f[e].startX && a <= f[e].endX) {
                        b += 1;
                    }
                    if (g >= f[e].startY && g <= f[e].endY) {
                        b += 1;
                    }
                    if (b === 2) {
                        return e > c ? c : e;
                    } else {
                        b = 0;
                    }
                }
                return null;
            },
            getDockAppGrid: function () {
                var a = $("#dock-bar .dock-applist").height();
                var d = [],
                    c = 0,
                    e = 0;
                for (var b = 0; b < 7; b++) {
                    d.push({startY: e, endY: e + 62, startX: c, endX: c + 62});
                    e += 62;
                    if (e + 62 > a) {
                        e = 0;
                        c += 62;
                    }
                }
                return d;
            },
            searchDockAppGrid: function (a, g) {
                var f = grid.getDockAppGrid(),
                    d = f.length,
                    b = 0,
                    c = $("#dock-bar .dock-applist li").length - 1;
                for (var e = 0; e < d; e++) {
                    if (a >= f[e].startX && a <= f[e].endX) {
                        b += 1;
                    }
                    if (g >= f[e].startY && g <= f[e].endY) {
                        b += 1;
                    }
                    if (b === 2) {
                        return e > c ? c : e;
                    } else {
                        b = 0;
                    }
                }
                return null;
            },
            getFolderGrid: function () {
                var a = [];
                $(".folder-window:visible").each(function () {
                    a.push({
                        zIndex: $(this).css("z-index"),
                        id: $(this).attr("realid"),
                        startY: $(this).offset().top,
                        endY: $(this).offset().top + $(this).height(),
                        startX: $(this).offset().left,
                        endX: $(this).offset().left + $(this).width()
                    });
                });
                a.sort(function (b, c) {
                    return c["zIndex"] - b["zIndex"];
                });
                return a;
            },
            searchFolderGrid: function (a, f) {
                var e = grid.getFolderGrid(),
                    c = e.length,
                    b = 0;
                for (var d = 0; d < c; d++) {
                    if (a >= e[d].startX && a <= e[d].endX) {
                        b += 1;
                    }
                    if (f >= e[d].startY && f <= e[d].endY) {
                        b += 1;
                    }
                    if (b === 2) {
                        return e[d]["id"];
                    } else {
                        b = 0;
                    }
                }
                return null;
            },
            getManageDockAppGrid: function () {
                var a = [],
                    c = 20;
                for (var b = 0; b < 7; b++) {
                    a.push({startX: c, endX: c + 72});
                    c += 72;
                }
                return a;
            },
            searchManageDockAppGrid: function (a) {
                var f = grid.getManageDockAppGrid(),
                    d = f.length,
                    b = 0,
                    c = $("#amg_dock_container li").length - 1;
                for (var e = 0; e < d; e++) {
                    if (a >= f[e].startX && a <= f[e].endX) {
                        b += 1;
                    }
                    if (b === 1) {
                        return e > c ? c : e;
                    } else {
                        b = 0;
                    }
                }
                return null;
            },
            getManageAppGrid: function () {
                var b = [],
                    c = 0;
                for (var a = 0; a < 10000; a++) {
                    b.push({startY: c, endY: c + 40});
                    c += 40;
                }
                return b;
            },
            searchManageAppGrid: function (g, b) {
                var f = grid.getManageAppGrid(),
                    d = f.length,
                    a = 0,
                    c = $("#amg_folder_container .folderItem:eq(" + b + ") .folderInner li").length - 1;
                for (var e = 0; e < d; e++) {
                    if (g >= f[e].startY && g <= f[e].endY) {
                        a += 1;
                    }
                    if (a === 1) {
                        return e > c ? c : e;
                    } else {
                        a = 0;
                    }
                }
                return null;
            }
        };
    })();

    exports.grid = grid;
});