
/* =======================================================================================================
JETBOOK 任务清单:    1.添加菜单任务；按钮 ￥
                            |. 添加书籍 ￥
                                    |.监听input ￥
                                    |.添加确认按钮 ￥
                            |.添加自动阅读按钮 ￥
                                            |.设置翻页时间 监听iinput
                                            |.
                            |.添加选取章节slide_bar X
                2.slide_bar X
JETMUSIC 任务清单:　　

designBy：下水道的包工头
 =======================================================================================================*/
//切换应用
    $("#switch p img").click(function(){
        if($(this).is("#switchLeft")){
            if(!$("#stitle ul").is(":animated")){
                parseInt($("#stitle ul").css("left"))<=-306 ?
                $("#stitle ul").animate({"left":"-155"},700) :
                $("#stitle ul").animate({"left":"-=151"},700)
            }
        }else{
            if(!$("#stitle ul").is(":animated")){   
                parseInt($("#stitle ul").css("left"))>= -4 ?
                $("#stitle ul").animate({"left":"-155"},700):
                $("#stitle ul").animate({"left":"+=151"},700)
            }
        }
    })
// ----------------------------------------------------------------------------------
// JETBOOKs
    var JETBOOK = {
        elements : {
            clickCount : 1,
            hideCount :  0,
            $getb: $("#getBooker"),
            $autor: $("#autoReader"),
            $choose: $("#chooseArt"),
            $sure_btn : $("#sure_btn"),
            $right_bar : $("#right-bar"),
            windowDiv : "<div id='div'><div class= 'windowText'><p>请输入自动翻动速度</p><input type='number' id='timeNum' class='timeNum' ><input type='button' id='sure_btn' class='sure_btn' value='确定'></div></div>",
            windowDiv1: "<div id='div1'><div class='windowText'><p>请添加文件</p><p class='addBookerBtn'><span>上传书籍</span><input type='file' id='file' class='file'></p><input type='submit' id='sure_btn1' class='sure_btn1' onclick='readAsText()'  value='确定'></p></div></div>",
            judgeDrag : false,
            rate : $("#rangeBtn").width() / ($(document).height()-$(window).height())
        },

        stop : function(e){
            if(e.preventDefault){
                e.preventDefault();
            }else{
                e.returnValue = false;
            }
        },

        showBtn :  function(){
            this.elements.$getb.animate({
                "right": "100px",
            }, 300).show();

            this.elements.$autor.animate({
                "bottom": "100px"
            }, 300).show();

            this.elements.$choose.animate({
                "bottom": "70px",
                "right": "70px"
            }, 300).show();

            $("#desc_btn ul").hide(400);
            $("#desc_btn p").show(400);
        },
        hideBtn : function(){
            this.elements.$getb.animate({
                "right": "8%"
            }, 100).hide(500);
            this.elements.$autor.animate({
                "bottom": "2px"
            }, 100).hide(500);
            this.elements.$choose.animate({
                "bottom": "2px",
                "right": "8%"
            }, 300).hide(100);
            $("#desc_btn ul").show(400);
            $("#desc_btn p").hide(400);     
        },

        autoHeight: function(){
            window.scrollBy(0,window.innerHeight);
        },
        
    };

    //禁止刷新
    $(document).keydown(function(e){
        if(e.keyCode == 116){
            e.keyCode = 0;
            JETBOOK.stop(e);
        }
    })



    // 菜单按钮
    $("#desc_btn").click(function(e){
        JETBOOK.stop(e);
        (JETBOOK.elements.$getb.css("display") == "none") ? JETBOOK.showBtn() : JETBOOK.hideBtn();
    })

    $("#desc_btn").siblings().mouseenter(function(){
            if ($(this).css("color") == "rgb(255, 255, 255)"){
                let colorArr = ["#C0FF3E", "#FFFF00", "#0f0", "#00FFFF"];
                let randomNum = Math.round(Math.random() * (colorArr.length - 1));
                $(this).css("color", colorArr[randomNum]);
            }    
            }).mouseout(function(){
                $(this).css("color","rgb(255, 255, 255)");
        });       
    // ----------------------------------------------------------------------------
    $("#desc_btn").siblings().click(function(e){
        JETBOOK.elements.clickCount ++;
        if(JETBOOK.elements.clickCount % 2 == 0){
            if($(this).is("#autoReader")){
                $("body").append(JETBOOK.elements.windowDiv);
            }
            if($(this).is("#getBooker")){
                $("body").append(JETBOOK.elements.windowDiv1); 
            }
            if($(this).is("#chooseArt")){
                JETBOOK.elements.$right_bar.fadeIn(600);
                $("#desc_btn").siblings().fadeOut(300);
            }
        }else{
            if($("#autoReader").is(":visible")){
                $("#div").remove();
            }
            if($("#getBooker").is(":visible")){
                $("#div1").remove();
            }
            if($("#chooseArt").is(":visible")){
                $("#right-bar").fadeOut(100);
            }
        };
    //自动阅读
    $("#timeNum").focus(function (){    
        if($("#div").is(":visible")){
            $(document).keydown(function (e) {
                if (e.keyCode == 13) {
                    var scrollInterval = setInterval(JETBOOK.autoHeight,$("#timeNum").val());
                    (function (){
                        $(document).scroll(function(){
                            if ($("html").scrollTop() >= $(document).height() - $(window).height() - 10){
                                clearInterval(scrollInterval);   
                            }
                        })
                    }()),             
                    $("#div").remove();
                }
            })
        }    
    })
    // 自动阅读
    $("#sure_btn").click(function () {
        var scrollInterval = setInterval(JETBOOK.autoHeight,$("#timeNum").val());
        var stopDiv = '<div class="stopDiv" id="stopDiv">stop<div>';
        (function (){
            $(document).scroll(function(){
                if ($("html").scrollTop() >= $(document).height() - $(window).height() - 10){
                    clearInterval(scrollInterval);   
                }
            })
        }());
        $("#div").remove();
        
    });

    //选取书籍
    if(typeof FileReader != "undefined"){
        $("#sure_btn1").click(function () {
            $("#div1").remove();
        });
            $(document).keydown(function(e){
                if(e.keyCode == 13){
                    $("#div1").remove();
                }
            });
        }else{
            alert("您的浏览器不支持FileReader");
        }
    });
    //计算拖动
   
    
    // --------------------------------------------------------------------------------
    //菜单键去掉div
    if($("#div")||$("#div")){
        $("#desc_btn").click (function(){
            $("#div").remove();
            $("#div1").remove();  
            $("#right-bar").fadeOut();
            JETBOOK.elements.clickCount = 1;
        })
    }; 

    //双击回到顶部

    $(document).dblclick(function(e){
        let getBelow = e.clientY;
        if(getBelow > $("html").height()/2){
            console.log(11);
            $(document).scrollTop(0,0);
        }
    })

    //彩蛋
    $("#header").click(function(){
        let hideCount = JETBOOK.elements.hideCount++;
        if(hideCount>=20){
            $("#hideCover").slideDown(500);
            JETBOOK.elements.hideCount = 0;
        }
        $("#hideImg").click(function(){
            $("#hideCover").slideUp(500);
        })
        $("#hideCover img:eq(1)").dblclick(function(){
            console.log(1)
            location.href = "http://www.4399.com"
        })

    })

// ---------------------------------------------------------------------------------------
// JETMUSIC