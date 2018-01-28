var content = [];

//when document is ready
$(document).ready(pageReady);

//page ready
function pageReady() {
    $("#planning").addClass("w3-green");
    $("#research").addClass("w3-green");
    getContent();
}

//get content
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
    console.log(data);
    var allSections = data.getElementsByTagName("section");
    for (var i = 0; i < allSections.length; i++) {
        var sectionObj = [];
        var section = allSections[i];
        var getTags = ["title", "id", "img", "alt", "class", "link", "text"];
        for (var j = 0; j < getTags.length; j++) {
            var tag = getTags[j];
            sectionObj[tag] = section.getElementsByTagName(tag)[0].textContent;
        }
        content.push(sectionObj)
    }
    showContent();
}

function showContent() {
    var contentElement = $("#content")[0];
    for (var i = 0; i < content.length; i++) {
        var sectionContent = content[i];
        var element = $(`<div class="w3-card w3-hover-shadow w3-margin + ` + sectionContent["class"] + `" id="` + sectionContent["id"] + `">
            <header class="w3-container w3-blue">
                <h3>` + sectionContent["title"] + `</h3>
            </header>
            <div class="w3-light-grey w3-row">
                <div class="w3-half w3-container">
                    <div class="hand-hover" onclick='window.open("` + sectionContent["link"] + `")'>
                        <img class="w3-section w3-hover-shadow" alt="` + sectionContent["alt"] + `" style="width:100%" src="` + sectionContent["img"] + `">
                    </div>
                </div>
                <div class="w3-half w3-container">
                    <div class="w3-margin" align="justify">
                        <h5>` + sectionContent["text"] + `</h5>
                    </div>
                </div>
            </div>
        </div>`);
        element.appendTo(contentElement);
    }
}
