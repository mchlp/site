var cdSecLeft;
var cdRunning = false;
var cdPaused = false;
var countdownInterval;
var alarm;

//when document is ready
$(document).ready(pageReady);

//page ready
function pageReady() {
    $("button").click(buttonPress);
    setAlarm("include/alarm.mp3");
    checkForParam();
    refreshClock();
}

//set alarm
function setAlarm(link) {
    alarm = new Audio(link);
}

//button pressed
function buttonPress() {
    var buttonID = this.id;
    switch (buttonID) {
        case "btn2":
            $("#cdForm")[0].reset();
            if (cdRunning) {
                if (confirm("Are you sure you want to reset the countdown?")) {
                    stopCountdown();
                }
            }
            break;
        case "defaultSound":
            $("#alarmSound").val("include/alarm.mp3");
            break;
    }
}

//submit countdown
function button1Press() {
    if (!cdRunning) {
        var hours = isNaN(parseInt($("#cdHour")[0].value)) ? 0 : parseInt($("#cdHour")[0].value);
        var mins = isNaN(parseInt($("#cdMin")[0].value)) ? 0 : parseInt($("#cdMin")[0].value);
        var secs = isNaN(parseInt($("#cdSec")[0].value)) ? 0 : parseInt($("#cdSec")[0].value);
        var total = hours * 3600 + mins * 60 + secs;
        console.log(total)
        window.open("?s=" + total, "_self");
    } else {
        if (!cdPaused) {
            //pause countdown
            cdPaused = true;
            clearInterval(countdownInterval);
            $("#btn1Text").html("Resume");
        } else {
            //resume countdown
            cdPaused = false;
            countdownInterval = setInterval(showCountdownTime, 1000);
            $("#btn1Text").html("Pause");
        }
    }
}

//check for countdown parameters
function checkForParam() {
    let params = (new URL(document.location)).searchParams;
    cdSecLeft = params.get("s");
    if (cdSecLeft > 0 && cdSecLeft < 356518) {
        $("#cdHour").prop("disabled", true);
        $("#cdMin").prop("disabled", true);
        $("#cdSec").prop("disabled", true);
        $("#btn1Text").html("Pause");
        cdRunning = true;
        cdPaused = false;
        countdownInterval = setInterval(showCountdownTime, 1000);
    } else if (cdSecLeft != null) {
        window.open("/sites/clock", "_self");
        cdRunning = false;
    }
}

//unlock countdown
function unlockCountdown() {
    $("#cdHour").prop("disabled", false);
    $("#cdMin").prop("disabled", false);
    $("#cdSec").prop("disabled", false);
    $("#btn1Text").html("Start");
    $("#cdForm")[0].reset();
}

//stop countdown
function stopCountdown() {
    cdRunning = false;
    unlockCountdown();
    clearInterval(countdownInterval);
}

//show countdown time
function showCountdownTime() {
    if (cdSecLeft < 0) {
        alarm.play();
        //alert("Alarm!");
        //alarm.pause();
        stopCountdown()
        return;
    }

    var cdSec = cdSecLeft;
    var cdHour = Math.floor(cdSec / 3600);
    cdSec -= cdHour * 3600;
    var cdMin = Math.floor(cdSec / 60);
    cdSec -= cdMin * 60;
    cdSec = Math.floor(cdSec);
    $("#cdHour").val(zeroPad(cdHour, 2));
    $("#cdMin").val(zeroPad(cdMin, 2));
    $("#cdSec").val(zeroPad(cdSec, 2));

    if (cdRunning) {
        cdSecLeft -= 1;
    }
}

//refresh clock
function refreshClock() {
    var curTime = new Date();
    var hour = curTime.getHours() % 12;
    var min = zeroPad(curTime.getMinutes(), 2);
    var sec = zeroPad(curTime.getSeconds(), 2);
    var ampm = curTime.getHours() >= 12 ? "PM" : "AM";
    $("#hour").text(hour);
    $("#min").text(min);
    $("#sec").text(sec);
    $("#ampm").text(ampm);
    setTimeout(refreshClock, 1000);
}

//pad zero
function zeroPad(num, numPad) {
    var numString = num.toString();
    var numLen = numString.length;
    var diff = numPad - numLen;
    var zeros = "0".repeat(diff > 0 ? diff : 0);
    var final = zeros.concat(numString);
    return final;
}
