$(document).ready(function() {

    function getCookie(name)//取cookies函数
    {
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null)
            return unescape(arr[2]);
        return null;

    }
    var uid=getCookie('user_id');//登录的人cookie取ID

    //理财产品展示
    $.ajax({
        type: "post",
        url: "http://47.94.215.108/finance_tp5/public/index.php/index/finance/inFor",
        data:{
            "uid":uid
        },
        dataType: "json",
        success: function (msg) {
            //console.log(msg);
            var str = '';
            $.each(msg,function(k,v){
                var productmoneys = (v.productmoney);
                var productmoney = productmoneys/10000;
                var percentage   = Math.ceil(((v.money)/productmoneys)*100);
                str += '<a id="productcft" class="index-list index-che" href="javascript:void(0);" aid="'+ v.pid +'">';
                str += '<div class="list-tit clear"><span class="fl tit-name"><i></i><strong>'+ v.productname +'</strong></span> <span class="fr tit-site"><i></i><strong>内蒙古锡林格勒蒙古 </strong></span></div>';
                str += '<div class="list-main">';
                str += '<div class="main-l"><span class="per">'+ (v.yearrate)*100 +'<i>%</i></span><span class="add">A</span></div>';
                str += '<div class="main-m main-m-1"><span>'+ productmoney +'.<em>00</em><i>万</i></span></div>';
                str += '<div class="main-m main-m-2"><span class="day">'+ v.productlong +'<i>天</i></span></div>';
                str += '<div class="main-r"><span class="circle-blue circle-c'+percentage+'"></span><span class="val-per">'+ percentage +'<i>%</i></span></div>';
                str += '</div>';
                str += '</a>';
            });
            $('#cft_shows').html(str);
        }
    });

        //是否/认证
        //$.ajax({
        //    type: "post",
        //    url: "http://47.94.215.108/finance_tp5/public/index.php/index/Login/checkTrue",
        //    data:{
        //        "uid":uid
        //    },
        //    dataType: "json",
        //    success: function (msg) {
        //        console.log(msg);
        //    }
        //});

    $(document).on("click","#productcft",function(){
        var pid = $(this).attr('aid');
        if(uid == null)
        {
            location.href="infor.html"+"#pid="+pid+"&uid="+uid;
        }else{
            location.href="infor4.html"+"#pid="+pid+"&uid="+uid;
        }
    });

















});