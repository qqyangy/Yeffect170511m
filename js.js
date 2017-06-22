/**
 * Created by jh on 2017/5/23.
 */
function(isnull, iskeyup, isauto, callback, focus_css, error_css, correct_css, use4, pas6) {
    callback = callback ||
        function(dom) {};
    focus_css = focus_css || "yv-focus";
    error_css = error_css || "yv-error";
    correct_css = correct_css || "yv-correct";
    isauto = isauto || false;
    isnull = isnull || false;
    iskeyup = iskeyup || false;
    use4 = use4 || 4;
    pas6 = pas6 || 6;
    var isautoout = false;
    if (iskeyup && isauto) {
        isautoout = true
    }
    var eventstr = "focusout change";
    if (iskeyup) {
        eventstr = "focusout change keyup"
    }
    var formdat = {};
    formdat.mail = [".yv-mills"];
    formdat.phone = [".yv-phone"];
    formdat.num = [".yv-num"];
    formdat.sfz = [".yv-sfz"];
    formdat.tel = [".yv-tel"];
    formdat.user = [".yv-user"];
    formdat.pass = [".yv-pass"];
    var formdata = formdat;
    function Vmail(val) {
        var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (re.test(val)) {
            return true
        } else {
            return false
        }
    }
    function Vphone(val) {
        var re = /^1[3,5,7,8]\d{9}$/;
        if (re.test(val)) {
            return true
        } else {
            return false
        }
    }
    function Vnum(val) {
        var re = /^[0-9]{0,10000}\.{0,1}[0-9]{1,100}$/;
        if (re.test(val)) {
            return true
        } else {
            return false
        }
    }
    function Vsfz(val) {
        var re = /^\d{17}[0-9,X]{1}$/;
        if (re.test(val)) {
            return true
        } else {
            return false
        }
    }
    function Vtel(val) {
        var re = /^0\d{2,3}-?\d{7,8}$/;
        if (re.test(val)) {
            return true
        } else {
            return false
        }
    }
    function Vuser(val) {
        var re = /^[a-zA-z]\w{3,15}$/;
        if (re.test(val) && val.length >= use4) {
            return true
        } else {
            return false
        }
    }
    function Vpass(val) {
        var re = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
        if (re.test(val) && val.length >= pas6) {
            return true
        } else {
            return false
        }
    }
    function Vstring(val) {
        var re = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{0,1000}$/;
        if (re.test(val)) {
            return true
        } else {
            return false
        }
    }
    function VtelA(val) {
        var re = /^[0-9]{0,4}[\-]{0,1}[0-9]{0,8}$/;
        if (re.test(val)) {
            return true
        } else {
            return false
        }
    }
    function VnumA(val) {
        var re = /^[0-9]{0,1000}$/;
        if (re.test(val)) {
            return true
        } else {
            return false
        }
    }
    function VnumB(val) {
        var re = /^[0-9]{0,1000}\.{0,1}[0-9]{0,100}$/;
        if (re.test(val)) {
            return true
        } else {
            return false
        }
    }
    function VphoneA(val) {
        var re = /^[0-9]{0,11}$/;
        if (re.test(val)) {
            return true
        } else {
            return false
        }
    }
    function VsfzA(val) {
        var re = /^\d{0,18}[0-9,X]{0,18}$/;
        if (re.test(val) && val.length <= 18) {
            return true
        } else {
            return false
        }
    }
    var inputQ = "";
    for (var o in formdata) {
        for (var i = 0; i < formdata[o].length; i++) {
            var $domA = $(formdata[o][i]);
            $domA.each(function(index, element) {
                var $dom = $(this);
                if (!$dom.attr("data-addvalid")) {
                    var $domv = $dom.val();
                    $dom.attr("data-length", $domv.length);
                    $dom.removeClass(correct_css).removeClass(error_css).removeClass(focus_css);
                    $dom.focusin(function() {
                        $dom.removeClass(correct_css).removeClass(error_css).removeClass(focus_css);
                        $(this).addClass(focus_css);
                        inputQ = $(this).val()
                    });
                    switch (o) {
                        case "mail":
                            if (!Vstring($domv) && isautoout) {
                                $dom.val("");
                                $domv = ""
                            }
                            $dom.attr("data-addvalid", "mail");
                            $dom.attr("data-valid", Vmail($domv));
                            if ($domv.length > 0) {
                                if (Vmail($domv)) {
                                    $dom.addClass(correct_css)
                                } else {
                                    $dom.addClass(error_css)
                                }
                            }
                            $dom.on(eventstr,
                                function() {
                                    var $this = $(this);
                                    var $val = $this.val();
                                    if (isautoout) {
                                        if (!Vstring($val)) {
                                            $val = inputQ;
                                            $this.val($val)
                                        } else {
                                            inputQ = $val
                                        }
                                    }
                                    $this.attr("data-length", $val.length);
                                    $this.attr("data-valid", Vmail($val));
                                    $this.removeClass(correct_css).removeClass(error_css).removeClass(focus_css);
                                    if ($val.length > 0 || isnull) {
                                        if (Vmail($val)) {
                                            $this.addClass(correct_css)
                                        } else {
                                            $this.addClass(error_css)
                                        }
                                    }
                                    callback($this)
                                });
                            break;
                        case "phone":
                            if (!VphoneA($domv) && isautoout) {
                                $dom.val("");
                                $domv = ""
                            }
                            $dom.attr("data-addvalid", "phone");
                            $dom.attr("data-valid", Vphone($domv));
                            if ($domv.length > 0) {
                                if (Vphone($domv)) {
                                    $dom.addClass(correct_css)
                                } else {
                                    $dom.addClass(error_css)
                                }
                            }
                            $dom.on(eventstr,
                                function() {
                                    var $this = $(this);
                                    var $val = $this.val();
                                    if (isautoout) {
                                        if (!VphoneA($val)) {
                                            $val = inputQ;
                                            $this.val($val)
                                        } else {
                                            inputQ = $val
                                        }
                                    }
                                    $this.attr("data-length", $val.length);
                                    $this.attr("data-valid", Vphone($val));
                                    $this.removeClass(correct_css).removeClass(error_css).removeClass(focus_css);
                                    if ($val.length > 0 || isnull) {
                                        if (Vphone($val)) {
                                            $this.addClass(correct_css)
                                        } else {
                                            $this.addClass(error_css)
                                        }
                                    }
                                    callback($this)
                                });
                            break;
                        case "num":
                            if (!VnumB($domv) && isautoout) {
                                $dom.val("");
                                $domv = ""
                            }
                            $dom.attr("data-addvalid", "num");
                            $dom.attr("data-valid", Vnum($domv));
                            if ($domv.length > 0) {
                                if (Vnum($domv)) {
                                    $dom.addClass(correct_css)
                                } else {
                                    $dom.addClass(error_css)
                                }
                            }
                            $dom.on(eventstr,
                                function() {
                                    var $this = $(this);
                                    var $val = $this.val();
                                    if (isautoout) {
                                        if (!VnumB($val)) {
                                            $val = inputQ;
                                            $this.val($val)
                                        } else {
                                            inputQ = $val
                                        }
                                    }
                                    $this.attr("data-length", $val.length);
                                    $this.attr("data-valid", Vnum($val));
                                    $this.removeClass(correct_css).removeClass(error_css).removeClass(focus_css);
                                    if ($val.length > 0 || isnull) {
                                        if (Vnum($val)) {
                                            $this.addClass(correct_css)
                                        } else {
                                            $this.addClass(error_css)
                                        }
                                    }
                                    callback($this)
                                });
                            break;
                        case "sfz":
                            if (!VsfzA($domv) && isautoout) {
                                $dom.val("");
                                $domv = ""
                            }
                            $dom.attr("data-addvalid", "sfz");
                            $dom.attr("data-valid", Vsfz($domv));
                            if ($domv.length > 0) {
                                if (Vsfz($domv)) {
                                    $dom.addClass(correct_css)
                                } else {
                                    $dom.addClass(error_css)
                                }
                            }
                            $dom.on(eventstr,
                                function() {
                                    var $this = $(this);
                                    var $val = $this.val();
                                    if (isautoout) {
                                        if (!VsfzA($val)) {
                                            $val = inputQ;
                                            $this.val($val)
                                        } else {
                                            inputQ = $val
                                        }
                                    }
                                    $this.attr("data-length", $val.length);
                                    $this.attr("data-valid", Vsfz($val));
                                    $this.removeClass(correct_css).removeClass(error_css).removeClass(focus_css);
                                    if ($val.length > 0 || isnull) {
                                        if (Vsfz($val)) {
                                            $this.addClass(correct_css)
                                        } else {
                                            $this.addClass(error_css)
                                        }
                                    }
                                    callback($this)
                                });
                            break;
                        case "tel":
                            if (!VtelA($domv) && isautoout) {
                                $dom.val("");
                                $domv = ""
                            }
                            $dom.attr("data-addvalid", "tel");
                            $dom.attr("data-valid", Vtel($domv));
                            if ($domv.length > 0) {
                                if (Vtel($domv)) {
                                    $dom.addClass(correct_css)
                                } else {
                                    $dom.addClass(error_css)
                                }
                            }
                            $dom.on(eventstr,
                                function() {
                                    var $this = $(this);
                                    var $val = $this.val();
                                    if (isautoout) {
                                        if (!VtelA($val)) {
                                            $val = inputQ;
                                            $this.val($val)
                                        } else {
                                            inputQ = $val
                                        }
                                    }
                                    $this.attr("data-length", $val.length);
                                    $this.attr("data-valid", Vtel($val));
                                    $this.removeClass(correct_css).removeClass(error_css).removeClass(focus_css);
                                    if ($val.length > 0 || isnull) {
                                        if (Vtel($val)) {
                                            $this.addClass(correct_css)
                                        } else {
                                            $this.addClass(error_css)
                                        }
                                    }
                                    callback($this)
                                });
                            break;
                        case "user":
                            if (!Vstring($domv) && isautoout) {
                                $dom.val("");
                                $domv = ""
                            }
                            $dom.attr("data-addvalid", "user");
                            $dom.attr("data-valid", Vuser($domv));
                            if ($domv.length > 0) {
                                if (Vuser($domv)) {
                                    $dom.addClass(correct_css)
                                } else {
                                    $dom.addClass(error_css)
                                }
                            }
                            $dom.on(eventstr,
                                function() {
                                    var $this = $(this);
                                    var $val = $this.val();
                                    if (isautoout) {
                                        if (!Vstring($val)) {
                                            $val = inputQ;
                                            $this.val($val)
                                        } else {
                                            inputQ = $val
                                        }
                                    }
                                    $this.attr("data-length", $val.length);
                                    $this.attr("data-valid", Vuser($val));
                                    $this.removeClass(correct_css).removeClass(error_css).removeClass(focus_css);
                                    if ($val.length > 0 || isnull) {
                                        if (Vuser($val)) {
                                            $this.addClass(correct_css)
                                        } else {
                                            $this.addClass(error_css)
                                        }
                                    }
                                    callback($this)
                                });
                            break;
                        case "pass":
                            if (!Vstring($domv) && isautoout) {
                                $dom.val("");
                                $domv = ""
                            }
                            $dom.attr("data-addvalid", "pass");
                            $dom.attr("data-valid", Vpass($domv));
                            if ($domv.length > 0) {
                                if (Vpass($domv)) {
                                    $dom.addClass(correct_css)
                                } else {
                                    $dom.addClass(error_css)
                                }
                            }
                            $dom.on(eventstr,
                                function() {
                                    var $this = $(this);
                                    var $val = $this.val();
                                    if (isautoout) {
                                        if (!Vstring($val)) {
                                            $val = inputQ;
                                            $this.val($val)
                                        } else {
                                            inputQ = $val
                                        }
                                    }
                                    $this.attr("data-length", $val.length);
                                    $this.attr("data-valid", Vpass($val));
                                    $this.removeClass(correct_css).removeClass(error_css).removeClass(focus_css);
                                    if ($val.length > 0 || isnull) {
                                        if (Vpass($val)) {
                                            $this.addClass(correct_css)
                                        } else {
                                            $this.addClass(error_css)
                                        }
                                    }
                                    callback($this)
                                });
                            break
                    }
                }
            })
        }
    }
}