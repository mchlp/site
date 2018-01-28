var content = [];

//when document is ready
$(document).ready(pageReady);

//page ready
function pageReady() {
    $("#photoshop").addClass("w3-green");
    $("#gallery").addClass("w3-green");
    getContent();
}

function afterShowContent() {
    $("._image").click(buttonPress);
}

function buttonPress() {
    buttonID = this.id;

    $("#modal")[0].style.display = "block";

    var modalContent = $("#modal-content")[0];
    $(modalContent).empty();

    console.log($(this).find("img"));

    var clickedElement = $(this).clone();

    console.log($(clickedElement).find("img"));

    if ($(clickedElement).find("img")[0].naturalHeight < $(clickedElement).find("img")[0].naturalWidth) {
        console.log("W > H");
        $(clickedElement).find("img").css("height", "auto")
        $(clickedElement).find("img").css("width", "100%")
        $(modalContent).css("width", "60%");
        $(modalContent).css("height", "auto");
    } else {
        console.log("H > W");
        $(clickedElement).find("img").css("height", screen.height*0.6+"px")
        $(clickedElement).find("img").css("width", "auto")
        $(modalContent).css("width", "auto");
        $(modalContent).css("height", "auto");
    }

    $(clickedElement).find("img")[0].style.objectFit = "";

    $(clickedElement).appendTo(modalContent);
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
    console.log(data);
    console.log(allImages);
    var allImages = data.getElementsByTagName("image");
    colCount = 1;
    colObjs = [];
    for (var i = 0; i < allImages.length; i++) {
        var imageObj = [];
        var image = allImages[i];
        imageObj["title"] = image.getElementsByTagName("title")[0].textContent;
        imageObj["id"] = image.getElementsByTagName("id")[0].textContent;
        imageObj["imgLink"] = image.getElementsByTagName("img")[0].textContent.trim();
        imageObj["alt"] = image.getElementsByTagName("alt")[0].textContent;
        imageObj["downloadLink"] = image.getElementsByTagName("download")[0].textContent;
        imageObj["class"] = image.getElementsByTagName("class")[0].textContent;
        colObjs.push(imageObj);
        if (colCount == 3) {
            content.push(colObjs);
            colCount = 1;
            colObjs = [];
        } else {
            colCount++;
        }
    }
    content.push(colObjs)
    showContent();
}

function showContent() {
    var contentElement = $("#content")[0];
    for (var i = 0; i < content.length; i++) {
        var rowElement = $("<div class='w3-row-padding w3-margin'></div>");
        var rowContent = content[i];
        for (var j = 0; j < rowContent.length; j++) {
            var elementContent = rowContent[j]
            var element = $(`
            <div class="w3-third">
                <div id="` + elementContent["id"] + `" class="w3-card w3-hover-shadow w3-grey _image hand-hover" style="text-align:center">
                    <div>
                        <img class="` + elementContent["class"] + `" style="object-fit:cover" height="300vh" width="100%" src="` + elementContent["imgLink"] + `" alt="` + elementContent["alt"] + `">
                    </div>
                    <div class="w3-container">
                        <p>` + elementContent["title"] + `</p>
                    </div>
                </div>
            </div>`);
            element.appendTo(rowElement);
        }
        rowElement.appendTo(contentElement);
    }
    afterShowContent();
}
