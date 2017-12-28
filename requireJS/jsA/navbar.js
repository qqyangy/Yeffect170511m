/**
 * Created by web on 2017/2/21.
 */
/*
 * navbar 方法
 */
define(function () {
    var fn = require('./public').fn;
    var maskBox = require('./maskBox').maskBox;
    var CONFIG = require('./public').CONFIG;
    var appmanage = require('./appmanage').appmanage;

    var navbar = (function () {
        return {
            init: function () {
                //$("#nav-bar").css({ "left": $(document).width() / 2 - 105, "top": 80 }).show();
                $("#nav-bar").css({"left": $(document).width() / 2 - 105, "top": fn.winH - 60}).show();
                navbar.move();
                navbar.deskSwitch();
            },
            move: function () {
                $("#nav-bar").on("mousedown", function (f) {
                    if (f.button == 0 || f.button == 1) {
                        var b, h, a, g, c, d = $("#nav-bar");
                        b = f.clientX - d.offset().left;
                        h = f.clientY - d.offset().top;
                        $(document).on("mousemove", function (i) {
                            c = maskBox.desk();
                            c.show();
                            a = i.clientX - b <= 0 ? 0 : i.clientX - b > $(document).width() - 210 ? $(document).width() - 210 : i.clientX - b;
                            g = i.clientY - h <= 10 ? 10 : i.clientY - h > $(document).height() - 50 ? $(document).height() - 50 : i.clientY - h;
                            d.css({left: a, top: g});
                        }).on("mouseup", function () {
                            if (typeof(c) !== "undefined") {
                                c.hide();
                            }
                            $(this).off("mousemove").off("mouseup");
                        });
                    }
                });
            },
            deskSwitch: function () {
                $("#nav-bar .nav-container").on("mousedown", "a.indicator", function (g) {
                    $(".popup-menu").hide();
                    $(".quick_view_container").remove();
                    if (g.button == 0 || g.button == 1) {
                        var i, h, c, b, k, j, f, d = $("#nav-bar"),
                            a = $(this);
                        k = c = d.offset().left;
                        j = b = d.offset().top;
                        i = g.clientX - k;
                        h = g.clientY - j;
                        $(document).on("mousemove", function (m) {
                            f = maskBox.desk();
                            f.show();
                            c = m.clientX - i <= 0 ? 0 : m.clientX - i > $(document).width() - 210 ? $(document).width() - 210 : m.clientX - i;
                            b = m.clientY - h <= 10 ? 10 : m.clientY - h > $(document).height() - 50 ? $(document).height() - 50 : m.clientY - h;
                            d.css({left: c, top: b});
                        }).on("mouseup", function () {
                            if (k == c && j == b) {
                                if (typeof(a.attr("index")) !== "undefined") {
                                    var o = $("#navContainer"),
                                        e = CONFIG.desk,
                                        n = a.attr("index"),
                                        m = $("#desk-" + e).offset().left,
                                        p = $("#desk-" + n).offset().left;
                                    if (e != n) {
                                        if (!$("#desk-" + n).hasClass("animated") && !$("#desk-" + e).hasClass("animated")) {
                                            $("#desk-" + e).addClass("animated").animate({left: p}, 500, "easeInOutCirc", function () {
                                                $(this).removeClass("animated");
                                            });
                                            $("#desk-" + n).addClass("animated").animate({left: m}, 500, "easeInOutCirc", function () {
                                                $(this).removeClass("animated");
                                                o.removeClass("nav-current-" + e).addClass("nav-current-" + n);
                                                CONFIG.desk = n;
                                            });
                                        }
                                    }
                                } else {
                                    appmanage.init();
                                }
                            }
                            if (typeof(f) !== "undefined") {
                                f.hide();
                            }
                            $(this).off("mousemove").off("mouseup");
                        });
                    }
                });
            }
        };
    })();

    exports.navbar = navbar;
});