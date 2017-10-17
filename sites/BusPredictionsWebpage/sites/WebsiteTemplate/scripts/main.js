var bottomOfTitle = 0;
var prevTitle = $("#title");
var getBottomOfTitleInterval;
var included = false;

var curSel = 0;
var allSel = ["intro", "1914", "1929", "1945", "1982"];

var tags = ["title", "id", "hisSig", "hisPer", "conCha", "cauCon"];
var content = [];
var contentElements = []

//when document is ready
$(document).ready(pageReady);

//page ready
function pageReady() {
    $(window).scroll(pageScroll);
    document.onkeydown = keydown;
    getBottomOfTitleInterval = setInterval(getBottomOfTitle, 500);
    getContent();
}

//after content is showed
function afterShowContent() {
    $("button").click(buttonPress);
    changeSection(allSel[0]);
}

//get content xml
function getContent() {
    var rawContent = new XMLHttpRequest();
    rawContent.open("GET", "/CulminatingCHC2D6/pages/content.xml", true);
    rawContent.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            parseXML(this.responseXML);
        }
    }
    rawContent.send()
}

function parseXML(data) {

    console.log(data);
    var allPeriods = data.getElementsByTagName("period");
    for (var i = 0; i < allPeriods.length; i++) {
        var periodObj = [];
        var period = allPeriods[i];
        for (var j = 0; j < tags.length; j++) {
            periodObj[tags[j]] = period.getElementsByTagName(tags[j])[0].textContent;
        }
        content.push(periodObj)
    }
    showContent();
}

function showContent() {
    var contentElement = $("#content")[0];
    for (var i = 0; i < content.length; i++) {
        var elementContent = content[i];
        var element = $(`
            <div id = "` + elementContent["id"] + `Content" class="w3-container" hidden>
                <h2>` + elementContent["title"] + `</h2>
                <p>` + elementContent["hisSig"] + `</p>
                <p>` + elementContent["hisPer"] + `</p>
                <p>` + elementContent["conCha"] + `</p>
                <p>` + elementContent["cauCon"] + `</p>
            </div>`);
        element.appendTo(contentElement);
        contentElements.push(elementContent["id"]);
    }
    afterShowContent();
}

//get bottom of the title
function getBottomOfTitle() {
    var curTitle = $("#title")
    if (curTitle !== prevTitle) {
        bottomOfTitle = curTitle[0].scrollHeight;
        clearInterval(getBottomOfTitleInterval);
    }
}


//page scroll
function pageScroll() {
    if ($(window).scrollTop() > bottomOfTitle) {
        $('#navBar').addClass("nav-bar-fixed");
    } else {
        $('#navBar').removeClass("nav-bar-fixed");
    }
}

//keydown event handler
function keydown(e) {
    console.log(e.code);
    switch (e.code) {
        case "ArrowLeft":
            newSel = curSel - 1;
            if (newSel < 0) {
                newSel = allSel.length - 1;
            }
            break;
        case "ArrowRight":
            newSel = curSel + 1;
            if (newSel > allSel.length - 1) {
                newSel = 0;
            }
            break;
    }
    changeSection(allSel[newSel]);
}

//button press handler
function buttonPress() {
    buttonID = this.id;
    changeSection(buttonID);
}

//change section
function changeSection(sectionID) {
    for (var i = 0; i < contentElements.length; i++) {
        $("#" + contentElements[i] + "Content").hide()
    }
    $("#" + sectionID + "Content").show()
    $("#" + allSel[curSel]).removeClass("w3-green");
    $("#" + sectionID).addClass("w3-green");
    curSel = allSel.indexOf(sectionID);
}
