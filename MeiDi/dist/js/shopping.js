define(["parabola", "jquery", "jquery-cookie"], function(parabola, $){
            function shopping(){
                $(function(){
                    sc_num();
                   
                    $.ajax({
                        url: "../data/nav.json",
                        success: function(data){
                            arr = data.shop;
                             for(var i = 0; i < arr.length; i++){
                                 var node = $(` <ul><li class = 'goods_item'>
                                     <div class = 'goods_pic'>
                                         <img src="images/${arr[i].img}" alt="">
                                     </div>
                                     <div class = 'goods_title'>
                                         <p>${arr[i].i}</p>
                                     </div>
                                     <div class = 'sc'>
                                         <div id = "${arr[i].id}" class = 'sc_btn'>加入购物车</div>
                                     </div>
                                 </li> </ul>`)
                                 node.appendTo(".goods_box");	
                             }
                             
                        },
                        error: function(msg){
                            console.log(msg);
                        }
                    })


                    $(".goods_box").on("click", "ul .sc_btn", function(){
                        var id = this.id;
                        var first = $.cookie("goods") == null ? true : false;
                        if(first){
                            var arr = [{id: id, num: 1}];
                            $.cookie("goods", JSON.stringify(arr), {
                                expires: 7
                            })
                        }else{
                            
                             var cookieStr = $.cookie("goods");
                             
                             var cookieArr = JSON.parse(cookieStr);
                             var same = false; 
                             for(var i = 0; i < cookieArr.length; i++){
                         
                                 if(cookieArr[i].id == id){
                                     same = true;
                                     cookieArr[i].num++;
                                     break;
                                 }
                             }
                             if(!same){
                                 var obj = {id: id, num: 1};
                                 cookieArr.push(obj);
                             }
         
                             $.cookie("goods", JSON.stringify(cookieArr), {
                                 expires: 7
                             })
                             
                        }
                        sc_num();
                        sc_msg();
                        ballMove(this);
                  
                    })

                })
             }



             $(".shop ").on("click", "ul .delete_goodsBtn", function(){
                var id = $(this).closest("li").attr("id");
                
                var cookieArr = JSON.parse($.cookie("goods"));
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){
                        cookieArr.splice(i, 1);
                        break;
                    }
                }
                if(!cookieArr.length){
                    $.cookie("goods", null);
                }else{
                    $.cookie("goods", JSON.stringify(cookieArr), {
                        expires: 7
                    })
                }
            
                $(this).closest("li").remove();
            
                sc_num();
               
            })

            $(".shop ul").on("click", ".sc_goodsNum button", function(){
                var id = $(this).closest("li").attr("id");
            
                var cookieArr = JSON.parse($.cookie("goods"));
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){
                        if(this.innerHTML == "+"){
                            cookieArr[i].num++;
                        }else{
                            cookieArr[i].num == 1 ? alert("数量不能小于1") : cookieArr[i].num--;
                        }
                        break;
                    }
                }
            
                $(this).nextAll("span").html(`${cookieArr[i].num}`);
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
                sc_num();
            
            })
            


             function sc_num(){
                var cookieStr = $.cookie("goods");
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    var sum = 0;
                    for(var i = 0; i < cookieArr.length; i++){
                        sum += cookieArr[i].num;
                    }	

                    $(".shop .sc_num").html(sum);
                }else{
                    $(".shop .sc_num").html(0);
                }
           }





       function sc_num(){
        var cookieStr = $.cookie("goods");
        if(cookieStr){
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for(var i = 0; i < cookieArr.length; i++){
                sum += cookieArr[i].num;
            }	

            $(".shop .sc_num").html(sum);
        }else{
            $(".shop .sc_num").html(0);
        }
   }


   
   //抛物线运动

   function ballMove(oBtn){

    $("#ball").css({
        display: 'block',
        left: $(oBtn).offset().left,
        top: $(oBtn).offset().top
    })
       var X = $(".sc_right .sc_pic").offset().left - $(oBtn).offset().left;
               var Y = $(".sc_right .sc_pic").offset().top - $(oBtn).offset().top;
               var bool = new Parabola({
                    el: "#ball",
                    offset: [X, Y],
                    duration: 500,
                    curvature: 0.001,
                    callback: function(){
                        $("#ball").hide();
                    }
               })

               bool.start();

     
   }



   $("#clearBtn").click(function(){
    $.cookie("goods", null);
    sc_num();
    sc_msg();
})


function sc_msg(){

    $(".shop ul").empty(); 
    $.ajax({
        url: "../data/nav.json",
        success: function(data){
           var data = data.shop;
            var cookieStr = $.cookie("goods");
            if(cookieStr){
                var cookieArr = JSON.parse(cookieStr);
                var newArr = [];

                for(var i = 0; i < data.length; i++){
                    for(var j = 0; j < cookieArr.length; j++){
                        if(data[i].id == cookieArr[j].id){
                            data[i].num = cookieArr[j].num;
                            newArr.push(data[i]);
                            break;
                        }
                    }
                }
                for(var i = 0; i < newArr.length; i++){
                    var node = $(`<li id = "${newArr[i].id}">
                                <div class = 'sc_goodsPic'>
                                    <img src="images/${newArr[i].img}" alt="">
                                </div>
                                <div class = 'sc_goodsTitle'>
                                    <p>${newArr[i].i}</p>
                                </div>
                               
                                <div class = 'sc_goodsNum'>
                                    <button>+</button>
                                    <button>-</button>
                                <span>${newArr[i].num}</span></div>
                                <div class = 'sc_goodsBtn'>购买</div>
                                <div class = 'delete_goodsBtn'>删除</div>
                            </li>`);
                    node.appendTo(".shop ul");
                }
              
               


            }
        },	
        error: function(msg){
            console.log(msg);
        }
    })
}






        
    return{
      shopping:shopping,
      sc_num:sc_num,
      sc_msg:sc_msg,
      ballMove:ballMove

    }

})



