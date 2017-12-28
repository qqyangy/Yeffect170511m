/**
 * Created by web on 2017/2/21.
 */
/*
 * widget 方法
 */
define(function () {
    var fn = require('./public').fn;
    var url = require('./public').url;
    var widgetWindowTemp = require('./templates').widgetWindowTemp;

    var widget = (function () {
        return {
            create: function (id, type) {
                var iswidgetopen = false,
                    widgetid;
                $("#desk .widget").each(function () {
                    if ($(this).attr("realid") == id) {
                        iswidgetopen = true;
                    }
                });
                if (iswidgetopen == false) {
                    function nextDo(options) {
                        if (widget.checkCookie(id, type)) {
                            if ($.cookie("widgetState")) {
                                widgetState = eval("(" + $.cookie("widgetState") + ")");
                                $(widgetState).each(function () {
                                    if (this.id == options.id) {
                                        options.top = this.top;
                                        options.left = this.left;
                                        options.type = this.type;
                                    }
                                });
                            }
                        } else {
                            widget.addCookie(options.id, options.type, 0, 0);
                        }
                        $("#desk",window.parent.document).append(widgetWindowTemp({
                            "width": options.width,
                            "height": options.height,
                            "type": options.type,
                            "id": "w_" + options.type + "_" + options.id,
                            "realid": options.id,
                            "top": options.top == "" ? 0 : options.top,
                            "left": options.left == "" ? 0 : options.left,
                            "url": options.url
                        }));
                        var widgetId = "#w_" + options.type + "_" + options.id;
                        widget.handle($(widgetId));
                        widget.move($(widgetId));
                    }

                    msgboxshow("小挂件正在加载中，请耐心等待...", 6, 100000);
                    //$.getJSON(ajaxUrl + "?ac=getMyAppById&id=" + id + "&type=" + type, function(widget) {
                    $.ajax({
                        type: 'POST',
                        contentType: "application/json",
                        dataType: "json",
                        //url: 'interface/getMyAppById_folder.json',
                        //url: fn.url + 'getMyAppById.json',
                        url: fn.url + 'getMyAppById',
                        headers: {
                            Authorization:'Token '+url.getToken()
                        },
                        data: JSON.stringify({/*"token": url.getToken(),*/ "id": id, "type": type})
                    }).done(function (widget) {
                        if (widget.code == 0) {
                            msgbox_hide();
                            var options = {
                                id: widget.result.id,
                                url: widget.result.url,
                                width: widget.result.width,
                                height: widget.result.height,
                                type: widget.result.type
                            };
                            nextDo(options);
                        } else {
                            msgboxshow("小挂件加载失败", 5, 2000);
                            return false;
                        }
                    });
                }
            },
            reduction: function () {
                if ($.cookie("widgetState")) {
                    var widgetState = eval("(" + $.cookie("widgetState") + ")");
                    //console.log('?',widgetState);
                    for (var i = 0; i < widgetState.length; i++) {
                        widget.create(widgetState[i].id, widgetState[i].type);
                    }
                }
            },
            checkCookie: function (id, type) {
                var flag = false;
                if ($.cookie("widgetState")) {
                    widgetState = eval("(" + $.cookie("widgetState") + ")");
                    $(widgetState).each(function () {
                        if (this.id == id && this.type == type) {
                            flag = true;
                        }
                    });
                }
                return flag;
            },
            addCookie: function (id, type, top, left) {
                if (!widget.checkCookie(id, type)) {
                    var json = [];
                    if ($.cookie("widgetState")) {
                        var widgetState = eval("(" + $.cookie("widgetState") + ")"),
                            len = 0;
                        for (var i = 0; i < len; i++) {
                            json.push("{'id':'" + widgetState[i].id + "','type':'" + widgetState[i].type + "','top':'" + widgetState[i].top + "','left':'" + widgetState[i].left + "'}");
                        }
                    }
                    json.push("{'id':'" + id + "','type':'" + type + "','top':'" + top + "','left':'" + left + "'}");
                    $.cookie("widgetState", "[" + json.join(",") + "]", {expires: 95});
                }
            },
            updateCookie: function (id, type, top, left) {
                if (widget.checkCookie(id, type)) {
                    var widgetState = eval("(" + $.cookie("widgetState") + ")"),
                        len = widgetState.length,
                        json = [];
                    for (var i = 0; i < len; i++) {
                        if (widgetState[i].id == id) {
                            json.push("{'id':'" + id + "','type':'" + type + "','top':'" + top + "','left':'" + left + "'}");
                        } else {
                            json.push("{'id':'" + widgetState[i].id + "','type':'" + widgetState[i].type + "','top':'" + widgetState[i].top + "','left':'" + widgetState[i].left + "'}");
                        }
                    }
                    $.cookie("widgetState", "[" + json.join(",") + "]", {expires: 95});
                }
            },
            removeCookie: function (id, type) {
                if (widget.checkCookie(id, type)) {
                    var widgetState = eval("(" + $.cookie("widgetState") + ")"),
                        len = widgetState.length,
                        json = [];
                    for (var i = 0; i < len; i++) {
                        if (widgetState[i].id != id) {
                            json.push("{'id':'" + widgetState[i].id + "','type':'" + widgetState[i].type + "','top':'" + widgetState[i].top + "','left':'" + widgetState[i].left + "'}");
                        }
                    }
                    $.cookie("widgetState", "[" + json.join(",") + "]", {expires: 95});
                }
            },
            move: function (obj) {
                obj.on("mousedown", ".move", function (e) {
                    var lay, x, y;
                    x = e.clientX - obj.offset().left;
                    y = e.clientY - obj.offset().top;
                    $(document).on("mousemove", function (e) {
                        lay = maskBox.desk();
                        lay.show();
                        _l = e.clientX - x;
                        _t = e.clientY - y;
                        _t = _t < 0 ? 0 : _t;
                        obj.css({left: _l, top: _t});
                    }).on("mouseup", function () {
                        $(this).off("mousemove").off("mouseup");
                        if (typeof(lay) !== "undefined") {
                            lay.hide();
                        }
                        widget.updateCookie(obj.attr("realid"), obj.attr("type"), _t, _l);
                    });
                });
            },
            close: function (id, type) {
                var widgetId = "#w_" + type + "_" + id;
                $(widgetId).html("").remove();
                widget.removeCookie(id, type);
            },
            handle: function (obj) {
                alert(2)
                obj.on("click", ".ha-close", function () {
                    alert(1)
                    widget.close(obj.attr("realid"), obj.attr("type"));
                });
            }
        };
    })();


    exports.widget = widget;
});