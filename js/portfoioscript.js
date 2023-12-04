$(function () {
    var $html = $("html");
    var $statusscreen = $("#statusscreen");
    var $prevbutton = $("#cussorbox>button:first-child");
    var $cloudSlider = $("#cloud>ul");
    var $titlecharactor = $statusscreen.next();
    var $blackout = $("#blackout");
    var $toTop = $blackout.next("a");
    var $loadcharactor = $("#loadcharactor");
    var $designcontainer = $("#designcontainer");
    var $programcontainer = $designcontainer.next();
    var $craftingcontainer = $programcontainer.next();
    var anvilItems = false;
    var $craftingarea = $craftingcontainer.children(":nth-child(2)");
    var parameter;
    var walkTime = 1600;
    var haloRightTime = 3000;
    
    function cloudhandler() {
        $cloudSlider.animate({
            marginLeft: "-100%"
        },10000,"linear",function () {
            $cloudSlider.removeAttr("style")});
    };

    var viewportHeight = 0;
    window.addEventListener("wheel", function (event) {
        event.preventDefault(); // 스크롤막기, 기본 이벤트 제거
    }, { passive: false }); // 패시브 모드 해제

    cloudhandler(); // 첫 구름이동 구현
    setInterval(cloudhandler,10000); //구름이동구현

    // 시작버튼
    $("#startbutton").click(function(){
        console.log("startbuttonclicked");
        $statusscreen.fadeIn(400);
    }); // statusscreen 표시

    // 스테이터스창 이전버튼
    $prevbutton.click(function(){
        console.log("statusprevbuttonclicked");
        $statusscreen.fadeOut(400);
    }); // statusscreen 사라짐
    
    // 스테이터스창 다음버튼
    $prevbutton.next().click(function(){
        viewportHeight = window.innerHeight;
        console.log("statusnextbuttonclicked");
        $prevbutton.trigger("click"); // statusscreen 사라짐
        setTimeout(function(){
            $titlecharactor.attr("src","images/title_charactor_walk.gif") // 캐릭터 상태 변화
            .animate({left:530},1000).animate({bottom:-64},1000,function(){ // 캐릭터 이동
                    $html.animate({scrollTop : viewportHeight},walkTime); // 스크롤 시작
                    $blackout.fadeIn(1000,function(){
                        $designcontainer.children("button").children("img:last-child").animate({
                            rotate: "360deg"
                        },haloRightTime).animate({
                            width: "0%"
                        },400);
                    }).fadeOut(1000,function(){ // 화면 암전후 밝아짐
                        $titlecharactor.removeAttr("style").attr("src","images/title_charactor_idle.png"); // 타이틀페이지 캐릭터 원상복구
                        $loadcharactor.animate({top: "0"},400,function(){ // 모험페이지 캐릭터 위에서 걸어옴
                            $(this).attr("src","images/load_charactor_idle.png");
                            $toTop.show(400);
                        }); // 모험페이지 캐릭터 상태 변화
                    });
            }); // titlepagecharactor 이동 구현
        },400);
    }); 

    // 디자인상자
    $designcontainer.children("button").click(function(){
        $loadcharactor.attr("src","images/load_charactor_walk.gif").addClass("firstToDesign");//상자앞까지 걸어감
        parameter = this;
        setTimeout(function(){
            $loadcharactor.attr("src","images/load_charactor_grap.png"); //상자앞 도착후 상자 여는모션
            boxClicked(parameter); // 박스 오픈 -> 디자인창 팝업
            setTimeout(function(){
                $loadcharactor.attr("src","images/load_charactor_V.png"); // 박스 오픈후 v모션
            },400);
        },walkTime);
    });
    
    // 디자인창 모두얻기 버튼
    $designcontainer.find("div>ul>button").click(function(){
        parameter = this;
        $programcontainer.children("button").children("img:last-child").animate({
            rotate: "360deg"
        },haloRightTime).animate({
            width: "0%"
        },400);
        getAllClicked(parameter); //창닫기 & 스크롤 시작
        $loadcharactor.attr("src", "images/load_charactor_walk.gif") //캐릭터 걷는 모션으로 변경
            .removeAttr("class") // 이전 animation 제거
            .addClass("designToSecond"); // 새로운 animation 부여로 애니매이션 시작
        setTimeout(function(){
            $loadcharactor.attr("src", "images/load_charactor_idle.png");
        },walkTime);
    }); // 디자인창 사라짐 + 화면&캐릭터 이동

    // 프로그램상자
    $programcontainer.children("button").click(function(){
        $loadcharactor.removeAttr("class").attr("src","images/load_charactor_walk.gif").addClass("secondToProgram");//상자앞까지 걸어감
        parameter = this;
        setTimeout(function(){
            $loadcharactor.attr("src","images/load_charactor_grap.png");
            boxClicked(parameter);
            setTimeout(function(){
                $loadcharactor.attr("src","images/load_charactor_V.png"); // 박스 오픈후 v모션
            },400);
        },walkTime);
    }); // 프로그램창 팝업
    
    // 프로그램창 모두얻기 버튼
    $programcontainer.find("div>ul>button").click(function(){
        parameter = this;
        $craftingcontainer.children("button").children("img:last-child").animate({
            rotate: "360deg"
        },haloRightTime).animate({
            width: "0%"
        },400);
        getAllClicked(parameter); //창닫기 & 스크롤 시작
        $loadcharactor.attr("src", "images/load_charactor_walk.gif") //캐릭터 걷는 모션으로 변경
            .removeAttr("class") // 이전 animation 제거
            .addClass("programToThird"); // 새로운 animation 부여로 애니매이션 시작
        setTimeout(function(){
            $loadcharactor.attr("src", "images/load_charactor_idle.png");
        },walkTime);
    }); // 프로그램창 사라짐 + 화면&캐릭터 이동
    
    // 제작용모루
    $craftingcontainer.children("button").click(function(){
        $loadcharactor.removeAttr("class").attr("src","images/load_charactor_walk.gif").addClass("thirdToAnvil");//모루앞까지 걸어감
        parameter = this;
        setTimeout(function(){
            $loadcharactor.css({transform: "scale(1,1)"}).attr("src","images/load_charactor_grap.png");
            setTimeout(function(){
                $loadcharactor.attr("src","images/load_charactor_V.png"); // 박스 오픈후 v모션
                boxClicked(parameter);
            },400);
        },walkTime);
    }); // 제작창 팝업
    
    // 제작창 모두넣기 버튼
    $craftingarea.find("ul>button").click(function(){
        console.log(this);
        $(this).parent().children("li").addClass("small"); // 아이템들 작아지는 효과
        $(this).parent().children(":first").animate({ // 아이템들 모루위로 이동
            left: "363px", bottom: "-500px", 
            },200);
        $(this).parent().children(":nth-child(2)").animate({
            left: "113px", bottom: "-500px", 
            },200);
        $(this).parent().children(":nth-child(3)").animate({
            left: "-137px", bottom: "-500px", 
            },200);
        $(this).parent().children(":nth-child(4)").animate({
            left: "-363px", bottom: "-500px", 
            },200);
        $(this).parent().children(":nth-child(5)").animate({
            left: "363px", bottom: "-250px", 
            },200);
        $(this).parent().children(":nth-child(6)").animate({
            left: "113px", bottom: "-250px", 
            },200);
        $(this).parent().children(":nth-child(7)").animate({
            left: "-137px", bottom: "-250px", 
            },200);
        setTimeout(function(){ // 이동후 제작창의 모루위에 아이템들 생성
            $craftingarea.find("div>img:first-child").css({visibility:"visible"}).animate({opacity: 1},400);
            console.log("create item complete");
            anvilItems = true;
        },1000);
    });

    // 제작창 제작 버튼
    $craftingcontainer.find("div>button").click(function(){
        console.log(this);
        if(anvilItems) { // 모루위 아이템 상태값(아이템이 생성되있으면)
            $(this).parent().find("div>img:nth-child(2)").css({visibility: "visible"}); // 모루위 내려치는 망치 보여짐
            setTimeout(function(){ // 일정횟수 망치 내려친 후
                $craftingcontainer.find("div>img:nth-child(3)").css({visibility: "visible"}); // 아이템 완성 빔 보여짐
                setTimeout(function(){ // 아이템 생성빔 보여진 후 망치 사라짐
                    $craftingcontainer.find("div>div>img:nth-child(2)").css({visibility: "hidden"});
                },300);
                setTimeout(function(){ // 아이템 생성빔 일정시간후 사라짐 & 숏컷창 보여짐
                    $craftingcontainer.find("div>img:nth-child(3)").css({visibility: "hidden"});
                    $craftingcontainer.children("ul").css({visibility: "visible"}).animate({opacity: 1},400);
                },700);
            },2300);
        };
    });

// 숏컷박스 닫기버튼
    $craftingcontainer.find("#shortcutbox>button").click(function(){
        console.log(this);
        $craftingcontainer.children(":not(button)").animate({opacity: "0"},400,function(){
            $(this).css({visibility: "hidden"}); // 제작용모루 제외한창들 사라짐
            $craftingarea.find("ul>li").removeAttr("class style"); // 제작창아이템들 원상복구
            $craftingarea.find("div>img").removeAttr("style"); // 제작창모루이미지 원상복구
            $loadcharactor.removeAttr("class").attr("src","images/load_charactor_walk.gif").addClass("anvilToHouse"); //집앞으로 이동
            setTimeout(function(){
                scrolling();
                $loadcharactor.removeAttr("style class");
                anvilItems = false; // 제작창위 아이템 이미지 상태 복구
                parameter = null; // 새로고침대비 리셋
            },walkTime);
        }); 
        // 캐릭터 이동 추가
    });

    function boxClicked(parameterObject){
        // svg loadcharactor 이동 구현 넣기
        console.log(parameterObject);
        $(parameterObject).next().css({visibility: "visible", display: "block"}).animate({opacity: 1},400);
    };
    function getAllClicked(parameterObject){
        console.log(parameterObject);
        $(parameterObject).parent().parent().animate({opacity: 0},400,function(){
            $(this).css({visibility: "hidden"})});
            // svg loadcharactor 이동 구현 넣기
            scrolling();
    };
        
    function scrolling(){            
            $html.animate({scrollTop : scrollY+1080},walkTime);
    };

    function ifReloadScrollToTop(){
        if(    (event.ctrlKey == true && event.keyCode == 82) //ctrl+R 
            || (event.keyCode == 116)) // function F5
        {
            window.scrollTo(0,0);
        }
    }
    document.onkeydown = ifReloadScrollToTop;
    // f5 또는 ctrl+R 로 새로고침시 최상단으로 이동
}); // /ready()
