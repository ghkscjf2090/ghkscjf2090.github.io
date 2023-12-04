$(function () {
   var $shorcutbutton = $("footer>div>div>div");
   var shorcutIndex = false;

   // 푸터 다른사이트 클릭 이벤트
   $shorcutbutton.click(function(){
      if (shorcutIndex) {
         $(this).next().slideUp(200);
         shorcutIndex = false;
      }
      else {
         $(this).next().slideDown(200);
         shorcutIndex = true;
      }
   });
   $shorcutbutton.next().mouseleave(function(){
      $shorcutbutton.click();
   });

}); // /ready()
