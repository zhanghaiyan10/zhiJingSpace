/**
 * Created by Administrator on 2017/9/20.
 */
//imgHover
$(function(){
    $("#content dl").hover(
        function(){
            $(this).find("dd .mask").fadeOut().end().children("dt").css("visibility","visible");
        },function(){
            $(this).find("dd .mask").fadeIn().end().children("dt").css("visibility","hidden");
        }
    )
});
//imgSlide
$(function(){
   var len = $("#main-wrap dl").length;
   var count = Math.ceil(len/4);
   var countPage = 1;
   var countWidth =  $("#content-wrap").width();
   $("#right").click(function(){
       if(!$("#content").is(":animated")){
          if(count===countPage){
              $("#content").animate({"left":0},800);
              countPage=1;
          }else{
              $("#content").animate({"left":"-="+countWidth+"px"},800);
              countPage++;
           }
       }
   });
    $("#left").click(function(){
        if(!$("#content").is(":animated")){
            if(countPage===1){
                $("#content").animate({"left":-(count-1)*countWidth+"px"},800);
                countPage=count;            }else{
                $("#content").animate({"left":"+="+countWidth+"px"},800);
                countPage--;
            }
        }
    })
});
//detail
$(function(){
    $("#year-anchor a").click(function(){
        var anchor = $(this).html();
        $.getJSON("works.json",function(data){
            for(var i=0; i<data.length;i++){
                if(data[i].year===anchor){
                    var url0 = data[i].images[0].url;
                    var fragment = "<img src="+url0+">";
                    for(j=1;j<data[i].images.length;j++){
                        var url = data[i].images[j].url;
                        fragment+="<img style='display:none' src="+url+">";
                    }
                }
            }
            if($("#detail").css("display")==="none"){
                $("#detail .outer").append(fragment);
            }
            $("#detail img:first")[0].onload=function(){
                $("#detail").fadeIn();
            }
        });

    });
    $("#content dl").click(function(){
        var anchor = $(this).children("dt").html();
        $.getJSON("works.json",function(data){
            for(var i=0; i<data.length;i++){
                if(data[i].name===anchor){
                    var url0 = data[i].images[0].url;
                    var fragment = "<img src="+url0+">";
                    var indexList = "";
                    for(j=1;j<data[i].images.length;j++){
                        var url = data[i].images[j].url;
                        fragment+="<img style='display:none' src="+url+">";
                    }
                    for(j=1;j<data[i].images.length+1;j++){
                        indexList+="<li>"+j+"</li>";
                    }
                }
            }
            if($("#detail").css("display")==="none"){
                $("#detail .outer").append(fragment);
                $("#detail .anchor").append(indexList);
            }
            $("#detail img:first")[0].onload=function(){
                $("#content dl dd span").hide();
                $("#detail").fadeIn();
            }
        });
    });
    $("#detail .close").click(function(){
        $("#detail").fadeOut();
        $("#detail img").remove();
        $("#detail .anchor").empty();
    })
    $("#content dl").one("click",function(){
        $(this).find("span").show();
    })
    $("#detail .anchor").livequery("click",function(event){
        var len = $("#detail img").length;
        $("#detail .anchor li").css("border","");
        if(event.target.nodeName==="LI"){
            var ind = $(event.target).index();
                $(event.target).css("border","1px solid #fff");

                $('#detail img').eq(ind).siblings("img").hide(1000,function(){
                    $('#detail img').eq(ind).show(1000);
                });
        }
    })
})
$(function(){
    if($("#detail .anchor li")){
        if(document.body.clientWidth<625){
            console.log($("#detail .anchor li"));
            console.log($(1));
            $("#detail .anchor li").css("margin-right","2px");}
    }
})

