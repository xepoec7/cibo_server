let nav = $('#mainNav'); // main navigation
var win = $(window);
var sections = $('.sec');

var hasNavBg = false;
var aboutVisible = false;
var chefVisible = false;
var dishesVisible = false;
var locationVisible = false;


$('.trail-right').hide();

// main navigation unhide and hide background
win.scroll(function () {

    animateNav(win.scrollTop());

    for (sec of sections) {
        var pageTop = win.scrollTop();
        var pageBottom = pageTop + win.height();
        var navs = $(".nav-link");
        if ($(sec).position().top +400 < pageBottom) {

            for (nav of navs) {
                if ($(nav).attr("href") == "#"+ $(sec).attr('id')) {
                    $('.active').removeClass("active");
                    $(nav).addClass("active");
                }
            }

            // If section is hidden 
            if ( $(sec).hasClass("hidden") ) {
                $(sec).removeClass("hidden");
                $(sec).addClass("visible");
            }
        } 
    }

    animateRotatingImg(win.scrollTop());
    animateTrails(win.scrollTop());
});

function animateNav(scroll) {
    if (scroll > 60 && !hasNavBg) {
        $("#mainNav").addClass("bg-dark")
        hasNavBg = true;
    }
    if (scroll < 60 && hasNavBg) {
        $("#mainNav").removeClass("bg-dark");
        hasNavBg = false;
        $(".active").removeClass("active");
        $(".home").addClass("active");
    }
}

function animateRotatingImg(scroll) {
    // animate pizza image
    if (scroll > 3090) {
        $('#img-pizza').animate(
            {deg: 180},
            {
                duration: 1200,
                step: function(now) {
                    $(this).css({
                        transform: 'rotate(' + now + 'deg)'
                    });
                }
            }
        );
    }

    // animate panino image
    if (scroll > 4044) {
        $('#img-panino').animate(
            {deg: 180},
            {
                duration: 1200,
                step: function(now) {
                    $(this).css({
                        transform: 'rotate(' + now + 'deg)'
                    });
                }
            }
        );
    }

    // animate desert image
    if (scroll > 4842) {
        $('#img-desert').animate(
            {deg: 180},
            {
                duration: 1200,
                step: function(now) {
                    $(this).css({
                        transform: 'rotate(' + now + 'deg)'
                    });
                }
            }
        );
    }
}

function animateTrails(scroll) {
    // animate right trail
    if (scroll > 3600) {
        $('#trail-right').removeClass("hidden");
        $('#trail-right').addClass('visible-slideDown')
    }

    // animate left trail
    if (scroll > 4674) {
        $('#trail-left').removeClass("hidden");
        $('#trail-left').addClass("visible-slideDown");
    }
}
