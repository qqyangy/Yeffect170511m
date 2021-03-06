jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return-h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return-h/2*(--f*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return-h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return-h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return-h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return-h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return f==0?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return f==g?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return-h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return-h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return-(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*2*Math.PI/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*2*Math.PI/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*.3*1.5}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return-.5*g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*2*Math.PI/j)+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*2*Math.PI/j)*.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*f*f*(((g*=1.525)+1)*f-g)+a}return i/2*((f-=2)*f*(((g*=1.525)+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<1/2.75){return h*7.5625*f*f+a}else{if(f<2/2.75){return h*(7.5625*(f-=1.5/2.75)*f+.75)+a}else{if(f<2.5/2.75){return h*(7.5625*(f-=2.25/2.75)*f+.9375)+a}else{return h*(7.5625*(f-=2.625/2.75)*f+.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*.5+h*.5+a}});
(function($){var types=['DOMMouseScroll','mousewheel'];if($.event.fixHooks){for(var i=types.length;i;){$.event.fixHooks[types[--i]]=$.event.mouseHooks}}$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var i=types.length;i;){this.addEventListener(types[--i],handler,false)}}else{this.onmousewheel=handler}},teardown:function(){if(this.removeEventListener){for(var i=types.length;i;){this.removeEventListener(types[--i],handler,false)}}else{this.onmousewheel=null}}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel")},unmousewheel:function(fn){return this.unbind("mousewheel",fn)}});function handler(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,returnValue=true,deltaX=0,deltaY=0;event=$.event.fix(orgEvent);event.type="mousewheel";if(orgEvent.wheelDelta){delta=orgEvent.wheelDelta/120}if(orgEvent.detail){delta=-orgEvent.detail/3}deltaY=delta;if(orgEvent.axis!==undefined&&orgEvent.axis===orgEvent.HORIZONTAL_AXIS){deltaY=0;deltaX=-1*delta}if(orgEvent.wheelDeltaY!==undefined){deltaY=orgEvent.wheelDeltaY/120}if(orgEvent.wheelDeltaX!==undefined){deltaX=-1*orgEvent.wheelDeltaX/120}args.unshift(event,delta,deltaX,deltaY);return($.event.dispatch||$.event.handle).apply(this,args)}})(jQuery);
(function(){var debug=false;var root=this;var EXIF=function(obj){if(obj instanceof EXIF)return obj;if(!(this instanceof EXIF))return new EXIF(obj);this.EXIFwrapped=obj};if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){exports=module.exports=EXIF}exports.EXIF=EXIF}else{root.EXIF=EXIF}var ExifTags=EXIF.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"};var TiffTags=EXIF.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"};var GPSTags=EXIF.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"};var StringValues=EXIF.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}};function addEvent(element,event,handler){if(element.addEventListener){element.addEventListener(event,handler,false)}else if(element.attachEvent){element.attachEvent("on"+event,handler)}}function imageHasData(img){return!!img.exifdata}function base64ToArrayBuffer(base64,contentType){contentType=contentType||base64.match(/^data\:([^\;]+)\;base64,/im)[1]||"";base64=base64.replace(/^data\:([^\;]+)\;base64,/gim,"");var binary=atob(base64);var len=binary.length;var buffer=new ArrayBuffer(len);var view=new Uint8Array(buffer);for(var i=0;i<len;i++){view[i]=binary.charCodeAt(i)}return buffer}function objectURLToBlob(url,callback){var http=new XMLHttpRequest();http.open("GET",url,true);http.responseType="blob";http.onload=function(e){if(this.status==200||this.status===0){callback(this.response)}};http.send()}function getImageData(img,callback){function handleBinaryFile(binFile){var data=findEXIFinJPEG(binFile);var iptcdata=findIPTCinJPEG(binFile);img.exifdata=data||{};img.iptcdata=iptcdata||{};if(callback){callback.call(img)}}if(img.src){if(/^data\:/i.test(img.src)){var arrayBuffer=base64ToArrayBuffer(img.src);handleBinaryFile(arrayBuffer)}else if(/^blob\:/i.test(img.src)){var fileReader=new FileReader();fileReader.onload=function(e){handleBinaryFile(e.target.result)};objectURLToBlob(img.src,function(blob){fileReader.readAsArrayBuffer(blob)})}else{var http=new XMLHttpRequest();http.onload=function(){if(this.status==200||this.status===0){handleBinaryFile(http.response)}else{throw"Could not load image";}http=null};http.open("GET",img.src,true);http.responseType="arraybuffer";http.send(null)}}else if(window.FileReader&&(img instanceof window.Blob||img instanceof window.File)){var fileReader=new FileReader();fileReader.onload=function(e){if(debug)console.log("Got file of length "+e.target.result.byteLength);handleBinaryFile(e.target.result)};fileReader.readAsArrayBuffer(img)}}function findEXIFinJPEG(file){var dataView=new DataView(file);if(debug)console.log("Got file of length "+file.byteLength);if(dataView.getUint8(0)!=255||dataView.getUint8(1)!=216){if(debug)console.log("Not a valid JPEG");return false}var offset=2,length=file.byteLength,marker;while(offset<length){if(dataView.getUint8(offset)!=255){if(debug)console.log("Not a valid marker at offset "+offset+", found: "+dataView.getUint8(offset));return false}marker=dataView.getUint8(offset+1);if(debug)console.log(marker);if(marker==225){if(debug)console.log("Found 0xFFE1 marker");return readEXIFData(dataView,offset+4,dataView.getUint16(offset+2)-2)}else{offset+=2+dataView.getUint16(offset+2)}}}function findIPTCinJPEG(file){var dataView=new DataView(file);if(debug)console.log("Got file of length "+file.byteLength);if(dataView.getUint8(0)!=255||dataView.getUint8(1)!=216){if(debug)console.log("Not a valid JPEG");return false}var offset=2,length=file.byteLength;var isFieldSegmentStart=function(dataView,offset){return dataView.getUint8(offset)===56&&dataView.getUint8(offset+1)===66&&dataView.getUint8(offset+2)===73&&dataView.getUint8(offset+3)===77&&dataView.getUint8(offset+4)===4&&dataView.getUint8(offset+5)===4};while(offset<length){if(isFieldSegmentStart(dataView,offset)){var nameHeaderLength=dataView.getUint8(offset+7);if(nameHeaderLength%2!==0)nameHeaderLength+=1;if(nameHeaderLength===0){nameHeaderLength=4}var startOffset=offset+8+nameHeaderLength;var sectionLength=dataView.getUint16(offset+6+nameHeaderLength);return readIPTCData(file,startOffset,sectionLength);break}offset++}}var IptcFieldMap={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};function readIPTCData(file,startOffset,sectionLength){var dataView=new DataView(file);var data={};var fieldValue,fieldName,dataSize,segmentType,segmentSize;var segmentStartPos=startOffset;while(segmentStartPos<startOffset+sectionLength){if(dataView.getUint8(segmentStartPos)===28&&dataView.getUint8(segmentStartPos+1)===2){segmentType=dataView.getUint8(segmentStartPos+2);if(segmentType in IptcFieldMap){dataSize=dataView.getInt16(segmentStartPos+3);segmentSize=dataSize+5;fieldName=IptcFieldMap[segmentType];fieldValue=getStringFromDB(dataView,segmentStartPos+5,dataSize);if(data.hasOwnProperty(fieldName)){if(data[fieldName]instanceof Array){data[fieldName].push(fieldValue)}else{data[fieldName]=[data[fieldName],fieldValue]}}else{data[fieldName]=fieldValue}}}segmentStartPos++}return data}function readTags(file,tiffStart,dirStart,strings,bigEnd){var entries=file.getUint16(dirStart,!bigEnd),tags={},entryOffset,tag,i;for(i=0;i<entries;i++){entryOffset=dirStart+i*12+2;tag=strings[file.getUint16(entryOffset,!bigEnd)];if(!tag&&debug)console.log("Unknown tag: "+file.getUint16(entryOffset,!bigEnd));tags[tag]=readTagValue(file,entryOffset,tiffStart,dirStart,bigEnd)}return tags}function readTagValue(file,entryOffset,tiffStart,dirStart,bigEnd){var type=file.getUint16(entryOffset+2,!bigEnd),numValues=file.getUint32(entryOffset+4,!bigEnd),valueOffset=file.getUint32(entryOffset+8,!bigEnd)+tiffStart,offset,vals,val,n,numerator,denominator;switch(type){case 1:case 7:if(numValues==1){return file.getUint8(entryOffset+8,!bigEnd)}else{offset=numValues>4?valueOffset:entryOffset+8;vals=[];for(n=0;n<numValues;n++){vals[n]=file.getUint8(offset+n)}return vals}case 2:offset=numValues>4?valueOffset:entryOffset+8;return getStringFromDB(file,offset,numValues-1);case 3:if(numValues==1){return file.getUint16(entryOffset+8,!bigEnd)}else{offset=numValues>2?valueOffset:entryOffset+8;vals=[];for(n=0;n<numValues;n++){vals[n]=file.getUint16(offset+2*n,!bigEnd)}return vals}case 4:if(numValues==1){return file.getUint32(entryOffset+8,!bigEnd)}else{vals=[];for(n=0;n<numValues;n++){vals[n]=file.getUint32(valueOffset+4*n,!bigEnd)}return vals}case 5:if(numValues==1){numerator=file.getUint32(valueOffset,!bigEnd);denominator=file.getUint32(valueOffset+4,!bigEnd);val=new Number(numerator/denominator);val.numerator=numerator;val.denominator=denominator;return val}else{vals=[];for(n=0;n<numValues;n++){numerator=file.getUint32(valueOffset+8*n,!bigEnd);denominator=file.getUint32(valueOffset+4+8*n,!bigEnd);vals[n]=new Number(numerator/denominator);vals[n].numerator=numerator;vals[n].denominator=denominator}return vals}case 9:if(numValues==1){return file.getInt32(entryOffset+8,!bigEnd)}else{vals=[];for(n=0;n<numValues;n++){vals[n]=file.getInt32(valueOffset+4*n,!bigEnd)}return vals}case 10:if(numValues==1){return file.getInt32(valueOffset,!bigEnd)/file.getInt32(valueOffset+4,!bigEnd)}else{vals=[];for(n=0;n<numValues;n++){vals[n]=file.getInt32(valueOffset+8*n,!bigEnd)/file.getInt32(valueOffset+4+8*n,!bigEnd)}return vals}}}function getStringFromDB(buffer,start,length){var outstr="";for(n=start;n<start+length;n++){outstr+=String.fromCharCode(buffer.getUint8(n))}return outstr}function readEXIFData(file,start){if(getStringFromDB(file,start,4)!="Exif"){if(debug)console.log("Not valid EXIF data! "+getStringFromDB(file,start,4));return false}var bigEnd,tags,tag,exifData,gpsData,tiffOffset=start+6;if(file.getUint16(tiffOffset)==18761){bigEnd=false}else if(file.getUint16(tiffOffset)==19789){bigEnd=true}else{if(debug)console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");return false}if(file.getUint16(tiffOffset+2,!bigEnd)!=42){if(debug)console.log("Not valid TIFF data! (no 0x002A)");return false}var firstIFDOffset=file.getUint32(tiffOffset+4,!bigEnd);if(firstIFDOffset<8){if(debug)console.log("Not valid TIFF data! (First offset less than 8)",file.getUint32(tiffOffset+4,!bigEnd));return false}tags=readTags(file,tiffOffset,tiffOffset+firstIFDOffset,TiffTags,bigEnd);if(tags.ExifIFDPointer){exifData=readTags(file,tiffOffset,tiffOffset+tags.ExifIFDPointer,ExifTags,bigEnd);for(tag in exifData){switch(tag){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":exifData[tag]=StringValues[tag][exifData[tag]];break;case"ExifVersion":case"FlashpixVersion":exifData[tag]=String.fromCharCode(exifData[tag][0],exifData[tag][1],exifData[tag][2],exifData[tag][3]);break;case"ComponentsConfiguration":exifData[tag]=StringValues.Components[exifData[tag][0]]+StringValues.Components[exifData[tag][1]]+StringValues.Components[exifData[tag][2]]+StringValues.Components[exifData[tag][3]];break}tags[tag]=exifData[tag]}}if(tags.GPSInfoIFDPointer){gpsData=readTags(file,tiffOffset,tiffOffset+tags.GPSInfoIFDPointer,GPSTags,bigEnd);for(tag in gpsData){switch(tag){case"GPSVersionID":gpsData[tag]=gpsData[tag][0]+"."+gpsData[tag][1]+"."+gpsData[tag][2]+"."+gpsData[tag][3];break}tags[tag]=gpsData[tag]}}return tags}EXIF.getData=function(img,callback){if((img instanceof Image||img instanceof HTMLImageElement)&&!img.complete)return false;if(!imageHasData(img)){getImageData(img,callback)}else{if(callback){callback.call(img)}}return true};EXIF.getTag=function(img,tag){if(!imageHasData(img))return;return img.exifdata[tag]};EXIF.getAllTags=function(img){if(!imageHasData(img))return{};var a,data=img.exifdata,tags={};for(a in data){if(data.hasOwnProperty(a)){tags[a]=data[a]}}return tags};EXIF.pretty=function(img){if(!imageHasData(img))return"";var a,data=img.exifdata,strPretty="";for(a in data){if(data.hasOwnProperty(a)){if(typeof data[a]=="object"){if(data[a]instanceof Number){strPretty+=a+" : "+data[a]+" ["+data[a].numerator+"/"+data[a].denominator+"]\r\n"}else{strPretty+=a+" : ["+data[a].length+" values]\r\n"}}else{strPretty+=a+" : "+data[a]+"\r\n"}}}return strPretty};EXIF.readFromBinaryFile=function(file){return findEXIFinJPEG(file)};if(typeof define==="function"&&define.amd){define("exif-js",[],function(){return EXIF})}}).call(this);
var YeffectAttr={isendscroll:false,isaddtousmove:false,resizeHt_func:[],YeffectT15time:false,YeffectT15Arry:[],YeffectT30time:false,YeffectT30Arry:[],YeffectT50time:false,YeffectT50Arry:[],YeffectT100time:false,YeffectT100Arry:[],YeffectT200time:false,YeffectT200Arry:[],$upary:[],dragupEvent:function (){for(var i=0;i<this.$upary.length;i++){this.$upary[i]();}}};
var Yeffect = {
    event:{
    start:function (dom,fn){
        dom=$(dom).eq(0);
        if(!this.move.touchs){
            this.move.touchs={};
        }
        if(!this.start.ISpc){
            this.start.ISpc=Yeffect.isPC();
        }
        var thiso=this;
        if(this.start.ISpc){
            thiso.move.touchs=null;
            dom.mousedown(function(e){
                thiso.move.touchs=e;
                fn.call(this,e);
            });
        }else{
            dom[0].addEventListener("touchstart",function(e){
                var touchs=e.touches;
                var thiskey=Object.keys(touchs);
                var thistouch=touchs[thiskey[thiskey.length-2]];
                for(var o in touchs){
                    if(!thiso.move.touchs[thistouch.identifier]){
                        var jonstar=JSON.stringify(thistouch);
                        var newdtas={
                            dataS:JSON.parse(jonstar),
                            dataM:JSON.parse(jonstar)
                        };
                        thiso.move.touchs[thistouch.identifier]=newdtas;
                    }
                }
                thistouch.preventDefault=function() {
                    e.preventDefault();
                }
                fn.bind(this)(thistouch,touchs);
            });
        }
    },
    move:function(dom,fn){
        if(!this.move.touchs){
            this.start(dom,function(){});
        }
        dom=$(dom).eq(0);
        var thiso=this;
        if(this.start.ISpc){
            dom.mousemove(function(e){
                if(thiso.move.touchs){
                    e.mousedown=true;
                    e.deltaX=e.pageX-thiso.move.touchs.pageX;
                    e.deltaY=e.pageY-thiso.move.touchs.pageY;
                }else{
                    e.deltaX=0;
                    e.deltaY=0;
                    e.mousedown=false;
                }
                fn.call(this,e);
            });
        }else{
            dom[0].addEventListener("touchmove",function(e){
                var touchs=e.touches;
                for(var o in touchs){
                    var idter=touchs[o].identifier;
                    if(touchs[o].pageX!=thiso.move.touchs[idter].dataM.pageX || touchs[o].pageY!=thiso.move.touchs[idter].dataM.pageY){
                        thiso.move.touchs[idter].dataM.pageX=touchs[o].pageX;
                        thiso.move.touchs[idter].dataM.pageY=touchs[o].pageY;
                        var thistouch=touchs[o];
                        thistouch.preventDefault=function() {
                            e.preventDefault();
                        }
                        thistouch.deltaX=thiso.move.touchs[idter].dataM.pageX-thiso.move.touchs[idter].dataS.pageX;
                        thistouch.deltaY=thiso.move.touchs[idter].dataM.pageY-thiso.move.touchs[idter].dataS.pageY;
                        thiso.move.touchs[idter].deltaX=thistouch.deltaX;
                        thiso.move.touchs[idter].deltaY=thistouch.deltaY;
                        fn.bind(this)(thistouch,touchs);
                    }
                }
            });
        }
    },
    end:function (dom,fn){
        if(!this.move.touchs){
            this.start(dom,function(){});
        }
        dom=$(dom).eq(0);
        var thiso=this;
        if(this.start.ISpc){
            $(document).mouseup(function(e){
                if(thiso.move.touchs){
                    e.deltaX=e.pageX-thiso.move.touchs.pageX;
                    e.deltaY=e.pageY-thiso.move.touchs.pageY;
                }else{
                    e.deltaX=0;
                    e.deltaY=0;
                }
                e.mousedown=false;
                thiso.move.touchs=null;
                fn.call(dom[0],e);
            });
        }else{
            dom[0].addEventListener("touchend",function(e){
                var touchs=e.touches;
                var curkey=[];
                for(var o in touchs){
                    if(touchs[o].identifier!=undefined){
                        curkey.push(touchs[o].identifier+"");
                    }
                }
                for(var t in thiso.move.touchs){
                    if(curkey.indexOf(t)<0){
                        var touchtT=thiso.move.touchs[t];
                        if(!touchtT.deltaY && touchtT.deltaY!=0){
                            touchtT.deltaX=0;
                            touchtT.deltaY=0;
                        }
                        fn.bind(this)(touchtT)
                        delete thiso.move.touchs[t];
                    }
                }
            });
        }
    }
},
    isPC:function (){var userAgentInfo=navigator.userAgent;var Agents=new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod");var flag=true;for(var v=0;v<Agents.length;v++){if(userAgentInfo.indexOf(Agents[v])>-1){flag=false;break}}return flag},
    marqueeEffect: function (ul, li, time, Unit, hoverStop) {
        var ulobj = $(ul);
        var liobj = $(li);
        time = time || 30;
        Unit = Unit || 1;
        hoverStop = hoverStop || true;
        ulobj.width(99999);
        var Ulhtml = ulobj.html();
        var length = liobj.length;
        ulobj.html(Ulhtml + Ulhtml);
        var curXzhi = 0;
        liobj = $(li);
        if (liobj.length < 1) {
            return
        }
        var setInterVaaa = setInterval(setInterVaaa_hs, time);

        function setInterVaaa_hs() {
            var cdW = liobj.eq(length).position().left;
            curXzhi -= Unit;
            if (curXzhi < -cdW) {
                curXzhi = -(-cdW - curXzhi)
            }
            ulobj.css("left", curXzhi)
        }
        if (!hoverStop) {
            return
        }
        ulobj.hover(function () {
            clearInterval(setInterVaaa)
        }, function () {
            setInterVaaa = setInterval(setInterVaaa_hs, time)
        })
    }, clickTabs: function (obj1, obj2, css) {
        css = css || "current";
        var objAY = [];
        var aabbs = 0;
        var cursinD = 0;
        var obj1obj = $(obj1);
        var obj2obj = $(obj2);
        obj1obj.each(function (index, element) {
            if ($(this).parent().attr("abs") != "bshhd") {
                $(this).parent().attr("abs", "bshhd");
                $(this).parent().attr("Aid", aabbs);
                aabbs++;
                objAY.push([]);
                cursinD = 0
            }
            $(this).attr("curId", cursinD);
            objAY[objAY.length - 1].push($(this));
            cursinD++
        });
        var objAYA = [];
        var aabbsA = 0;
        obj2obj.each(function (index, element) {
            if ($(this).parent().attr("absA") != "bshhd") {
                $(this).parent().attr("absA", "bshhd");
                $(this).parent().attr("AidA", aabbs);
                aabbsA++;
                objAYA.push([])
            }
            objAYA[objAYA.length - 1].push($(this))
        });
        obj1obj.removeClass(css);
        obj2obj.hide();
        for (var i = 0; i < objAY.length; i++) {
            objAY[i][0].addClass(css);
            objAYA[i][0].show()
        }
        obj1obj.click(function () {
            var ints = parseInt($(this).parent().attr("Aid"));
            var zhis = parseInt($(this).attr("curId"));
            for (var j = 0; j < objAY[ints].length; j++) {
                $(objAY[ints][j]).removeClass(css);
                $(objAYA[ints][j]).hide()
            }
            objAY[ints][zhis].addClass(css);
            objAYA[ints][zhis].show()
        })
    }, hoverTabs: function (obj1, obj2, css) {
        css = css || "current";
        var objAY = [];
        var aabbs = 0;
        var cursinD = 0;
        var obj1obj = $(obj1);
        var obj2obj = $(obj2);
        obj1obj.each(function (index, element) {
            if ($(this).parent().attr("abs") != "bshhd") {
                $(this).parent().attr("abs", "bshhd");
                $(this).parent().attr("Aid", aabbs);
                aabbs++;
                objAY.push([]);
                cursinD = 0
            }
            $(this).attr("curId", cursinD);
            objAY[objAY.length - 1].push($(this));
            cursinD++
        });
        var objAYA = [];
        var aabbsA = 0;
        obj2obj.each(function (index, element) {
            if ($(this).parent().attr("absA") != "bshhd") {
                $(this).parent().attr("absA", "bshhd");
                $(this).parent().attr("AidA", aabbs);
                aabbsA++;
                objAYA.push([])
            }
            objAYA[objAYA.length - 1].push($(this))
        });
        obj1obj.removeClass(css);
        obj2obj.hide();
        for (var i = 0; i < objAY.length; i++) {
            objAY[i][0].addClass(css);
            objAYA[i][0].show()
        }
        obj1obj.hover(function () {
            var ints = parseInt($(this).parent().attr("Aid"));
            var zhis = parseInt($(this).attr("curId"));
            for (var j = 0; j < objAY[ints].length; j++) {
                $(objAY[ints][j]).removeClass(css);
                $(objAYA[ints][j]).hide()
            }
            objAY[ints][zhis].addClass(css);
            objAYA[ints][zhis].show()
        }, function () {})
    }, vProductPictures: function (ul, li, showLeng, px, div, css, ArrowUp, ArrowDonw, easingstrA) {
        css = css || "current";
        ArrowUp = ArrowUp || "";
        ArrowDonw = ArrowDonw || "";
        var easingstr = easingstrA || "linear";
        var ulobj = $(ul);
        var liobj = $(li);
        var ArrowUpobj = $(ArrowUp);
        var ArrowDonwobj = $(ArrowDonw);
        var divobj = $(div);
        ulobj.css({
            position: "relative",
            top: 0
        });
        var het = liobj.height() + px;
        var length = liobj.length - showLeng;
        var curInt = 0;
        liobj.removeClass(css).eq(0).addClass(css);
        ArrowUpobj.click(function () {
            if (curInt > 0) {
                curInt--;
                ulobj.animate({
                    top: -het * curInt
                }, 300, easingstr)
            }
        });
        ArrowDonwobj.click(function () {
            if (curInt < length) {
                curInt++;
                ulobj.animate({
                    top: -het * curInt
                }, 300, easingstr)
            }
        });
        liobj.click(function () {
            liobj.removeClass(css);
            $(this).addClass(css);
            divobj.find("img").attr("src", $(this).find("img").attr("src"))
        })
    }, hProductPictures: function (ul, li, showLeng, px, div, css, ArrowLeft, ArrowRight, easingstrA) {
        css = css || "current";
        ArrowLeft = ArrowLeft || "";
        ArrowRight = ArrowRight || "";
        var easingstr = easingstrA || "linear";
        var ulobj = $(ul);
        var liobj = $(li);
        var ArrowLeftobj = $(ArrowLeft);
        var ArrowRightobj = $(ArrowRight);
        var divobj = $(div);
        var het = liobj.width() + px;
        var lens = liobj.length;
        var length = lens - showLeng;
        ulobj.css({
            position: "relative",
            top: 0
        }).width(lens * het);
        var curInt = 0;
        liobj.removeClass(css).eq(0).addClass(css);
        ArrowLeftobj.click(function () {
            if (curInt > 0) {
                curInt--;
                ulobj.animate({
                    left: -het * curInt
                }, 300, easingstr)
            }
        });
        ArrowRightobj.click(function () {
            if (curInt < length) {
                curInt++;
                ulobj.animate({
                    left: -het * curInt
                }, 300, easingstr)
            }
        });
        liobj.click(function () {
            liobj.removeClass(css);
            $(this).addClass(css);
            divobj.find("img").attr("src", $(this).find("img").attr("src"))
        })
    }, asyncloadingList: function (container, Item, defaultNum, loadNum, div, timers) {
        defaultNum = defaultNum || 20;
        loadNum = loadNum || 20;
        div = div || "";
        timers = timers || 1e3;
        var Itemobj = $(Item);
        var containerobj = $(container);
        var divobj = $(div);
        var htmlArry = [];
        var windowobj = $(window);
        Itemobj.each(function (index, element) {
            htmlArry.push($(this)[0].outerHTML);
            $(this).find("img").attr("src", "a")
        });
        containerobj.html("");
        for (var i = 0; i < defaultNum; i++) {
            containerobj.append(htmlArry[i])
        }
        htmlArry.splice(0, defaultNum);
        var loadBol = true;
        var setTimeouts;
        clearInterval(setTimeouts);
        windowobj.scroll(function () {
            if (loadBol) {
                var divtop = containerobj.offset().top;
                var heightz = containerobj.height();
                var windoht = windowobj.height();
                var windowSCtp = windowobj.scrollTop();
                if (divtop + heightz <= windoht + windowSCtp) {
                    if (htmlArry.length > 0) {
                        divobj.show();
                        loadBol = false;
                        clearInterval(setTimeouts);
                        setTimeouts = setInterval(setIntersdd, timers)
                    }
                }
            }
        });

        function setIntersdd() {
            divobj.hide();
            for (var f = 0; f < loadNum && f < htmlArry.length; f++) {
                containerobj.append(htmlArry[f])
            }
            if (loadNum > htmlArry.length) {
                htmlArry.splice(0, htmlArry.length)
            } else {
                htmlArry.splice(0, loadNum)
            }
            loadBol = true;
            clearInterval(setTimeouts)
        }
    }, alertShow: function (Text, title, background, isConfirm, Backfun, btnText, cancel) {
        title = title || "系统提示";
        background = background || "#1abc9c";
        isConfirm = isConfirm || false;
        Backfun = Backfun || function () {};
        btnText = btnText || "确定";
        cancel = cancel || "取消";
        var AlertShowMaskObj = $("<div>");
        var ConfirmHtml = "";
        var textagen = "right";
        if (isConfirm) {
            ConfirmHtml = "<font>" + cancel + "</font>";
            textagen = "right"
        }
        var AlertShowobj = $("<div class='AlertShow'><div class='AlertShowh'>" + (title == "" ? "系统提示" : title) + "</div><div class='AlertShowhp'>" + Text + "</div><div class='AlertShowhbtn'><span>" + btnText + "</span>" + ConfirmHtml + "</div></div>");
        var baodydom = $("body");
        baodydom.append(AlertShowMaskObj);
        baodydom.append(AlertShowobj);
        var AlertShowhObj = AlertShowobj.find(".AlertShowh");
        var AlertShowhpObj = AlertShowobj.find(".AlertShowhp");
        var AlertShowhbtnObj = AlertShowobj.find(".AlertShowhbtn");
        var AlertShowhbtnObjSpan = AlertShowhbtnObj.find("span");
        var AlertShowhbtnObjFont = AlertShowhbtnObj.find("font");
        AlertShowobj.css({
            width: 350,
            position: "fixed",
            left: "50%",
            marginLeft: -175,
            background: "#fff",
            borderRadius: 7,
            overflow: "hidden",
            zIndex: 1500,
            top: ($(window).height() - AlertShowobj.height()) / 2
        });
        AlertShowhObj.css({
            height: 30,
            lineHeight: "30px",
            background: background,
            color: "#fff",
            fontWeight: "bold",
            fontSize: 14,
            paddingLeft: 15
        });
        AlertShowhpObj.css({
            padding: 20,
            fontSize: 13,
            textAlign: "center",
            borderBottom: "1px solid #ccc"
        });
        AlertShowhbtnObj.css({
            height: 35,
            background: "#fbfbfb",
            textAlign: textagen
        });
        AlertShowhbtnObjSpan.css({
            fontSize: 13,
            textAlign: "center",
            height: 22,
            lineHeight: "22px",
            width: 50,
            display: "inline-block",
            background: "#ddd",
            borderRadius: 3,
            marginTop: 7,
            marginRight: 10,
            marginLeft: 10,
            cursor: "pointer"
        });
        AlertShowhbtnObjFont.css({
            fontSize: 13,
            textAlign: "center",
            height: 22,
            lineHeight: "22px",
            width: 50,
            display: "inline-block",
            background: "#ddd",
            borderRadius: 3,
            marginTop: 7,
            marginRight: 10,
            cursor: "pointer"
        });
        AlertShowMaskObj.css({
            position: "fixed",
            width: "100%",
            zIndex: 1e3,
            background: "#000",
            opacity: .5,
            height: "100%",
            left: 0,
            top: 0
        });
        AlertShowhbtnObjSpan.click(function () {
            AlertShowobj.remove();
            AlertShowMaskObj.remove();
            Backfun()
        });
        AlertShowhbtnObjFont.click(function () {
            AlertShowobj.remove();
            AlertShowMaskObj.remove()
        })
    }, hoverTab: function (obj1, obj2, css) {
        var obj1obj = $(obj1);
        var obj2obj = $(obj2);
        obj1obj.eq(0).addClass(css);
        obj2obj.hide();
        obj2obj.eq(0).show();
        obj1obj.hover(function () {
            $(this).parent().find("." + css).removeClass(css);
            $(this).addClass(css);
            obj2obj.hide();
            obj2obj.eq(obj1obj.index(this)).show()
        }, function () {})
    }, hoverTab2: function (obj1, obj2, obj3, css) {
        var obj1Obj = $(obj1);
        var obj2Obj = $(obj2);
        var obj3Obj = $(obj3);
        css = css || "current";
        obj1Obj.eq(0).addClass(css);
        obj2Obj.hide();
        obj2Obj.eq(0).show();
        obj3Obj.hide();
        obj3Obj.eq(0).show();
        obj1Obj.hover(function () {
            $(this).parent().find("." + css).removeClass(css);
            $(this).addClass(css);
            obj2Obj.hide();
            obj2Obj.eq(obj1Obj.index(this)).show();
            obj3Obj.hide();
            obj3Obj.eq(obj1Obj.index(this)).show()
        }, function () {})
    }, clickTab: function (obj1, obj2, css) {
        var obj1Obj = $(obj1);
        var obj2Obj = $(obj2);
        obj1Obj.eq(0).addClass(css);
        obj2Obj.hide();
        obj2Obj.eq(0).show();
        obj1Obj.click(function () {
            $(this).parent().find("." + css).removeClass(css);
            $(this).addClass(css);
            obj2Obj.hide();
            obj2Obj.eq(obj1Obj.index(this)).show()
        })
    }, clickTab2: function (obj1, obj2, obj3, css) {
        var obj1Obj = $(obj1);
        var obj2Obj = $(obj2);
        var obj3Obj = $(obj3);
        obj1Obj.eq(0).addClass(css);
        obj2Obj.hide();
        obj2Obj.eq(0).show();
        obj3Obj.hide();
        obj3Obj.eq(0).show();
        obj1Obj.click(function () {
            $(this).parent().find("." + css).removeClass(css);
            $(this).addClass(css);
            obj2Obj.hide();
            obj2Obj.eq(obj1Obj.index(this)).show();
            obj3Obj.hide();
            obj3Obj.eq(obj1Obj.index(this)).show()
        })
    }, foldMenu: function (obj1, css, noMult, parentstr) {
        noMult = noMult || false;
        parentstr = parentstr || false;
        $(obj1).click(function () {
            var thispe;
            if (parentstr) {
                thispe = $(this).parents(parentstr)
            } else {
                thispe = $(this).parent()
            } if (noMult) {
                var isclass = thispe.hasClass(css);
                $("." + css).removeClass(css);
                if (!isclass) {
                    thispe.addClass(css)
                }
            } else {
                thispe.toggleClass(css)
            }
        })
    }, goTop: function (obj, boole, easingstrA, topht) {
        var easingstr = easingstrA || "linear";
        var tophtA = topht || 0;
        var objObj = $(obj);
        boole = boole || false;
        if (boole) {
            objObj.hide()
        }
        var setInteraas = setInterval(function () {
            if (!boole) return;
            if ($(window).scrollTop() > 300) {
                objObj.fadeIn(200)
            } else if (int == false) {
                objObj.fadeOut(200)
            }
        }, 50);
        objObj.click(function () {
            $("body,html").animate({
                scrollTop: tophtA
            }, 300, easingstr)
        })
    }, controlSlide: function (obj1, obj2, btnL, btnR, Num, Yuz, time, easingstr) {
        easingstr = easingstr || "linear";
        time = time || 300;
        Yuz = Yuz || 0;
        var obj2Obj = $(obj2);
        var obj1Obj = $(obj1);
        var btnLObj = $(btnL);
        var btnRObj = $(btnR);
        var Objlen = obj2Obj.length;
        var objWd = obj2Obj.width() + Yuz;
        var intds = 0;
        obj1Obj.width(Objlen * objWd).css("left", 0);
        btnLObj.click(function () {
            if (intds > 0) {
                intds--;
                animaTlis(intds)
            }
        });
        btnRObj.click(function () {
            if (intds < Objlen - Num) {
                intds++;
                animaTlis(intds)
            }
        });

        function animaTlis(ints) {
            obj1Obj.animate({
                left: -ints * objWd
            }, time, easingstr)
        }
    }, fullAnimatbanner: function (obj1, obj2, num, btnL, btnR, css, time, aniTimer, ismouseover, easingstr) {
        num = num || "";
        btnL = btnL || "";
        btnR = btnR || "";
        css = css || "current";
        time = time || 5e3;
        aniTimer = aniTimer || 300;
        easingstr = easingstr || "linear";
        ismouseover = ismouseover || false;
        var obj1Obj = $(obj1);
        var obj2Obj = $(obj2);
        var numObj = $(num);
        var btnLObj = $(btnL);
        var btnRObj = $(btnR);
        obj1Obj.css("width", "100%");
        obj2Obj.css({
            position: "absolute",
            top: 0,
            left: "100%",
            width: "100%"
        });
        var liliength = obj2Obj.length;
        var curptins = 0;
        var setIntervalsAAA;
        obj2Obj.eq(curptins).css({
            left: 0
        });
        numObj.removeClass(css).eq(curptins).addClass(css);
        obj2Obj.removeClass(css).eq(curptins).addClass(css);
        numObj.click(function () {
            var curindex = numObj.index(this);
            if (curindex != curptins) {
                animatgundxz(curindex, true)
            }
        });
        btnLObj.click(function () {
            if (curptins - 1 < 0) {
                animatgundxz(liliength - 1, false)
            } else {
                animatgundxz(curptins - 1, false)
            }
        });
        btnRObj.click(function () {
            if (curptins + 1 > liliength - 1) {
                animatgundxz(0, true)
            } else {
                animatgundxz(curptins + 1, true)
            }
        });
        setIntervalsAAA = setInterval(functionTimegd, time);

        function functionTimegd() {
            if (curptins + 1 > liliength - 1) {
                animatgundxz(0, true)
            } else {
                animatgundxz(curptins + 1, true)
            }
        }

        function animatgundxz(cuet, drect) {
            clearInterval(setIntervalsAAA);
            setIntervalsAAA = setInterval(functionTimegd, time);
            obj2Obj.stop().css({
                left: "100%"
            });
            if (drect) {
                obj2Obj.eq(cuet).stop().css({
                    left: "100%"
                });
                obj2Obj.eq(cuet).animate({
                    left: 0
                }, aniTimer, easingstr);
                obj2Obj.eq(curptins).stop().css({
                    left: "0%"
                });
                obj2Obj.eq(curptins).animate({
                    left: "-100%"
                }, aniTimer, easingstr)
            } else {
                obj2Obj.eq(cuet).css({
                    left: "-100%"
                }).animate({
                    left: 0
                }, aniTimer, easingstr);
                obj2Obj.eq(curptins).css({
                    left: "0%"
                }).animate({
                    left: "100%"
                }, aniTimer, easingstr)
            }
            curptins = cuet;
            numObj.removeClass(css).eq(curptins).addClass(css);
            obj2Obj.removeClass(css).eq(curptins).addClass(css)
        }
        if (ismouseover) {
            obj1Obj.hover(function () {
                clearInterval(setIntervalsAAA)
            }, function () {
                setIntervalsAAA = setInterval(functionTimegd, time)
            })
        }
        $(window).resize(function () {
            obj2Obj.stop().css({
                left: "100%"
            });
            obj2Obj.eq(curptins).stop().css({
                left: 0
            })
        })
    }, fadeBanner: function (obj, num, btnl, btnr, css, timer, aniTimer, ismouseover, easingstr) {
        num = num || "";
        btnl = btnl || "";
        btnr = btnr || "";
        css = css || "current";
        timer = timer || 5e3;
        aniTimer = aniTimer || 300;
        ismouseover = ismouseover || false;
        easingstr = easingstr || "linear";
        var objlObj = $(obj);
        var numObj = $(num);
        var objl = objlObj.length;
        var dq_ind = 0;
        var setshijinasdw;
        for (var i = 0; i < objl; i++) {
            objlObj.eq(i).css("z-index", 50 - i)
        }
        numObj.eq(0).addClass(css);
        objlObj.removeClass(css).eq(0).addClass(css);

        function fadesetInrt(int) {
            for (var i = 0; i < objl; i++) {
                objlObj.eq(i).css("z-index", objlObj.eq(i).css("z-index") - 1)
            }
            objlObj.eq(int).stop().css({
                zIndex: 100,
                opacity: 0
            });
            objlObj.eq(int).stop().animate({
                opacity: 1
            }, aniTimer, easingstr);
            numObj.removeClass(css);
            numObj.eq(int).addClass(css);
            objlObj.removeClass(css).eq(int).addClass(css)
        }
        setshijinasdw = setInterval(setshijinasdw_hs, timer);

        function setshijinasdw_hs() {
            dq_ind++;
            if (dq_ind > objl - 1) {
                dq_ind = 0
            }
            fadesetInrt(dq_ind)
        }
        $(btnl).click(function () {
            clearInterval(setshijinasdw);
            setshijinasdw = setInterval(setshijinasdw_hs, timer);
            dq_ind--;
            if (dq_ind < 0) {
                dq_ind = objl - 1
            }
            fadesetInrt(dq_ind)
        });
        $(btnr).click(function () {
            clearInterval(setshijinasdw);
            setshijinasdw = setInterval(setshijinasdw_hs, timer);
            dq_ind++;
            if (dq_ind > objl - 1) {
                dq_ind = 0
            }
            fadesetInrt(dq_ind)
        });
        if (ismouseover) {
            objlObj.hover(function () {
                clearInterval(setshijinasdw)
            }, function () {
                setshijinasdw = setInterval(setshijinasdw_hs, timer)
            })
        }
        numObj.click(function () {
            clearInterval(setshijinasdw);
            setshijinasdw = setInterval(setshijinasdw_hs, timer);
            dq_ind = numObj.index(this);
            fadesetInrt(dq_ind)
        })
    }, hBannerLoop: function (obj1, obj, num, btnl, btnr, css, timer, yuzhi, aniTimer, ismousehover, easingstr) {
        aniTimer = aniTimer || 300;
        easingstr = easingstr || "linear";
        num = num || "";
        btnl = btnl || "";
        btnr = btnr || "";
        css = css || "current";
        timer = timer || 5e3;
        yuzhi = yuzhi || 0;
        ismousehover = ismousehover || false;
        var objObj = $(obj);
        var obj1Obj = $(obj1);
        var numObj = $(num);
        var objL = objObj.length;
        var objW = objObj.width() + yuzhi;
        var objHtml = obj1Obj.html();
        var dq_ind = objL;
        var settimesdw;
        var isAnime = true;
        obj1Obj.html(objHtml + objHtml + objHtml);
        obj1Obj.width(objL * objW * 3);
        obj1Obj.css("left", dq_ind * objW * -1);
        objObj = $(obj);
        numObj.eq(0).addClass(css);
        objObj.removeClass(css);
        objObj.eq(0).addClass(css);
        objObj.eq(0 + objL).addClass(css);
        objObj.eq(0 + objL * 2).addClass(css);
        settimesdw = setInterval(settimesdw_hs, timer);

        function settimesdw_hs() {
            if (dq_ind > objL * 2 - 1) {
                dq_ind = objL;
                obj1Obj.css("left", objL * objW * -1)
            }
            dq_ind++;
            tweener(dq_ind)
        }

        function tweener(int) {
            isAnime = false;
            obj1Obj.stop().animate({
                left: int * objW * -1
            }, aniTimer, easingstr, function () {
                isAnime = true
            });
            numObj.removeClass(css);
            numObj.eq(int % objL).addClass(css);
            objObj.removeClass(css);
            objObj.eq(int % objL).addClass(css);
            objObj.eq(int % objL + objL).addClass(css);
            objObj.eq(int % objL + objL * 2).addClass(css)
        }
        $(btnl).click(function () {
            if (!isAnime) return;
            clearInterval(settimesdw);
            settimesdw = setInterval(settimesdw_hs, timer);
            if (dq_ind < objL) {
                dq_ind = objL * 2 - 1;
                obj1Obj.css("left", dq_ind * objW * -1)
            }
            dq_ind--;
            tweener(dq_ind)
        });
        $(btnr).click(function () {
            if (!isAnime) return;
            clearInterval(settimesdw);
            settimesdw = setInterval(settimesdw_hs, timer);
            if (dq_ind > objL * 2 - 1) {
                dq_ind = objL;
                obj1Obj.css("left", objL * objW * -1)
            }
            dq_ind++;
            tweener(dq_ind)
        });
        if (ismousehover) {
            obj1Obj.hover(function () {
                clearInterval(settimesdw)
            }, function () {
                settimesdw = setInterval(settimesdw_hs, timer)
            })
        }
        numObj.click(function () {
            if (!isAnime) return;
            clearInterval(settimesdw);
            settimesdw = setInterval(settimesdw_hs, timer);
            dq_ind = numObj.index(this);
            tweener(dq_ind)
        })
    }, vBannerLoop: function (obj1, obj, num, btnl, btnr, css, timer, yuzhi, aniTimer, ismousehover, easingstr) {
        num = num || "";
        btnl = btnl || "";
        btnr = btnr || "";
        css = css || "current";
        timer = timer || 5e3;
        aniTimer = aniTimer || 300;
        easingstr = easingstr || "linear";
        yuzhi = yuzhi || 0;
        ismousehover = ismousehover || false;
        var isAnime = true;
        var objObj = $(obj);
        var obj1Obj = $(obj1);
        var numObj = $(num);
        var objL = objObj.length;
        var objW = objObj.height() + yuzhi;
        var objHtml = obj1Obj.html();
        var dq_ind = objL;
        var settimesdw;
        obj1Obj.html(objHtml + objHtml + objHtml);
        obj1Obj.height(objL * objW * 3);
        obj1Obj.css("top", dq_ind * objW * -1);
        objObj = $(obj);
        numObj.removeClass(css);
        numObj.eq(0).addClass(css);
        objObj.removeClass(css);
        objObj.eq(0).addClass(css);
        objObj.eq(0 + objL).addClass(css);
        objObj.eq(0 + objL * 2).addClass(css);
        settimesdw = setInterval(settimesdw_hs, timer);

        function settimesdw_hs() {
            if (dq_ind > objL * 2 - 1) {
                dq_ind = objL;
                obj1Obj.css("top", objL * objW * -1)
            }
            dq_ind++;
            tweener(dq_ind)
        }

        function tweener(int) {
            isAnime = false;
            obj1Obj.stop().animate({
                top: int * objW * -1
            }, aniTimer, easingstr, function () {
                isAnime = true
            });
            numObj.removeClass(css);
            numObj.eq(int % objL).addClass(css);
            objObj.removeClass(css);
            objObj.eq(0).addClass(css);
            objObj.eq(int % objL + objL).addClass(css);
            objObj.eq(int % objL + objL * 2).addClass(css)
        }
        $(btnl).click(function () {
            if (!isAnime) return;
            clearInterval(settimesdw);
            settimesdw = setInterval(settimesdw_hs, timer);
            if (dq_ind < objL) {
                dq_ind = objL * 2 - 1;
                obj1Obj.css("top", dq_ind * objW * -1)
            }
            dq_ind--;
            tweener(dq_ind)
        });
        $(btnr).click(function () {
            if (!isAnime) return;
            clearInterval(settimesdw);
            settimesdw = setInterval(settimesdw_hs, timer);
            if (dq_ind > objL * 2 - 1) {
                dq_ind = objL;
                obj1Obj.css("top", objL * objW * -1)
            }
            dq_ind++;
            tweener(dq_ind)
        });
        if (ismousehover) {
            obj1Obj.hover(function () {
                clearInterval(settimesdw)
            }, function () {
                settimesdw = setInterval(settimesdw_hs, timer)
            })
        }
        numObj.click(function () {
            if (!isAnime) return;
            clearInterval(settimesdw);
            settimesdw = setInterval(settimesdw_hs, timer);
            dq_ind = numObj.index(this);
            tweener(dq_ind)
        })
    }, hBanner: function (obj1, obj, num, btnl, btnr, css, timer, yuzhi, aniTimer, isMousehover, easingstr) {
        num = num || "";
        btnl = btnl || "";
        btnr = btnr || "";
        css = css || "current";
        timer = timer || 5e3;
        aniTimer = aniTimer || 300;
        easingstr = easingstr || "linear";
        yuzhi = yuzhi || 0;
        isMousehover = isMousehover || false;
        var objObj = $(obj);
        var obj1Obj = $(obj1);
        var numObj = $(num);
        var objL = objObj.length;
        var objW = objObj.width() + yuzhi;
        var dq_ind = objL;
        var settimesdw;
        var isAnime = true;
        obj1Obj.width(objL * objW);
        obj1Obj.css("left", 0);
        numObj.removeClass(css);
        numObj.eq(0).addClass(css);
        objObj.removeClass(css);
        objObj.eq(0).addClass(css);
        settimesdw = setInterval(settimesdw_hs, timer);

        function settimesdw_hs() {
            dq_ind++;
            if (dq_ind > objL - 1) {
                dq_ind = 0
            }
            tweener(dq_ind)
        }

        function tweener(int) {
            isAnime = false;
            obj1Obj.stop().animate({
                left: int * objW * -1
            }, aniTimer, easingstr, function () {
                isAnime = true
            });
            numObj.removeClass(css);
            numObj.eq(int).addClass(css);
            objObj.removeClass(css);
            objObj.eq(int).addClass(css)
        }
        $(btnl).click(function () {
            if (!isAnime) return;
            clearInterval(settimesdw);
            settimesdw = setInterval(settimesdw_hs, timer);
            dq_ind--;
            if (dq_ind < 0) {
                dq_ind = objL - 1
            }
            tweener(dq_ind)
        });
        $(btnr).click(function () {
            if (!isAnime) return;
            clearInterval(settimesdw);
            settimesdw = setInterval(settimesdw_hs, timer);
            dq_ind++;
            if (dq_ind > objL - 1) {
                dq_ind = 0
            }
            tweener(dq_ind)
        });
        if (isMousehover) {
            obj1Obj.hover(function () {
                clearInterval(settimesdw)
            }, function () {
                settimesdw = setInterval(settimesdw_hs, timer)
            })
        }
        numObj.click(function () {
            if (!isAnime) return;
            clearInterval(settimesdw);
            settimesdw = setInterval(settimesdw_hs, timer);
            dq_ind = numObj.index(this);
            tweener(dq_ind)
        })
    }, vBanner: function (obj1, obj, num, btnl, btnr, css, timer, yuzhi, aniTimer, ismouseHover, easingstr) {
        num = num || "";
        btnl = btnl || "";
        btnr = btnr || "";
        css = css || "current";
        timer = timer || 5e3;
        aniTimer = aniTimer || 300;
        easingstr = easingstr || "linear";
        yuzhi = yuzhi || 0;
        var objObj = $(obj);
        var obj1Obj = $(obj1);
        var numObj = $(num);
        var ismouseHover = ismouseHover || false;
        var objL = objObj.length;
        var objW = objObj.height() + yuzhi;
        var dq_ind = objL;
        var settimesdw;
        var isAnime = true;
        obj1Obj.height(objL * objW);
        obj1Obj.css("top", 0);
        numObj.removeClass(css);
        numObj.eq(0).addClass(css);
        objObj.removeClass(css);
        objObj.eq(0).addClass(css);
        settimesdw = setInterval(settimesdw_hs, timer);

        function settimesdw_hs() {
            dq_ind++;
            if (dq_ind > objL - 1) {
                dq_ind = 0
            }
            tweener(dq_ind)
        }

        function tweener(int) {
            isAnime = false;
            obj1Obj.stop().animate({
                top: int * objW * -1
            }, aniTimer, easingstr, function () {
                isAnime = true
            });
            numObj.removeClass(css);
            numObj.eq(int).addClass(css);
            objObj.removeClass(css);
            objObj.eq(int).addClass(css)
        }
        $(btnl).click(function () {
            if (!isAnime) return;
            clearInterval(settimesdw);
            settimesdw = setInterval(settimesdw_hs, timer);
            dq_ind--;
            if (dq_ind < 0) {
                dq_ind = objL - 1
            }
            tweener(dq_ind)
        });
        $(btnr).click(function () {
            if (!isAnime) return;
            clearInterval(settimesdw);
            settimesdw = setInterval(settimesdw_hs, timer);
            dq_ind++;
            if (dq_ind > objL - 1) {
                dq_ind = 0
            }
            tweener(dq_ind)
        });
        if (ismouseHover) {
            obj1Obj.hover(function () {
                clearInterval(settimesdw)
            }, function () {
                settimesdw = setInterval(settimesdw_hs, timer)
            })
        }
        numObj.click(function () {
            if (!isAnime) return;
            clearInterval(settimesdw);
            settimesdw = setInterval(settimesdw_hs, timer);
            dq_ind = numObj.index(this);
            tweener(dq_ind)
        })
    }, magnifier: function (msk, xtu, dtu) {
        var mskObj = $(msk);
        var dtuObj = $(dtu);
        var xtuObj = $(xtu);
        var dtuIMG = dtuObj.find("img");
        var imgsrc = xtuObj.find("img").attr("src");
        if (dtuIMG.length < 1) {
            dtuObj.append("<img src='" + imgsrc + "'>");
            dtuIMG = dtuObj.find("img")
        } else {
            dtuIMG.attr("src", imgsrc)
        }
        dtuIMG.css({
            position: "absolute",
            width: "200%",
            height: "200%"
        });
        mskObj.hide();
        dtuObj.hide();
        var Xz = 0;
        var Yz = 0;
        var wid = xtuObj.width() / 4;
        var het = xtuObj.height() / 4;
        xtuObj.hover(function () {
            mskObj.show();
            dtuObj.show()
        }, function () {
            mskObj.hide();
            dtuObj.hide()
        });
        $(dtu + " img").css({
            marginLeft: wid * 2,
            marginTop: het * 2
        });
        mskObj.css({
            marginLeft: -wid,
            marginTop: -het
        });
        dtuIMG.css("left", -parseInt(mskObj.css("left")) * 2);
        dtuIMG.css("top", -parseInt(mskObj.css("top")) * 2);
        xtuObj.mousemove(function (e) {
            Xz = e.pageX - $(this).offset().left;
            Yz = e.pageY - $(this).offset().top;
            mskObj.css("left", Xz);
            mskObj.css("top", Yz);
            if (Xz < wid) {
                mskObj.css("left", wid)
            }
            if (Xz > wid * 3) {
                mskObj.css("left", wid * 3)
            }
            if (Yz < het) {
                mskObj.css("top", het)
            }
            if (Yz > het * 3) {
                mskObj.css("top", het * 3)
            }
            dtuIMG.css("left", -parseInt(mskObj.css("left")) * 2);
            dtuIMG.css("top", -parseInt(mskObj.css("top")) * 2)
        })
    }, pFloating: function (obj, clos, isbody, sdpx, time) {
        var leftts = 0;
        var tops = 0;
        var leftxs = 1;
        var topxs = 1;
        var objObj = $(obj);
        sdpx = sdpx || 1;
        time = time || 30;
        var $window = $(window);
        var $document = $(document);
        var isbody = isbody || false;
        if (isbody) {
            objObj.css("position", "absolute")
        } else {
            objObj.css("position", "fixed")
        }
        objObj.css("z-index", 500);
        objObj.css({
            left: leftts,
            top: tops
        });
        var sletgundss = setInterval(addshijian, time);

        function addshijian() {
            leftts += sdpx * leftxs;
            tops += sdpx * topxs;
            if (leftts < 0 || leftts > $window.width() - objObj.width()) {
                leftxs *= -1
            }
            var topsBiz = 0;
            if (isbody) {
                topsBiz = $document.height() - objObj.height()
            } else {
                topsBiz = $window.height() - objObj.height()
            } if (tops < 0 || tops > topsBiz) {
                topxs *= -1
            }
            objObj.css({
                left: leftts,
                top: tops
            })
        }
        objObj.hover(function () {
            clearInterval(sletgundss)
        }, function () {
            sletgundss = setInterval(addshijian, time)
        });
        $(clos).click(function () {
            setTimeout(function () {
                clearInterval(sletgundss);
                objObj.hide()
            }, 10)
        })
    }, largerImg: function (obj, wid, het) {
        var setTimeousd;
        var ImgDtutabe = null;
        $(obj).hover(function () {
            var thisobj = $(this);
            setTimeousd = setTimeout(function () {
                ImgDtutabe = $("<img>");
                $("body").append(ImgDtutabe);
                ImgDtutabe.css("max-width", wid);
                ImgDtutabe.css("max-width", wid);
                ImgDtutabe.attr("src", thisobj.attr("src"));
                ImgDtutabe.css({
                    position: "absolute"
                });
                if (thisobj.offset().left + thisobj.width() > $(window).width() - $(".ImgDtutabe").width() - 10) {
                    ImgDtutabe.css({
                        left: thisobj.offset().left - ImgDtutabe.width() - 10,
                        top: thisobj.offset().top + thisobj.height() / 2 - $(".ImgDtutabe").height() / 2
                    })
                } else {
                    ImgDtutabe.css({
                        left: thisobj.offset().left + thisobj.width() + 10,
                        top: thisobj.offset().top + thisobj.height() / 2 - $(".ImgDtutabe").height() / 2
                    })
                }
            }, 500)
        }, function () {
            clearTimeout(setTimeousd);
            if (!ImgDtutabe) return;
            ImgDtutabe.remove();
            ImgDtutabe = null
        })
    }, imgGeomeScale: function (obj, nocent) {
        var bder = nocent || false;
        $(obj).each(function (i) {
            var img = $(this);
            if (img.attr("data-set")) {
                return
            }
            img.attr("data-style", "yes");
            var realWidth;
            var realHeight;
            var objwidh = img.width();
            var objhet = img.height();
            $("<img/>").attr("src", img.attr("src")).load(function () {
                realWidth = this.width;
                realHeight = this.height;
                if (objwidh / objhet > realWidth / realHeight) {
                    var widthhou = objhet * realWidth / realHeight;
                    img.width(widthhou);
                    if (!bder) {
                        img.css({
                            paddingLeft: (objwidh - widthhou) / 2,
                            paddingRight: (objwidh - widthhou) / 2
                        })
                    }
                } else {
                    var heithou = objwidh * realHeight / realWidth;
                    img.height(heithou);
                    if (!bder) {
                        img.css({
                            paddingTop: (objhet - heithou) / 2,
                            paddingBottom: (objhet - heithou) / 2
                        })
                    }
                }
            })
        })
    }, scrollStyleV: function (Diva, divb, tiaoa, tiaob) {
        var isPcsd = this.isPC();
        if (!isPcsd) return;
        tiaoa = tiaoa || "";
        tiaob = tiaob || "";
        var DivA_obj = $(Diva);
        var divb_obj = $(divb);
        var tiaoA_obj = $(tiaoa);
        var tiaob_obj = $(tiaob);
        var bilizhi;
        var bilizhis2;
        divb_obj.find("img").load(sethanshu);
        sethanshu();

        function sethanshu() {
            var DivA_objH = DivA_obj.height();
            var divb_objH = divb_obj.height();
            bilizhi = DivA_objH / divb_objH;
            if (bilizhi >= 1) {
                tiaoA_obj.hide()
            } else {
                tiaoA_obj.show();
                tiaob_obj.height(bilizhi * 100 + "%").css("top", DivA_obj.scrollTop() * bilizhi)
            }
        }
        $(window).resize(sethanshu);
        DivA_obj.scroll(sethanshu);
        tiaob_obj.mousedown(function (e) {
            var yuanshiutp = e.pageY;
            var scscctop = DivA_obj.scrollTop();
            bilizhis2 = tiaob_obj.height() / DivA_obj.height();
            $(document).unbind("mousemove");
            $(document).mousemove(function (u) {
                DivA_obj.scrollTop(scscctop + (u.pageY - yuanshiutp) / bilizhis2);
                return false
            });
            return false
        });
        $(document).mouseup(function () {
            $(document).unbind("mousemove")
        })
    }, scrollStyleH: function (Diva, divb, tiaoa, tiaob) {
        var isPcsd = this.isPC();
        if (!isPcsd) return;
        tiaoa = tiaoa || "";
        tiaob = tiaob || "";
        var DivA_obj = $(Diva);
        var divb_obj = $(divb);
        var tiaoA_obj = $(tiaoa);
        var tiaob_obj = $(tiaob);
        var bilizhi;
        var bilizhis2;
        divb_obj.find("img").load(sethanshu);
        sethanshu();

        function sethanshu() {
            var DivA_objH = DivA_obj.width();
            var divb_objH = divb_obj.width();
            bilizhi = DivA_objH / divb_objH;
            if (bilizhi >= 1) {
                tiaoA_obj.hide()
            } else {
                tiaoA_obj.show();
                tiaob_obj.width(bilizhi * 100 + "%").css("left", DivA_obj.scrollLeft() * bilizhi)
            }
        }
        $(window).resize(sethanshu);
        DivA_obj.scroll(sethanshu);
        tiaob_obj.mousedown(function (e) {
            var yuanshiutp = e.pageX;
            var scscctop = DivA_obj.scrollLeft();
            bilizhis2 = tiaob_obj.width() / DivA_obj.width();
            $(document).unbind("mousemove");
            $(document).mousemove(function (u) {
                DivA_obj.scrollLeft(scscctop + (u.pageX - yuanshiutp) / bilizhis2);
                return false
            });
            return false
        });
        $(document).mouseup(function () {
            $(document).unbind("mousemove")
        })
    }, Html5FileReader: function (fiel, img, noalert) {
        img = img || false;
        noalert = noalert || false;
        if (typeof FileReader == "undefined") {
            if (!noalert) {
                alert("你的浏览器不支持预览图片预览！")
            }
            return
        }
        var Imgreader = new FileReader();
        var fielobj = $(fiel).eq(0);
        var imgobj = $(img).eq(0);
        if (img) {
            imgobj = $(img).eq(0)
        } else {
            imgobj = fielobj.parent().find("img").eq(0)
        }
        Imgreader.onload = function (e) {
            imgobj.attr("src", e.target.result)
        };
        fielobj.change(function () {
            Imgreader.readAsDataURL(fielobj[0].files[0])
        })
    }, Html5FileReaders: function (fiel, parenta, img, noalert) {
        parenta = parenta || false;
        img = img || "img";
        noalert = noalert || false;
        if (typeof FileReader == "undefined") {
            if (!noalert) {
                alert("你的浏览器不支持预览图片预览！")
            }
            return
        }
        var Imgreader = new FileReader();
        var fielobj = $(fiel);
        var thisparent;
        Imgreader.onload = function (e) {
            thisparent.find(img).attr("src", e.target.result)
        };
        fielobj.change(function () {
            if (parenta) {
                thisparent = $(this).parents(parenta)
            } else {
                thisparent = $(this).parent()
            }
            Imgreader.readAsDataURL($(this)[0].files[0])
        })
    },
    mobileBanner:function (obj1, obj2, num, btnL, btnR, css, time, aniTimer, easingstr) {
        num = num || "";
        btnL = btnL || "";
        btnR = btnR || "";
        css = css || "current";
        time = time || 5e3;
        aniTimer = aniTimer || 300;
        easingstr = easingstr || "linear";
        var obj1ul = $(obj1);
        var obj2li = $(obj2);
        var numdian = $(num);
        if (obj1ul.length < 1) return;
        if (obj2li.length < 2) return;
        var domObj=obj1ul.eq(0);
        obj1ul.css("width", "100%");
        obj2li.css({
            position: "absolute",
            top: 0,
            left: "100%",
            width: "100%"
        });
        var ulweidth = obj1ul.width();
        var liliength = obj2li.length;
        var curptins = 0;
        var setIntervalsAAA;
        var panstPotinX = 0;
        var starTime = 0;
        var isDragendeanli = true;
        obj2li.eq(curptins).css({
            left: 0
        });
        numdian.removeClass(css).eq(curptins).addClass(css);
        obj2li.removeClass(css).eq(curptins).addClass(css);
        numdian.click(function () {
            var curindex = numdian.index(this);
            if (curindex != curptins) {
                animatgundxz(curindex, true)
            }
        });
        $(btnL).click(function () {
            if (curptins - 1 < 0) {
                animatgundxz(liliength - 1, false)
            } else {
                animatgundxz(curptins - 1, false)
            }
        });
        $(btnR).click(function () {
            if (curptins + 1 > liliength - 1) {
                animatgundxz(0, true)
            } else {
                animatgundxz(curptins + 1, true)
            }
        });
        this.event.start(domObj,function (ev) {
            if (!isDragendeanli) return;
            panstPotinX = 0;
            starTime = new Date().getTime()
        });

        function animateEndfunction() {
            isDragendeanli = true
        }
        this.event.end(document,function (ev) {
            if (!isDragendeanli){
                setTimeout(animateEndfunction,aniTimer)
                return;
            }
            isDragendeanli = false;
            var thstates = new Date().getTime();
            var chazhis = thstates - starTime;
            if (chazhis < 300) {
                if (panstPotinX < 40 && panstPotinX > 0) {
                    obj2li.eq(curptins).stop().animate({
                        left: 100 + "%"
                    }, aniTimer, easingstr, animateEndfunction).css("z-index", 10);
                    obj2li.eq(getPrveInt()).stop().animate({
                        left: 0 + "%"
                    }, aniTimer, easingstr, animateEndfunction).css("z-index", 5);
                    if (liliength > 2) {
                        obj2li.eq(getNextInt()).stop().animate({
                            left: -100 + "%"
                        }, aniTimer, easingstr, animateEndfunction).css("z-index", 0)
                    }
                    curptins--
                }
                if (panstPotinX > -40 && panstPotinX < 0) {
                    obj2li.eq(curptins).stop().animate({
                        left: -100 + "%"
                    }, aniTimer, easingstr, animateEndfunction).css("z-index", 10);
                    obj2li.eq(getNextInt()).stop().animate({
                        left: 0 + "%"
                    }, aniTimer, easingstr, animateEndfunction).css("z-index", 5);
                    if (liliength > 2) {
                        obj2li.eq(getPrveInt()).stop().animate({
                            left: 100 + "%"
                        }, aniTimer, easingstr, animateEndfunction).css("z-index", 0)
                    }
                    curptins++
                }
            } else {
                obj2li.eq(curptins).stop().animate({
                    left: 0 + "%"
                }, aniTimer, easingstr, animateEndfunction).css("z-index", 10);
                if (panstPotinX > 0) {
                    obj2li.eq(getPrveInt()).stop().animate({
                        left: -100 + "%"
                    }, aniTimer, easingstr, animateEndfunction).css("z-index", 5);
                    if (liliength > 2) {
                        obj2li.eq(getNextInt()).stop().animate({
                            left: 100 + "%"
                        }, aniTimer, easingstr, animateEndfunction).css("z-index", 0)
                    }
                } else {
                    obj2li.eq(getNextInt()).stop().animate({
                        left: 100 + "%"
                    }, aniTimer, easingstr, animateEndfunction).css("z-index", 5);
                    if (liliength > 2) {
                        obj2li.eq(getPrveInt()).stop().animate({
                            left: -100 + "%"
                        }, aniTimer, easingstr, animateEndfunction).css("z-index", 0)
                    }
                }
            } if (panstPotinX > 40) {
                obj2li.eq(curptins).stop().animate({
                    left: 100 + "%"
                }, aniTimer, easingstr, animateEndfunction).css("z-index", 10);
                obj2li.eq(getPrveInt()).stop().animate({
                    left: 0 + "%"
                }, aniTimer, easingstr, animateEndfunction).css("z-index", 5);
                if (liliength > 2) {
                    obj2li.eq(getNextInt()).stop().animate({
                        left: -100 + "%"
                    }, aniTimer, easingstr, animateEndfunction).css("z-index", 0)
                }
                curptins--
            }
            if (panstPotinX < -40) {
                obj2li.eq(curptins).stop().animate({
                    left: -100 + "%"
                }, aniTimer, easingstr, animateEndfunction).css("z-index", 10);
                obj2li.eq(getNextInt()).stop().animate({
                    left: 0 + "%"
                }, aniTimer, easingstr, animateEndfunction).css("z-index", 5);
                if (liliength > 2) {
                    obj2li.eq(getPrveInt()).stop().animate({
                        left: 100 + "%"
                    }, aniTimer, easingstr, animateEndfunction).css("z-index", 0)
                }
                curptins++
            }
            setcurptinszhi();
            panstPotinX = 0
        });

        function setcurptinszhi() {
            if (curptins < 0) {
                curptins = liliength - 1
            }
            if (curptins > liliength - 1) {
                curptins = 0
            }
            numdian.removeClass(css).eq(curptins).addClass(css);
            obj2li.removeClass(css).eq(curptins).addClass(css)
        }

        this.event.move(domObj,function (ev) {
            if(Math.abs(ev.deltaY)>Math.abs(ev.deltaX)*5){
                return;
            }else{
                ev.preventDefault();
            }
            if (!isDragendeanli) return;
            clearInterval(setIntervalsAAA);
            setIntervalsAAA = setInterval(functionTimegd, time);
            var deltaXz = ev.deltaX;
            var baifenbuzh = deltaXz / ulweidth * 100;
            panstPotinX = baifenbuzh;
            obj2li.eq(curptins).stop().css({
                left: baifenbuzh + "%"
            });
            if (deltaXz > 0) {
                obj2li.eq(getPrveInt()).stop().css({
                    left: baifenbuzh - 100 + "%"
                });
                if (liliength > 2) {
                    obj2li.eq(getNextInt()).stop().css({
                        left: baifenbuzh + 100 + "%"
                    })
                }
            } else {
                obj2li.eq(getNextInt()).stop().css({
                    left: baifenbuzh + 100 + "%"
                });
                if (liliength > 2) {
                    obj2li.eq(getPrveInt()).stop().css({
                        left: baifenbuzh - 100 + "%"
                    })
                }
            }
        });

        function getPrveInt() {
            var PrveInt = curptins - 1;
            if (PrveInt < 0) {
                PrveInt = liliength - 1
            }
            return PrveInt
        }

        function getNextInt() {
            var NextInt = curptins + 1;
            if (NextInt > liliength - 1) {
                NextInt = 0
            }
            return NextInt
        }
        setIntervalsAAA = setInterval(functionTimegd, time);

        function functionTimegd() {
            if (curptins + 1 > liliength - 1) {
                animatgundxz(0, true)
            } else {
                animatgundxz(curptins + 1, true)
            }
        }

        function animatgundxz(cuet, drect) {
            clearInterval(setIntervalsAAA);
            setIntervalsAAA = setInterval(functionTimegd, time);
            obj2li.stop().css({
                left: "100%"
            });
            if (drect) {
                obj2li.eq(cuet).stop().css({
                    left: "100%"
                });
                obj2li.eq(cuet).animate({
                    left: 0
                }, aniTimer, easingstr, animateEndfunction);
                obj2li.eq(curptins).stop().css({
                    left: "0%"
                });
                obj2li.eq(curptins).animate({
                    left: "-100%"
                }, aniTimer, easingstr, animateEndfunction)
            } else {
                obj2li.eq(cuet).css({
                    left: "-100%"
                }).animate({
                    left: 0
                }, aniTimer, easingstr, animateEndfunction);
                obj2li.eq(curptins).css({
                    left: "0%"
                }).animate({
                    left: "100%"
                }, aniTimer, easingstr, animateEndfunction)
            }
            curptins = cuet;
            numdian.removeClass(css).eq(curptins).addClass(css);
            obj2li.removeClass(css).eq(curptins).addClass(css)
        }
        $(window).resize(function () {
            obj2li.stop().css({
                left: "100%"
            });
            obj2li.eq(curptins).stop().css({
                left: 0
            });
            ulweidth = obj1ul.width()
        })
    }, imglist5: function (ul, btnL, btnR, tagname, posArry, deft, textcon, tag, timenum, easingstr) {
        easingstr = easingstr || "linear";
        timenum = timenum || 300;
        var btnLo = $(btnL);
        var btnRo = $(btnR);
        var ulo = $(ul);
        var lio = ulo.find(tagname);
        var poinshu = [];
        deft = deft || 0;
        deft = deft + 1;
        textcon = textcon || "";
        tag = tag || "";
        var deftint = deft - 1;
        var curInt = deft - 1;
        var curdanw = 0;
        textcon = textcon || "";
        tag = tag || "";
        var textcono = $(textcon);
        lio.each(function (index) {
            poinshu.push(index + deftint);
            if (index + deftint > 4) {
                $(this).css({
                    marginLeft: posArry[4].x + 150,
                    marginTop: posArry[4].y,
                    width: posArry[4].w,
                    height: posArry[4].h,
                    zIndex: 1
                })
            } else {
                $(this).css({
                    marginLeft: posArry[index + deftint].x,
                    marginTop: posArry[index + deftint].y,
                    width: posArry[index + deftint].w,
                    height: posArry[index + deftint].h,
                    zIndex: posArry[index + deftint].z
                })
            }
        });
        textcono.text(lio.eq(3 - deft).find(tag).text());
        btnLo.click(function () {
            if (curInt < 2) {
                curInt++;
                curdanw = 1;
                setGUND()
            }
        });
        btnRo.click(function () {
            if (poinshu[poinshu.length - 1] > 2) {
                curInt--;
                curdanw = -1;
                setGUND()
            }
        });

        function setGUND() {
            for (var i = 0; i < poinshu.length; i++) {
                poinshu[i] += curdanw;
                var curzhi = poinshu[i];
                if (!(curzhi < 0 || curzhi > 4)) {
                    lio.eq(i).css({
                        zIndex: posArry[curzhi].z
                    }).animate({
                        marginLeft: posArry[curzhi].x,
                        marginTop: posArry[curzhi].y,
                        width: posArry[curzhi].w,
                        height: posArry[curzhi].h
                    }, timenum, easingstr);
                    if (curzhi == 2) {
                        textcono.text(lio.eq(i).find(tag).text())
                    }
                }
                if (curzhi < 0) {
                    lio.eq(i).css({
                        zIndex: 1
                    }).animate({
                        marginLeft: posArry[0].x - 150,
                        marginTop: posArry[0].y,
                        width: posArry[0].w,
                        height: posArry[0].h
                    }, timenum, easingstr)
                }
                if (curzhi > 4) {
                    lio.eq(i).css({
                        zIndex: 1
                    }).animate({
                        marginLeft: posArry[4].x + 228,
                        marginTop: posArry[4].y,
                        width: posArry[4].w,
                        height: posArry[4].h
                    }, timenum, easingstr)
                }
            }
        }
    }, resizeHtW: function (obj, Objs, W, H) {
        W = W || 100;
        H = H || 100;
        var _w;
        _resize();
        YeffectAttr.resizeHt_func.push(_resize);

        function _resize() {
            _w = obj.width();
            Objs.height(_w / W * H)
        }
    }, resizeHtWstr: function (obj, Objs, W, H) {
        W = W || 100;
        H = H || 100;
        var _w;
        _resize();
        YeffectAttr.resizeHt_func.push(_resize);

        function _resize() {
            _w = $(obj).eq(0).width();
            $(Objs).height(_w / W * H)
        }
        return _resize
    }, uploadFileAppend: function (obj, img, X, fn, maxC, alerta, maxLeng, geshi, isTouxing) {
        img = img || "img";
        X = X || "";
        geshi = geshi || "png";
        var divobj = $("<div style='width:0px; height:0px;position:relative; overflow:hidden;'>");
        var OBjctent = $(obj).eq(0);
        var bodyObj = $("body");
        var InputObj = OBjctent.find("input:file");
        var maxC = maxC || 5e3;
        var fn = fn || function () {};
        var IMglength = 0;
        var imgcur = 0;
        var alerta = alerta || "你选择的不是图片！";
        var maxLeng = maxLeng || 100;
        var curLeng = [];
        var Io = 0;
        isTouxing = isTouxing || false;
        if (isTouxing) {
            maxLeng = 1
        }
        divobj.append(InputObj);
        var thisHtml = OBjctent[0].outerHTML;
        OBjctent.append(InputObj);
        bodyObj.append(divobj);
        InputObj.change(function (e) {
            var thisfil = $(this)[0].files;
            var inyy = true;
            var IOa = 0;
            for (var i = 0; i < thisfil.length; i++) {
                if (thisfil[i].type.indexOf("image") > -1) {
                    var orientation;
                    EXIF.getData(thisfil[i], function () {
                        orientation = EXIF.getTag(this, "Orientation")
                    });
                    var Imgreader = new FileReader();
                    IMglength++;
                    if (IMglength >= maxLeng && !isTouxing) {
                        OBjctent.hide()
                    }
                    if (IMglength > maxLeng && !isTouxing) {
                        IMglength = maxLeng;
                        return
                    }
                    Imgreader.readAsDataURL(thisfil[i]);
                    Imgreader.onload = function (e) {
                        console.log(IMglength);
                        var datasrl = e.target.result;
                        getImgData(datasrl, orientation, function (data) {
                            Io++;
                            IOa++;
                            if (isTouxing) {
                                console.log(data);
                                OBjctent.find(img).attr("src", data);
                                fn();
                                return
                            }
                            var newImg = $(thisHtml);
                            newImg.addClass("show");
                            newImg.find(img).attr("src", data);
                            newImg.find(X).click(function () {
                                var thispart = $(this).parent();
                                thispart.addClass("remove");
                                thispart.remove();
                                curLeng = removeAry(curLeng);
                                OBjctent.show();
                                IMglength--;
                                fn()
                            });
                            OBjctent.before(newImg);
                            curLeng.push(newImg);
                            if (IOa > thisfil.length - 1 || Io >= maxLeng) {
                                fn()
                            }
                        });
                        Imgreader = null
                    };
                    inyy = false
                }
            }
            if (inyy) {
                alert(alerta)
            }
        });

        function getImgData(img, dir, next) {
            var image = new Image();
            image.onload = function () {
                var degree = 0,
                    drawWidth, drawHeight, width, height;
                drawWidth = this.naturalWidth;
                drawHeight = this.naturalHeight;
                var maxSide = Math.max(drawWidth, drawHeight);
                if (maxSide > maxC) {
                    var minSide = Math.min(drawWidth, drawHeight);
                    minSide = minSide / maxSide * maxC;
                    maxSide = maxC;
                    if (drawWidth > drawHeight) {
                        drawWidth = maxSide;
                        drawHeight = minSide
                    } else {
                        drawWidth = minSide;
                        drawHeight = maxSide
                    }
                }
                var canvas = document.createElement("canvas");
                canvas.width = width = drawWidth;
                canvas.height = height = drawHeight;
                var context = canvas.getContext("2d");
                switch (dir) {
                    case 3:
                        degree = 180;
                        drawWidth = -width;
                        drawHeight = -height;
                        break;
                    case 6:
                        canvas.width = height;
                        canvas.height = width;
                        degree = 90;
                        drawWidth = width;
                        drawHeight = -height;
                        break;
                    case 8:
                        canvas.width = height;
                        canvas.height = width;
                        degree = 270;
                        drawWidth = -width;
                        drawHeight = height;
                        break
                }
                context.rotate(degree * Math.PI / 180);
                context.drawImage(this, 0, 0, drawWidth, drawHeight);
                next(canvas.toDataURL("image/" + geshi, .8))
            };
            image.src = img
        }

        function removeAry(ayr) {
            var newAy = [];
            for (var i = 0; i < ayr.length; i++) {
                if (!ayr[i].hasClass("remove")) {
                    newAy.push(ayr[i])
                }
            }
            return newAy
        }
    }, pageScroll: function (boxdiv, minW, offstY, easNum, eastype, ablTime, btn, enterFun, topFun, botmFun) {
        offstY = offstY || 0;
        easNum = easNum || 5;
        minW = minW || 1e3;
        eastype = eastype || "A";
        topFun = topFun || function () {
                return true
            };
        botmFun = botmFun || function () {
                return true
            };
        enterFun = enterFun || function (int, num) {};
        ablTime = ablTime || 200;
        var windowO = $(window);
        var corInt = 0;
        var windHt = 0;
        var windWd = 0;
        var Boxlen = boxdiv.length;
        var HTmBdy = $("html,body");
        var MuBsc = 0;
        var Cursc = 0;
        var ISsc = false;
        var IStimescroll = true;
        var setIntervss;
        var isDminW = true;
        var istopFun = true;
        var isbotmFun = true;
        var bunsd = $(btn);
        setHtthis();
        setTimeout(setHtthis, 30);

        function setIntervss_hs() {
            clearInterval(setIntervss);
            IStimescroll = true;
            if (corInt != Boxlen - 1) {
                bunsd.show()
            } else {
                bunsd.hide()
            }
        }
        if (corInt != Boxlen - 1) {
            bunsd.show()
        } else {
            bunsd.hide()
        }
        windowO.resize(setHtthis);
        if (window.addEventListener) {
            document.ontouchmove = function (e) {
                if (isDminW) {
                    e.preventDefault();
                    return false
                }
            };
            var hammertime = new Hammerobj($("html").eq(0)[0]);
            hammertime.on("panend", function (ev) {
                var deX = ev.deltaX;
                var deY = ev.deltaY;
                if (Math.abs(deX) + 20 < Math.abs(deY)) {
                    if (!isDminW) return;
                    if (!IStimescroll) return false;
                    IStimescroll = false;
                    clearInterval(setIntervss);
                    setIntervss = setInterval(setIntervss_hs, ablTime);
                    if (deY < 0) {
                        if (!istopFun) {
                            istopFun = true;
                            return false
                        }
                        corInt += 1;
                        if (corInt > Boxlen - 1) {
                            isbotmFun = botmFun();
                            corInt = Boxlen - 1
                        }
                    } else {
                        if (!isbotmFun) {
                            isbotmFun = true;
                            return false
                        }
                        corInt -= 1;
                        if (corInt < 0) {
                            istopFun = topFun();
                            corInt = 0
                        }
                    }
                    MuBsc = corInt * windHt + offstY;
                    ISsc = true
                }
            })
        }
        bunsd.click(function () {
            if (!isDminW) return;
            if (!IStimescroll) return false;
            IStimescroll = false;
            clearInterval(setIntervss);
            setIntervss = setInterval(setIntervss_hs, ablTime);
            corInt += 1;
            MuBsc = corInt * windHt + offstY;
            ISsc = true
        });
        windowO.mousewheel(function (event, delta, deltaX, deltaY) {
            if (!isDminW) return;
            if (!IStimescroll) return false;
            IStimescroll = false;
            clearInterval(setIntervss);
            setIntervss = setInterval(setIntervss_hs, ablTime);
            if (!ISsc) {
                Cursc = windowO.scrollTop();
                corInt = Math.round((Cursc + offstY) / windHt)
            }
            if (deltaY > 0) {
                if (!isbotmFun) {
                    isbotmFun = true;
                    return false
                }
            } else {
                if (!istopFun) {
                    istopFun = true;
                    return false
                }
            }
            corInt -= deltaY;
            if (corInt < 0) {
                istopFun = topFun();
                corInt = 0
            }
            if (corInt > Boxlen - 1) {
                isbotmFun = botmFun();
                corInt = Boxlen - 1
            }
            MuBsc = corInt * windHt + offstY;
            ISsc = true;
            return false
        });
        setInterval(function () {
            if (!isDminW) return;
            var cursctop = windowO.scrollTop() + offstY;
            var curINta = Math.round(cursctop / windHt);
            boxdiv.removeClass("curpage").eq(curINta).addClass("curpage");
            if (Math.abs(MuBsc - Cursc) < .5) {
                ISsc = false;
                return
            }
            if (!ISsc) return;
            var isuint = Cursc - MuBsc > 0 ? -1 : 1;
            var jlizhi;
            if (eastype == "A") {
                jlizhi = windHt / easNum / 5
            } else if (eastype == "B") {
                jlizhi = windHt / easNum / 30 + Math.abs(MuBsc - Cursc) / easNum / 2
            } else if (eastype == "C") {
                jlizhi = windHt / easNum / 4 - Math.abs(MuBsc - Cursc) / easNum / 15
            } else if (eastype == "D") {
                jlizhi = Math.abs(MuBsc - Cursc) / easNum
            }
            Cursc = Cursc + jlizhi * isuint;
            if (Math.abs(Cursc - MuBsc) <= jlizhi) {
                Cursc = MuBsc
            }
            HTmBdy.scrollTop(Cursc);
            enterFun(corInt, 100 - parseInt(Math.abs(MuBsc - Cursc) / windHt * 100))
        }, 30);

        function setHtthis() {
            windHt = windowO.height();
            boxdiv.height(windHt);
            windWd = windowO.width();
            isDminW = true;
            ISsc = true;
            Cursc = windowO.scrollTop();
            corInt = Math.round((Cursc + offstY) / windHt);
            MuBsc = corInt * windHt + offstY;
            console.log(corInt);
            if (windWd < minW) {
                boxdiv.removeAttr("style");
                isDminW = false
            }
        }
    }, endscroll: function () {
        isendscroll = true;
        var htmls = $("html");
        var divapen = $("<div></div>");
        var divapenn = $("<div></div>");
        divapen.css({
            clear: "both",
            width: 100,
            height: 100,
            overflowY: "scroll",
            position: "absolute",
            top: 0,
            left: 0
        });
        divapen.append(divapenn);
        $("body").append(divapen);
        htmls.css({
            overflow: "hidden",
            borderRight: divapen.width() - divapenn.width() + "px solid #eee"
        });
        divapen.remove();
        if (isaddtousmove) return;
        isaddtousmove = true;
        if (window.addEventListener) {
            document.addEventListener("touchmove", function (e) {
                if (isendscroll) {
                    e.preventDefault();
                    return false
                }
            }, true)
        }
    }, starscroll: function () {
        isendscroll = false;
        $("html").removeAttr("style")
    }, Validform: function (isnull, iskeyup, isauto, callback, focus_css, error_css, correct_css, use4, pas6) {
        callback = callback || function (dom) {};
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
                $domA.each(function (index, element) {
                    var $dom = $(this);
                    if (!$dom.attr("data-addvalid")) {
                        var $domv = $dom.val();
                        $dom.attr("data-length", $domv.length);
                        $dom.removeClass(correct_css).removeClass(error_css).removeClass(focus_css);
                        $dom.focusin(function () {
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
                                $dom.on(eventstr, function () {
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
                                $dom.on(eventstr, function () {
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
                                $dom.on(eventstr, function () {
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
                                $dom.on(eventstr, function () {
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
                                $dom.on(eventstr, function () {
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
                                $dom.on(eventstr, function () {
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
                                $dom.on(eventstr, function () {
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
    }, addMobscroll: function (domA, domB, hideScoll, bodymove, callback) {
        if (!window["addEventListener"]) return;
        var view = domB || ">div";
        var callback = callback || function () {};
        var hideScoll = hideScoll || false;
        var userAgentInfo = navigator.userAgent;
        var deftAge = "IOS";
        var ismoveA = false;
        var setTimesss;
        var touchNum = 0;
        var touchEnter = true;

        function SetTouchEnter() {
            touchEnter = true
        }
        var timeToucwnt;
        var loadint = 0;
        if (!window["toucmoveadb"]) {
            window["toucmoveadb"] = bodymove || false
        }
        if (userAgentInfo.indexOf("ndroid") > -1) {
            deftAge = "And"
        }
        if (!window["addEnterframeAry"]) {
            window.addEnterframeAry = [];
            setInterval(function () {
                for (var i = 0; i < addEnterframeAry.length; i++) {
                    addEnterframeAry[i]()
                }
            }, 30);
            document.addEventListener("touchmove", function (e) {
                if (!window["toucmoveadb"]) {
                    e.preventDefault()
                }
            }, true)
        }

        function addEnterframe(fn) {
            addEnterframeAry.push(fn)
        }
        var moveY = 0;
        var moveX = 0;
        var $domObjctW = $(domA);
        var domObjct = $domObjctW[0];
        var $domObjct = $(domObjct);
        var scolY = $domObjct.scrollTop();
        var scolY2 = scolY;
        var domView = $domObjctW.find(view).eq(0);
        var Wheight = 0;
        var Nheight = 0;
        var Uy = 0;
        var Yinfo1 = {};
        var Yinfo2 = {};
        var Yinfo1Ary = [];
        var starMov = false;
        var $window = $(window);
        var scollBar = $("<div></div>");
        var touchObjct = null;
        var touchesA;
        scollBar.css({
            width: 3,
            height: 100,
            borderRadius: 3,
            background: "#000",
            opacity: 0,
            position: "absolute",
            top: 50,
            right: 2,
            zIndex: 20,
            transition: "cubic-bezier(0,0.3,0.5,0.8) opacity 0.3s",
            "-webkit-transition": "cubic-bezier(0,0.3,0.5,0.8) opacity 0.3s"
        });
        $domObjctW.append(scollBar);

        function setscroll(numY) {
            var scolY2 = -numY;
            if (scolY2 < 0) {
                $domObjct.scrollTop(0);
                domView.css({
                    transform: "translateY(" + numY + "px)",
                    "-webkit-transform": "translateY(" + numY + "px)"
                })
            } else {
                $domObjct.scrollTop(scolY2);
                domView.css({
                    transform: "translateY(" + 0 + "px)",
                    "-webkit-transform": "translateY(" + 0 + "px)"
                })
            }
        }

        function Calculation() {
            if (isNaN(Nheight)) {
                Wheight = $domObjctW.height();
                Nheight = domView.height()
            }
            var bizhi = Nheight / Wheight;
            if (bizhi < 1 || hideScoll) {
                scollBar.hide()
            } else {
                scollBar.show()
            }
            var barHt = Wheight / bizhi;
            var topa = -scolY2 / bizhi;
            if (topa < 0) {
                barHt += topa;
                topa = 0
            }
            if (topa + barHt > Wheight) {
                barHt = Wheight - topa
            }
            scollBar.css({
                height: barHt,
                top: -Math.min(scolY2, 0) + topa
            })
        }
        domView.find("img").load(Calculation);
        Calculation();
        addEnterframe(function () {
            if (starMov) {
                if (scolY2 > 0 || Nheight <= Wheight) {
                    Uy = -scolY2 / 5;
                    callback(scolY2, true)
                } else if (Nheight > Wheight && scolY2 < Wheight - Nheight) {
                    Uy = (Wheight - Nheight - scolY2) / 5;
                    callback(scolY2 - (Wheight - Nheight), true)
                } else {
                    Uy *= .95
                }
                scolY2 += Uy;
                setscroll(scolY2);
                scolY = scolY2;
                Calculation();
                if (Math.abs(Uy) <= .001) {
                    starMov = false;
                    scollBar.css("opacity", 0)
                } else {
                    scollBar.css("opacity", .5)
                }
            }
        });
        var tou0Pagy = 0;
        domObjct.addEventListener("touchstart", function (e) {
            touchNum = 1;
            if (e.touches.length < 2) {
                touchesA = e.touches;
                touchObjct = touchesA[0];
                moveY = touchObjct.pageY;
                moveX = touchObjct.pageX;
                tou0Pagy = moveY;
                Yinfo1Ary = [];
                Yinfo1Ary.push({
                    y: moveY,
                    tm: new Date().getTime
                });
                starMov = false;
                Uy = 0
            }
        }, true);
        domObjct.addEventListener("touchmove", function (e) {
            e.preventDefault();
            if (e.touches.length > 1 && Math.abs(e.touches[0].pageY - tou0Pagy) < 5) {
                return
            }
            if (touchNum > -1) {
                touchObjct = e.touches[0];
                tou0Pagy = touchObjct.pageY;
                var nmvY = touchObjct.pageY - moveY;
                var nmvX = touchObjct.pageX - moveX;
                if (Math.abs(nmvY * 2) > Math.abs(nmvX)) {
                    Wheight = $domObjctW.height();
                    Nheight = domView.height();
                    if (isNaN(scolY)) {
                        scolY = $domObjct.scrollTop()
                    }
                    if (scolY2 > 0 || Nheight <= Wheight || Nheight > Wheight && scolY2 < Wheight - Nheight) {
                        scolY2 = scolY + nmvY / 5;
                        if (scolY2 > 100) {
                            scolY2 = 100
                        }
                        if (Nheight > Wheight) {
                            if (scolY2 < Wheight - Nheight) {
                                callback(scolY2 - (Wheight - Nheight), false);
                                if (scolY2 < Wheight - Nheight - 100) {
                                    scolY2 = Wheight - Nheight - 100
                                }
                            } else {
                                callback(scolY2, false)
                            }
                        } else {
                            callback(scolY2, false)
                        }
                    } else {
                        scolY2 = scolY + nmvY;
                        callback(0, false)
                    } if (touchObjct.pageY >= $window.height() || touchObjct.pageY <= 0 || touchObjct.pageX >= $window.width() || touchObjct.pageX <= 0) {
                        touchend_hs()
                    }
                    if (Wheight <= Nheight) {
                        if (scolY2 < Wheight - Nheight - 100) {
                            scolY2 = Wheight - Nheight - 100
                        }
                    } else {
                        if (scolY2 < -100) {
                            scolY2 = -100
                        }
                    } if (scolY2 > 100) {
                        scolY2 = 100
                    }
                    Yinfo1Ary.push({
                        y: scolY2,
                        tm: new Date().getTime()
                    });
                    setscroll(scolY2);
                    Calculation();
                    scollBar.css("opacity", .5)
                }
                if (Yinfo1Ary.length > 1) {
                    Yinfo2 = Yinfo1Ary[Yinfo1Ary.length - 1];
                    var Yinfo1 = Yinfo1Ary[Yinfo1Ary.length - 2];
                    Uy = (Yinfo2.y - Yinfo1.y) / (Yinfo2.tm - Yinfo1.tm) * 30;
                    Uy = Math.min(Uy, 70);
                    Uy = Math.max(Uy, -70);
                    if (isNaN(Uy)) {
                        Uy = 0
                    }
                    if (-Uy * 5 + 2 > tou0Pagy) {
                        starMov = true;
                        touchNum--
                    }
                }
            }
        }, true);

        function touchend_hs(e) {
            try {
                var touchesleg = e.touches.length
            } catch (e) {
                touchesleg = 0
            }
            touchNum--;
            if (touchNum > -1) {
                clearTimeout(setTimesss);
                if (Yinfo1Ary.length > 1) {
                    Yinfo2 = Yinfo1Ary[Yinfo1Ary.length - 1];
                    var Yinfo1 = Yinfo1Ary[Yinfo1Ary.length - 2];
                    Uy = (Yinfo2.y - Yinfo1.y) / (Yinfo2.tm - Yinfo1.tm) * 30;
                    Uy = Math.min(Uy, 70);
                    Uy = Math.max(Uy, -70);
                    if (Math.abs(Uy) < 5) {
                        scollBar.css("opacity", 0)
                    }
                }
                scolY = scolY2
            }
            if (touchesleg < 1) {
                starMov = true
            }
            if (isNaN(Uy)) {
                Uy = 0
            }
        }
        domObjct.addEventListener("touchend", touchend_hs, true)
    }, addTouchEevent: function (type, dom, callback, isenab) {
        if (!window["addEventListener"]) return;
        var userAge = "";
        if (window["navigator"]) {
            userAge = navigator["userAgent"] || ""
        }
        var ismobl = userAge.indexOf("hone") > -1 || userAge.indexOf("ios") > -1 || userAge.indexOf("Ios") > -1 || userAge.indexOf("IOS") > -1 || userAge.indexOf("ndroid") > -1;
        callback = callback || function () {};
        isenab = isenab || false;
        var isstarmouse = false;
        if (ismobl) {
            $(dom).each(function (index, element) {
                var thiso = $(this);
                var pgX = 0;
                var pgY = 0;
                var pgXa = 0;
                var pgYa = 0;

                function touchstart_hs(e) {
                    pgX = e.touches[0].pageX;
                    pgY = e.touches[0].pageY;
                    pgXa = pgX;
                    pgYa = pgY
                }

                function touchmove_hs(e) {
                    pgXa = e.touches[0].pageX;
                    pgYa = e.touches[0].pageY;
                    if (isenab) return;
                    if (type.indexOf("right") > -1 || type.indexOf("left") > -1) {
                        if (Math.abs(pgXa - pgX) > Math.abs(pgYa - pgY) + 3) {
                            e.preventDefault()
                        }
                    }
                    if (type.indexOf("top") > -1 || type.indexOf("bottom") > -1) {
                        if (Math.abs(pgXa - pgX) + 3 < Math.abs(pgYa - pgY)) {
                            e.preventDefault()
                        }
                    }
                }

                function touchend_hs(e) {
                    if (type.indexOf("left") > -1) {
                        if (Math.abs(pgXa - pgX) > Math.abs(pgYa - pgY) + 30 && pgXa < pgX) {
                            callback(thiso, "left")
                        }
                    }
                    if (type.indexOf("right") > -1) {
                        if (Math.abs(pgXa - pgX) > Math.abs(pgYa - pgY) + 30 && pgXa > pgX) {
                            callback(thiso, "right")
                        }
                    }
                    if (type.indexOf("top") > -1) {
                        if (Math.abs(pgXa - pgX) + 30 < Math.abs(pgYa - pgY) && pgYa < pgY) {
                            callback(thiso, "top")
                        }
                    }
                    if (type.indexOf("bottom") > -1) {
                        if (Math.abs(pgXa - pgX) + 30 < Math.abs(pgYa - pgY) && pgYa > pgY) {
                            callback(thiso, "bottom")
                        }
                    }
                }
                thiso[0].addEventListener("touchstart", touchstart_hs);
                thiso[0].addEventListener("touchmove", touchmove_hs);
                thiso[0].addEventListener("touchend", touchend_hs)
            })
        } else {
            var thiso;
            var pgX = 0;
            var pgY = 0;
            var pgXa = 0;
            var pgYa = 0;

            function mousedown_hs(e) {
                pgX = e.pageX;
                pgY = e.pageY;
                pgXa = pgX;
                pgYa = pgY;
                thiso = $(this);
                $(window).mousemove(mousemove_hs);
                $(window).mouseup(mouseup_hs)
            }

            function mousemove_hs(e) {
                pgXa = e.pageX;
                pgYa = e.pageY
            }

            function mouseup_hs(e) {
                $(window).unbind("mousemove");
                $(window).unbind("mouseup");
                if (type.indexOf("left") > -1) {
                    if (Math.abs(pgXa - pgX) > Math.abs(pgYa - pgY) + 30 && pgXa < pgX) {
                        callback(thiso, "left")
                    }
                }
                if (type.indexOf("right") > -1) {
                    if (Math.abs(pgXa - pgX) > Math.abs(pgYa - pgY) + 30 && pgXa > pgX) {
                        callback(thiso, "right")
                    }
                }
                if (type.indexOf("top") > -1) {
                    if (Math.abs(pgXa - pgX) + 30 < Math.abs(pgYa - pgY) && pgYa < pgY) {
                        callback(thiso, "top")
                    }
                }
                if (type.indexOf("bottom") > -1) {
                    if (Math.abs(pgXa - pgX) + 30 < Math.abs(pgYa - pgY) && pgYa > pgY) {
                        callback(thiso, "bottom")
                    }
                }
            }
            $(dom).mousedown(mousedown_hs)
        }
    }, allChecked: function (qx, dx) {
        var quanx = $(qx);
        var danx = $(dx);
        var isTrigall = true;
        var setTineout;
        var seTtimout2;

        function seTtimout2_hs() {
            var allselc = quanx.eq(0).is(":checked");
            if (isTrigall) {
                danx.each(function (index, element) {
                    var thischeck = $(this).is(":checked");
                    if (allselc != thischeck) {
                        $(this).trigger("click")
                    }
                })
            }
        }

        function quanxchange() {
            isTrigall = false;
            setTimeout(function () {
                isTrigall = true
            }, 20);
            var isallche = true;
            danx.each(function (index, element) {
                if (!$(this).is(":checked")) {
                    isallche = false
                }
            });
            if (isallche) {
                quanx.each(function (index, element) {
                    if (!$(this).is(":checked")) {
                        $(this).trigger("click")
                    }
                })
            } else {
                quanx.each(function (index, element) {
                    if ($(this).is(":checked")) {
                        $(this).trigger("click")
                    }
                })
            }
        }
        quanx.change(function () {
            var ischecked = $(this).is(":checked");
            quanx.each(function (index, element) {
                var isthchage = $(this).is(":checked");
                if (ischecked != isthchage) {
                    $(this).trigger("click")
                }
            });
            clearTimeout(seTtimout2);
            seTtimout2 = setTimeout(seTtimout2_hs, 5)
        });
        danx.change(function () {
            clearTimeout(quanxchange);
            setTineout = setTimeout(quanxchange, 5)
        })
    }, adddragDom: function (stardm, targetdm, movetext, textret, idrt, tarret, callback, outback) {
        textret = textret || false;
        idrt = idrt || false;
        tarret = tarret || false;
        callback = callback || function () {};
        outback = outback || function () {};
        var mousetar = $(movetext);
        var overDom;
        var mousedon = false;
        var stardmthis;
        var mousedomOBj;
        var $stardm = $(stardm);
        var $targetdm = $(targetdm);
        var $document = $(document);
        $stardm.mousedown(function (e) {
            var documen = $(this).text();
            $(this).addClass("newtime");
            mousedomOBj = $(this);
            var idstrA = "";
            if (idrt) {
                idstrA = eval("$(this)" + idrt)
            }
            if (textret) {
                documen = eval("$(this)" + textret)
            }
            mousetar.text(documen);
            mousetar.attr("idstrA", idstrA);
            mousedon = true;
            console.log(mousedon);
            document.ondragstart = function (e) {
                e.preventDefault()
            };
            $document.unbind("mousemove");
            $document.mousemove(function (e) {
                mousetar.show().css({
                    left: e.pageX,
                    top: e.pageY
                })
            });
            return false
        });
        $document.mouseup(function (e) {
            $document.unbind("mousemove");
            document.ondragstart = function (e) {};
            mousetar.hide();
            if (overDom && mousetar.text() != "") {
                var overDomRet = overDom.text;
                if (tarret) {
                    overDomRet = eval("overDom" + tarret + "('" + mousetar.text() + "')")
                } else {
                    overDom.text(mousetar.text())
                }
                callback(mousetar.attr("idstrA"), overDom, mousetar.text());
                mousetar.text("")
            } else {
                if ($(".newtime").length > 0) {
                    outback(mousedomOBj)
                }
            }
            mousedomOBj = null;
            $stardm.removeClass("newtime")
        });
        $targetdm.mouseover(function () {
            overDom = $(this)
        });
        $targetdm.mouseout(function () {
            overDom = null
        });
        $stardm.mouseup(function () {
            $(this).removeClass("newtime")
        })
    }, elementInput: function (dom, input) {
        input = input || "input";
        var $dom = $(dom);

        function init() {
            $dom.each(function (index, element) {
                var thiso = $(this);
                thiso.find(input).val(thiso.text())
            })
        }
        init();
        $(dom).mousedown(function () {
            var thiso = $(this);
            thiso.attr("contenteditable", true)
        }).blur(function () {
            var thiso = $(this);
            thiso.find(input).val(thiso.text());
            thiso.removeAttr("contenteditable")
        });
        return init
    }, mAlert: function (text, time, isscroll) {
        var htmls = $("html");
        var mAlertClass = $(".mAlertClass");
        if (mAlertClass.length > 0) mAlertClass.remove();
        time = time || 3e3;
        isscroll = isscroll || false;
        var divalert = $("<div class='mAlertClass' style='position:fixed; width:100%; height:100%; z-index:10000; left:0px; top:0px;'><div style='font-size:13px; color:#fff; background:rgba(0,0,0,0.6); line-height:40px; width:200px; text-align:center; overflow:hidden; left:50%; top:50%; margin-left:-100px; margin-top:-20px; position:absolute; border-radius:5px;'>" + text + "</div></div>");
        $("body").append(divalert);

        function removets() {
            divalert.remove();
            htmls.css({
                borderRight: 0,
                overflowY: "visible"
            })
        }
        if (!isscroll) {
            if (window["addEventListener"]) {
                divalert[0].addEventListener("touchstart", function (e) {
                    e.preventDefault()
                })
            }
            var divapen = $("<div></div>");
            var divapenn = $("<div></div>");
            divapen.css({
                clear: "both",
                width: 100,
                height: 100,
                overflowY: "scroll",
                position: "absolute",
                top: 0,
                left: 0
            });
            divapen.append(divapenn);
            $("body").append(divapen);
            htmls.css({
                overflow: "hidden",
                borderRight: divapen.width() - divapenn.width() + "px solid #eee"
            });
            divapen.remove()
        }
        setTimeout(removets, time);
        return removets
    }, t15: function (fn) {
        if (!YeffectAttr.YeffectT15time) {
            YeffectAttr.YeffectT15time = setInterval(function () {
                for (var i = 0; i < YeffectAttr.YeffectT15Arry.length; i++) {
                    YeffectAttr.YeffectT15Arry[i]()
                }
            }, 15)
        }
        YeffectAttr.YeffectT15Arry.push(fn)
    }, t30: function (fn) {
        if (!YeffectAttr.YeffectT30time) {
            YeffectAttr.YeffectT30time = setInterval(function () {
                for (var i = 0; i < YeffectAttr.YeffectT30Arry.length; i++) {
                    YeffectAttr.YeffectT30Arry[i]()
                }
            }, 30)
        }
        YeffectAttr.YeffectT30Arry.push(fn)
    }, t50: function (fn) {
        if (!YeffectAttr.YeffectT50time) {
            YeffectAttr.YeffectT50time = setInterval(function () {
                for (var i = 0; i < YeffectAttr.YeffectT50Arry.length; i++) {
                    YeffectAttr.YeffectT50Arry[i]()
                }
            }, 50)
        }
        YeffectAttr.YeffectT50Arry.push(fn)
    }, t100: function (fn) {
        if (!YeffectAttr.YeffectT100time) {
            YeffectAttr.YeffectT100time = setInterval(function () {
                for (var i = 0; i < YeffectAttr.YeffectT100Arry.length; i++) {
                    YeffectAttr.YeffectT100Arry[i]()
                }
            }, 100)
        }
        YeffectAttr.YeffectT100Arry.push(fn)
    }, t200: function (fn) {
        if (!YeffectT200time) {
            YeffectAttr.YeffectT200time = setInterval(function () {
                for (var i = 0; i < YeffectAttr.YeffectT200Arry.length; i++) {
                    YeffectAttr.YeffectT200Arry[i]()
                }
            }, 200)
        }
        YeffectAttr.YeffectT200Arry.push(fn)
    }, adddragupEvent: function (fn, bottompx) {
        bottompx = bottompx || window["setbottompx"] || 50;
        setbottompx = bottompx;
        YeffectAttr.$upary.push(fn);
        if (window["ISadddragupEvent"]) return;
        ISadddragupEvent = true;
        var doucmnd = $(document);
        var windA = $(window);
        var srintime;

        function srintime_hs() {
            if (windA.scrollTop() > doucmnd.height() - windA.height() - setbottompx) {
                YeffectAttr.dragupEvent();
            }
        }
        srintime_hs();
        windA.scroll(srintime_hs)
    },
    footFixedInput: function (elAry, ipt, isloop, foucTime) {
        elAry = elAry || [];
        if (elAry.length < 1) return;
        var foter = [];
        var marTop = [];
        for (var i = 0; i < elAry.length; i++) {
            foter.push($(elAry[i].el));
            marTop.push(elAry[i].tp);
        }
        var foterInput = $(ipt);

        var isSetfirst = isloop || false;
        if (foucTime != 0) {
            foucTime = foucTime || 10;
        }
        var yuancH = $(window).scrollTop();
        var $window = $(window);
        var $document = $(document);
        var htmlbody = $("html,body");
        var focuTop = 0;
        var keybordH = 0;
        var isfocs = false;
        var fochStyle = new Array(foter.length);
        var windoHt = 0;
        var docuHt = 0;
        var isloadsize = false;
        var isfirst = true;

        function gethET_() {
            windoHt = $window.height();
            docuHt = $document.height();
            focuTop = $window.scrollTop();
        }

        function _setOpacity_() {
            for (var i = 0; i < foter.length; i++) {
                foter[i].css("opacity", 0);
            }
        }

        function firstCall() {
            var sctopmax1 = docuHt - windoHt;
            _setOpacity_();
            setTimeout(function () {
                var sctopy = $window.scrollTop();
                htmlbody.scrollTop(999999999);
                var sctopmax2 = $window.scrollTop();
                htmlbody.scrollTop(sctopy);
                keybordH = sctopmax2 - sctopmax1;
                for (var i = 0; i < foter.length; i++) {
                    foter[i].css({
                        "top": $window.scrollTop() + (windoHt - keybordH),
                        "position": "absolute",
                        "margin-top": marTop[i],
                        opacity: 1
                    });
                }
            }, foucTime)
        }

        function getfotattr() {
            for (var i = 0; i < fochStyle.length; i++) {
                fochStyle[i] = foter[i].attr("style");
            }
        }
        foterInput.focusin(function () {
            isfocs = true;
            getfotattr();
            gethET_();
            if (isfirst || isloadsize) {
                firstCall();
                isfirst = false;
                isloadsize = false;
                if (isSetfirst) {
                    isfirst = true;
                }
            } else {
                _setOpacity_();
                setTimeout(function () {
                    for (var i = 0; i < foter.length; i++) {
                        foter[i].css({
                            "top": $window.scrollTop() + (windoHt - keybordH),
                            "position": "absolute",
                            "margin-top": marTop[i],
                            opacity: 1
                        });
                    }
                }, foucTime)
            }
        })
        foterInput.focusout(function () {
            isfocs = false;
            htmlbody.scrollTop(focuTop);
            for (var i = 0; i < fochStyle.length; i++) {
                if (fochStyle[i]) {
                    foter[i].attr("style", fochStyle[i]);
                } else {
                    foter[i].removeAttr("style");
                }
            }
        })
        if (document["addEventListener"]) {
            document.addEventListener("touchmove", function (e) {
                if (isfocs) {
                    e.preventDefault();
                }
            })
        }
        $window.resize(function () {
            if (isfocs) {
                gethET_();
                firstCall();
            }
            isloadsize = true;
        })
    }
};
//////////拓展///////////
$(function() {$(window).resize(function() {for (var i = 0; i < YeffectAttr.resizeHt_func.length; i++) { YeffectAttr.resizeHt_func[i](); }});});

 













 




