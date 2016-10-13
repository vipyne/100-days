function init () {
  var marquee            = document.getElementById("chrome-still-supports-marquee");
  var rainbowString      = "";
  var redRainbowString   = "";
  var greenRainbowString = "";
  var blueRainbowString  = "";
  var DECtoHEX           = {
    0  : '0',
    1  : '1',
    2  : '2',
    3  : '3',
    4  : '4',
    5  : '5',
    6  : '6',
    7  : '7',
    8  : '8',
    9  : '9',
    10 : 'A',
    11 : 'B',
    12 : 'C',
    13 : 'D',
    14 : 'E',
    15 : 'F',
    '' : ''
  };

  function hex(decimal) {
    decimal > 15 ? firstChar = Math.floor(decimal/16) : firstChar = '0';
    secondChar = decimal % 16;
    return DECtoHEX[firstChar] + DECtoHEX[secondChar];
  };

  for (var x = 0; x < 360; x++) {
    //  M A T H   F T W
    + Math.PI / 2
    var red    = Math.floor(Math.abs(Math.sin(x)) * 255);
    var green  = Math.floor(Math.abs(Math.sin(x + 1)) * 255);
    var blue   = Math.floor(Math.abs(Math.sin(x + 2)) * 255);
    var hexNum = "#";
    hexNum += hex(red);
    hexNum += hex(green);
    hexNum += hex(blue);
    if ( x % 3 === 0) {
      redRainbowString += "<span style='color:" + hexNum + "'>&blk34;</span>";
    } else if ( x % 3 - 1 === 0) {
      greenRainbowString += "<span style='color:" + hexNum + "'>&blk34;</span>";
    } else {
      blueRainbowString += "<span style='color:" + hexNum + "'>&blk34;</span>";
    }
    rainbowString = redRainbowString + blueRainbowString + greenRainbowString;
  }

  marquee.innerHTML = rainbowString;
}

window.onload = init;