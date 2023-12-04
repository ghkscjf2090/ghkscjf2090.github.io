$(function () {
    var $naviButton = $("#navicontainer>nav:first-of-type>div>div>p>button");
    var $subnavi = $naviButton.parent().parent().parent().parent().parent().children("ul");
    var clickedIndex;

    $naviButton.click(function(){
        clickedIndex = $(this).attr("index");
        $subnavi.removeAttr("style");
        $subnavi.eq(clickedIndex).show();
    });
    $subnavi.parent().mouseleave(function(){
        $subnavi.hide();

    });
}); // /ready()
