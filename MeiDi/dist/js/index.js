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
            var aBtns = $("#bb").find("ol").find("li");
            var aImgs = $("#bb").find(".pic_list").find("li");
            var oUl = $("#bb").find("ul");
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
                document.title = iNow;
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





    return{
        download:download,
        banner:banner
    }
})



/* 
function download(){
    $.ajax({
        url:"../data/nav.json",
        
        success:function(data){
            
            var leftArr = data.left;
            for(var i = 0;i<leftArr.length;i++){
                $(`<button>${leftArr[i].title}</button>`).appenTo($("#div1"));
            }
            for(var i = 0;i<leftArr.length;i++){
               var node = $(`<div>
               <ul>
                  
               </ul>
           </div>`)
           node.appenTo($("#div1"));

           var childsArr = leftArr[i].childs;
           for(var j = 0;j<childsArr.length;j++){
               $(`<li>${arr[i].title}的:${childsArr[j]}</li>`).appenTo(node.find("ul"));
           }
            }
        },
        error:function(msg){
            console.log(msg);
        }
    })

    $("#div1").on("mouseenter","button",function(){
        $(this).addClass("active")
        $("#div1").find("div").eq($(this).index()).show().siblings("div").hide();
    })

    $("#div1").on("mouseleave",function(){
        $("#div1").find("button").removeClass("active");
        $("#div1").find("div").hide();
    })
} */