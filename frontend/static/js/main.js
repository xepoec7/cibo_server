var win = $(window);
var hasNavBg = false;

win.scroll(function () {
    animateNav(win.scrollTop());
});

function animateNav(scroll) {
    if (scroll > 60 && !hasNavBg) {
        $("#mainNav").addClass("bg-dark")
        hasNavBg = true;
    }
    if (scroll < 60 && hasNavBg) {
        $("#mainNav").removeClass("bg-dark");
        hasNavBg = false;
    }
}