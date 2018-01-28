var slideIndex = 1;
var content = [];

//when document is ready
$(document).ready(pageReady);

//page ready
function pageReady() {
    $("#reflections").addClass("w3-green");
    getContent();
}

function afterShowContent() {
    document.onkeydown = keydown;
    showDivs(slideIndex);
    $("._image").click(buttonPress);
    $(document)[0].addEventListener('click', function() {
        try {
            if (!($("#_video")[0].paused)) {
                closeVideo();
            }
        } catch (TypeError) {}
    });
}

function closeVideo() {
    console.log("CLOSE")
    $("#_video")[0].pause();
    $("#_video")[0].currentTime = 0;
}

function buttonPress() {
    buttonID = this.id;

    $("#modal")[0].style.display = "block";
    var modalContent = $("#modal-content")[0];
    $(modalContent).empty();

    var videos = ["refStopMotion"];

    console.log(buttonID)

    if (videos.indexOf(buttonID) > -1) {
        var element = $(`<div style="text-align:center">
            <video id="_video" class="w3-margin" width="90%" height="auto" controls autoplay>
                <source src="/sites/CulminatingTGJ2O/pages/gallery/video/include/stopMotion2.mp4">
                Your browser is unable to play the video.
            </video>
        </div>`);
        element.appendTo(modalContent);
    } else {
        clickedElement = $(this).clone();

        if ($(clickedElement).naturalHeight < $(clickedElement).naturalWidth) {
            console.log("W > H");
            $(clickedElement).find("img").css("height", "auto")
            $(clickedElement).find("img").css("width", "100%")
            $(modalContent).css("width", "60%");
            $(modalContent).css("height", "auto");
        } else {
            console.log("H > W");
            $(clickedElement).find("img").css("height", screen.height * 0.6 + "px")
            $(clickedElement).find("img").css("width", "auto")
            $(modalContent).css("width", "auto");
            $(modalContent).css("height", "auto");
        }
        clickedElement.appendTo(modalContent);
    }

}

function getContent() {
    var rawContent = new XMLHttpRequest();
    rawContent.open("GET", "include/content.xml", true);
    rawContent.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            parseXML(this.responseXML);
        }
    }
    rawContent.send()
}

function parseXML(data) {
    var allSections = data.getElementsByTagName("section");
    for (var i = 0; i < allSections.length; i++) {
        var sectionObj = [];
        var section = allSections[i];
        var getTags = ["title", "id", "img", "alt", "class", "software", "text", "expand"];
        for (var j = 0; j < getTags.length; j++) {
            var tag = getTags[j];
            sectionObj[tag] = section.getElementsByTagName(tag)[0].textContent;
        }
        content.push(sectionObj)
    }
    console.log(content);
    showContent();
}

function showContent() {
    var contentElement = $("#content")[0];
    for (var i = 0; i < content.length; i++) {
        var sectionContent = content[i];
        var element = $(`<div class="w3-card w3-hover-shadow slide ` + sectionContent["class"] + `">
            <header class="w3-container w3-blue w3-center">
                <h3>` + sectionContent["title"] + `</h3>
            </header>
            <div class="w3-container w3-light-grey">
                <div class="w3-margin" style="overflow:hidden">
                    <center><img class="hand-hover _image" src="` + sectionContent["img"] + `" style="height:500px" id="` + sectionContent["id"] + `"></center>
                    <div class="w3-card w3-container w3-margin w3-hover-shadow w3-grey">
                        <h4><strong>Software Used: </strong>` + sectionContent["software"] + `</h4>
                        <p>` + sectionContent["text"] + `</p>
                    </div>
                </div>
            </div>
        </div>`);
        element.appendTo(contentElement);
    }
    afterShowContent();
}

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function currentDiv(n) {
    showDivs(slideIndex = n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("dots");
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("w3-red", "");
    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " w3-red";
}

//keydown event handler
function keydown(e) {
    console.log(e.code);
    switch (e.code) {
        case "ArrowLeft":
            showDivs(slideIndex -= 1);
            break;
        case "ArrowRight":
            showDivs(slideIndex += 1);
            break;
    }
}
