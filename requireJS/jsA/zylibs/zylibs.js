

define(function () {
     var $ = require('jquery-1.8.1').jQuery;
    /**
     * ie6 png透明修正
     * DD_belatedPNG.fix('.png_bg');
     * DD_belatedPNG.fixPng( someNode );
     */
    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
        var DD_belatedPNG = {
            ns: "DD_belatedPNG", imgSize: {}, delay: 10, nodesFixed: 0, createVmlNameSpace: function () {
                if (document.namespaces && !document.namespaces[this.ns]) {
                    document.namespaces.add(this.ns, "urn:schemas-microsoft-com:vml")
                }
            }, createVmlStyleSheet: function () {
                var b, a;
                b = document.createElement("style");
                b.setAttribute("media", "screen");
                document.documentElement.firstChild.insertBefore(b, document.documentElement.firstChild.firstChild);
                if (b.styleSheet) {
                    b = b.styleSheet;
                    b.addRule(this.ns + "\\:*", "{behavior:url(#default#VML)}");
                    b.addRule(this.ns + "\\:shape", "position:absolute;");
                    b.addRule("img." + this.ns + "_sizeFinder", "behavior:none; border:none; position:absolute; z-index:-1; top:-10000px; visibility:hidden;");
                    this.screenStyleSheet = b;
                    a = document.createElement("style");
                    a.setAttribute("media", "print");
                    document.documentElement.firstChild.insertBefore(a, document.documentElement.firstChild.firstChild);
                    a = a.styleSheet;
                    a.addRule(this.ns + "\\:*", "{display: none !important;}");
                    a.addRule("img." + this.ns + "_sizeFinder", "{display: none !important;}")
                }
            }, readPropertyChange: function () {
                var b, c, a;
                b = event.srcElement;
                if (!b.vmlInitiated) {
                    return
                }
                if (event.propertyName.search("background") != -1 || event.propertyName.search("border") != -1) {
                    DD_belatedPNG.applyVML(b)
                }
                if (event.propertyName == "style.display") {
                    c = (b.currentStyle.display == "none") ? "none" : "block";
                    for (a in b.vml) {
                        if (b.vml.hasOwnProperty(a)) {
                            b.vml[a].shape.style.display = c
                        }
                    }
                }
                if (event.propertyName.search("filter") != -1) {
                    DD_belatedPNG.vmlOpacity(b)
                }
            }, vmlOpacity: function (b) {
                if (b.currentStyle.filter.search("lpha") != -1) {
                    var a = b.currentStyle.filter;
                    a = parseInt(a.substring(a.lastIndexOf("=") + 1, a.lastIndexOf(")")), 10) / 100;
                    b.vml.color.shape.style.filter = b.currentStyle.filter;
                    b.vml.image.fill.opacity = a
                }
            }, handlePseudoHover: function (a) {
                setTimeout(function () {
                    DD_belatedPNG.applyVML(a)
                }, 1)
            }, fix: function (a) {
                if (this.screenStyleSheet) {
                    var c, b;
                    c = a.split(",");
                    for (b = 0; b < c.length; b++) {
                        this.screenStyleSheet.addRule(c[b], "behavior:expression(DD_belatedPNG.fixPng(this))")
                    }
                }
            }, applyVML: function (a) {
                a.runtimeStyle.cssText = "";
                this.vmlFill(a);
                this.vmlOffsets(a);
                this.vmlOpacity(a);
                if (a.isImg) {
                    this.copyImageBorders(a)
                }
            }, attachHandlers: function (i) {
                var d, c, g, e, b, f;
                d = this;
                c = {resize: "vmlOffsets", move: "vmlOffsets"};
                if (i.nodeName == "A") {
                    e = {
                        mouseleave: "handlePseudoHover",
                        mouseenter: "handlePseudoHover",
                        focus: "handlePseudoHover",
                        blur: "handlePseudoHover"
                    };
                    for (b in e) {
                        if (e.hasOwnProperty(b)) {
                            c[b] = e[b]
                        }
                    }
                }
                for (f in c) {
                    if (c.hasOwnProperty(f)) {
                        g = function () {
                            d[c[f]](i)
                        };
                        i.attachEvent("on" + f, g)
                    }
                }
                i.attachEvent("onpropertychange", this.readPropertyChange)
            }, giveLayout: function (a) {
                a.style.zoom = 1;
                if (a.currentStyle.position == "static") {
                    a.style.position = "relative"
                }
            }, copyImageBorders: function (b) {
                var c, a;
                c = {borderStyle: true, borderWidth: true, borderColor: true};
                for (a in c) {
                    if (c.hasOwnProperty(a)) {
                        b.vml.color.shape.style[a] = b.currentStyle[a]
                    }
                }
            }, vmlFill: function (e) {
                if (!e.currentStyle) {
                    return
                } else {
                    var d, f, g, b, a, c;
                    d = e.currentStyle
                }
                for (b in e.vml) {
                    if (e.vml.hasOwnProperty(b)) {
                        e.vml[b].shape.style.zIndex = d.zIndex
                    }
                }
                e.runtimeStyle.backgroundColor = "";
                e.runtimeStyle.backgroundImage = "";
                f = true;
                if (d.backgroundImage != "none" || e.isImg) {
                    if (!e.isImg) {
                        e.vmlBg = d.backgroundImage;
                        e.vmlBg = e.vmlBg.substr(5, e.vmlBg.lastIndexOf('")') - 5)
                    } else {
                        e.vmlBg = e.src
                    }
                    g = this;
                    if (!g.imgSize[e.vmlBg]) {
                        a = document.createElement("img");
                        g.imgSize[e.vmlBg] = a;
                        a.className = g.ns + "_sizeFinder";
                        a.runtimeStyle.cssText = "behavior:none; position:absolute; left:-10000px; top:-10000px; border:none; margin:0; padding:0;";
                        c = function () {
                            this.width = this.offsetWidth;
                            this.height = this.offsetHeight;
                            g.vmlOffsets(e)
                        };
                        a.attachEvent("onload", c);
                        a.src = e.vmlBg;
                        a.removeAttribute("width");
                        a.removeAttribute("height");
                        document.body.insertBefore(a, document.body.firstChild)
                    }
                    e.vml.image.fill.src = e.vmlBg;
                    f = false
                }
                e.vml.image.fill.on = !f;
                e.vml.image.fill.color = "none";
                e.vml.color.shape.style.backgroundColor = d.backgroundColor;
                e.runtimeStyle.backgroundImage = "none";
                e.runtimeStyle.backgroundColor = "transparent"
            }, vmlOffsets: function (d) {
                var h, n, a, e, g, m, f, l, j, i, k;
                h = d.currentStyle;
                n = {
                    W: d.clientWidth + 1,
                    H: d.clientHeight + 1,
                    w: this.imgSize[d.vmlBg].width,
                    h: this.imgSize[d.vmlBg].height,
                    L: d.offsetLeft,
                    T: d.offsetTop,
                    bLW: d.clientLeft,
                    bTW: d.clientTop
                };
                a = (n.L + n.bLW == 1) ? 1 : 0;
                e = function (b, p, q, c, s, u) {
                    b.coordsize = c + "," + s;
                    b.coordorigin = u + "," + u;
                    b.path = "m0,0l" + c + ",0l" + c + "," + s + "l0," + s + " xe";
                    b.style.width = c + "px";
                    b.style.height = s + "px";
                    b.style.left = p + "px";
                    b.style.top = q + "px"
                };
                e(d.vml.color.shape, (n.L + (d.isImg ? 0 : n.bLW)), (n.T + (d.isImg ? 0 : n.bTW)), (n.W - 1), (n.H - 1), 0);
                e(d.vml.image.shape, (n.L + n.bLW), (n.T + n.bTW), (n.W), (n.H), 1);
                g = {X: 0, Y: 0};
                if (d.isImg) {
                    g.X = parseInt(h.paddingLeft, 10) + 1;
                    g.Y = parseInt(h.paddingTop, 10) + 1
                } else {
                    for (j in g) {
                        if (g.hasOwnProperty(j)) {
                            this.figurePercentage(g, n, j, h["backgroundPosition" + j])
                        }
                    }
                }
                d.vml.image.fill.position = (g.X / n.W) + "," + (g.Y / n.H);
                m = h.backgroundRepeat;
                f = {T: 1, R: n.W + a, B: n.H, L: 1 + a};
                l = {X: {b1: "L", b2: "R", d: "W"}, Y: {b1: "T", b2: "B", d: "H"}};
                if (m != "repeat" || d.isImg) {
                    i = {T: (g.Y), R: (g.X + n.w), B: (g.Y + n.h), L: (g.X)};
                    if (m.search("repeat-") != -1) {
                        k = m.split("repeat-")[1].toUpperCase();
                        i[l[k].b1] = 1;
                        i[l[k].b2] = n[l[k].d]
                    }
                    if (i.B > n.H) {
                        i.B = n.H
                    }
                    d.vml.image.shape.style.clip = "rect(" + i.T + "px " + (i.R + a) + "px " + i.B + "px " + (i.L + a) + "px)"
                } else {
                    d.vml.image.shape.style.clip = "rect(" + f.T + "px " + f.R + "px " + f.B + "px " + f.L + "px)"
                }
            }, figurePercentage: function (d, c, f, a) {
                var b, e;
                e = true;
                b = (f == "X");
                switch (a) {
                    case "left":
                    case "top":
                        d[f] = 0;
                        break;
                    case "center":
                        d[f] = 0.5;
                        break;
                    case "right":
                    case "bottom":
                        d[f] = 1;
                        break;
                    default:
                        if (a.search("%") != -1) {
                            d[f] = parseInt(a, 10) / 100
                        } else {
                            e = false
                        }
                }
                d[f] = Math.ceil(e ? ((c[b ? "W" : "H"] * d[f]) - (c[b ? "w" : "h"] * d[f])) : parseInt(a, 10));
                if (d[f] % 2 === 0) {
                    d[f]++
                }
                return d[f]
            }, fixPng: function (c) {
                c.style.behavior = "none";
                var g, b, f, a, d;
                if (c.nodeName == "BODY" || c.nodeName == "TD" || c.nodeName == "TR") {
                    return
                }
                c.isImg = false;
                if (c.nodeName == "IMG") {
                    if (c.src.toLowerCase().search(/\.png$/) != -1) {
                        c.isImg = true;
                        c.style.visibility = "hidden"
                    } else {
                        return
                    }
                } else {
                    if (c.currentStyle.backgroundImage.toLowerCase().search(".png") == -1) {
                        return
                    }
                }
                g = DD_belatedPNG;
                c.vml = {color: {}, image: {}};
                b = {shape: {}, fill: {}};
                for (a in c.vml) {
                    if (c.vml.hasOwnProperty(a)) {
                        for (d in b) {
                            if (b.hasOwnProperty(d)) {
                                f = g.ns + ":" + d;
                                c.vml[a][d] = document.createElement(f)
                            }
                        }
                        c.vml[a].shape.stroked = false;
                        c.vml[a].shape.appendChild(c.vml[a].fill);
                        c.parentNode.insertBefore(c.vml[a].shape, c)
                    }
                }
                c.vml.image.shape.fillcolor = "none";
                c.vml.image.fill.type = "tile";
                c.vml.color.fill.on = false;
                g.attachHandlers(c);
                g.giveLayout(c);
                g.giveLayout(c.offsetParent);
                c.vmlInitiated = true;
                g.applyVML(c)
            }
        };
        try {
            document.execCommand("BackgroundImageCache", false, true)
        } catch (r) {
        }
        DD_belatedPNG.createVmlNameSpace();
        DD_belatedPNG.createVmlStyleSheet();
    }

    /**
     * SWFObject v2.2
     * http://code.google.com/p/swfobject/
     * swfobject.embedSWF("test.swf", "myContent", "300", "120", "9.0.0", "expressInstall.swf");
     */
    var swfobject = function () {
        var D = "undefined",
            r = "object",
            S = "Shockwave Flash",
            W = "ShockwaveFlash.ShockwaveFlash",
            q = "application/x-shockwave-flash",
            R = "SWFObjectExprInst",
            x = "onreadystatechange",
            O = window,
            j = document,
            t = navigator,
            T = false,
            U = [h],
            o = [],
            N = [],
            I = [],
            l, Q, E, B, J = false,
            a = false,
            n, G, m = true,
            M = function () {
                var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D,
                    ah = t.userAgent.toLowerCase(),
                    Y = t.platform.toLowerCase(),
                    ae = Y ? /win/.test(Y) : /win/.test(ah),
                    ac = Y ? /mac/.test(Y) : /mac/.test(ah),
                    af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                    X = !+"\v1",
                    ag = [0, 0, 0],
                    ab = null;
                if (typeof t.plugins != D && typeof t.plugins[S] == r) {
                    ab = t.plugins[S].description;
                    if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                        T = true;
                        X = false;
                        ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                        ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
                        ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                        ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                    }
                } else {
                    if (typeof O.ActiveXObject != D) {
                        try {
                            var ad = new ActiveXObject(W);
                            if (ad) {
                                ab = ad.GetVariable("$version");
                                if (ab) {
                                    X = true;
                                    ab = ab.split(" ")[1].split(",");
                                    ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                                }
                            }
                        } catch (Z) {
                        }
                    }
                }
                return {w3: aa, pv: ag, wk: af, ie: X, win: ae, mac: ac}
            }(),
            k = function () {
                if (!M.w3) {
                    return
                }
                if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) {
                    f()
                }
                if (!J) {
                    if (typeof j.addEventListener != D) {
                        j.addEventListener("DOMContentLoaded", f, false)
                    }
                    if (M.ie && M.win) {
                        j.attachEvent(x, function () {
                            if (j.readyState == "complete") {
                                j.detachEvent(x, arguments.callee);
                                f()
                            }
                        });
                        if (O == top) {
                            (function () {
                                if (J) {
                                    return
                                }
                                try {
                                    j.documentElement.doScroll("left")
                                } catch (X) {
                                    setTimeout(arguments.callee, 0);
                                    return
                                }
                                f()
                            })()
                        }
                    }
                    if (M.wk) {
                        (function () {
                            if (J) {
                                return
                            }
                            if (!/loaded|complete/.test(j.readyState)) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            f()
                        })()
                    }
                    s(f)
                }
            }();

        function f() {
            if (J) {
                return
            }
            try {
                var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
                Z.parentNode.removeChild(Z)
            } catch (aa) {
                return
            }
            J = true;
            var X = U.length;
            for (var Y = 0; Y < X; Y++) {
                U[Y]()
            }
        }

        function K(X) {
            if (J) {
                X()
            } else {
                U[U.length] = X
            }
        }

        function s(Y) {
            if (typeof O.addEventListener != D) {
                O.addEventListener("load", Y, false)
            } else {
                if (typeof j.addEventListener != D) {
                    j.addEventListener("load", Y, false)
                } else {
                    if (typeof O.attachEvent != D) {
                        i(O, "onload", Y)
                    } else {
                        if (typeof O.onload == "function") {
                            var X = O.onload;
                            O.onload = function () {
                                X();
                                Y()
                            }
                        } else {
                            O.onload = Y
                        }
                    }
                }
            }
        }

        function h() {
            if (T) {
                V()
            } else {
                H()
            }
        }

        function V() {
            var X = j.getElementsByTagName("body")[0];
            var aa = C(r);
            aa.setAttribute("type", q);
            var Z = X.appendChild(aa);
            if (Z) {
                var Y = 0;
                (function () {
                    if (typeof Z.GetVariable != D) {
                        var ab = Z.GetVariable("$version");
                        if (ab) {
                            ab = ab.split(" ")[1].split(",");
                            M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                        }
                    } else {
                        if (Y < 10) {
                            Y++;
                            setTimeout(arguments.callee, 10);
                            return
                        }
                    }
                    X.removeChild(aa);
                    Z = null;
                    H()
                })()
            } else {
                H()
            }
        }

        function H() {
            var ag = o.length;
            if (ag > 0) {
                for (var af = 0; af < ag; af++) {
                    var Y = o[af].id;
                    var ab = o[af].callbackFn;
                    var aa = {success: false, id: Y};
                    if (M.pv[0] > 0) {
                        var ae = c(Y);
                        if (ae) {
                            if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                                w(Y, true);
                                if (ab) {
                                    aa.success = true;
                                    aa.ref = z(Y);
                                    ab(aa)
                                }
                            } else {
                                if (o[af].expressInstall && A()) {
                                    var ai = {};
                                    ai.data = o[af].expressInstall;
                                    ai.width = ae.getAttribute("width") || "0";
                                    ai.height = ae.getAttribute("height") || "0";
                                    if (ae.getAttribute("class")) {
                                        ai.styleclass = ae.getAttribute("class")
                                    }
                                    if (ae.getAttribute("align")) {
                                        ai.align = ae.getAttribute("align")
                                    }
                                    var ah = {};
                                    var X = ae.getElementsByTagName("param");
                                    var ac = X.length;
                                    for (var ad = 0; ad < ac; ad++) {
                                        if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                                            ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value")
                                        }
                                    }
                                    P(ai, ah, Y, ab)
                                } else {
                                    p(ae);
                                    if (ab) {
                                        ab(aa)
                                    }
                                }
                            }
                        }
                    } else {
                        w(Y, true);
                        if (ab) {
                            var Z = z(Y);
                            if (Z && typeof Z.SetVariable != D) {
                                aa.success = true;
                                aa.ref = Z
                            }
                            ab(aa)
                        }
                    }
                }
            }
        }

        function z(aa) {
            var X = null;
            var Y = c(aa);
            if (Y && Y.nodeName == "OBJECT") {
                if (typeof Y.SetVariable != D) {
                    X = Y
                } else {
                    var Z = Y.getElementsByTagName(r)[0];
                    if (Z) {
                        X = Z
                    }
                }
            }
            return X
        }

        function A() {
            return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312)
        }

        function P(aa, ab, X, Z) {
            a = true;
            E = Z || null;
            B = {success: false, id: X};
            var ae = c(X);
            if (ae) {
                if (ae.nodeName == "OBJECT") {
                    l = g(ae);
                    Q = null
                } else {
                    l = ae;
                    Q = X
                }
                aa.id = R;
                if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) {
                    aa.width = "310"
                }
                if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) {
                    aa.height = "137"
                }
                j.title = j.title.slice(0, 47) + " - Flash Player Installation";
                var ad = M.ie && M.win ? "ActiveX" : "PlugIn",
                    ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
                if (typeof ab.flashvars != D) {
                    ab.flashvars += "&" + ac
                } else {
                    ab.flashvars = ac
                }
                if (M.ie && M.win && ae.readyState != 4) {
                    var Y = C("div");
                    X += "SWFObjectNew";
                    Y.setAttribute("id", X);
                    ae.parentNode.insertBefore(Y, ae);
                    ae.style.display = "none";
                    (function () {
                        if (ae.readyState == 4) {
                            ae.parentNode.removeChild(ae)
                        } else {
                            setTimeout(arguments.callee, 10)
                        }
                    })()
                }
                u(aa, ab, X)
            }
        }

        function p(Y) {
            if (M.ie && M.win && Y.readyState != 4) {
                var X = C("div");
                Y.parentNode.insertBefore(X, Y);
                X.parentNode.replaceChild(g(Y), X);
                Y.style.display = "none";
                (function () {
                    if (Y.readyState == 4) {
                        Y.parentNode.removeChild(Y)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                Y.parentNode.replaceChild(g(Y), Y)
            }
        }

        function g(ab) {
            var aa = C("div");
            if (M.win && M.ie) {
                aa.innerHTML = ab.innerHTML
            } else {
                var Y = ab.getElementsByTagName(r)[0];
                if (Y) {
                    var ad = Y.childNodes;
                    if (ad) {
                        var X = ad.length;
                        for (var Z = 0; Z < X; Z++) {
                            if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
                                aa.appendChild(ad[Z].cloneNode(true))
                            }
                        }
                    }
                }
            }
            return aa
        }

        function u(ai, ag, Y) {
            var X, aa = c(Y);
            if (M.wk && M.wk < 312) {
                return X
            }
            if (aa) {
                if (typeof ai.id == D) {
                    ai.id = Y
                }
                if (M.ie && M.win) {
                    var ah = "";
                    for (var ae in ai) {
                        if (ai[ae] != Object.prototype[ae]) {
                            if (ae.toLowerCase() == "data") {
                                ag.movie = ai[ae]
                            } else {
                                if (ae.toLowerCase() == "styleclass") {
                                    ah += ' class="' + ai[ae] + '"'
                                } else {
                                    if (ae.toLowerCase() != "classid") {
                                        ah += " " + ae + '="' + ai[ae] + '"'
                                    }
                                }
                            }
                        }
                    }
                    var af = "";
                    for (var ad in ag) {
                        if (ag[ad] != Object.prototype[ad]) {
                            af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
                        }
                    }
                    aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
                    N[N.length] = ai.id;
                    X = c(ai.id)
                } else {
                    var Z = C(r);
                    Z.setAttribute("type", q);
                    for (var ac in ai) {
                        if (ai[ac] != Object.prototype[ac]) {
                            if (ac.toLowerCase() == "styleclass") {
                                Z.setAttribute("class", ai[ac])
                            } else {
                                if (ac.toLowerCase() != "classid") {
                                    Z.setAttribute(ac, ai[ac])
                                }
                            }
                        }
                    }
                    for (var ab in ag) {
                        if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
                            e(Z, ab, ag[ab])
                        }
                    }
                    aa.parentNode.replaceChild(Z, aa);
                    X = Z
                }
            }
            return X
        }

        function e(Z, X, Y) {
            var aa = C("param");
            aa.setAttribute("name", X);
            aa.setAttribute("value", Y);
            Z.appendChild(aa)
        }

        function y(Y) {
            var X = c(Y);
            if (X && X.nodeName == "OBJECT") {
                if (M.ie && M.win) {
                    X.style.display = "none";
                    (function () {
                        if (X.readyState == 4) {
                            b(Y)
                        } else {
                            setTimeout(arguments.callee, 10)
                        }
                    })()
                } else {
                    X.parentNode.removeChild(X)
                }
            }
        }

        function b(Z) {
            var Y = c(Z);
            if (Y) {
                for (var X in Y) {
                    if (typeof Y[X] == "function") {
                        Y[X] = null
                    }
                }
                Y.parentNode.removeChild(Y)
            }
        }

        function c(Z) {
            var X = null;
            try {
                X = j.getElementById(Z)
            } catch (Y) {
            }
            return X
        }

        function C(X) {
            return j.createElement(X)
        }

        function i(Z, X, Y) {
            Z.attachEvent(X, Y);
            I[I.length] = [Z, X, Y]
        }

        function F(Z) {
            var Y = M.pv,
                X = Z.split(".");
            X[0] = parseInt(X[0], 10);
            X[1] = parseInt(X[1], 10) || 0;
            X[2] = parseInt(X[2], 10) || 0;
            return (Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true : false
        }

        function v(ac, Y, ad, ab) {
            if (M.ie && M.mac) {
                return
            }
            var aa = j.getElementsByTagName("head")[0];
            if (!aa) {
                return
            }
            var X = (ad && typeof ad == "string") ? ad : "screen";
            if (ab) {
                n = null;
                G = null
            }
            if (!n || G != X) {
                var Z = C("style");
                Z.setAttribute("type", "text/css");
                Z.setAttribute("media", X);
                n = aa.appendChild(Z);
                if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                    n = j.styleSheets[j.styleSheets.length - 1]
                }
                G = X
            }
            if (M.ie && M.win) {
                if (n && typeof n.addRule == r) {
                    n.addRule(ac, Y)
                }
            } else {
                if (n && typeof j.createTextNode != D) {
                    n.appendChild(j.createTextNode(ac + " {" + Y + "}"))
                }
            }
        }

        function w(Z, X) {
            if (!m) {
                return
            }
            var Y = X ? "visible" : "hidden";
            if (J && c(Z)) {
                c(Z).style.visibility = Y
            } else {
                v("#" + Z, "visibility:" + Y)
            }
        }

        function L(Y) {
            var Z = /[\\\"<>\.;]/;
            var X = Z.exec(Y) != null;
            return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
        }

        var d = function () {
            if (M.ie && M.win) {
                window.attachEvent("onunload", function () {
                    var ac = I.length;
                    for (var ab = 0; ab < ac; ab++) {
                        I[ab][0].detachEvent(I[ab][1], I[ab][2])
                    }
                    var Z = N.length;
                    for (var aa = 0; aa < Z; aa++) {
                        y(N[aa])
                    }
                    for (var Y in M) {
                        M[Y] = null
                    }
                    M = null;
                    for (var X in swfobject) {
                        swfobject[X] = null
                    }
                    swfobject = null
                })
            }
        }();

        return {
            registerObject: function (ab, X, aa, Z) {
                if (M.w3 && ab && X) {
                    var Y = {};
                    Y.id = ab;
                    Y.swfVersion = X;
                    Y.expressInstall = aa;
                    Y.callbackFn = Z;
                    o[o.length] = Y;
                    w(ab, false)
                } else {
                    if (Z) {
                        Z({success: false, id: ab})
                    }
                }
            },
            getObjectById: function (X) {
                if (M.w3) {
                    return z(X)
                }
            },
            embedSWF: function (ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
                var X = {success: false, id: ah};
                if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
                    w(ah, false);
                    K(function () {
                        ae += "";
                        ag += "";
                        var aj = {};
                        if (af && typeof af === r) {
                            for (var al in af) {
                                aj[al] = af[al]
                            }
                        }
                        aj.data = ab;
                        aj.width = ae;
                        aj.height = ag;
                        var am = {};
                        if (ad && typeof ad === r) {
                            for (var ak in ad) {
                                am[ak] = ad[ak]
                            }
                        }
                        if (Z && typeof Z === r) {
                            for (var ai in Z) {
                                if (typeof am.flashvars != D) {
                                    am.flashvars += "&" + ai + "=" + Z[ai]
                                } else {
                                    am.flashvars = ai + "=" + Z[ai]
                                }
                            }
                        }
                        if (F(Y)) {
                            var an = u(aj, am, ah);
                            if (aj.id == ah) {
                                w(ah, true)
                            }
                            X.success = true;
                            X.ref = an
                        } else {
                            if (aa && A()) {
                                aj.data = aa;
                                P(aj, am, ah, ac);
                                return
                            } else {
                                w(ah, true)
                            }
                        }
                        if (ac) {
                            ac(X)
                        }
                    })
                } else {
                    if (ac) {
                        ac(X)
                    }
                }
            },
            switchOffAutoHideShow: function () {
                m = false
            },
            ua: M, getFlashPlayerVersion: function () {
                return {major: M.pv[0], minor: M.pv[1], release: M.pv[2]}
            },
            hasFlashPlayerVersion: F,
            createSWF: function (Z, Y, X) {
                if (M.w3) {
                    return u(Z, Y, X)
                } else {
                    return undefined
                }
            },
            showExpressInstall: function (Z, aa, X, Y) {
                if (M.w3 && A()) {
                    P(Z, aa, X, Y)
                }
            },
            removeSWF: function (X) {
                if (M.w3) {
                    y(X)
                }
            },
            createCSS: function (aa, Z, Y, X) {
                if (M.w3) {
                    v(aa, Z, Y, X)
                }
            },
            addDomLoadEvent: K,
            addLoadEvent: s,
            getQueryParamValue: function (aa) {
                var Z = j.location.search || j.location.hash;
                if (Z) {
                    if (/\?/.test(Z)) {
                        Z = Z.split("?")[1]
                    }
                    if (aa == null) {
                        return L(Z)
                    }
                    var Y = Z.split("&");
                    for (var X = 0; X < Y.length; X++) {
                        if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
                            return L(Y[X].substring((Y[X].indexOf("=") + 1)))
                        }
                    }
                }
                return ""
            },
            expressInstallCallback: function () {
                if (a) {
                    var X = c(R);
                    if (X && l) {
                        X.parentNode.replaceChild(l, X);
                        if (Q) {
                            w(Q, true);
                            if (M.ie && M.win) {
                                l.style.display = "block"
                            }
                        }
                        if (E) {
                            E(B)
                        }
                    }
                    a = false
                }
            }
        }
    }();
    /**
     * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
     * t: current time, b: begInnIng value, c: change In value, d: duration
     */
    jQuery.easing["jswing"] = jQuery.easing["swing"];
    jQuery.extend(jQuery.easing, {
        def: "easeOutQuad", swing: function (e, f, a, h, g) {
            return jQuery.easing[jQuery.easing.def](e, f, a, h, g);
        }, easeInQuad: function (e, f, a, h, g) {
            return h * (f /= g) * f + a;
        }, easeOutQuad: function (e, f, a, h, g) {
            return -h * (f /= g) * (f - 2) + a;
        }, easeInOutQuad: function (e, f, a, h, g) {
            if ((f /= g / 2) < 1) {
                return h / 2 * f * f + a;
            }
            return -h / 2 * ((--f) * (f - 2) - 1) + a;
        }, easeInCubic: function (e, f, a, h, g) {
            return h * (f /= g) * f * f + a;
        }, easeOutCubic: function (e, f, a, h, g) {
            return h * ((f = f / g - 1) * f * f + 1) + a;
        }, easeInOutCubic: function (e, f, a, h, g) {
            if ((f /= g / 2) < 1) {
                return h / 2 * f * f * f + a;
            }
            return h / 2 * ((f -= 2) * f * f + 2) + a;
        }, easeInQuart: function (e, f, a, h, g) {
            return h * (f /= g) * f * f * f + a;
        }, easeOutQuart: function (e, f, a, h, g) {
            return -h * ((f = f / g - 1) * f * f * f - 1) + a;
        }, easeInOutQuart: function (e, f, a, h, g) {
            if ((f /= g / 2) < 1) {
                return h / 2 * f * f * f * f + a;
            }
            return -h / 2 * ((f -= 2) * f * f * f - 2) + a;
        }, easeInQuint: function (e, f, a, h, g) {
            return h * (f /= g) * f * f * f * f + a;
        }, easeOutQuint: function (e, f, a, h, g) {
            return h * ((f = f / g - 1) * f * f * f * f + 1) + a;
        }, easeInOutQuint: function (e, f, a, h, g) {
            if ((f /= g / 2) < 1) {
                return h / 2 * f * f * f * f * f + a;
            }
            return h / 2 * ((f -= 2) * f * f * f * f + 2) + a;
        }, easeInSine: function (e, f, a, h, g) {
            return -h * Math.cos(f / g * (Math.PI / 2)) + h + a;
        }, easeOutSine: function (e, f, a, h, g) {
            return h * Math.sin(f / g * (Math.PI / 2)) + a;
        }, easeInOutSine: function (e, f, a, h, g) {
            return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a;
        }, easeInExpo: function (e, f, a, h, g) {
            return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a;
        }, easeOutExpo: function (e, f, a, h, g) {
            return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a;
        }, easeInOutExpo: function (e, f, a, h, g) {
            if (f == 0) {
                return a;
            }
            if (f == g) {
                return a + h;
            }
            if ((f /= g / 2) < 1) {
                return h / 2 * Math.pow(2, 10 * (f - 1)) + a;
            }
            return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a;
        }, easeInCirc: function (e, f, a, h, g) {
            return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a;
        }, easeOutCirc: function (e, f, a, h, g) {
            return h * Math.sqrt(1 - (f = f / g - 1) * f) + a;
        }, easeInOutCirc: function (e, f, a, h, g) {
            if ((f /= g / 2) < 1) {
                return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a;
            }
            return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a;
        }, easeInElastic: function (f, h, e, l, k) {
            var i = 1.70158;
            var j = 0;
            var g = l;
            if (h == 0) {
                return e;
            }
            if ((h /= k) == 1) {
                return e + l;
            }
            if (!j) {
                j = k * 0.3;
            }
            if (g < Math.abs(l)) {
                g = l;
                var i = j / 4;
            } else {
                var i = j / (2 * Math.PI) * Math.asin(l / g);
            }
            return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e;
        }, easeOutElastic: function (f, h, e, l, k) {
            var i = 1.70158;
            var j = 0;
            var g = l;
            if (h == 0) {
                return e;
            }
            if ((h /= k) == 1) {
                return e + l;
            }
            if (!j) {
                j = k * 0.3;
            }
            if (g < Math.abs(l)) {
                g = l;
                var i = j / 4;
            } else {
                var i = j / (2 * Math.PI) * Math.asin(l / g);
            }
            return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e;
        }, easeInOutElastic: function (f, h, e, l, k) {
            var i = 1.70158;
            var j = 0;
            var g = l;
            if (h == 0) {
                return e;
            }
            if ((h /= k / 2) == 2) {
                return e + l;
            }
            if (!j) {
                j = k * (0.3 * 1.5);
            }
            if (g < Math.abs(l)) {
                g = l;
                var i = j / 4;
            } else {
                var i = j / (2 * Math.PI) * Math.asin(l / g);
            }
            if (h < 1) {
                return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e;
            }
            return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e;
        }, easeInBack: function (e, f, a, i, h, g) {
            if (g == undefined) {
                g = 1.70158;
            }
            return i * (f /= h) * f * ((g + 1) * f - g) + a;
        }, easeOutBack: function (e, f, a, i, h, g) {
            if (g == undefined) {
                g = 1.70158;
            }
            return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a;
        }, easeInOutBack: function (e, f, a, i, h, g) {
            if (g == undefined) {
                g = 1.70158;
            }
            if ((f /= h / 2) < 1) {
                return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a;
            }
            return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a;
        }, easeInBounce: function (e, f, a, h, g) {
            return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a;
        }, easeOutBounce: function (e, f, a, h, g) {
            if ((f /= g) < (1 / 2.75)) {
                return h * (7.5625 * f * f) + a;
            } else {
                if (f < (2 / 2.75)) {
                    return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a;
                } else {
                    if (f < (2.5 / 2.75)) {
                        return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a;
                    } else {
                        return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a;
                    }
                }
            }
        }, easeInOutBounce: function (e, f, a, h, g) {
            if (f < g / 2) {
                return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a;
            }
            return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a;
        }
    });

    /**
     * jQuery Cookie Plugin v1.1
     * https://github.com/carhartl/jquery-cookie
     * $.cookie('the_cookie'); //读取Cookie值
     * $.cookie('the_cookie', 'the_value'); //设置cookie的值
     * $.cookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'jquery.com', secure: true, raw: true});
     * expires：有效期，以天数为单位
     * path：默认情况，只有设置cookie的网页才能读取该cookie
     * domain：创建cookie的网页所拥有的域名
     * secure：如果为true，cookie的传输需要使用安全协议（HTTPS）
     * raw：读取和写入的时候自动进行编码，要关闭这功能设置为true即可
     */
    (function ($, document) {
        var pluses = /\+/g;

        function raw(s) {
            return s;
        }

        function decoded(s) {
            return decodeURIComponent(s.replace(pluses, " "));
        }

        $.cookie = function (key, value, options) {
            if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value == null)) {
                options = $.extend({}, $.cookie.defaults, options);
                if (value == null) {
                    options.expires = -1;
                }
                if (typeof options.expires === "number") {
                    var days = options.expires,
                        t = options.expires = new Date();
                    t.setDate(t.getDate() + days);
                }
                value = String(value);
                return (document.cookie = [encodeURIComponent(key), "=", options.raw ? value : encodeURIComponent(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join(""));
            }
            options = value || $.cookie.defaults || {};
            var decode = options.raw ? raw : decoded;
            var cookies = document.cookie.split("; ");
            for (var i = 0, parts;
                 (parts = cookies[i] && cookies[i].split("=")); i++) {
                if (decode(parts.shift()) === key) {
                    return decode(parts.join("="));
                }
            }
            return null;
        };
        $.cookie.defaults = {};
    })(jQuery, document);

    /**
     * jQuery Hotkeys Plugin
     * https://github.com/jeresig/jquery.hotkeys
     */
    (function (b) {
        b.hotkeys = {
            version: "0.8",
            specialKeys: {
                8: "backspace",
                9: "tab",
                13: "return",
                16: "shift",
                17: "ctrl",
                18: "alt",
                19: "pause",
                20: "capslock",
                27: "esc",
                32: "space",
                33: "pageup",
                34: "pagedown",
                35: "end",
                36: "home",
                37: "left",
                38: "up",
                39: "right",
                40: "down",
                45: "insert",
                46: "del",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9",
                106: "*",
                107: "+",
                109: "-",
                110: ".",
                111: "/",
                112: "f1",
                113: "f2",
                114: "f3",
                115: "f4",
                116: "f5",
                117: "f6",
                118: "f7",
                119: "f8",
                120: "f9",
                121: "f10",
                122: "f11",
                123: "f12",
                144: "numlock",
                145: "scroll",
                191: "/",
                224: "meta"
            },
            shiftNums: {
                "`": "~",
                "1": "!",
                "2": "@",
                "3": "#",
                "4": "$",
                "5": "%",
                "6": "^",
                "7": "&",
                "8": "*",
                "9": "(",
                "0": ")",
                "-": "_",
                "=": "+",
                ";": ": ",
                "'": '"',
                ",": "<",
                ".": ">",
                "/": "?",
                "\\": "|"
            }
        };

        function a(d) {
            if (typeof d.data !== "string") {
                return;
            }
            var c = d.handler,
                e = d.data.toLowerCase().split(" ");
            d.handler = function (n) {
                if (this !== n.target && (/textarea|select/i.test(n.target.nodeName) || n.target.type === "text")) {
                    return;
                }
                var h = n.type !== "keypress" && b.hotkeys.specialKeys[n.which],
                    o = String.fromCharCode(n.which).toLowerCase(),
                    k, m = "",
                    g = {};
                if (n.altKey && h !== "alt") {
                    m += "alt+";
                }
                if (n.ctrlKey && h !== "ctrl") {
                    m += "ctrl+";
                }
                if (n.metaKey && !n.ctrlKey && h !== "meta") {
                    m += "meta+";
                }
                if (n.shiftKey && h !== "shift") {
                    m += "shift+";
                }
                if (h) {
                    g[m + h] = true;
                } else {
                    g[m + o] = true;
                    g[m + b.hotkeys.shiftNums[o]] = true;
                    if (m === "shift+") {
                        g[b.hotkeys.shiftNums[o]] = true;
                    }
                }
                for (var j = 0, f = e.length; j < f; j++) {
                    if (g[e[j]]) {
                        return c.apply(this, arguments);
                    }
                }
            };
        }

        b.each(["keydown", "keyup", "keypress"], function () {
            b.event.special[this] = {add: a};
        });
    })(jQuery);

    /**
     * jquery.placeholder.js placeholder属性模拟插件
     * http://www.zhangxinxu.com/wordpress/2012/02/html5-placeholder%E4%BD%BF%E7%94%A8%E7%BB%8F%E9%AA%8C%E5%88%86%E4%BA%AB%E5%8F%8A%E6%8B%93%E5%B1%95/
     */
    $.fn.placeholder = function (a) {
        var d = {labelMode: false, labelStyle: {}, labelAlpha: false, labelAcross: false};
        var c = $.extend({}, d, a || {});
        var b = function (f, e) {
            if (f.val() === "") {
                e.css("opacity", 0.4).html(f.data("placeholder"));
            } else {
                e.html("");
            }
        };
        $(this).each(function () {
            var h = $(this),
                e = "placeholder" in document.createElement("input"),
                i = h.attr("placeholder");
            if (!i || (!c.labelMode && e) || (c.labelMode && !c.labelAcross && e)) {
                return;
            }
            h.data("placeholder", i);
            if (c.labelMode) {
                var g = h.attr("id"),
                    f = null;
                if (!g) {
                    g = "placeholder" + Math.random();
                    h.attr("id", g);
                }
                f = $('<label for="' + g + '"></label>').css($.extend({
                    lineHeight: "1.3",
                    position: "absolute",
                    color: "rgba(255,255,255,0.5)",
                    cursor: "text",
                    margin: "2px 0 0 3px",
                    font: '20px microsoft YaHei Light'
                }, c.labelStyle)).insertBefore(h);
                if (c.labelAlpha) {
                    h.bind({
                        "focus": function () {
                            b($(this), f);
                        }, "input": function () {
                            b($(this), f);
                        }, "blur": function () {
                            if (this.value === "") {
                                f.css("opacity", 1).html(i);
                            }
                        }
                    });
                    if (!window.screenX) {
                        h.bind("keyup", function () {
                            b($(this), f);
                        });
                        h.get(0).onpaste = function () {
                            setTimeout(function () {
                                b(h, f);
                            }, 30);
                        };
                    }
                    f.get(0).oncontextmenu = function () {
                        h.trigger("focus");
                        return false;
                    };
                } else {
                    h.bind({
                        "focus": function () {
                            f.html("");
                        }, "blur": function () {
                            if ($(this).val() === "") {
                                f.html(i);
                            }
                        }
                    });
                }
                if (c.labelAcross) {
                    h.removeAttr("placeholder");
                }
                if (h.val() === "") {
                    f.html(i);
                }
            } else {
                h.bind({
                    "focus": function () {
                        if ($(this).val() === i) {
                            $(this).val("");
                        }
                        $(this).css("color", "");
                    }, "blur": function () {
                        if ($(this).val() === "") {
                            $(this).val(i).css("color", "graytext");
                        }
                    }
                });
                if (h.val() === "") {
                    h.val(i).css("color", "graytext");
                }
            }
        });
    };

    /**
     * doTimeOut
     * http://www.css88.com/demo/dotimeout
     */
    (function ($) {
        var a = {},
            c = "doTimeout",
            d = Array.prototype.slice;
        $[c] = function () {
            return b.apply(window, [0].concat(d.call(arguments)))
        };
        $.fn[c] = function () {
            var f = d.call(arguments),
                e = b.apply(this, [c + f[0]].concat(f));
            return typeof f[0] === "number" || typeof f[1] === "number" ? this : e
        };

        function b(l) {
            var m = this,
                h, k = {},
                g = l ? $.fn : $,
                n = arguments,
                i = 4,
                f = n[1],
                j = n[2],
                p = n[3];
            if (typeof f !== "string") {
                i--;
                f = l = 0;
                j = n[1];
                p = n[2]
            }
            if (l) {
                h = m.eq(0);
                h.data(l, k = h.data(l) || {})
            } else {
                if (f) {
                    k = a[f] || (a[f] = {})
                }
            }
            k.id && clearTimeout(k.id);
            delete k.id;

            function e() {
                if (l) {
                    h.removeData(l)
                } else {
                    if (f) {
                        delete a[f]
                    }
                }
            }

            function o() {
                k.id = setTimeout(function () {
                    k.fn()
                }, j)
            }

            if (p) {
                k.fn = function (q) {
                    if (typeof p === "string") {
                        p = g[p]
                    }
                    p.apply(m, d.call(n, i)) === true && !q ? o() : e()
                };
                o()
            } else {
                if (k.fn) {
                    j === undefined ? e() : k.fn(j === false);
                    return true
                } else {
                    e()
                }
            }
        }
    })(jQuery);

    /**
     * jquery.mousewheel 3.0.6
     * https://github.com/brandonaaron/jquery-mousewheel/
     */
    (function (b) {
        var d = ["DOMMouseScroll", "mousewheel"];
        if (b.event.fixHooks) {
            for (var c = d.length; c;) {
                b.event.fixHooks[d[--c]] = b.event.mouseHooks;
            }
        }
        b.event.special.mousewheel = {
            setup: function () {
                if (this.addEventListener) {
                    for (var e = d.length; e;) {
                        this.addEventListener(d[--e], a, false);
                    }
                } else {
                    this.onmousewheel = a;
                }
            }, teardown: function () {
                if (this.removeEventListener) {
                    for (var e = d.length; e;) {
                        this.removeEventListener(d[--e], a, false);
                    }
                } else {
                    this.onmousewheel = null;
                }
            }
        };
        b.fn.extend({
            mousewheel: function (e) {
                return e ? this.bind("mousewheel", e) : this.trigger("mousewheel");
            }, unmousewheel: function (e) {
                return this.unbind("mousewheel", e);
            }
        });

        function a(j) {
            var i = j || window.event,
                g = [].slice.call(arguments, 1),
                k = 0,
                h = true,
                f = 0,
                e = 0;
            j = b.event.fix(i);
            j.type = "mousewheel";
            if (i.wheelDelta) {
                k = i.wheelDelta / 120;
            }
            if (i.detail) {
                k = -i.detail / 3;
            }
            e = k;
            if (i.axis !== undefined && i.axis === i.HORIZONTAL_AXIS) {
                e = 0;
                f = -1 * k;
            }
            if (i.wheelDeltaY !== undefined) {
                e = i.wheelDeltaY / 120;
            }
            if (i.wheelDeltaX !== undefined) {
                f = -1 * i.wheelDeltaX / 120;
            }
            g.unshift(j, k, f, e);
            return (b.event.dispatch || b.event.handle).apply(this, g);
        }
    })(jQuery);

    /**
     * 分页插件pagination修改版
     * http://www.zhangxinxu.com/jq/pagination_zh/
     */
    $.fn.pagination = function (maxentries, opts) {
        opts = jQuery.extend({
            items_per_page: 10,
            num_display_entries: 10,
            current_page: 0,
            num_edge_entries: 0,
            link_to: "#",
            prev_text: "<",
            next_text: ">",
            ellipse_text: "...",
            prev_show_always: true,
            next_show_always: true,
            callback: function () {
                return false;
            }
        }, opts || {});
        return this.each(function () {
            function numPages() {
                return Math.ceil(maxentries / opts.items_per_page);
            }

            function getInterval() {
                var ne_half = Math.ceil(opts.num_display_entries / 2);
                var np = numPages();
                var upper_limit = np - opts.num_display_entries;
                var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
                var end = current_page > ne_half ? Math.min(current_page + ne_half, np) : Math.min(opts.num_display_entries, np);
                return [start, end];
            }

            function pageSelected(page_id, evt) {
                current_page = page_id;
                $("#pagination_setting").attr("pid", current_page);
                drawLinks();
                var continuePropagation = opts.callback(page_id, panel);
                if (!continuePropagation) {
                    if (evt.stopPropagation) {
                        evt.stopPropagation();
                    } else {
                        evt.cancelBubble = true;
                    }
                }
                return continuePropagation;
            }

            function drawLinks() {
                panel.empty();
                var interval = getInterval();
                var np = numPages();
                var getClickHandler = function (page_id) {
                    return function (evt) {
                        return pageSelected(page_id, evt);
                    };
                };
                var appendItem = function (page_id, appendopts) {
                    page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1);
                    appendopts = jQuery.extend({text: page_id + 1, classes: ""}, appendopts || {});
                    if (page_id == current_page) {
                        var lnk = jQuery("<button disabled class='btn'>" + (appendopts.text) + "</button>");
                    } else {
                        var lnk = jQuery("<a class='btn'>" + (appendopts.text) + "</a>").bind("click", getClickHandler(page_id)).attr("href", opts.link_to.replace(/__id__/, page_id));
                    }
                    if (appendopts.classes) {
                        lnk.addClass(appendopts.classes);
                    }
                    panel.append(lnk);
                };
                if (opts.prev_text && (current_page > 0 || opts.prev_show_always)) {
                    appendItem(current_page - 1, {text: opts.prev_text, classes: "prev"});
                }
                if (interval[0] > 0 && opts.num_edge_entries > 0) {
                    var end = Math.min(opts.num_edge_entries, interval[0]);
                    for (var i = 0; i < end; i++) {
                        appendItem(i);
                    }
                    if (opts.num_edge_entries < interval[0] && opts.ellipse_text) {
                        jQuery("<button class='btn'>" + opts.ellipse_text + "</button>").appendTo(panel);
                    }
                }
                for (var i = interval[0]; i < interval[1]; i++) {
                    appendItem(i);
                }
                if (interval[1] < np && opts.num_edge_entries > 0) {
                    if (np - opts.num_edge_entries > interval[1] && opts.ellipse_text) {
                        jQuery("<button class='btn'>" + opts.ellipse_text + "</button>").appendTo(panel);
                    }
                    var begin = Math.max(np - opts.num_edge_entries, interval[1]);
                    for (var i = begin; i < np; i++) {
                        appendItem(i);
                    }
                }
                if (opts.next_text && (current_page < np - 1 || opts.next_show_always)) {
                    appendItem(current_page + 1, {text: opts.next_text, classes: "next"});
                }
            }

            var current_page = opts.current_page;
            $("#pagination_setting").attr("pid", current_page);
            maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;
            opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1 : opts.items_per_page;
            var panel = jQuery(this);
            this.selectPage = function (page_id) {
                pageSelected(page_id);
            };
            this.prevPage = function () {
                if (current_page > 0) {
                    pageSelected(current_page - 1);
                    return true;
                } else {
                    return false;
                }
            };
            this.nextPage = function () {
                if (current_page < numPages() - 1) {
                    pageSelected(current_page + 1);
                    return true;
                } else {
                    return false;
                }
            };
            drawLinks();
        });
    };

    /**
     * 腾讯UED提示信息
     * ZENG.msgbox.show("设置成功！", 4, 2000);
     * ZENG.msgbox.show("服务器繁忙，请稍后再试。", 1, 2000);
     * ZENG.msgbox.show("数据拉取失败", 5, 2000);
     * ZENG.msgbox.show("正在加载中，请稍后...", 6,8000);
     */
    var ZENG = window.ZENG || {};
    ZENG.dom = {
        getById: function (a) {
            return document.getElementById(a)
        }, get: function (a) {
            return (typeof(a) == "string") ? document.getElementById(a) : a
        }, createElementIn: function (d, f, e, c) {
            var a = (f = ZENG.dom.get(f) || document.body).ownerDocument.createElement(d || "div"),
                b;
            if (typeof(c) == "object") {
                for (b in c) {
                    if (b == "class") {
                        a.className = c[b]
                    } else {
                        if (b == "style") {
                            a.style.cssText = c[b]
                        } else {
                            a[b] = c[b]
                        }
                    }
                }
            }
            e ? f.insertBefore(a, f.firstChild) : f.appendChild(a);
            return a
        }, getStyle: function (b, f) {
            b = ZENG.dom.get(b);
            if (!b || b.nodeType == 9) {
                return null
            }
            var a = document.defaultView && document.defaultView.getComputedStyle,
                c = !a ? null : document.defaultView.getComputedStyle(b, ""),
                d = "";
            switch (f) {
                case "float":
                    f = a ? "cssFloat" : "styleFloat";
                    break;
                case "opacity":
                    if (!a) {
                        var h = 100;
                        try {
                            h = b.filters["DXImageTransform.Microsoft.Alpha"].opacity
                        } catch (g) {
                            try {
                                h = b.filters("alpha").opacity
                            } catch (g) {
                            }
                        }
                        return h / 100
                    } else {
                        return parseFloat((c || b.style)[f])
                    }
                    break;
                case "backgroundPositionX":
                    if (a) {
                        f = "backgroundPosition";
                        return ((c || b.style)[f]).split(" ")[0]
                    }
                    break;
                case "backgroundPositionY":
                    if (a) {
                        f = "backgroundPosition";
                        return ((c || b.style)[f]).split(" ")[1]
                    }
                    break
            }
            if (a) {
                return (c || b.style)[f]
            } else {
                return (b.currentStyle[f] || b.style[f])
            }
        }, setStyle: function (c, g, h) {
            if (!(c = ZENG.dom.get(c)) || c.nodeType != 1) {
                return false
            }
            var e, b = true,
                d = (e = document.defaultView) && e.getComputedStyle,
                f = /z-?index|font-?weight|opacity|zoom|line-?height/i;
            if (typeof(g) == "string") {
                e = g;
                g = {};
                g[e] = h
            }
            for (var a in g) {
                h = g[a];
                if (a == "float") {
                    a = d ? "cssFloat" : "styleFloat"
                } else {
                    if (a == "opacity") {
                        if (!d) {
                            a = "filter";
                            h = h >= 1 ? "" : ("alpha(opacity=" + Math.round(h * 100) + ")")
                        }
                    } else {
                        if (a == "backgroundPositionX" || a == "backgroundPositionY") {
                            e = a.slice(-1) == "X" ? "Y" : "X";
                            if (d) {
                                var i = ZENG.dom.getStyle(c, "backgroundPosition" + e);
                                a = "backgroundPosition";
                                typeof(h) == "number" && (h = h + "px");
                                h = e == "Y" ? (h + " " + (i || "top")) : ((i || "left") + " " + h)
                            }
                        }
                    }
                }
                if (typeof c.style[a] != "undefined") {
                    c.style[a] = h + (typeof h === "number" && !f.test(a) ? "px" : "");
                    b = b && true
                } else {
                    b = b && false
                }
            }
            return b
        }, getScrollTop: function (a) {
            var b = a || document;
            return Math.max(b.documentElement.scrollTop, b.body.scrollTop)
        }, getClientHeight: function (a) {
            var b = a || document;
            return b.compatMode == "CSS1Compat" ? b.documentElement.clientHeight : b.body.clientHeight
        }
    };
    ZENG.string = {
        RegExps: {
            trim: /^\s+|\s+$/g,
            ltrim: /^\s+/,
            rtrim: /\s+$/,
            nl2br: /\n/g,
            s2nb: /[\x20]{2}/g,
            URIencode: /[\x09\x0A\x0D\x20\x21-\x29\x2B\x2C\x2F\x3A-\x3F\x5B-\x5E\x60\x7B-\x7E]/g,
            escHTML: {re_amp: /&/g, re_lt: /</g, re_gt: />/g, re_apos: /\x27/g, re_quot: /\x22/g},
            escString: {bsls: /\\/g, sls: /\//g, nl: /\n/g, rt: /\r/g, tab: /\t/g},
            restXHTML: {re_amp: /&/g, re_lt: /</g, re_gt: />/g, re_apos: /&(?:apos|#0?39);/g, re_quot: /"/g},
            write: /\{(\d{1,2})(?:\:([xodQqb]))?\}/g,
            isURL: /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i,
            cut: /[\x00-\xFF]/,
            getRealLen: {r0: /[^\x00-\xFF]/g, r1: /[\x00-\xFF]/g},
            format: /\{([\d\w\.]+)\}/g
        }, commonReplace: function (a, c, b) {
            return a.replace(c, b)
        }, format: function (c) {
            var b = Array.prototype.slice.call(arguments),
                a;
            c = String(b.shift());
            if (b.length == 1 && typeof(b[0]) == "object") {
                b = b[0]
            }
            ZENG.string.RegExps.format.lastIndex = 0;
            return c.replace(ZENG.string.RegExps.format, function (d, e) {
                a = ZENG.object.route(b, e);
                return a === undefined ? d : a
            })
        }
    };
    ZENG.object = {
        routeRE: /([\d\w_]+)/g, route: function (d, c) {
            d = d || {};
            c = String(c);
            var b = ZENG.object.routeRE,
                a;
            b.lastIndex = 0;
            while ((a = b.exec(c)) !== null) {
                d = d[a[0]];
                if (d === undefined || d === null) {
                    break
                }
            }
            return d
        }
    };
    var ua = ZENG.userAgent = {},
        agent = navigator.userAgent;
    ua.ie = 9 - ((agent.indexOf("Trident/5.0") > -1) ? 0 : 1) - (window.XDomainRequest ? 0 : 1) - (window.XMLHttpRequest ? 0 : 1);
    if (typeof(ZENG.msgbox) == "undefined") {
        ZENG.msgbox = {}
    }
    ZENG.msgbox._timer = null;
    ZENG.msgbox.loadingAnimationPath = ZENG.msgbox.loadingAnimationPath || ("gb_tip_loading.gif");
    ZENG.msgbox.show = function (c, g, h, a) {
        if (typeof(a) == "number") {
            a = {topPosition: a}
        }
        a = a || {};
        var j = ZENG.msgbox,
            i = '<span class="zeng_msgbox_layer" style="display:none;z-index:10000;" id="mode_tips_v2"><span class="gtl_ico_{type}"></span>{loadIcon}{msgHtml}<span class="gtl_end"></span></span>',
            d = '<span class="gtl_ico_loading"></span>',
            e = [0, 0, 0, 0, "succ", "fail", "clear"],
            b, f;
        j._loadCss && j._loadCss(a.cssPath);
        b = ZENG.dom.get("q_Msgbox") || ZENG.dom.createElementIn("div", document.body, false, {className: "zeng_msgbox_layer_wrap"});
        b.id = "q_Msgbox";
        b.style.display = "";
        b.innerHTML = ZENG.string.format(i, {type: e[g] || "hits", msgHtml: c || "", loadIcon: g == 6 ? d : ""});
        j._setPosition(b, h, a.topPosition)
    };
    ZENG.msgbox._setPosition = function (a, f, d) {
        f = f || 5000;
        var g = ZENG.msgbox,
            b = ZENG.dom.getScrollTop(),
            e = ZENG.dom.getClientHeight(),
            c = Math.floor(e / 2) - 40;
        ZENG.dom.setStyle(a, "top", ((document.compatMode == "BackCompat" || ZENG.userAgent.ie < 7) ? b : 0) + ((typeof(d) == "number") ? d : c) + "px");
        clearTimeout(g._timer);
        a.firstChild.style.display = "";
        f && (g._timer = setTimeout(g.hide, f))
    };
    ZENG.msgbox.hide = function (a) {
        var b = ZENG.msgbox;
        if (a) {
            clearTimeout(b._timer);
            b._timer = setTimeout(b._hide, a)
        } else {
            b._hide()
        }
    };
    ZENG.msgbox._hide = function () {
        var a = ZENG.dom.get("q_Msgbox"),
            b = ZENG.msgbox;
        clearTimeout(b._timer);
        if (a) {
            var c = a.firstChild;
            ZENG.dom.setStyle(a, "display", "none")
        }
    };

    /**
     * 全屏插件
     * http://johndyer.name/native-fullscreen-javascript-api-plus-jquery-plugin/
     */
    (function () {
        var d = {
                supportsFullScreen: false, isFullScreen: function () {
                    return false;
                }, requestFullScreen: function () {
                }, cancelFullScreen: function () {
                }, fullScreenEventName: "", prefix: ""
            },
            c = "webkit moz o ms khtml".split(" ");
        if (typeof document.cancelFullScreen != "undefined") {
            d.supportsFullScreen = true;
        } else {
            for (var b = 0, a = c.length; b < a; b++) {
                d.prefix = c[b];
                if (typeof document[d.prefix + "CancelFullScreen"] != "undefined") {
                    d.supportsFullScreen = true;
                    break;
                }
            }
        }
        if (d.supportsFullScreen) {
            d.fullScreenEventName = d.prefix + "fullscreenchange";
            d.isFullScreen = function () {
                switch (this.prefix) {
                    case "":
                        return document.fullScreen;
                    case "webkit":
                        return document.webkitIsFullScreen;
                    default:
                        return document[this.prefix + "FullScreen"];
                }
            };
            d.requestFullScreen = function (e) {
                return (this.prefix === "") ? e.requestFullScreen() : e[this.prefix + "RequestFullScreen"]();
            };
            d.cancelFullScreen = function (e) {
                return (this.prefix === "") ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]();
            };
        }
        if (typeof jQuery != "undefined") {
            jQuery.fn.requestFullScreen = function () {
                return this.each(function () {
                    if (d.supportsFullScreen) {
                        d.requestFullScreen(this);
                    }
                });
            };
        }
        window.fullScreenApi = d;
    })();

    /**
     * artTemplate - Template Engine
     * https://github.com/aui/artTemplate
     */
    var template = function (c, g) {
        return template["object" === typeof g ? "render" : "compile"].apply(template, arguments);
    };

    (function (c, g) {
        c.version = "1.0";
        c.openTag = "<%";
        c.closeTag = "%>";
        c.parser = null;
        c.render = function (a, b) {
            var d;
            d = l[a];
            void 0 === d && !q && ((d = document.getElementById(a)) && c.compile(a, d.value || d.innerHTML), d = l[a]);
            return void 0 === d ? i({id: a, name: "Render Error", message: "Not Cache"}) : d(b)
        };
        c.compile = function (a, b, d) {
            function f(d) {
                try {
                    return g.call(n, d)
                } catch (e) {
                    if (!r) return c.compile(a, b, !0)(d);
                    e.id = a || b;
                    e.name = "Render Error";
                    e.source = b;
                    return i(e)
                }
            }

            var r = d;
            "string" !== typeof b && (r = b, b = a, a = null);
            try {
                var g = v(b, r)
            } catch (j) {
                return j.id = a, j.name = "Syntax Error", i(j)
            }
            f.toString = function () {
                return g.toString()
            };
            a && (l[a] = f);
            return f
        };
        c.helper = function (a, b) {
            if (void 0 === b) return n[a];
            n[a] = b
        };
        var l = {},
            n = {},
            o = "".trim,
            q = o && !g.document,
            v = function (a, b) {
                function d(a) {
                    m += a.split(/\n/).length - 1;
                    a = a.replace(/('|"|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n");
                    a = k[1] + "'" + a + "'" + k[2];
                    return a + "\n"
                }

                function f(a) {
                    var d = m;
                    j ? a = j(a) : b && (a = a.replace(/\n/g, function () {
                        m++;
                        return "$line=" + m + ";"
                    }));
                    0 === a.indexOf("=") && (a = k[1] + (o ? "$getValue(" : "") + a.substring(1).replace(/[\s;]*$/, "") + (o ? ")" : "") + k[2]);
                    b && (a = "$line=" + d + ";" + a);
                    g(a);
                    return a + "\n"
                }

                function g(a) {
                    a = a.replace(/\/\*.*?\*\/|'[^']*'|"[^"]*"|\.[\$\w]+/g, "");
                    p.call(a.split(/[^\$\w\d]+/), function (a) {
                        if (/^(this|\$helpers)$/.test(a)) throw {message: 'Prohibit the use of the "' + a + '"'};
                        a && !t[a] && !/^\d/.test(a) && !i[a] && (s += a + "=" + ("include" === a ? q : n[a] ? "$helpers." + a : "$data." + a) + ",", i[a] = !0)
                    })
                }

                var l = c.closeTag,
                    j = c.parser,
                    h, e = "",
                    m = 1,
                    i = {$out: !0, $line: !0},
                    s = "var $helpers=this," + (b ? "$line=0," : ""),
                    k = o ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
                    q = "function(id,data){if(data===undefined){data=$data}return $helpers.$render(id,data)}";
                p.call(a.split(c.openTag), function (a) {
                    var a = a.split(l),
                        b = a[0],
                        c = a[1];
                    1 === a.length ? e += d(b) : (e += f(b), c && (e += d(c)))
                });
                h = e;
                b && (h = "try{" + h + "}catch(e){e.line=$line;throw e}");
                h = s + k[0] + h + "return " + k[3];
                try {
                    return new Function("$data", h)
                } catch (u) {
                    throw u.temp = "function anonymous($data) {" + h + "}", u;
                }
            },
            i = function (a) {
                var b = "[template]:\n" + a.id + "\n\n[name]:\n" + a.name;

                a.message && (b += "\n\n[message]:\n" + a.message);
                a.line && (b += "\n\n[line]:\n" + a.line, b += "\n\n[source]:\n" + a.source.split(/\n/)[a.line - 1].replace(/^[\s\t]+/, ""));
                a.temp && (b += "\n\n[temp]:\n" + a.temp);
                g.console && console.error(b);
                return "{Template Error}"
            },
            p = Array.prototype.forEach || function (a, b) {
                    for (var c = this.length >>> 0, f = 0; f < c; f++) f in this && a.call(b, this[f], f, this)
                },
            t = {};
        p.call("break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield".split(","), function (a) {
            t[a] = !0
        });
        c.helper("$forEach", p);
        c.helper("$render", c.render);
        c.helper("$getValue", function (a) {
            return void 0 === a ? "" : a
        })
    })(template, this);
    // if ("undefined" !== typeof module && module.exports) module.exports = template;

    /**
     * colortip-1.0
     */
    (function ($) {
        $.fn.colorTip = function (settings) {
            var defaultSettings = {color: "yellow", timeout: 500};
            var supportedColors = ["red", "green", "blue", "white", "yellow", "black"];
            settings = $.extend(defaultSettings, settings);
            return this.each(function () {
                var elem = $(this);
                if (!elem.attr("title")) {
                    return true;
                }
                var scheduleEvent = new eventScheduler();
                var tip = new Tip(elem.attr("title"));
                elem.append(tip.generate()).addClass("colorTipContainer");
                var hasClass = false;
                for (var i = 0; i < supportedColors.length; i++) {
                    if (elem.hasClass(supportedColors[i])) {
                        hasClass = true;
                        break;
                    }
                }
                if (!hasClass) {
                    elem.addClass(settings.color);
                }
                elem.hover(function () {
                    tip.show();
                    scheduleEvent.clear();
                }, function () {
                    scheduleEvent.set(function () {
                        tip.hide();
                    }, settings.timeout);
                });
                elem.removeAttr("title");
            });
        };

        function eventScheduler() {
        }

        eventScheduler.prototype = {
            set: function (func, timeout) {
                this.timer = setTimeout(func, timeout);
            }, clear: function () {
                clearTimeout(this.timer);
            }
        };

        function Tip(txt) {
            this.content = txt;
            this.shown = false;
        }

        Tip.prototype = {
            generate: function () {
                return this.tip || (this.tip = $('<span class="colorTip">' + this.content + '<span class="pointyTipShadow"></span><span class="pointyTip"></span></span>'));
            }, show: function () {
                if (this.shown) {
                    return;
                }
                this.tip.css("margin-left", -this.tip.outerWidth() / 2).fadeIn("fast");
                this.shown = true;
            }, hide: function () {
                this.tip.fadeOut();
                this.shown = false;
            }
        };
    })(jQuery);

    /**
     * 返回顶部插件scrolltotop
     * scrolltotop.controlHTML='<a href="#top" id="scrolltotop">返回顶部</a>';
     * scrolltotop.init();
     */
    scrolltotop = {
        setting: {startline: 100, scrollto: 0, scrollduration: 500, fadeduration: [500, 100]},
        controlHTML: '<a href="#top" id="scrolltotop"></a>',
        controlattrs: {offsetx: 5, offsety: 5},
        anchorkeyword: '#top',
        state: {isvisible: false, shouldvisible: false},
        scrollup: function () {
            if (!this.cssfixedsupport) {
                if (this.$control != undefined) this.$control.css({opacity: 0})
            }
            ;
            var A = isNaN(this.setting.scrollto) ? this.setting.scrollto : parseInt(this.setting.scrollto);
            if (typeof A == "string" && jQuery('#' + A).length == 1) {
                A = jQuery('#' + A).offset().top;
            } else {
                A = this.setting.scrollto;
            }
            ;
            if (this.$body != undefined) this.$body.animate({scrollTop: A}, this.setting.scrollduration);
        },
        keepfixed: function () {
            var $A = jQuery(A);
            var B = $A.scrollLeft() + $A.width() - this.$control.width() - this.controlattrs.offsetx;
            var C = $A.scrollTop() + $A.height() - this.$control.height() - this.controlattrs.offsety;
            this.$control.css({left: B + 'px', top: C + 'px'});
        },
        togglecontrol: function () {
            var A = jQuery(window).scrollTop();
            if (!this.cssfixedsupport) {
                this.keepfixed();
            }
            ;
            this.state.shouldvisible = (A >= this.setting.startline) ? true : false;
            if (this.state.shouldvisible && !this.state.isvisible) {
                this.$control.stop().animate({opacity: 1}, this.setting.fadeduration[0]);
                this.state.isvisible = true;
            } else if (this.state.shouldvisible == false && this.state.isvisible) {
                this.$control.stop().animate({opacity: 0}, this.setting.fadeduration[1]);
                this.state.isvisible = false;
            }
        },
        init: function () {
            jQuery(document).ready(function ($) {
                if ($("body").attr('scrolltotop') != 'no') {
                    scrolltotop.cssfixedsupport = !document.all || document.all && document.compatMode == "CSS1Compat" && window.XMLHttpRequest;
                    scrolltotop.$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                    scrolltotop.$control = $('<div id="topcontrol">' + scrolltotop.controlHTML + '</div>').css({
                        position: scrolltotop.cssfixedsupport ? 'fixed' : 'absolute',
                        bottom: scrolltotop.controlattrs.offsety,
                        right: scrolltotop.controlattrs.offsetx,
                        opacity: 0,
                        cursor: 'pointer'
                    }).click(function () {
                        scrolltotop.scrollup();
                        return false;
                    }).appendTo('body');
                    if (document.all && !window.XMLHttpRequest && scrolltotop.$control.text() != '') {
                        scrolltotop.$control.css({width: scrolltotop.$control.width()});
                    }
                    ;
                    scrolltotop.togglecontrol();
                    $('a[href="' + scrolltotop.anchorkeyword + '"]').click(function () {
                        scrolltotop.scrollup();
                        return false;
                    });
                    $(window).bind('scroll resize', function (e) {
                        scrolltotop.togglecontrol();
                    });
                }
            });
        }
    };

    /**
     * 定时器
     * $("#close-button").oneTime(1000,function(){});
     * $("#close-button").stopTime();
     * 1. everyTime(时间间隔, [计时器名称], 函式名称, [次数限制], [等待函式程序完成])
     * 2. oneTime(时间间隔, [计时器名称], 呼叫的函式)
     * 3. stopTime ([计时器名称], [函式名称])
     */
    jQuery.fn.extend({
        everyTime: function (A, B, C, D, E) {
            return this.each(function () {
                jQuery.timer.add(this, A, B, C, D, E);
            });
        }, oneTime: function (A, B, C) {
            return this.each(function () {
                jQuery.timer.add(this, A, B, C, 1);
            });
        }, stopTime: function (A, B) {
            return this.each(function () {
                jQuery.timer.remove(this, A, B);
            });
        }
    });
    jQuery.extend({
        timer: {
            guid: 1,
            global: {},
            regex: /^([0-9]+)\s*(.*s)?$/,
            powers: {'ms': 1, 'cs': 10, 'ds': 100, 's': 1000, 'das': 10000, 'hs': 100000, 'ks': 1000000},
            timeParse: function (A) {
                if (A == undefined || A == null) return null;
                var B = this.regex.exec(jQuery.trim(A.toString()));
                if (B[2]) {
                    var C = parseInt(B[1], 10);
                    var D = this.powers[B[2]] || 1;
                    return C * D;
                } else {
                    return A;
                }
            },
            add: function (A, B, C, D, E, F) {
                var G = 0;
                if (jQuery.isFunction(C)) {
                    if (!E) E = D;
                    D = C;
                    C = B;
                }
                B = jQuery.timer.timeParse(B);
                if (typeof B != 'number' || isNaN(B) || B <= 0) return;
                if (E && E.constructor != Number) {
                    F = !!E;
                    E = 0;
                }
                E = E || 0;
                F = F || false;
                if (!A.$timers) A.$timers = {};
                if (!A.$timers[C]) A.$timers[C] = {};
                D.$timerID = D.$timerID || this.guid++;
                var H = function () {
                    if (F && this.inProgress) return;
                    this.inProgress = true;
                    if ((++G > E && E !== 0) || D.call(A, G) === false) jQuery.timer.remove(A, C, D);
                    this.inProgress = false;
                };
                H.$timerID = D.$timerID;
                if (!A.$timers[C][D.$timerID]) A.$timers[C][D.$timerID] = window.setInterval(H, B);
                if (!this.global[C]) this.global[C] = [];
                this.global[C].push(A);
            },
            remove: function (A, B, E) {
                var D = A.$D,
                    ret;
                if (D) {
                    if (!B) {
                        for (B in D) this.remove(A, B, E);
                    } else if (D[B]) {
                        if (E) {
                            if (E.$timerID) {
                                window.clearInterval(D[B][E.$timerID]);
                                delete D[B][E.$timerID];
                            }
                        } else {
                            for (var E in D[B]) {
                                window.clearInterval(D[B][E]);
                                delete D[B][E];
                            }
                        }
                        for (ret in D[B]) break;
                        if (!ret) {
                            ret = null;
                            delete D[B];
                        }
                    }
                    for (ret in D) break;
                    if (!ret) A.$D = null;
                }
            }
        }
    });
    if (jQuery.browser.msie) jQuery(window).one("unload", function () {
        var A = jQuery.timer.global;
        for (var B in A) {
            var C = A[B],
                i = C.length;
            while (--i) jQuery.timer.remove(C[i], B);
        }
    });

    /**
     * jQuery jUploader 1.0
     * http://www.kudystudio.com
     * Author: kudy chen (kudychen@gmail.com)
     *
     * Copyright 2012, kudy studio
     * Dual licensed under the MIT or GPL Version 3 licenses.
     *
     * Last Modified: 2012-03-31
     */
    eval(function (p, a, c, k, e, d) {
        e = function (c) {
            return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
        };
        if (!''.replace(/^/, String)) {
            while (c--) d[e(c)] = k[c] || e(c);
            k = [function (e) {
                return d[e]
            }];
            e = function () {
                return '\\w+'
            };
            c = 1;
        }
        ;
        while (c--)
            if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
        return p;
    }('(5($){q.7=$.7=5(2){2=$.1s({},$.7.m,2);2.4=$.7.1x();2.l=f;3 1w=5(){2.9=(1D 2.9==\'1A\')?$(\'#\'+2.9):$(2.9);2.9.1h({1c:\'1d\',1k:\'1H\',1z:\'1C\',1I:\'20\'}).18(\'7-9\').p(\'21\',5(){$(x).18(\'7-9-1g\')}).p(\'22\',5(){$(x).1X(\'7-9-1g\')}).H(\'F\').G(2.k.h);8(2.S){2.9.p(\'23\',E)};2.9.I(N());6 2.9};3 U=5(){3 4=\'s\'+2.4;3 a=$(\'<a 4="\'+4+\'" b="\'+4+\'" 1f="16:f;" 1j="1i:1m"></a>\').p(\'27\',1b);6 a};3 W=5(){3 4=\'t\'+2.4;3 B=$(\'<B 4="\'+4+\'" b="\'+4+\'" Q="\'+2.Q+\'" 26="s\'+2.4+\'" 1W="1N" 1J="1T/B-1Q" 1j="1i:1m"></B>\');6 B};3 N=5(){3 v=$(\'<v O="c" 1R="x.1S();" />\');v.y("4",\'7-c\'+2.4).y("b",\'1Z\').1h({1k:\'1V\',1U:0,1P:0,1L:0,1K:0,1O:0,1M:\'25\',24:\'29\',28:\'1Y\',1c:\'1d\'}).p(\'1F\',5(){2.d=M(x);8(1u(x)){h()}});8(q.1E){v.y(\'1y\',"-1")};6 v};3 1u=5(c){3 b=M(c);8(!1v(b)){z(\'1t\',b);6 f}1G 8(b==\'\'){z(\'1n\',b);6 f};6 A};3 M=5(c){6 c.1B.u(/.*(\\/|\\\\)/,"")};3 15=5(b){8(b.R>2a){b=b.1q(0,19)+\'...\'+b.1q(-13)};6 b};3 1v=5(d){3 Z=(-1!==d.2D(\'.\'))?d.u(/.*[.]/,\'\').11():\'\';8(!2.r.R){6 A};2F(3 i=0;i<2.r.R;i++){8(2.r[i].11()==Z){6 A}};6 f};3 z=5(O,d){3 o=2.k[O].u(\'{c}\',15(d)).u(\'{V}\',2.r.2G(\', \'));2.z(o)};3 P=5(o){8(2.12&&q.14)14.P(\'[7] \'+o)};3 h=5(){2.l=A;2.1r(2.d);$(C.j).I(U()).I(W());$(\'#7-c\'+2.4).y(\'4\',\'7-c-l\'+2.4).2z(\'#t\'+2.4);2.9.I(N().2y());8(2.S){2.9.H(\'F\').G(2.k.E)};$(\'#t\'+2.4).1a(0).2A()};3 E=5(){8(2.l){2.l=f;2.1o(2.d);2.9.H(\'F\').G(2.k.h);$(\'#t\'+2.4).L();$(\'#s\'+2.4).y(\'1f\',\'16:f;\').L();$(\'#7-c\'+2.4).17()}};3 1b=5(){3 a=$(\'#s\'+2.4).1a(0);8(!a.2C){6};8((a.w&&a.w.j&&a.w.j.n=="f")||(a.J.C&&a.J.C.j&&a.J.C.j.n=="f")){6};3 K=a.w?a.w:a.J.C;3 D;8(K.j.n==\'\'){6};2.l=f;$(\'#7-c\'+2.4).17();2.9.H(\'F\').G(2.k.h);P("n = "+K.j.n);2I{3 Y=K.j.n.u(/<X>(.*)<\\/X>/g,\'$1\');D=2O("("+Y+")")}2Q(e){D={};};2S(5(){$(\'#t\'+2.4).L();$(\'#s\'+2.4).L()},10);2.1p(2.d,D)};$(q).p(\'2K\',5(e){8(!2.l)6;3 e=e||q.2J;e.2N=2.k.T;6 2.k.T});6 1w()};$.7.2M=1.0;$.7.m={9:2i,Q:\'h.2h\',r:[],S:A,1r:5(d){},1p:5(d,D){},1o:5(d){},k:{h:\'2E\',E:\'2l\',1n:"{c} 2k 2g, 2c 2b 1l 2d 2f 2e.",1t:"{c} 2t 2s 2u. 2w {V} 1e 2v.",T:"2r 1l 1e 2n 2m, 8 2o 2q 2p 2j h 2x 2L 2R."},z:5(o){2P(o)},12:f};$.7.2H=5(m){$.7.m=$.1s({},$.7.m,m)};$.7.1x=(5(){3 4=0;6 5(){6++4}})()})(2B);', 62, 179, '||options|var|id|function|return|jUploader|if|button|iframe|name|file|fileName||false||upload||body|messages|uploading|defaults|innerHTML|message|bind|window|allowedExtensions|jUploaderIframe|jUploaderForm|replace|input|contentDocument|this|attr|showMessage|true|form|document|response|cancel|span|text|children|append|contentWindow|doc|remove|getFileName|createInput|type|log|action|length|cancelable|onLeave|createIframe|extensions|createForm|pre|json|ext||toLowerCase|debug||console|formatFileName|javascript|show|addClass||get|complete|cursor|pointer|are|src|hover|css|display|style|position|files|none|emptyFile|onCancel|onComplete|slice|onUpload|extend|invalidExtension|validateFile|isAllowedExtension|initButton|createId|tabIndex|overflow|string|value|hidden|typeof|attachEvent|change|else|relative|direction|enctype|opacity|margin|fontFamily|post|padding|top|data|onchange|blur|multipart|right|absolute|method|removeClass|baseline|jUploaderFile|ltr|mouseover|mouseout|click|fontSize|Arial|target|load|verticalAlign|118px|33|select|please|again|it|without|empty|aspx|null|the|is|Cancel|uploaded|being|you|now|leave|The|invalid|has|extension|allowed|Only|will|hide|appendTo|submit|jQuery|parentNode|indexOf|Upload|for|join|setDefaults|try|event|beforeunload|be|version|returnValue|eval|alert|catch|cancelled|setTimeout'.split('|'), 0, {}));

    /**
     * jQuery Form Plugin
     * version: 3.14 (30-JUL-2012)
     * @requires jQuery v1.3.2 or later
     *
     * Examples and documentation at: http://malsup.com/jquery/form/
     * Project repository: https://github.com/malsup/form
     * Dual licensed under the MIT and GPL licenses:
     *    http://malsup.github.com/mit-license.txt
     *    http://malsup.github.com/gpl-license-v2.txt
     */
    (function (e) {
        var c = {};
        c.fileapi = e("<input type='file'/>").get(0).files !== undefined;
        c.formdata = window.FormData !== undefined;
        e.fn.ajaxSubmit = function (g) {
            if (!this.length) {
                d("ajaxSubmit: skipping submit process - no element selected");
                return this;
            }
            var f, w, i, l = this;
            if (typeof g == "function") {
                g = {success: g};
            }
            f = this.attr("method");
            w = this.attr("action");
            i = (typeof w === "string") ? e.trim(w) : "";
            i = i || window.location.href || "";
            if (i) {
                i = (i.match(/^([^#]+)/) || [])[1];
            }
            g = e.extend(true, {
                url: i,
                success: e.ajaxSettings.success,
                type: f || "GET",
                iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
            }, g);
            var r = {};
            this.trigger("form-pre-serialize", [this, g, r]);
            if (r.veto) {
                d("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
                return this;
            }
            if (g.beforeSerialize && g.beforeSerialize(this, g) === false) {
                d("ajaxSubmit: submit aborted via beforeSerialize callback");
                return this;
            }
            var j = g.traditional;
            if (j === undefined) {
                j = e.ajaxSettings.traditional;
            }
            var o = [];
            var z, A = this.formToArray(g.semantic, o);
            if (g.data) {
                g.extraData = g.data;
                z = e.param(g.data, j);
            }
            if (g.beforeSubmit && g.beforeSubmit(A, this, g) === false) {
                d("ajaxSubmit: submit aborted via beforeSubmit callback");
                return this;
            }
            this.trigger("form-submit-validate", [A, this, g, r]);
            if (r.veto) {
                d("ajaxSubmit: submit vetoed via form-submit-validate trigger");
                return this;
            }
            var u = e.param(A, j);
            if (z) {
                u = (u ? (u + "&" + z) : z);
            }
            if (g.type.toUpperCase() == "GET") {
                g.url += (g.url.indexOf("?") >= 0 ? "&" : "?") + u;
                g.data = null;
            } else {
                g.data = u;
            }
            var C = [];
            if (g.resetForm) {
                C.push(function () {
                    l.resetForm();
                });
            }
            if (g.clearForm) {
                C.push(function () {
                    l.clearForm(g.includeHidden);
                });
            }
            if (!g.dataType && g.target) {
                var h = g.success || function () {
                    };
                C.push(function (q) {
                    var k = g.replaceTarget ? "replaceWith" : "html";
                    e(g.target)[k](q).each(h, arguments);
                });
            } else {
                if (g.success) {
                    C.push(g.success);
                }
            }
            g.success = function (F, q, G) {
                var E = g.context || this;
                for (var D = 0, k = C.length; D < k; D++) {
                    C[D].apply(E, [F, q, G || l, l]);
                }
            };
            var y = e("input:file:enabled[value]", this);
            var m = y.length > 0;
            var x = "multipart/form-data";
            var t = (l.attr("enctype") == x || l.attr("encoding") == x);
            var s = c.fileapi && c.formdata;
            d("fileAPI :" + s);
            var n = (m || t) && !s;
            if (g.iframe !== false && (g.iframe || n)) {
                if (g.closeKeepAlive) {
                    e.get(g.closeKeepAlive, function () {
                        B(A);
                    });
                } else {
                    B(A);
                }
            } else {
                if ((m || t) && s) {
                    p(A);
                } else {
                    e.ajax(g);
                }
            }
            for (var v = 0; v < o.length; v++) {
                o[v] = null;
            }
            this.trigger("form-submit-notify", [this, g]);
            return this;

            function p(q) {
                var k = new FormData();
                for (var D = 0; D < q.length; D++) {
                    k.append(q[D].name, q[D].value);
                }
                if (g.extraData) {
                    for (var G in g.extraData) {
                        if (g.extraData.hasOwnProperty(G)) {
                            k.append(G, g.extraData[G]);
                        }
                    }
                }
                g.data = null;
                var F = e.extend(true, {}, e.ajaxSettings, g, {
                    contentType: false,
                    processData: false,
                    cache: false,
                    type: "POST"
                });
                if (g.uploadProgress) {
                    F.xhr = function () {
                        var H = jQuery.ajaxSettings.xhr();
                        if (H.upload) {
                            H.upload.onprogress = function (L) {
                                var K = 0;
                                var I = L.loaded || L.position;
                                var J = L.total;
                                if (L.lengthComputable) {
                                    K = Math.ceil(I / J * 100);
                                }
                                g.uploadProgress(L, I, J, K);
                            };
                        }
                        return H;
                    };
                }
                F.data = null;
                var E = F.beforeSend;
                F.beforeSend = function (I, H) {
                    H.data = k;
                    if (E) {
                        E.call(this, I, H);
                    }
                };
                e.ajax(F);
            }

            function B(ab) {
                var G = l[0],
                    F, X, R, Z, U, I, M, K, L, V, Y, P;
                var J = !!e.fn.prop;
                if (e(":input[name=submit],:input[id=submit]", G).length) {
                    alert('Error: Form elements must not have name or id of "submit".');
                    return;
                }
                if (ab) {
                    for (X = 0; X < o.length; X++) {
                        F = e(o[X]);
                        if (J) {
                            F.prop("disabled", false);
                        } else {
                            F.removeAttr("disabled");
                        }
                    }
                }
                R = e.extend(true, {}, e.ajaxSettings, g);
                R.context = R.context || R;
                U = "jqFormIO" + (new Date().getTime());
                if (R.iframeTarget) {
                    I = e(R.iframeTarget);
                    V = I.attr("name");
                    if (!V) {
                        I.attr("name", U);
                    } else {
                        U = V;
                    }
                } else {
                    I = e('<iframe name="' + U + '" src="../HoorayUI/' + R.iframeSrc + '" />');
                    I.css({position: "absolute", top: "-1000px", left: "-1000px"});
                }
                M = I[0];
                K = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function () {
                    },
                    getResponseHeader: function () {
                    },
                    setRequestHeader: function () {
                    },
                    abort: function (ae) {
                        var af = (ae === "timeout" ? "timeout" : "aborted");
                        d("aborting upload... " + af);
                        this.aborted = 1;
                        if (M.contentWindow.document.execCommand) {
                            try {
                                M.contentWindow.document.execCommand("Stop");
                            } catch (ag) {
                            }
                        }
                        I.attr("src", R.iframeSrc);
                        K.error = af;
                        if (R.error) {
                            R.error.call(R.context, K, af, ae);
                        }
                        if (Z) {
                            e.event.trigger("ajaxError", [K, R, af]);
                        }
                        if (R.complete) {
                            R.complete.call(R.context, K, af);
                        }
                    }
                };
                Z = R.global;
                if (Z && 0 === e.active++) {
                    e.event.trigger("ajaxStart");
                }
                if (Z) {
                    e.event.trigger("ajaxSend", [K, R]);
                }
                if (R.beforeSend && R.beforeSend.call(R.context, K, R) === false) {
                    if (R.global) {
                        e.active--;
                    }
                    return;
                }
                if (K.aborted) {
                    return;
                }
                L = G.clk;
                if (L) {
                    V = L.name;
                    if (V && !L.disabled) {
                        R.extraData = R.extraData || {};
                        R.extraData[V] = L.value;
                        if (L.type == "image") {
                            R.extraData[V + ".x"] = G.clk_x;
                            R.extraData[V + ".y"] = G.clk_y;
                        }
                    }
                }
                var Q = 1;
                var N = 2;

                function O(af) {
                    var ae = af.contentWindow ? af.contentWindow.document : af.contentDocument ? af.contentDocument : af.document;
                    return ae;
                }

                var E = e("meta[name=csrf-token]").attr("content");
                var D = e("meta[name=csrf-param]").attr("content");
                if (D && E) {
                    R.extraData = R.extraData || {};
                    R.extraData[D] = E;
                }

                function W() {
                    var ag = l.attr("target"),
                        ae = l.attr("action");
                    G.setAttribute("target", U);
                    if (!f) {
                        G.setAttribute("method", "POST");
                    }
                    if (ae != R.url) {
                        G.setAttribute("action", R.url);
                    }
                    if (!R.skipEncodingOverride && (!f || /post/i.test(f))) {
                        l.attr({encoding: "multipart/form-data", enctype: "multipart/form-data"});
                    }
                    if (R.timeout) {
                        P = setTimeout(function () {
                            Y = true;
                            T(Q);
                        }, R.timeout);
                    }

                    function ah() {
                        try {
                            var aj = O(M).readyState;
                            d("state = " + aj);
                            if (aj && aj.toLowerCase() == "uninitialized") {
                                setTimeout(ah, 50);
                            }
                        } catch (ak) {
                            d("Server abort: ", ak, " (", ak.name, ")");
                            T(N);
                            if (P) {
                                clearTimeout(P);
                            }
                            P = undefined;
                        }
                    }

                    var af = [];
                    try {
                        if (R.extraData) {
                            for (var ai in R.extraData) {
                                if (R.extraData.hasOwnProperty(ai)) {
                                    if (e.isPlainObject(R.extraData[ai]) && R.extraData[ai].hasOwnProperty("name") && R.extraData[ai].hasOwnProperty("value")) {
                                        af.push(e('<input type="hidden" name="' + R.extraData[ai].name + '">').attr("value", R.extraData[ai].value).appendTo(G)[0]);
                                    } else {
                                        af.push(e('<input type="hidden" name="' + ai + '">').attr("value", R.extraData[ai]).appendTo(G)[0]);
                                    }
                                }
                            }
                        }
                        if (!R.iframeTarget) {
                            I.appendTo("body");
                            if (M.attachEvent) {
                                M.attachEvent("onload", T);
                            } else {
                                M.addEventListener("load", T, false);
                            }
                        }
                        setTimeout(ah, 15);
                        G.submit();
                    } finally {
                        G.setAttribute("action", ae);
                        if (ag) {
                            G.setAttribute("target", ag);
                        } else {
                            l.removeAttr("target");
                        }
                        e(af).remove();
                    }
                }

                if (R.forceSync) {
                    W();
                } else {
                    setTimeout(W, 10);
                }
                var ac, ad, aa = 50,
                    H;

                function T(aj) {
                    if (K.aborted || H) {
                        return;
                    }
                    try {
                        ad = O(M);
                    } catch (am) {
                        d("cannot access response document: ", am);
                        aj = N;
                    }
                    if (aj === Q && K) {
                        K.abort("timeout");
                        return;
                    } else {
                        if (aj == N && K) {
                            K.abort("server abort");
                            return;
                        }
                    }
                    if (!ad || ad.location.href == R.iframeSrc) {
                        if (!Y) {
                            return;
                        }
                    }
                    if (M.detachEvent) {
                        M.detachEvent("onload", T);
                    } else {
                        M.removeEventListener("load", T, false);
                    }
                    var ah = "success",
                        al;
                    try {
                        if (Y) {
                            throw "timeout";
                        }
                        var ag = R.dataType == "xml" || ad.XMLDocument || e.isXMLDoc(ad);
                        d("isXml=" + ag);
                        if (!ag && window.opera && (ad.body === null || !ad.body.innerHTML)) {
                            if (--aa) {
                                d("requeing onLoad callback, DOM not available");
                                setTimeout(T, 250);
                                return;
                            }
                        }
                        var an = ad.body ? ad.body : ad.documentElement;
                        K.responseText = an ? an.innerHTML : null;
                        K.responseXML = ad.XMLDocument ? ad.XMLDocument : ad;
                        if (ag) {
                            R.dataType = "xml";
                        }
                        K.getResponseHeader = function (aq) {
                            var ap = {"content-type": R.dataType};
                            return ap[aq];
                        };
                        if (an) {
                            K.status = Number(an.getAttribute("status")) || K.status;
                            K.statusText = an.getAttribute("statusText") || K.statusText;
                        }
                        var ae = (R.dataType || "").toLowerCase();
                        var ak = /(json|script|text)/.test(ae);
                        if (ak || R.textarea) {
                            var ai = ad.getElementsByTagName("textarea")[0];
                            if (ai) {
                                K.responseText = ai.value;
                                K.status = Number(ai.getAttribute("status")) || K.status;
                                K.statusText = ai.getAttribute("statusText") || K.statusText;
                            } else {
                                if (ak) {
                                    var af = ad.getElementsByTagName("pre")[0];
                                    var ao = ad.getElementsByTagName("body")[0];
                                    if (af) {
                                        K.responseText = af.textContent ? af.textContent : af.innerText;
                                    } else {
                                        if (ao) {
                                            K.responseText = ao.textContent ? ao.textContent : ao.innerText;
                                        }
                                    }
                                }
                            }
                        } else {
                            if (ae == "xml" && !K.responseXML && K.responseText) {
                                K.responseXML = S(K.responseText);
                            }
                        }
                        try {
                            ac = k(K, ae, R);
                        } catch (aj) {
                            ah = "parsererror";
                            K.error = al = (aj || ah);
                        }
                    } catch (aj) {
                        d("error caught: ", aj);
                        ah = "error";
                        K.error = al = (aj || ah);
                    }
                    if (K.aborted) {
                        d("upload aborted");
                        ah = null;
                    }
                    if (K.status) {
                        ah = (K.status >= 200 && K.status < 300 || K.status === 304) ? "success" : "error";
                    }
                    if (ah === "success") {
                        if (R.success) {
                            R.success.call(R.context, ac, "success", K);
                        }
                        if (Z) {
                            e.event.trigger("ajaxSuccess", [K, R]);
                        }
                    } else {
                        if (ah) {
                            if (al === undefined) {
                                al = K.statusText;
                            }
                            if (R.error) {
                                R.error.call(R.context, K, ah, al);
                            }
                            if (Z) {
                                e.event.trigger("ajaxError", [K, R, al]);
                            }
                        }
                    }
                    if (Z) {
                        e.event.trigger("ajaxComplete", [K, R]);
                    }
                    if (Z && !--e.active) {
                        e.event.trigger("ajaxStop");
                    }
                    if (R.complete) {
                        R.complete.call(R.context, K, ah);
                    }
                    H = true;
                    if (R.timeout) {
                        clearTimeout(P);
                    }
                    setTimeout(function () {
                        if (!R.iframeTarget) {
                            I.remove();
                        }
                        K.responseXML = null;
                    }, 100);
                }

                var S = e.parseXML || function (ae, af) {
                        if (window.ActiveXObject) {
                            af = new ActiveXObject("Microsoft.XMLDOM");
                            af.async = "false";
                            af.loadXML(ae);
                        } else {
                            af = (new DOMParser()).parseFromString(ae, "text/xml");
                        }
                        return (af && af.documentElement && af.documentElement.nodeName != "parsererror") ? af : null;
                    };
                var q = e.parseJSON || function (ae) {
                        return window["eval"]("(" + ae + ")");
                    };
                var k = function (aj, ah, ag) {
                    var af = aj.getResponseHeader("content-type") || "",
                        ae = ah === "xml" || !ah && af.indexOf("xml") >= 0,
                        ai = ae ? aj.responseXML : aj.responseText;
                    if (ae && ai.documentElement.nodeName === "parsererror") {
                        if (e.error) {
                            e.error("parsererror");
                        }
                    }
                    if (ag && ag.dataFilter) {
                        ai = ag.dataFilter(ai, ah);
                    }
                    if (typeof ai === "string") {
                        if (ah === "json" || !ah && af.indexOf("json") >= 0) {
                            ai = q(ai);
                        } else {
                            if (ah === "script" || !ah && af.indexOf("javascript") >= 0) {
                                e.globalEval(ai);
                            }
                        }
                    }
                    return ai;
                };
            }
        };
        e.fn.ajaxForm = function (f) {
            f = f || {};
            f.delegation = f.delegation && e.isFunction(e.fn.on);
            if (!f.delegation && this.length === 0) {
                var g = {s: this.selector, c: this.context};
                if (!e.isReady && g.s) {
                    d("DOM not ready, queuing ajaxForm");
                    e(function () {
                        e(g.s, g.c).ajaxForm(f);
                    });
                    return this;
                }
                d("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)"));
                return this;
            }
            if (f.delegation) {
                e(document).off("submit.form-plugin", this.selector, b).off("click.form-plugin", this.selector, a).on("submit.form-plugin", this.selector, f, b).on("click.form-plugin", this.selector, f, a);
                return this;
            }
            return this.ajaxFormUnbind().bind("submit.form-plugin", f, b).bind("click.form-plugin", f, a);
        };

        function b(g) {
            var f = g.data;
            if (!g.isDefaultPrevented()) {
                g.preventDefault();
                e(this).ajaxSubmit(f);
            }
        }

        function a(j) {
            var i = j.target;
            var g = e(i);
            if (!(g.is(":submit,input:image"))) {
                var f = g.closest(":submit");
                if (f.length === 0) {
                    return;
                }
                i = f[0];
            }
            var h = this;
            h.clk = i;
            if (i.type == "image") {
                if (j.offsetX !== undefined) {
                    h.clk_x = j.offsetX;
                    h.clk_y = j.offsetY;
                } else {
                    if (typeof e.fn.offset == "function") {
                        var k = g.offset();
                        h.clk_x = j.pageX - k.left;
                        h.clk_y = j.pageY - k.top;
                    } else {
                        h.clk_x = j.pageX - i.offsetLeft;
                        h.clk_y = j.pageY - i.offsetTop;
                    }
                }
            }
            setTimeout(function () {
                h.clk = h.clk_x = h.clk_y = null;
            }, 100);
        }

        e.fn.ajaxFormUnbind = function () {
            return this.unbind("submit.form-plugin click.form-plugin");
        };
        e.fn.formToArray = function (w, f) {
            var u = [];
            if (this.length === 0) {
                return u;
            }
            var k = this[0];
            var o = w ? k.getElementsByTagName("*") : k.elements;
            if (!o) {
                return u;
            }
            var q, p, m, x, l, s, h;
            for (q = 0, s = o.length; q < s; q++) {
                l = o[q];
                m = l.name;
                if (!m) {
                    continue;
                }
                if (w && k.clk && l.type == "image") {
                    if (!l.disabled && k.clk == l) {
                        u.push({name: m, value: e(l).val(), type: l.type});
                        u.push({name: m + ".x", value: k.clk_x}, {name: m + ".y", value: k.clk_y});
                    }
                    continue;
                }
                x = e.fieldValue(l, true);
                if (x && x.constructor == Array) {
                    if (f) {
                        f.push(l);
                    }
                    for (p = 0, h = x.length; p < h; p++) {
                        u.push({name: m, value: x[p]});
                    }
                } else {
                    if (c.fileapi && l.type == "file" && !l.disabled) {
                        if (f) {
                            f.push(l);
                        }
                        var g = l.files;
                        if (g.length) {
                            for (p = 0; p < g.length; p++) {
                                u.push({name: m, value: g[p], type: l.type});
                            }
                        } else {
                            u.push({name: m, value: "", type: l.type});
                        }
                    } else {
                        if (x !== null && typeof x != "undefined") {
                            if (f) {
                                f.push(l);
                            }
                            u.push({name: m, value: x, type: l.type, required: l.required});
                        }
                    }
                }
            }
            if (!w && k.clk) {
                var r = e(k.clk),
                    t = r[0];
                m = t.name;
                if (m && !t.disabled && t.type == "image") {
                    u.push({name: m, value: r.val()});
                    u.push({name: m + ".x", value: k.clk_x}, {name: m + ".y", value: k.clk_y});
                }
            }
            return u;
        };
        e.fn.formSerialize = function (f) {
            return e.param(this.formToArray(f));
        };
        e.fn.fieldSerialize = function (g) {
            var f = [];
            this.each(function () {
                var l = this.name;
                if (!l) {
                    return;
                }
                var j = e.fieldValue(this, g);
                if (j && j.constructor == Array) {
                    for (var k = 0, h = j.length; k < h; k++) {
                        f.push({name: l, value: j[k]});
                    }
                } else {
                    if (j !== null && typeof j != "undefined") {
                        f.push({name: this.name, value: j});
                    }
                }
            });
            return e.param(f);
        };
        e.fn.fieldValue = function (l) {
            for (var k = [], h = 0, f = this.length; h < f; h++) {
                var j = this[h];
                var g = e.fieldValue(j, l);
                if (g === null || typeof g == "undefined" || (g.constructor == Array && !g.length)) {
                    continue;
                }
                if (g.constructor == Array) {
                    e.merge(k, g);
                } else {
                    k.push(g);
                }
            }
            return k;
        };
        e.fieldValue = function (f, m) {
            var h = f.name,
                s = f.type,
                u = f.tagName.toLowerCase();
            if (m === undefined) {
                m = true;
            }
            if (m && (!h || f.disabled || s == "reset" || s == "button" || (s == "checkbox" || s == "radio") && !f.checked || (s == "submit" || s == "image") && f.form && f.form.clk != f || u == "select" && f.selectedIndex == -1)) {
                return null;
            }
            if (u == "select") {
                var o = f.selectedIndex;
                if (o < 0) {
                    return null;
                }
                var q = [],
                    g = f.options;
                var k = (s == "select-one");
                var p = (k ? o + 1 : g.length);
                for (var j = (k ? o : 0); j < p; j++) {
                    var l = g[j];
                    if (l.selected) {
                        var r = l.value;
                        if (!r) {
                            r = (l.attributes && l.attributes["value"] && !(l.attributes["value"].specified)) ? l.text : l.value;
                        }
                        if (k) {
                            return r;
                        }
                        q.push(r);
                    }
                }
                return q;
            }
            return e(f).val();
        };
        e.fn.clearForm = function (f) {
            return this.each(function () {
                e("input,select,textarea", this).clearFields(f);
            });
        };
        e.fn.clearFields = e.fn.clearInputs = function (f) {
            var g = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
            return this.each(function () {
                var i = this.type,
                    h = this.tagName.toLowerCase();
                if (g.test(i) || h == "textarea") {
                    this.value = "";
                } else {
                    if (i == "checkbox" || i == "radio") {
                        this.checked = false;
                    } else {
                        if (h == "select") {
                            this.selectedIndex = -1;
                        } else {
                            if (f) {
                                if ((f === true && /hidden/.test(i)) || (typeof f == "string" && e(this).is(f))) {
                                    this.value = "";
                                }
                            }
                        }
                    }
                }
            });
        };
        e.fn.resetForm = function () {
            return this.each(function () {
                if (typeof this.reset == "function" || (typeof this.reset == "object" && !this.reset.nodeType)) {
                    this.reset();
                }
            });
        };
        e.fn.enable = function (f) {
            if (f === undefined) {
                f = true;
            }
            return this.each(function () {
                this.disabled = !f;
            });
        };
        e.fn.selected = function (f) {
            if (f === undefined) {
                f = true;
            }
            return this.each(function () {
                var g = this.type;
                if (g == "checkbox" || g == "radio") {
                    this.checked = f;
                } else {
                    if (this.tagName.toLowerCase() == "option") {
                        var h = e(this).parent("select");
                        if (f && h[0] && h[0].type == "select-one") {
                            h.find("option").selected(false);
                        }
                        this.selected = f;
                    }
                }
            });
        };
        e.fn.ajaxSubmit.debug = false;

        function d() {
            if (!e.fn.ajaxSubmit.debug) {
                return;
            }
            var f = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            if (window.console && window.console.log) {
                window.console.log(f);
            } else {
                if (window.opera && window.opera.postError) {
                    window.opera.postError(f);
                }
            }
        }
    })(jQuery);

    exports.template = template;
    exports.swfobject = swfobject;
    exports.fullScreenApi = window.fullScreenApi;
    exports.msgboxshow = ZENG.msgbox.show;
    exports.msgbox_hide = ZENG.msgbox._hide;
});

