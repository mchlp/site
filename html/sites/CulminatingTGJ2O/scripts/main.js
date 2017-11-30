var bottomOfTitle = 0;
var prevTitle = $("#title");
var getBottomOfTitleInterval;
var included = false;

//when document is ready
$(document).ready(pageReady);

//page ready
function pageReady() {
    $(window).scroll(pageScroll);
    getBottomOfTitleInterval = setInterval(getBottomOfTitle, 500);
}

function getBottomOfTitle() {
    var curTitle = $("#title")
    if (curTitle !== prevTitle) {
        bottomOfTitle = curTitle[0].scrollHeight;
        clearInterval(getBottomOfTitleInterval);
    }
};


//page scroll
function pageScroll() {
    if ($(window).scrollTop() > bottomOfTitle) {
        $('#navBar').addClass("nav-bar-fixed");
    } else {
        $('#navBar').removeClass("nav-bar-fixed");
    }
}
