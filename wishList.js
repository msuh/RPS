$(document).ready(function(){
	//populate page with items


    $('.img_makeWish').click(function(){
        var bot = $('.img_makeWish').css("bottom"),
            val, dur, h,
            dist = "190px";
        
        console.log("bot:",bot);
        if(bot == "-132px"){
            val = "+="+dist;
            dur = 3000;
            h = dist;

        } else{
            val = "-="+dist;
            dur = 1500;
            h = "0px";
        }
        $('.img_makeWish').animate({
            bottom: val
            // duration: dur
        });
    })
         
    
   


});