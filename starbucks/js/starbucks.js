$(function () {
    var $window = $(window);
    var $headerOpenButton = $("#mainMenuHamburger");
    var $mainMenuScreen = $headerOpenButton.next();
    var $headerMenuButtons = $("#mainMenuScreen>ul>li");
    var $listContainer = $headerMenuButtons.parent().next();
    var $viweport = $("html, body");
    var $container = $("#page2And3Container>ul");
    var $pageContents = $(".content");
    var viewIndex = 0;
    var viewPage = 1;
    var menuScreen = false; // 메뉴창 상태(true = 열림, false = 닫힘)
    var TimeoutQueue = [];
    var $overlay = $("<div></div>");
    $overlay.css({
        position: "absolute",
        top: 0, right: 0, bottom: 0, left:0, 
        opacity: 0.6,
        backgroundColor: "rgb(0,0,0)",
        display: "none"
    })
    
    pageContents(viewPage);
    window.addEventListener("wheel", function (event) {
        event.preventDefault(); // 기본 이벤트 제거
    }, { passive: false }); // 패시브 모드 해제

    window.addEventListener("wheel", function (event) {
        if ($viweport.is(":animated")) return; // 이전에 실행한 queue가 진행중이라면 wheel 이벤트 무시

        console.log("deltaY: " + event.deltaY);
        
        // 아래로 스크롤하면 인덱스 증가
        if (event.deltaY > 0) {
            // 이미 맨 아래칸(footer, viewpage = 5)이면 실행x
            if (viewPage >= 5) {
                console.log("already footer");
                return;
            }
            // 2페이지에서 3페이지로 스크롤시 옆으로 이동(스크롤x)
            else if (viewPage == 2) {
                console.log("side scrolling page2 to page3");
                $container.animate({marginLeft: "-100%"}, 600, "linear");
                viewPage++;
            }
            else {
                viewPage++;
                viewIndex++;                
            }
            // 메뉴창 자동 닫힘
            menuScreenClose();
        }
        // 위로 스크롤하면 인덱스 감소
        else if (event.deltaY < 0) {
            // 이미 맨 윗칸(header)이면 실행x
            if (viewPage <= 1) {
                console.log("already header");
                return;
            }
            // 3페이지에서 2페이지로 스크롤시 옆으로 이동(스크롤x)
            else if (viewPage == 3) {
                console.log("side scrolling page3 to page2");
                $container.animate({marginLeft: "0%"}, 600, "linear");
                viewPage--;
            }
            else if (viewPage >=5) {
                viewPage--;
                viewIndex--;
                $viweport.animate({scrollTop: $window.height() * viewIndex }, 600);
                return;                

            }
            else {
                viewPage--;
                viewIndex--;
            }
        }
        else return; // deltaY가 0이면 종료

        if(viewPage<5) {
            // 콘텐츠가 팝업되기전에 스크롤할시, 대기되어있던 콘텐츠 팝업대기열 삭제
            for (i=TimeoutQueue.length; i>0; i--) {
                this.window.clearTimeout(TimeoutQueue.shift()) 
                console.log("clear");
            }
        }

        if (viewPage<5) {
            $pageContents.fadeOut(400);
            $overlay.fadeOut(400); // 이전에 있던 오버레이 페이드아웃
        }

        // 인덱스에 비례한 위치로 이동
        $viweport.animate({scrollTop: $window.height() * viewIndex }, 600, pageContents(viewPage));
        console.log("index: " + viewIndex + ",page: " + viewPage);
    });
    

    // 햄버거버튼 클릭시 메뉴창 상태(menuScreen)에따라 메뉴창 온/오프
    $headerOpenButton.click(function(){
        if (menuScreen) {
            menuScreenClose();
        }
        else {
            menuScreenOpen();
        }
        console.log("hambugerclicked");
    });
    // 메뉴닫기버튼 클릭시 메뉴창 닫힘
    // (메뉴닫기버튼은 메뉴창안에 있으므로 메뉴창이 열려있을때만 클릭가능)
    // -> menuScreen 값이 항상 true(열림) 상태일때만 클릭됨
    $mainMenuScreen.children("button").click(function(){
        $headerOpenButton.trigger("click");
    });

    // 각 메뉴 클릭시 메뉴에 맞는 세부메뉴로 변경
    $headerMenuButtons.click(function(){
        var sameIndex = parseInt(this.getAttribute("index")); // 클릭한 버튼과 같은 인덱스
        // 세부메뉴들 클래스 제거 및 클릭된 메뉴에 해당하는 세부메뉴 클래스 부여
        $listContainer.children().removeAttr("class");
        $listContainer.children().eq(sameIndex).addClass("clickedList");
        // 메뉴들 클래스 제거후, 클릭된 메뉴만 클래스 재부여
        $(this).parent().children().removeAttr("class");
        $(this).addClass("clicked");
    });
    
    
    
    function ifReloadScrollToTop(){
        if(    (event.ctrlKey == true && event.keyCode == 82) //ctrl+R 
            || (event.keyCode == 116)) // function F5
        {
            window.scrollTo(0,0);
        }
    }
    document.onkeydown = ifReloadScrollToTop;
    // f5 또는 ctrl+R 로 새로고침시 최상단으로 이동

    function menuScreenClose() {
        $mainMenuScreen.removeAttr("style");
        $headerOpenButton.removeAttr("style");
        menuScreen = false;
    };
    function menuScreenOpen() {
        $mainMenuScreen.css({display: "block"});
        $headerOpenButton.css({
            width: "100vw", height: "100vh",
            position: "fixed", top: 0, left: 0,
            margin: 0, cursor: "default"});
        menuScreen = true;
    };
    function pageContents(pageIndex) {
        var timerIndex = window.setTimeout(function(){
            if (pageIndex < 5) {
                $overlay.prependTo($pageContents.eq(pageIndex-1).parent())
                .fadeIn(400,function(){ 
                    $pageContents.eq(pageIndex-1).fadeIn(400);
                    $pageContents.not(":eq("+(pageIndex-1)+")").removeAttr("style");
                });
            }
        },2000);
        TimeoutQueue.push(timerIndex);
        console.log("page:" + pageIndex);
        console.log("timerIndex:" + timerIndex);
        console.log("TimeoutQueue:" + TimeoutQueue);
    };
}); // /ready()
