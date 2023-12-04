$(function () {
    var $slidecontainer = $("#slidecontainer");
    var $slideMoveElement = $slidecontainer.children("ul");
    var $prevbutton = $("#menucontainer>div>div>button:first-child");
    var $nextbutton = $prevbutton.next().next();

    var slideInterval = 5000;
    var slideIndex = 0;
    var slideCount = $slideMoveElement.children("li").length;
    var $menus;

    // 상단 슬라이드 인디케이터생성 및 index 부여
    var $indicator =$("<div><ul></ul></div>");
    for(i = 0; i<slideCount; i++){
        $indicator.children("ul").append($("<li></li>"));
        $indicator.children("ul").children("li:eq(" + i + ")").attr("index", i);
    }
    // 상단 슬라이드 인디케이터 초기 설정
    $indicator.attr("id", "indicator").appendTo($slidecontainer);
    $indicator.children("ul").children("li:eq(0)").css({
        backgroundColor: "#253f85",
        cursor: "default"
    });


    // 상단 슬라이드 움직임
    var slideTimerIndex = setInterval(slideMove, slideInterval);
    function slideMove(){
        // 인디케이터 인덱스 변경 및 그에 따른 css 변경
        slideIndex++;
        slideIndex = slideIndex % 3;
        $indicator.children("ul").children("li").removeAttr("style");
        $indicator.children("ul").children("li:eq(" + slideIndex + ")").css({
            backgroundColor: "#253f85",
            cursor: "default"
        })

        // 상단 슬라이드 움직임
        $slideMoveElement.animate({
            marginLeft: "-100%"
        },600,function(){
            $slideMoveElement.children("li").eq(0).appendTo($slideMoveElement);
            $slideMoveElement.removeAttr("style");
        });
    }

    

    // 인디케이터 클릭 이벤트
    $indicator.children("ul").children("li").click(function(){
        // 클릭한 인디케이터 판별
        var clickedIndex = $(this).attr("index");
        // 현재 인디케이터 클릭시 클릭이벤트 종료
        if(clickedIndex == slideIndex) return;
        else {
            // 인디케이터 배경색상 변경
            $indicator.children("ul").children("li").removeAttr("style");
            $indicator.children("ul").children("li:eq("+clickedIndex+")").css({
                backgroundColor: "#253f85",
                cursor: "default"
            })

            // 슬라이드 타이머 종료
            clearInterval(slideTimerIndex);

            $slideMoveElement.removeAttr("style");

            // 클릭한 인디케이터가 현재 인디케이터보다 오른쪽일경우
            if(clickedIndex > slideIndex){
                // 클릭한 인디케이터에 해당하는 슬라이드 이미지로 이동
                $slideMoveElement.animate({
                    marginLeft: "-" + ((clickedIndex-slideIndex) * 100) + "%"
                },function(){
                    // 이동 완료후 슬라이드 이미지 요소들 정리
                    // 앞의 슬라이드 이미지들 뒤로 이동
                    $slideMoveElement.removeAttr("style");
                    for(i = slideIndex; i < clickedIndex; i++){
                        $slideMoveElement.children("li:eq(0)").appendTo($slideMoveElement);
                    }
                    // slideIndex 정리 및 슬라이드 타이머 재가동
                    slideIndex = clickedIndex;
                    slideTimerIndex = setInterval(slideMove, slideInterval);
                });
            }
            // 클릭한 인디케이터가 현재 인디케이터보다 왼쪽일 경우
            // if(clickedIndex < slideIndex) 
            else {
                for(i = clickedIndex; i<slideIndex; i++) {
                    $slideMoveElement.children("li:last-child").prependTo($slideMoveElement);
                }
                $slideMoveElement.css({
                    marginLeft: ((clickedIndex-slideIndex) * 100) + "%"
                }).animate({
                    marginLeft: "0%"
                },function (){
                    // slideIndex 정리 및 슬라이드 타이머 재가동
                    slideIndex = clickedIndex;
                    slideTimerIndex = setInterval(slideMove, slideInterval);
                });
            }
            }

    });

    // 중단 메뉴영역에서 이전&다음 버튼 클릭 이벤트
    $prevbutton.click(function(){
        $menus = $(this).next().children("ul");
        // 이동중이라면 반응x
        if ($menus.is(":animated")) return;

        // 모바일 상태가 아닐때
        if(window.innerWidth >= 768) {
            $menus.animate({
                marginLeft: "-25%"
            },function(){
                $menus.children("li:first-child").appendTo($menus);
                $menus.removeAttr("style");
            });
        }
        // 모바일 상태일때
        else {
            $menus = $(this).next().children("ul");
        
            $menus.animate({
                marginLeft: "-" + 100/3 + "%"
            },function(){
                $menus.children("li:first-child").appendTo($menus);
                $menus.removeAttr("style");
        });
        }
    });
    $nextbutton.click(function(){
        $menus = $(this).prev().children("ul");
        if ($menus.is(":animated")) return;

        if(window.innerWidth >= 768){
            $menus.children("li:last-child").prependTo($menus);
            $menus.css({
                marginLeft: "-25%"
            }).animate({
                marginLeft:"0%"
            })
        }
        else {
            $menus.children("li:last-child").prependTo($menus);
            $menus.css({
                marginLeft: "-" + 100/3 + "%"
            }).animate({
                marginLeft:"0%"
            })
        }
    });
}); // /ready()
