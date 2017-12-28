/********************************************************桌面类********************************************************/
Yeffect.class("Desktop").constructor(function(el){ /********构造函数********/
  this.elemt=el;
  var _mousmove=this.mousemove;
  var _mousewheel=this.mousewheel;
  setTimeout(function(){
    $(el).mousewheel(_mousewheel).mousemove(function(e){_mousmove(e)});
  },0)
}).prototype({ /********原型链属性和方法********/
  mousewheel:function(e){
    e.preventDefault();
    return false;
  },
  mousemove:function (e) { /////控制全屏模式下的鼠标滑入//////
    var $body=Desktop.$body;
    if($body.hasClass("fullscreen")){
        if(e.pageY<10){
          $body.addClass("fullscreenmove");
        }else if(e.pageY>25){
          $body.removeClass("fullscreenmove")
        }
    }else{
      $body.removeClass("fullscreenmove")
    }
  }
}).static({ /********静态属性和方法***********/
  $body:$("body")
});


/**********************************************************底部栏类***********************************************************/
Yeffect.class("Taskbar").constructor(function(el){
  this.el=el||$("<div style='width: 100%; position: absolute; z-index: 10;height: 40px; left: 0px; bottom: 0px;background: #111;'></div>");
  this.childs=[];//子元素集合///
}).prototype({
  parentAppend:function(parentEl){ /**自身添加到父级元素**/
    $(parentEl).append(this.el);
  },
  addChild:function(child){/**向自身元素内添加子元素,子元素类必须包含el属性**/
    this.el.append(child.el);
    child.parent=this;
    this.childs.push(child);
  },
  removeChild:function(child){/**移除子元素**/
    var indexof=this.childs.indexOf(child);
    child.parent=null;
    child.el.remove();
  }
});

/**********************************************************底部栏-容器类*继承底部类**********************************************************/
Yeffect.class("TaskContent").constructor(function(){
  this.parent=null;
  this.dittop=false;
}).extends(Taskbar).prototype({
  setWidth:function(num,attr){ /**设置自身宽度***/
    this.el.width(num);
    this.el.css(attr,0);
    this.parent.el.css("padding-"+attr,num+1);
    this.parent.el.css("box-sizing","border-box");
  },
  setStyle:function(obj) {
    /*****设置自身style样式****/
    this.el.css(obj);
  },
  getMaxIndex:function(){//返回显示且index最大的元素//
    var zindex=-1;
    var _thiso=null;
    for(var i=0;i<this.childs.length;i++){
        var _o=this.childs[i];
        if(_o.display()){
          if(_o.zIndex>zindex){
            zindex=_o.zIndex;
            _thiso=_o;
          }
        }
    }
    return _thiso;
  },
  clearClass:function(clas){
    for(var i=0;i<this.childs.length;i++){
      var _o=this.childs[i];
      _o.removeClass(clas);
    }
  },
  hideAll:function () {
    var childs = this.childs;
    for (var j = 0; j < childs.length; j++) {
      var e = childs[j];
      if(this.dittop){
        e.tag.attr("style",e.tag.attr("stylea"));
      }else{
        e.tag.attr("stylea",e.tag.attr("style"));
        e.tag.find(".ha-hide").trigger("click");
      }
    }
    if(this.dittop){
      var ati=this.getMaxIndex();
      if(ati){
        ati.addClass();
      }
    }
    this.dittop=!this.dittop;
  }
});


/**********************************************************底部栏任务栏标签类**********************************************************/
Yeffect.class("TaskTag").constructor(function(rel){
    this.rel=rel;
    var _this=this;
    this.el=$("<div class='tasktag'></div>").append(rel.html()).click(function(){
      _this.click();
    });
    this.parent=null;
    this.tag=null;
    this.zIndex=TaskTag.zIndex++;
    setTimeout(function(){
      _this.parent.clearClass("active");
      _this.parent.dittop=false;
      _this.addClass("active");
      _this.tag.css({"position":"absolute","background":"#fff","z-index":_this.zIndex});
      _this.el.find("img").removeAttr("alt").removeAttr("title");
      _this.rel.click(function(){
        _this.hide();
      });
      _this.tag.on("click",".ha-hide",function(){
        _this.hide();
      });
      _this.tag.on("click",".ha-close",function(){
        _this.close();
      });
    },0)
}).prototype({
    display:function(){
      return this.tag.is(":visible");
    },
    addClass:function(){
      this.el.addClass("active");
    },
    removeClass:function(clas){
      this.el.removeClass(clas);
    },
    click:function(){////自身标签的点击/////
      var ishow=window.hideAll();//关闭所有底部工具任务///
      if(ishow){
        return false;
      }
      if(!this.el.hasClass("active")){
        this.zIndex=TaskTag.zIndex++;
        this.tag.show().css("z-index",this.zIndex);;
        this.parent.clearClass("active");
        this.el.addClass("active");
        this.parent.dittop=false;
      }else{
        this.tag.find(".ha-hide").trigger("click");
      }
    },
    hide:function(){////tag页面最小化的点击////
      if(this["parent"]){
        this.parent.clearClass("active");
        var showElement=this.parent.getMaxIndex();
        if(showElement){
          showElement.addClass("active");
          this.parent.dittop=false;
        }
      }
    },
    close:function(){////tag页面最关闭的点击////
      var _thisp=this.parent;
      _thisp.removeChild(this);
      var showElement=_thisp.getMaxIndex();
      if(showElement){
        showElement.addClass("active");
        _thisp.dittop=false;
      }
    }
}).static({
  zIndex:0
})

/****************************************被移动元素类*****************************************************************/
Yeffect.class("ElMove").constructor(function(el){
  this.el=$("<div></div>");
  this.el.append(el);
}).prototype({
  addClass:function(clas){
    this.el.addClass(clas);
  }
})

/****************************************butn类*****************************************************************/
Yeffect.class("MayButton").constructor(function(){
  this.el=$("<div></div>");
  this.className="";
  this.parent=null;
}).prototype({
  addClass:function(cls){
    this.el.addClass(cls);
    this.className=cls;
  },
  removeClass:function(cls){
    this.el.removeClass(cls);
  },
  click:function (fn) {
    this.el.click(fn);
  },
  setTitle:function(title){
    this.el.attr("title",title)
  },
    addChild:function (domc) {
        this.el.append(domc.el);
    }
});
/****************************************打开弹窗类*******************************************************************/
Yeffect.class('Opendata').constructor(function(src,name){
    this.el=$("<div><iframe name='"+name+"' src='"+ src+"' frameborder='0'></iframe></div>").hide();
    this.className="";
    this.parent=null;
    this.isshow = false;
}).prototype({
    addClass:function(cls){
        this.el.addClass(cls);
        this.className=cls;
    },
    parentAppend:function(parentEl){ /**自身添加到父级元素**/
        $(parentEl).append(this.el);
    },
    show:function(){
      this.el.show();
        this.isshow = true;
    },
    hide:function(){
      this.el.hide();
        this.isshow = false;
    },
    addfindEvent:function (fn) {
        var _this=this;
        /*setTimeout(function () {
            _this.el.find("iframe").contents().alert(fn);
        },200)*/
    }
});
/****************************************小圆圈类************************************************************/
Yeffect.class('Circlnum').constructor(function(){
    this.el=$("<div></div>");
    this.el.hide();
    this.className="";
    this.parent=null;
    var _this=this;
    setTimeout(function () {
    if(Circlnum.number!=0){
        _this.el.show().text(Circlnum.number);
    }
    },0)
}).prototype({
    addClass:function(cls){
        this.el.addClass(cls);
        this.className=cls;
    },
    setText:function (str) {
        if(str<1){
            this.el.hide();
        }else{
            this.el.show();
        }
        this.el.text(str);
        Circlnum.number=str;
    },
    add:function () {
        this.setText(Circlnum.number+1);
    },
    pop:function () {
      this.setText(Circlnum.number-1);
    }
}).static({
    number:0
});