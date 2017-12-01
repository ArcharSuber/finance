function input_clear(input){
	if(input.value==input.getAttribute('novalue')) input.value='';
}
function input_fill(input){
	if(input.value=='') input.value=input.getAttribute('novalue');
}
//防止自动填充
var clearFillTimeId;
function preventFill(){
	var res=$("[tingyun='password']");
	res.each(function(i){
		var noVal = $(this).attr("novalue")==undefined||$(this).attr("novalue")==null?'':$(this).attr("novalue");
		var val = $(this).val();
		if(val!=""&&val!=noVal){
			$(this).val(null);
			window.clearInterval(clearFillTimeId);
		}
	});
}
function startInterval(){
	clearFillTimeId = window.setInterval("preventFill()",1000);
}
//密码标签
function passLabel(res){
	if(res==undefined) res=$("[tingyun='password']");
	$(document.head).append('<style type="text/css">.passrow { position:relative; margin:0; padding:0; }.passrow i.pwdtxt { position:absolute; z-index:1; width:100%; overflow:hidden; left:0px; font-size:14px; padding-left:5px;}.passrow input { position:relative; z-index:2; background:none;}</style>');
	res.each(function(i) {
		var pwd=$(this);
		var label = pwd.wrap('<div class="passrow" style="height:auto;background:'+pwd.css("background")+'"></div>').parent().append('<i class="pwdtxt">'+pwd.attr("novalue")+'</i>').children(":last");
		label.css({"color":pwd.css("color"),"height":pwd.height()+"px","padding-left":pwd.css("padding-left"),"text-align":pwd.css("text-align"),"top":parseFloat(pwd.css("margin-top").replace('px',''))+parseFloat(pwd.css("padding-top").replace('px',''))+"px"});
		pwd.focus(function(){label.html("");try{window.clearInterval(clearFillTimeId);}catch(e){}})
		.blur(function(){if($(this).val()=="") label.html(pwd.attr("novalue"));});
	});
}
//验证函数
function doCheck(form,ckr){
try{
	var form=$(form), num=0, isright=true, inps=form.find("[name]").each(function() {
		var name=$(this).attr("name"), val=$(this).val(), r=ckr[name], tmp;
		var noVal = $(this).attr("novalue")==undefined||$(this).attr("novalue")==null?'':$(this).attr("novalue");
		if(val==noVal){
			val = "";
			$(this).val(null);
		}
		if(r!=undefined){
			if((tmp=r['none'])==false){
				if(val==''){
					return checkErr($(this),r['noneerr']==undefined?r['label']+'不能为空！':r['noneerr']);
				}
			}
			
			if((tmp=r['smalllen'])!=undefined && val.length<tmp){
				checkErr($(this),r['lenerr']==undefined?r['label']+"长度不能小于"+tmp+"字,应至少再输入"+(tmp-val.length)+"字！":r['lenerr']); return false;
			}
			if((tmp=r['maxlen'])!=undefined && val.length>tmp){
				checkErr($(this),r['lenerr']==undefined?r['label']+"长度超过最大限制"+tmp+"字,已超出"+(val.length-tmp)+"字！":r['lenerr']); return false;
			}
			if((tmp=r['length'])!=undefined && val.length!=tmp){
				checkErr($(this),r['lenerr']==undefined?r['label']+"长度必须为"+tmp+"字，请核对后重试！":r['lenerr']); return false;
			}
			if((tmp=r['reg'])!=undefined &&val!=''&& !tmp.test(val)){
				checkErr($(this),r['regerr']); return false;
			}
			if((tmp=r['func'])!=undefined && !r['func']()){
				checkErr($(this),r['funcerr']); return false;
			}
		}
		num++;
	});
	if(inps.length!=num) return false;
}catch(e){alert(">< 出错了:"+e); return false}
return true;
}
//验证 - 提示错误
function checkErr(inp,txt,istrue){
try{
	alert(txt);
	inp.select();
}catch(e){alert(">< 出错了:"+e)}finally{return false}
}
//字符串缓存对象
function StringBuffer(){
	this.a = [];
}
StringBuffer.prototype.append = function(b){
	this.a.push(b);
}
StringBuffer.prototype.toString = function(){
	return this.a.join("");
}
StringBuffer.prototype.clear = function(){
	var c = this.a.length;
	for(var i=c;i>0;i--){
		this.a.pop();
	}
}

// 精确小数点两位
function toDecimal(floatvar){
	var f_x = parseFloat(floatvar);
	if (isNaN(f_x)){
		return "";
	}
	var f_x = Math.round(floatvar*100)/100;
	var s_x = f_x.toString();
	var pos_decimal = s_x.indexOf('.');
	if (pos_decimal < 0){
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while (s_x.length <= pos_decimal + 2){
		s_x += '0';
	}
	return s_x;
}
