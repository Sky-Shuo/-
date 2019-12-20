define(["jquery"], function($){
    function download(){
         //数据下载
         $.ajax({
             url:"../data/nav.json",
             success:function(data){
                console.log(data);
                bannerArr = data.banner;
                for(var i = 0; i < bannerArr.length;i++){
                    $(`<li><a href="#"><img src="images/${bannerArr[i].img}" alt=""></a></li>`)
                    .appendTo(".b .pic_list");
                }
             },
             error:function(msg){
                 console.log(msg);

             }
         })
    }

    function banner(){
        $(function(){
            var aBtns = $(".b").find("ol").find("li");
            var aImgs = $(".b").find(".pic_list").find("li");
            var oUl = $(".b").find("ul");
            var iNow = 0; 
            var timer = null; 

            aBtns.click(function(){
                iNow = $(this).index();
                tab();
            })


          
            timer = setInterval(function(){
                iNow++;
                tab();
            }, 6000);

            
           
            function tab(){
                aBtns.attr("class", '').eq(iNow).attr("class", 'active');
               
                if(iNow == aBtns.size()){
                    aBtns.eq(0).attr("class", 'active');
                }

                oUl.animate({
                    left: -iNow * 1200
                }, 500, function(){

                    
                    if(iNow == aBtns.size()){
                        iNow = 0;
                        oUl.css("left", 0);
                    }
                })
               
            }


            $("#bb").mouseenter(function(){
                clearInterval(timer);
            }).mouseleave(function(){
                
                timer = setInterval(function(){
                    iNow++;
                    tab();
                }, 2000);
            })
        })
    }






    function zoom(){
        $("#small").mouseenter(function(){
            $("#big,#mark").show();
        }).mouseleave(function(){
            $("#big,#mark").hide();
        }).mousemove(function(ev){
            var l = ev.pageX - $("#small").offset().left - 100;
            //限制出界
            if(l <= 0){
                l = 0;
            }
            if(l >= 320){
                l = 320;
            }
            var t = ev.pageY - $("#small").offset().top - 100;
            if(t <= 0){
                t = 0;
            }
            if(t >= 320){
                t = 320;
            }
            $("#mark").css({
                left: l,
                top: t
            })

            //右边的大图片反方向对应放大倍数移动
            $("#big img").css({
                left: -2 * l,
                top: -2 * t
            })
        })

    }




    function bottom(){
        $.ajax({
            url:"../data/nav.json",
            success:function(data){
               console.log(data);
               var bottomArr = data.bottom;
               for(var i = 0; i < bottomArr.length;i++){
                   $(`<li><a href="#"><img src="images/${bottomArr[i].img}" alt=""></a></li>`)
                   .appendTo("#c1");
               }
            },
            error:function(msg){
                console.log(msg);

            }
        })
    }




     function gw(){
            $("#btn9").click(function(){
                $("#a9").show();

            })
            $("#btn").click(function(){
                $("#a9").hide();
            })
        
         }  
         
         



        
             //侧边栏划入显示
    function barshow(){
        $('.bar-ul').on('mouseenter', '.bar-ul-li', function(){
            
            $(this).find('.bar-ul-div').show();
        })
        $('.bar-ul').on('mouseleave', 'li', function(){
           
            $('.bar-ul').find('.bar-ul-div').css('display', 'none');
        })
    }

    //侧边栏数据下载
    function barDownload(){
        $.ajax({
            url: '../data/nav.json',
            success: function(data){
                var barArr= data.bar;
                console.log(barArr);
                for(var i = 0; i < barArr.length; i++){
                    var node = $(`
                    <li class="bar-ul-li">
                        <a href="">${barArr[i].title}</a>
                        <div class="bar-ul-div">

                        </div>
                    `).appendTo($('.bar .bar-ul'))
                    var aChild = barArr[i].childs;
                    for(var j = 0; j < aChild.length; j++){
                        $(`
                           <li>
                                <a href="">${aChild[j].title}</a>
                            </li>
                        `).appendTo(node.find('.bar-ul-div'));
                    }
                }
            },
            error: function(msg){
                console.log(msg)
            }
        })
    }

         


    return{
        download:download,
        banner:banner,
    
       bottom:bottom,
       gw:gw,
       zoom:zoom,
       barDownload:barDownload,
       barshow:barshow
    }
})




