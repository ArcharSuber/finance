$(document).ready(function(){
/**
 * @author huanghaipeng
 * @desc 购买产品表单验证
 */
var bNum=parseInt($("#amountIncrease").val());//递增基数为1000
var times=parseInt($("#amountIncrease").val());//倍数，比如1000为输入值是1000的倍数
var min=$('#amountJoinMin').val();//最小金额
var max=$('#amountJoinMax').val();//最大金额
var rest=$('#amountJoinRest').val();//剩余金额
var amount=$('#investmentAmount').val();//输入框数据
var staticImg=$("#staticImg").val();
var planSign=$("#planSign").val();
resetStype();
$('#submitss').on('click',function(){
	if(validateForm()){
		$.ajax({
			type: "post",
			url: "#",
			async: false,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data:$("#investForm").serialize(),
			success: function(date){
				window.location.href="#";
			},
			error:function(date){
				alertMsg(".pop_s", "服务器链接异常");
			}
		});
	}
});
//金额输入框investmentAmount发生keyup时，替换文本框中的非数字内容，替换0开头的数字
$('#investmentAmount').on('keyup',function(){
	$('#investmentAmount').val($('#investmentAmount').val().replace(/\D/g,''));
	$('#investmentAmount').val($('#investmentAmount').val().replace(/^[0]*/g,''));
	//动态改变-号可用属性
	if($('#investmentAmount').val()-min<=0){
		$('#jian').attr("disabled",true);
	}else{
		$('#jian').removeAttr("disabled");
	}
	//动态改变+号可用属性
	if($('#investmentAmount').val()-max>=0||($('#investmentAmount').val()-rest>=0 && planSign!='H')){
		$('#plus').attr("disabled",true);
	}else{
		$('#plus').removeAttr("disabled");
	}
	resetStype();
});

//-号点击事件
$('#jian').on('click',function(){
	//alert('jian');
	amount=$('#investmentAmount').val();
	if(isNaN(amount)||amount==""){
		alertMsg(".pop_s","请输入数字");
		return;
	}
	amount=parseInt(amount);
	//console.log(amount);
	//如果输入金额-基础金额小于最小金额，进行if处理，否则进行else处理
	if(amount-min-bNum<0){
		amount=min;
	}else{
		if(amount%times==0){
			amount-=bNum;
		}else{
			amount=parseInt($('#investmentAmount').val()/times)*times;//输入框数据
		}
	}
	if(amount-max<0&&amount-rest<0&&$('#plus').attr("disabled")){
		$('#plus').removeAttr("disabled");
	}
	$('#investmentAmount').val(amount);
	resetStype();
});
//+号点击事件
$('#plus').on('click',function(){
	//alert('plus');
	amount=$('#investmentAmount').val();
	if(isNaN(amount)||amount==""){
		alertMsg(".pop_s","请输入数字");
		return;
	}
	amount=parseInt(amount);
	//console.log(amount);
	//如果输入金额+基础金额大于剩余金额或最大金额进行if处理，否则进行else处理
	if(amount+bNum-max>0){
		amount=max;
	}else if(amount+bNum-rest>0&&planSign!='H'){
		amount=rest;
	}else{
		if(amount%times==0){
			amount+=bNum;
		}else{
			amount=parseInt($('#investmentAmount').val()/times)*times+bNum;//输入框数据
		}
	}
	if(amount-min>0&&$('#jian').attr("disabled")){
		$('#jian').removeAttr("disabled");
	}
	$('#investmentAmount').val(amount);
	resetStype();
});
/**
 * 校验表单数据
 */
function validateForm(){
	var flag=false;
	if(valInvestForm()){
		flag=true;
	}
	return flag;
}
/**
 * 校验investmentAmount输入框数据
 */
function valInvestForm(){
	amount=$('#investmentAmount').val();
	if(isNaN(amount)||amount==""){
		alertMsg(".pop_s","请输入数字");
		return;
	}
	amount=parseInt(amount);
	amount=parseInt(amount/times)*times;//输入框数据
	if(min-0<=0){
		alertMsg(".pop_s","对不起，该产品已满额");
		return false;
	}
	if(amount-min<0){
		//alert("购买金额"+min+"元起，请重新输入");
		alertMsg(".pop_s","购买金额"+min+"元起，请重新输入");
		return false;
	}
	if((amount-rest>0&&planSign!='H')||amount-max>0){
		if(planSign!='H'){
			if(rest-max>0){
				amount=max;
			}else{
				amount=rest;
			}
		}else{
			amount=max;
		}
		
	}
	$('#investmentAmount').val(amount);
	return true;
}

function alertMsg(nodeId,msg){
	$(nodeId).html('<span>'+msg+'</span>');
	$(nodeId).fadeIn(0.3,function(){
		setTimeout(autoplay,3000);
		function autoplay(){
			 $(nodeId).fadeOut(0.3)
		}
	});
}

function resetStype(){
	amount=$('#investmentAmount').val();
	if(amount!=""){
		amount=parseInt(amount);
		min=parseInt(min);
		max=parseInt(max);
		if(amount-min<=0){
			$('#jian').css('backgroundImage', 'url(images/jian.png)');
			$('#plus').css('backgroundImage', 'url(images/add_hover.png)');
		}else if(amount-max>=0){
			$('#jian').css('backgroundImage', 'url(images/jian_hover.png)');
			$('#plus').css('backgroundImage', 'url(images/jia.png)');
		}else{
			$('#jian').css('backgroundImage', 'url(images/jian_hover.png)');
			$('#plus').css('backgroundImage', 'url(images/add_hover.png)');
		}
	}
}

//获取 url 的 参数方法
function UrlSearch() {
    var name,value;
    var str=location.href; //取得整个地址栏
    var num=str.indexOf("#");
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

    var arr=str.split("&"); //各个参数放到数组里
    for(var i=0;i < arr.length;i++){
        num=arr[i].indexOf("=");
        if(num>0){
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            this[name]=value;
        }
    }
}
var Request=new UrlSearch(); //实例化
pid = Request.pid;
uid = Request.uid;

//商品详情
$.ajax({
    type: "post",
    url: "http://47.94.215.108/finance_tp5/public/index.php/index/finance/inFor4",
    data:{
        "pid":pid,
        "uid":uid
    },
    dataType: "json",
    success: function (msg) {
        console.log(msg);
        var expire_time = msg.expire_time;
        if(expire_time<=0){
            $("#producttime").html('集资结束');
        }else{
            $("#producttime").after("<input type='hidden' value='"+expire_time+"' id='timesShow' />");
            setInterval("set_time()",1000);
        }

        var process = Math.ceil(((msg.money)/(msg.productmoney))*100);

        $("#yearmoney").html((msg.yearrate)*100);
        $("#productmonth").html((msg.productlong)/30);
        $("#productmoney").html(msg.productmoney);
        $("#process").html(process);
        $("#productname").html(msg.productname);
        $("#kemoney").html((msg.productmoney)-(msg.money));
        $("#balance").html(msg.balance);
        $("#producttimedate").html(msg.producttimedate);
        $("#xiangmomiaoshu").html(msg.productmsg);
    }
});

//产品下单
$('#submit').on('click',function() {
    ordermoney = $("#investmentAmount").val();
//            alert(ordermoney);
    $.ajax({
        type: "post",
        url: "http://47.94.215.108/finance_tp5/public/index.php/order/invest/addinvestorder",
        data: {
            "productid": pid,
            "uid": uid,
            "ordermoney": ordermoney
        },
        dataType: "json",
        success: function (msg) {
            console.log(msg);
            if (msg.code == 200) {
                alert(msg.msg);
                ordercard = msg.info.ordercard;

                $("#goumai").html('<input id="submitzhifu" type="button" value="立即支付" class="btn btn_orange w_10">');

            } else {
                alert("下单错误");
            }
        }, error: function () {
            alert("网络错误");
        }
    });
    //$("#goumai").html('<input id="submitzhifu" type="button" value="立即支付" class="btn btn_orange w_10">');
});

//点击选择支付方式,遮罩层
$(document).on("click","#submitzhifu",function(){
    $('#mark').show();
});
$("#closezc a").click(function(){
    $("#mark").hide();
});

// 支付
$(document).on('click','#ljzf',function(){
    var zffs = $("input[name='zf']:checked").val();
    if(zffs == undefined)
    {
        alert("请选择一种支付方式");
    }
    if(zffs == '余额')
    {
        $.ajax({
            type: "post",
            url: "http://47.94.215.108/finance_tp5/public/index.php/index/login/balanceUp",
            data:{
                "pid":pid,
                "uid":uid,
                "money":ordermoney,
                "ordercard":ordercard
            },
            dataType: "json",
            success: function (msg) {
                if(msg.code == 1025)
                {
                    alert("支付成功!");
                    location.reload();
                }else{
                    alert("余额不足,请进行充值!");
                }
            }
        })
    }
    if(zffs == '支付宝')
    {
        $.ajax({
            type: "post",
            url: "http://47.94.215.108/finance_tp5/public/index.php/index/pay/aly",
            data:{
                "pid":pid,
                "uid":uid,
                "money":ordermoney,
                "ordercard":ordercard
            },
            dataType: "json",
            success: function (msg) {
                window.location.href = msg;
            }
        })
    }
});


//投资记录
$(document).on("click","#in_record",function(){
    $.ajax({
        type:"post",
        url:"http://47.94.215.108/finance_tp5/public/index.php/index/finance/investment_records",
        data:{
            "pid":pid
        },
        dataType:"json",
        success: function (msg) {
            console.log(msg);
            var content = "";
            $.each(msg,function(ks,vs){
                content += '<tr>';
                content += '<td align="left" width="25%" style="padding-left:10px; color:#4A4A4A;">'+ vs.username +'<span class="tbline"></span> </td>';
                content += '<td style="color:#0caffe;"><span class="tbline"></span><i style="float:right; margin-right:10px;">'+ vs.ordermoney +'</i></td>';
                content += '<td align="right" style="padding-right:10px;">'+ vs.inserttime +'</td>';
                content += '</tr>';
            });
            $("#inrecord").html(content);
        }
    })
});

p = 1;
//点击加载更多
$(document).on("click",".yh-ckgd",function(){
    p = p + 1;
    $.ajax({
        type:"post",
        url:"http://47.94.215.108/finance_tp5/public/index.php/index/finance/get_more",
        data:{
            "pid":pid,
            "p":p
        },
        dataType:"json",
        success: function (msg) {
            console.log(msg);
            if(msg!= "")
            {
                var content = "";
                $.each(msg,function(ks,vs){
                    content += '<tr>';
                    content += '<td align="left" width="25%" style="padding-left:10px; color:#4A4A4A;">'+ vs.username +'<span class="tbline"></span> </td>';
                    content += '<td style="color:#0caffe;"><span class="tbline"></span><i style="float:right; margin-right:10px;">'+ vs.ordermoney +'</i></td>';
                    content += '<td align="right" style="padding-right:10px;">'+ vs.inserttime +'</td>';
                    content += '</tr>';
                });
                $("#inrecord").append(content);
            }else{
                var str = '<a href="javascript:;" class="btn-ckgd">没有更多了</a>';
                $(".yh-ckgd").html(str);
            }
        }
    })
});


});
