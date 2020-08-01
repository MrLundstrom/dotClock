//Global variables
var showSecs = true;
var clear = [["D1", "D1"], ["D1", "D1"], ["D1", "D1"], ["D1", "D1"], ["D1", "D1"], ["D1", "D1"], ["D1", "D1"], ["D1", "D1"]];
var h = -1;
var m = -1;
var myIntValue = 15;
var twelvehour = false;
var twelve;
var times = ['hours', 'mins', 'secs', '12HR'];
var dividers = ['divider1', 'divider2'];
var party = false;

// Setup
function myFunction() {
    setInterval(Clock, 250);
    var div = document.getElementById("hours");
    Create("hours", "h", div, 77);
    div = document.getElementById("divider1");
    Create("divide", "D", div, 7);
    div = document.getElementById("mins");
    Create("mins", "m", div, 77);
    div = document.getElementById("divider2");
    Create("divide", "DD", div, 7);
    div = document.getElementById("secs");
    Create("secs", "s", div, 77);
    div = document.getElementById("12HR");
    Create("ampm", "12hr", div, 77);
    setDivider();
}

// Create divs
function Create(type, time, div, size) {
    var text = "";
    for (var i = 1; i <= size; i++) {
        text += "<div class='round " + type + "' id='" + time + i + "'></div>";
    }
    div.innerHTML = text;
}

// Clock function
function Clock() {

    // Get Date
    var d = new Date();
    var hh = d.getHours();
    var mm = d.getMinutes();
    var s = d.getSeconds();
    s = checkTime(s) + "";

    // HOURS
    //if (hh != h || twelve != twelvehour) {
    twelve = twelvehour;
    h = hh;
    if (twelvehour == true) {
        if (h < 12) {
            convert(0, 10, "12hr");
        } else {
            convert(0, 11, "12hr");
        }
        convert(1, 12, "12hr");
    }
    h = check12hour(h);
    h = checkTime(h) + "";
    for (var i = 0; i < 2; i++) {
        var split = (("" + h).split(""));
        convert(i, split[i], "h");
    }
    //}

    //MINS
    //if (mm != m) {
    m = mm;
    m = checkTime(m) + "";
    for (var k = 0; k < 2; k++) {
        var split2 = (("" + m).split(""));
        convert(k, split2[k], "m");
    }
    //}

    //Seconds
    if (showSecs === true) {
        for (var x = 0; x < 2; x++) {
            var split3 = (("" + s).split(""));
            convert(x, split3[x], "s");
        }
    }
}
//check12hourformat
function check12hour(i) {
    if (i > 12 && twelvehour == true) {
        i = i - 12;
    }
    return i
}
// Add extra digit if under 10
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i
}
function randomColor() {
    for (let i = 0; i < 3; i++) {
        string = [Math.random(), Math.random(), Math.random()]
    }
    return RGBString(string);
}
function RGBString(values) {
    values = values.map(function (c) {
        return Math.ceil(c * 255);
    });
    return 'rgb(' + values + ')'
}

// Set numbers to figures
function convert(place, number, type) {
    //A
    var letterA = [3, 13, 15, 23, 27, 34, 38, 45, 46, 47, 48, 49, 56, 60, 67, 71];
    //P
    var letterP = [1, 2, 3, 4, 12, 16, 23, 27, 34, 35, 36, 37, 45, 56, 67];
    //B
    var letterM = [1, 5, 12, 13, 15, 16, 23, 25, 27, 34, 38, 45, 49, 56, 60, 67, 71];
    // 0
    var zero = [2, 3, 4, 12, 16, 23, 27, 34, 38, 45, 49, 56, 60, 68, 69, 70];
    // 1
    var one = [3, 13, 14, 23, 25, 36, 47, 58, 67, 68, 69, 70, 71];
    // 2
    var two = [2, 3, 4, 12, 16, 27, 37, 47, 57, 67, 68, 69, 70, 71];
    // 3
    var three = [2, 3, 4, 12, 16, 27, 36, 37, 49, 56, 60, 68, 69, 70];
    // 4
    var four = [1, 5, 12, 16, 23, 27, 34, 35, 36, 37, 38, 49, 60, 71];
    // 5
    var five = [1, 2, 3, 4, 5, 12, 23, 34, 35, 36, 37, 49, 56, 60, 68, 69, 70];
    // 6
    var six = [2, 3, 4, 12, 16, 23, 34, 35, 36, 37, 45, 49, 56, 60, 68, 69, 70];
    // 7
    var seven = [1, 2, 3, 4, 5, 16, 27, 37, 48, 58, 69];
    // 8
    var eight = [2, 3, 4, 12, 16, 23, 27, 35, 36, 37, 45, 49, 56, 60, 68, 69, 70];
    // 9
    var nine = [2, 3, 4, 5, 12, 16, 23, 27, 35, 36, 37, 38, 49, 60, 71];
    // All numbers
    var numbers = [zero, one, two, three, four, five, six, seven, eight, nine, letterA, letterP, letterM];
    //Place
    var letter = [0, 6];
    //Clear setup
    var typeN;
    if (type == "h") {
        typeN = 0;
    } else if (type == "m") {
        typeN = 2;
    } else if (type == "s") {
        typeN = 4;
    } else {
        typeN = 6;
    }
    clear[typeN + place].forEach(clearDot);

    var vector = numbers[number];
    for (var i = 0; i < vector.length; i++) {
        vector[i] += letter[place];
        vector[i] = type + vector[i];
    }
    clear[typeN + place] = vector;
    vector.forEach(time);
}

// Display dot
function time(item) {
    var dot = document.getElementById(item);
    dot.style.opacity = "1.0";
    if (party && dot.className != "round ampm") {
        let color = randomColor()
        dot.style.backgroundColor = color;
        dot.style.boxShadow = "0px 0px " + myIntValue + "px " + color;
    }
}
// hide dot
function clearDot(item) {
    document.getElementById(item).style.opacity = "0.0";
}
// Set dividerdots
function setDivider() {
    var divider = ["D2", "D3", "D5", "D6", "DD2", "DD3", "DD5", "DD6"];
    for (var i = 0; i < divider.length; i++) {
        document.getElementById(divider[i]).style.opacity = "1.0";
    }
}

// Read input from options
window.wallpaperPropertyListener = {

    applyUserProperties: function (properties) {
        var time = ["h", "m", "s", "12hr"];
        var divide = ["D", "DD"];
        var dotColor = 'rgb(' + "0, 0, 0" + ')';

        //  BackgroundColor
        if (properties.schemecolor) {
            // Convert the scheme color to be applied as a CSS style
            var schemeColor = properties.schemecolor.value.split(' ');
            schemeColor = RGBString(schemeColor)
            document.body.style.backgroundColor = schemeColor;
        }
        // Party-mode
        if (properties.party) {
            party = properties.party.value;
        }

        // ClockColor
        if (properties.customcolor1) {
            // Convert the custom color to be applied as a CSS style
            var dotColor = properties.customcolor1.value.split(' ');
            dotColor = RGBString(dotColor);
            var dots = [...document.getElementsByClassName("round")];
            dots = dots.map(dot => {
                dot.style.backgroundColor = dotColor;
                dot.style.boxShadow = "0px 0px " + myIntValue + "px " + dotColor;
                return dot;
            })
        }
        //Color Hours
        if (properties.customcolor2) {
            // Convert the custom color to be applied as a CSS style
            var hColor = properties.customcolor2.value.split(' ');
            hColor = RGBString(hColor);
            var dots = [...document.getElementsByClassName("hours")];
            dots = dots.map(dot => {
                dot.style.backgroundColor = hColor;
                dot.style.boxShadow = "0px 0px " + myIntValue + "px " + hColor;
                return dot;
            })
        }
        //Color Mins
        if (properties.customcolor3) {
            // Convert the custom color to be applied as a CSS style
            var mColor = properties.customcolor3.value.split(' ');
            mColor = RGBString(mColor);
            var dots = [...document.getElementsByClassName("mins")];
            dots = dots.map(dot => {
                dot.style.backgroundColor = mColor;
                dot.style.boxShadow = "0px 0px " + myIntValue + "px " + mColor;
                return dot;
            })
        }
        //Color Secs
        if (properties.customcolor4) {
            // Convert the custom color to be applied as a CSS style
            var sColor = properties.customcolor4.value.split(' ');
            sColor = RGBString(sColor);
            var dots = [...document.getElementsByClassName("secs")];
            dots = dots.map(dot => {
                dot.style.backgroundColor = sColor;
                dot.style.boxShadow = "0px 0px " + myIntValue + "px " + sColor;
                return dot;
            })
        }

        //  Change Glowsize
        if (properties.glowSlider) {
            myIntValue = properties.glowSlider.value;
            var dots = [...document.getElementsByClassName("round")];
            dots = dots.map(dot => {
                var color = dot.style.backgroundColor;
                dot.style.boxShadow = "0px 0px " + myIntValue + "px " + color;
                return dot;
            })
        }

        // Change Clocksize
        if (properties.sizeSlider) {
            mySizeValue = properties.sizeSlider.value;
            var x = document.getElementsByClassName("round");

            //Container width
            times.forEach(element => {
                document.getElementById(element).style.width = mySizeValue * 8 * 11 + "px";
                document.getElementById(element).style.margin = mySizeValue * 4 + "px";
            });
            dividers.forEach(element => {
                document.getElementById(element).style.width = mySizeValue * 8 + "px";
                document.getElementById(element).style.margin = mySizeValue * 4 + "px";
            });
            for (var i = 0; i < x.length; i++) {
                var dot = x[i];
                dot.style.width = mySizeValue * 6 + "px";
                dot.style.height = mySizeValue * 6 + "px";
                dot.style.borderRadius = mySizeValue * 3 + "px";
                dot.style.margin = mySizeValue + "px";
            }
        }

        //POSITION Y
        if (properties.PositionSlider) {
            myPositionValue = properties.PositionSlider.value;
            document.getElementById("filler").style.gridRowStart = "" + myPositionValue
        }
        //POSITION X
        if (properties.PositionSlider2) {
            myPositionValue = properties.PositionSlider2.value;
            document.getElementById("filler").style.gridColumnStart = "" + myPositionValue
        }

        //  12 Hour Format
        if (properties.custombool2) {
            twelvehour = properties.custombool2.value;
            if (twelvehour === true) {
                document.getElementById("12HR").style.display = "flex";
            } else {
                document.getElementById("12HR").style.display = "none";
            }
        }
        //  Show Seconds
        if (properties.custombool1) {
            showSecs = properties.custombool1.value;
            if (showSecs === true) {
                document.getElementById("divider2").style.display = "flex";
                document.getElementById("secs").style.display = "flex";
            } else {
                document.getElementById("divider2").style.display = "none";
                document.getElementById("secs").style.display = "none";
            }
        }
        // Read single selected image
        if (properties.customimage) {
            imageElement = document.getElementById('bg');
            imageElement.style.backgroundImage = "url(" + 'file:///' + properties.customimage.value + ")";
        }
    }
};
