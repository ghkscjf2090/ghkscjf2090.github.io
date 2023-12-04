$(function () {
    var $html = $("html");
    var $headercontainer = $("#headercontainer");
    var $headermenus = $("#mainmenu>li");
    var $mobileButton = $headercontainer.children("header").children("button");
    var $submenus = $headermenus.children("ul");
    var $toTopIcon = $("#toTopIcon");
    var $mobileCloseButton = $mobileButton.next().children("button");

    // -1 = 현재 팝업되어있는 서브메뉴가 없음
    var menuClicked = -1;

    

    // 메인메뉴 클릭 이벤트
    $headermenus.click(function(){
        if ($submenus.is(":animated")) return;
        // 클릭한 메인메뉴와 현재 팝업되어 있는 서브메뉴가 동일하면
        if (menuClicked == $(this).attr("index")) {
            // 동일한 서브메뉴 사라짐
            $submenus.slideUp(function(){
                menuClicked = -1;
            });
        }
        // 클릭한 메인메뉴와 현재 팝업되어 있는 서브메뉴가 다르면
        else {
            // 다른 서브메뉴 사라짐 & 현재 클릭한 메인메뉴에 대응하는 서브메뉴 팝업
            menuClicked = $(this).attr("index");
            $submenus.slideUp();
            $(this).children("ul").slideDown();
        }
    });
    // 마우스가 헤더 영역 이탈시 서브메뉴 사라짐
    $headercontainer.mouseleave(function(){
        $submenus.slideUp();
        menuClicked = -1;

        // 모바일 버전일경우 메뉴창 사라짐
        if( window.innerWidth < 768){
            $mobileCloseButton.trigger("click");
        }
    });

    $mobileButton.click(function(){
        $(this).next().animate({
            right: "0%"
        }, 400);
    });
    $mobileCloseButton.click(function(){
        $(this).parent().animate({
            right: "-70%"
        },function(){
            menuClicked = -1;
            // 768px 이하에서 768px 이상으로 이동시 메뉴밀림현상 방지를 위해 right 제거
            $(this).removeAttr("style");
        });
        
    });

    // 최상단 이동하기 클릭이벤트
    $toTopIcon.click(function(e){
        e.preventDefault();
        $("html").animate({scrollTop: "0"});
    });

    // f5 또는 ctrl+R 로 새로고침시 최상단으로 이동
    function ifReloadScrollToTop(){
        if(    (event.ctrlKey == true && event.keyCode == 82) //ctrl+R 
            || (event.keyCode == 116)) // function F5
        {
            window.scrollTo(0,0);
        }
    }
    document.onkeydown = ifReloadScrollToTop;
}); // /ready()
