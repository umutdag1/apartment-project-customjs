$(window).on('resize', function () {
    var win = $(this); //this = window
    if (win.width() < 992) {
        if(!$("#app").hasClass("sidebar-collapse")){
            $("#app").addClass("sidebar-collapse");
        }
    } else {
        if($("#app").hasClass("sidebar-collapse")){
            $("#app").removeClass("sidebar-collapse");
        }
    }
});