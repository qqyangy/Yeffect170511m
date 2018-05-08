function require(BasicsUrl,debug) {
  var saveDefineCall=false;/*****临时保存载入函数的方法******/
  var saveKeyAndFn={};/*******保存所有在入的方法与url的key对应********/
  var firstFn=false;/****自动调用的入口函数****/
  var loadlength=0;/****需要引入js的数量****/
  BasicsUrl=BasicsUrl||'';/****基础路劲****/
  var treeInfo={};/**保存数结构***/
  var treeParent=false;/***临时保存当前结构树对象****/
  debug=debug||false;/****是否开启debug模式****/
  /***设置载入路径****/
  function setURlstr(s) {
    var bascop=BasicsUrl;
    var basFir='';
    if(bascop.length>0){
      if(bascop.substr(0,1)=='/'){
        basFir='/';
        bascop=bascop.substr(1,bascop.length-1);
      }
    };
    if(bascop.length>1){
      if(bascop.substr(0,2)=='./'){
        bascop=bascop.substr(2,bascop.length-2);
      }
    };
    var b=bascop;
    var s1=s.substr(0,1);
    var s2=s.substr(0,2);
    var s3=s.split('../');
    if(s1=='/'){
      b='';
    }else if(s2=='./'){
      s=s.split('./')[1];
    }else if(s3.length>1){
      var sg=s.split('../');
      var sgl=sg.length-1;
      var bg=bascop.split('../');
      var bgl=bg.length-1;
      var blast=bg[bg.length-1];
      var blastA=blast.split('/');
      var blastAl=blastA.length-1;
      if(blastAl>sgl){
        var bsx=basFir;
        for(var j=0;j<bgl;j++){
          bsx+='../';
        };
        b=bsx+blastA.splice(0,blastAl-sgl).join('/')+'/';
        s=sg[sg.length-1];
      }else{
        var cl=sgl-blastAl+bgl;
        var bs='';
        for(var i=0;i<cl;i++){
          bs+='../';
        };
        b=basFir+bs;
        if(basFir=='/' && cl>0){
          b='/';
        }
        s=sg[sg.length-1];
      }
    }
    return b+s;
  }

  /*****转化结构树函数*****/
  function treeTostring() {
    var logtree='';
    function eh(tree,tab) {
      var log='\n';
      for(var k in tree){
        log+=tab;
        log+=k;
        log+=eh(tree[k],tab+'　　');
      };
      return log;
    }
    logtree=eh(treeInfo,'');
    return logtree;
  };
  /****根据路径载入文件*****/
  function geturlrequire(s,f,p) {
    if(!p){
      p=f;
      f='';
    };
    var url=s;
    if(f==''){
      if(s.length>3){
        if(s.substr(s.length-3,s.length)!='.js'){
          url=s+'.js';
        };
      }else{
        url=s+'.js';
      };
    }else{
      url=s+'.'+f;
    };
    var key=url;/***保存对象树key名***/
    url=setURlstr(url);
    if(saveKeyAndFn[url]){
      loadlength--;
      if(loadlength==0){
        actionfirst();/***加载完成进入程序***/
      };
      return;
    };
    var script=document.createElement("script");
    saveDefineCall=false;
    saveKeyAndFn[url]='待加载文件...';
    script.onload=function () {
      if(saveDefineCall){
        saveKeyAndFn[url]=saveDefineCall;
        if(treeParent){
          p[key]=treeParent;
        }else{
          p[key]=false;
        }
        saveDefineCall=false;
      };
      document.head.removeChild(script);
      loadlength--;
      if(loadlength==0){
        actionfirst();/***加载完成进入程序***/
      };
    };
    script.onerror=function () {
      saveKeyAndFn[url]=false;
      p[key]={};
      document.head.removeChild(script);
      loadlength--;
      if(loadlength==0){
        actionfirst();/***加载完成进入程序***/
      }
      if(debug){
        console.log('%c有JS加载失败请注意报错信息,当前结构树为 ', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:30px;');
        var treeStr = treeTostring();
        console.log('%c' + treeStr, 'background:#ff0;font-size:20px; color:#000;');
        throw key+'文件载入出错请仔细检查!';
      };
    };
    document.head.appendChild(script);
    script.src=url;
  }
  /****匹配需要载入的文件路径*******/
  function requireurl(fns,parent) {
    var reg=/\brequire\(.*\)/g;
    var result='';
    while ((result = reg.exec(fns)) != null)  {
      loadlength++;
      eval('geturl'+result[0].split(')')[0]+',parent)');/***获取单个url****/
    };
  };
  /*****全部文件载入成功进入主程序******/
  function actionfirst() {
    if(debug) {
      var treeStr = treeTostring();
      console.log('%cRequire结构树为：', 'font-size:20px;font-weight: bold; color:#03f;');
      console.log('%c' + treeStr, 'background:#ff0;font-size:20px; color:#000;');
    }
    firstFn();/***没有需要加载项目直接进入程序***/
  }
  /*****加载的模块为组件时处理组件数据*****/
  function setTemplate(fns) {
    /****获取代码****/
    var codeding=fns.split('/*-ComBasStr-*})')[1];
    codeding=codeding.split('({*-ComBasEnd-*/')[0];
    /****代码html化*****/
    var codeContent=document.createElement("div");
    codeContent.innerHTML=codeding;
    var templateE=codeContent.getElementsByTagName('template')[0];
    var template=document.createElement('div');
    template.innerHTML=templateE.innerHTML;
    /***获取html模板****/
    var _documentc=null;
    var temp='';
    var scope='scope_'+(1000000000+Math.floor(Math.random()*99999999999));
    if(template.children.length>0){
      _documentc=template.children[0];
      _documentc.setAttribute('scope','');
      temp=_documentc.outerHTML;
      _documentc.setAttribute(scope,'');
      _documentc.removeAttribute('scope');
    };
    /*******获取css模板******/
    var css='';
    var stylecode__=codeContent.getElementsByTagName('style');
    if(stylecode__.length>0){
      stylecode__=stylecode__[0];
      css=stylecode__.innerHTML;
      stylecode__.innerHTML=css.replace(/\[scope\]/g,'['+scope+']');
    }else{
      stylecode__=null;
    }
    /*****获取js模板*****/
    var script=codeContent.getElementsByTagName('script');
    var props=[];
    if(script.length>0){
      script=script[0];
      var Aprops=script.getAttribute('props');
      if(Aprops){
        Aprops=Aprops.substr(1,Aprops.length-2);
        props=Aprops.split(",");
      }
      var script_=script.innerHTML;
      /*****处理组件jq选择器******/
      var jqreg1=/this\.\$\(\"/g;/***匹配jq选择器双引号****/
      var jqreg2=/this\.\$\(\'/g;/***匹配jq选择器单英豪****/
      script_=script_.replace(jqreg1,'$(_document).find("');
      script_=script_.replace(jqreg2,"$(_document).find('");
      script=script_;
    }else{
      script='';
    }
    /*********自动实例化子组件方法********/
    function components(obj,data) {
      for(var k in obj){
        var o=obj[k];
        var tagk=_documentc.getElementsByTagName(k);
        for(var i =tagk.length-1;i>-1;i--){
          var _tagk=tagk[i];
          if(o.temp){
              var pObj={};
              var _tagProps=_tagk.attributes;
              var attrskeys=[];
              for(var v=0;v<_tagProps.length;v++){
                var attr=_tagProps[v];
                var attnm=attr.name;
                var attval=attr.value;
                if(attnm.substr(0,1)==':'){
                  attrskeys.push(attnm);
                  attnm=attnm.substr(1,attnm.length-1);
                  var attrnum=parseFloat(attnm);
                  if(attrnum+''==attnm) {
                    attval=attrnum;
                  }else {
                    attval=data[attnm]
                  }
                };
                pObj[attnm]=attval;
              };
              for(var j=0;j<o.props.length;j++){
                var _key=o.props[j];
                var s_key=_key;
                var s_val='';
                if(attrskeys.indexOf(':'+s_key)==-1){
                  if(!pObj[s_key]) {
                    s_val=_tagk.getAttribute(_key);
                    pObj[s_key]=s_val;
                  }
                }
              };
              var documetObJ=o.init(pObj);
              _tagk.after(documetObJ._document);
              _tagk.parentNode.removeChild(_tagk);
            };
          }
        }
    };
    /**********组件引用参数处理************/
    var pReg=/\bcomponents\b\(\{.*\}/;
    var pRegs=pReg.exec(script);
    if(pRegs){
      var pexec=pRegs[0];
      var Eprop='';
      /***提取需要实例化的组件*****/
      pRegs=pRegs[0];
      pRegs=pRegs.split('{')[1];
      pRegs=pRegs.split('}')[0];
      var cvalue=/\:\w+\b/g;
      pRegs=pRegs.replace(cvalue,'');
      pRegs=pRegs.split(',');
      /***从组件查找参数****/
      for(var t=0;t<pRegs.length;t++){
        var tag_=_documentc.getElementsByTagName(pRegs[t]);
        for(var d=0;d<tag_.length;d++){
          var tag_o=tag_[d];
          var attrbs=tag_o.attributes;
          for(a=0;a<attrbs.length;a++) {
            var _atr = attrbs[a];
            var ss=''
            if(_atr.name.substr(0,1)==':'){
                if(Eprop!=''){Eprop+=','};
                var nm=_atr.name.substr(1,_atr.name.length-1);
                Eprop+=(nm+':'+_atr.value);
             }
          }
        }
      };
      Eprop='{'+Eprop+'}';
      script=script.replace(pexec,pexec+','+Eprop);
    };
    /******js代码中注入功能********/
    var aryf=''; if(props.length>0){aryf=',';};
    var vars='';
    for(var va=0;va<props.length;va++){if(vars!=''){vars+=',';}else{vars+='var ';};
      vars+=props[va];vars+='=';vars+='dataobj["'+props[va]+'"]';if(va==props.length-1){vars+=';';};
    }
    var scriptS='function(dataobj,_setdoc,style1){var initcount=this.initcount||false;this.initcount++;dataobj=dataobj||{};'+vars+';var style1getfind=style1||stylecode__;if(initcount==0 || style1getfind.getAttribute("scope")){document.head.appendChild(style1getfind)};var _document=_documentc;if(_setdoc){_document=_setdoc};(function () {for(var k in dataobj){if(props.indexOf(k)==-1){_document.setAttribute(k,dataobj[k]);}}})();'+script+';return style1getfind.getAttribute("scope")?style1getfind:false;}';
    var script=eval('('+scriptS+')');
    requireurl(scriptS,treeParent);/****载入依赖******/
    return {temp:temp,_document:_documentc,style:stylecode__,css:css,script:script,props:props,initcount:0,init:function (propsdata) {
      propsdata=propsdata||{};
      var temp=this.temp;
      var retdocument=this._document;
      var retstyle=this.style;
      if(this.initcount==0){this.script(propsdata,this._document,this.style);}else{
        if(temp){
          var div=document.createElement('div');
          div.innerHTML=temp;
          var f_document=null;
          if(div.children.length>0){
            f_document=div.children[0];
            var scope='scope_'+(1000000000+Math.floor(Math.random()*99999999999));
            f_document.setAttribute(scope,'');
            f_document.removeAttribute('scope');
            var Nstyle=document.createElement('style');
            var ocssrep=this.css.replace(/\[scope\]/g,'['+scope+']');
            Nstyle.innerHTML=ocssrep;
            if(ocssrep!=this.css){Nstyle.setAttribute('scope','true');}
            var restyle1=this.script(propsdata,f_document,Nstyle);
            retdocument=f_document;
            retstyle=restyle1;
          };
        }
      }
      var _this=this;
      return {_document:retdocument,remove:function () {
        var parnd=retdocument.parentNode;
        if(parnd){parnd.removeChild(retdocument)};
        if(_this.initcount!=0 && retstyle){
          var sparnd=retstyle.parentNode;
          if(sparnd){sparnd.removeChild(retstyle);}
        }
        _this.initcount--;
      }};
    }};
  };
  /*****被载入模块的包装函数*****/
  function define(fn) {
    if(fn && fn.constructor!=Function){
      treeParent={};
      saveDefineCall={fn:function () {
        return fn;
      },exports:{}};
      return;
    }
    /***处理参数***/
    var fns=fn.toString();
    /****变更组件标签名******/
    if(fns.indexOf('/*-ComBasStr-*})')>-1){
      treeParent={};
      var callObj=setTemplate(fns);
      saveDefineCall={fn:function () {
        return callObj;
      },exports:{}};
      return;
    }
    /****去除注释避免require无用文件***/
    var loaders=[];
    var rNote = /(\/\/.*\brequire\b.*[\r\n])|(\/\*(.|\s)*?\*\/)/g; /**匹配单行或多行注释**/
    fns=fns.replace(rNote,"");
    if(!firstFn){
      var href=window.location.href.split('/');
    };
    treeParent={};
    requireurl(fns,treeParent);/****载入依赖******/
    /******注入exports******/
    var exports={};
    fns=fns.substr(0,fns.length-1)+';return exports;}';
    var fn1=eval('('+fns+')');
    if(!firstFn){
      treeInfo['入口文件']=treeParent;/***设置更节点****/
      firstFn=fn1;/****设置入口函数***/
      if(loadlength==0){
        actionfirst();/***没有需要加载项目直接进入程序***/
      }
    }else{
      saveDefineCall={fn:fn1,exports:exports};
    }
  };
  /*****require函数决定需要载入的文件******/
  function require(s,f) {
    var url=s;
    if(!f || f==''){
      if(s.length>3){
        if(s.substr(s.length-3,s.length)!='.js'){
          url=s+'.js';
        }
      }else{
        url=s+'.js';
      }
    }else{
      url=s+'.'+f;
    }
    url=setURlstr(url);
    var fncontent=saveKeyAndFn[url]||{fn:{},exports:{}};
    var fn=fncontent.fn;
    if(fn){
      if(fn.constructor==Function){
        var fncall=fn();
        saveKeyAndFn[url]={fn:fncall,exports:{}};
        return fncall;
      }
      return fn;
    }else{
      var errData={fn:{},exports:{}};
      saveKeyAndFn[url]={fn:{},exports:{}};
      return errData.fn;
    }
  }
  return define;
}
