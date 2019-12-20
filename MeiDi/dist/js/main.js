console.log("加载完成");
/* 
    配置当前项目引入的模块
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        //引入banner图效果
        "nav": "nav",
        "shopping":"shopping",
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        "parabola": {
			exports: "_"
		}
    }
})

require(["nav","shopping"], function(nav,shopping){
   nav.download();
   nav.banner();
   nav.barDownload();
  nav.zoom();
    nav.bottom();
   nav.gw();
  nav.barshow();
shopping.shopping();
shopping.sc_num();
shopping.sc_msg();
shopping.ballMove();
})