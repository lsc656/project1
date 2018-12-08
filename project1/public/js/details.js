/**
 * Created by web on 2018/12/6.
 */

var $img=$("#section div.enlarged-image");/*右侧放大图的父元素*/
var $ul=$("#section>div:first-child>div:nth-child(2)>div:first-child>div:nth-child(2)>div>ul");
var $btnp=$("#section>div:first-child>div:nth-child(2)>div:first-child>div:nth-child(2)").children().first();
var $btnn=$("#section>div:first-child>div:nth-child(2)>div:first-child>div:nth-child(2)").children().last();
var canRight=false;
var moved=0;
var li_length=75;

//初始隐藏m-point 和 右侧放大图
$(function(){
    $img.hide();
    $("#section>div:first-child>div:nth-child(2)>div:first-child>div:first-child div.m-point").hide();
    //改变小图ul长度
    var $ul=$("#section>div:first-child>div:nth-child(2)>div:first-child>div:nth-child(2)>div>ul");
    $ul.css("width",$ul.children().length*($ul.children().first().width()+20)+"px");
    //初始禁用ul左侧按钮，右侧按钮查看长度
    $btnp.attr("disabled","disabled");
    if($ul.width()<=300){
        $btnn.attr("disabled","disabled");
    }else{
        canRight=true;
    }
});

var $pmask=$("#section>div:first-child>div:nth-child(2)>div:first-child>div:first-child").on("mousemove","div.mask",function(e){
    var $mask=$(this);
    $(this).prev().css({
        "top":function(){
            var offtop;
            if(e.offsetY<($(this).height())/2){
                offtop=0
            }else if(e.offsetY>($(this).height())/2 && e.offsetY<($(this).prev().height())-($(this).height()-6)/2){
                offtop=e.offsetY-($(this).height())/2;
            }else{
                offtop=$(this).prev().height()-($(this).height()-2);
            }
            return offtop+"px"
        },
        "left":function(){
            var offleft;
            if(e.offsetX<($(this).width())/2){
                offleft=0
            }else if(e.offsetX>($(this).width())/2 && e.offsetX<($(this).prev().width())-($(this).width()-6)/2){
                offleft=e.offsetX-($(this).width())/2;
            }else{
                offleft=$(this).prev().width()-($(this).width()-2);
            }
            return offleft+"px"
        }
    })
    var toTop=parseFloat($(this).prev().css("top"));
    var toLeft=parseFloat($(this).prev().css("left"))

    var $img=$("#section div.enlarged-image>img")
   $img.css({
        "top":function(){
            return -toTop/$mask.height()*$img.height()+"px";
        },
        "left":function(){
            return -toLeft/$mask.width()*$img.width()+"px";
        }
    })
});


$pmask.on("mouseenter","div.mask",function(){
    $(this).prev().show();
    $img.show();
}).on("mouseleave","div.mask",function(){
    $(this).prev().hide();
    $img.hide();
});
var $lg_img=$("#section div.enlarged-image").children();
var $md_img=$("#section>div:first-child>div:nth-child(2)>div:first-child>div:first-child div.m-point").prev();

//切换上方大图片src
$ul.on("mouseenter","img",function(){
    var $src=$(this)[0].src;
    $lg_img.attr("src",$src);
    $md_img.attr("src",$src);
});
//左右移动
var maxMoved=$ul.children().length*($ul.children().first().width()+20)/li_length-4;
$btnp.on("click",function(){
    moved+=1;
    $ul.css("margin-left",moved*li_length+"px");
    $btnn.removeAttr("disabled");
    if(moved==0){
        $btnp.attr("disabled","disabled");
    }
});
$btnn.on("click",function(){
    moved+=-1;
    $btnp.removeAttr("disabled");
    $ul.css("margin-left",moved*li_length+"px");
    if(moved==-maxMoved){
        $btnn.attr("disabled","disabled");
    }
});