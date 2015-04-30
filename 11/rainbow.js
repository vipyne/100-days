function marquisDeArcaneciel() {
  var marquee            = document.getElementById("chrome-still-supports-marquee");
  var rainbowString      = "";
  var redRainbowString   = "";
  var greenRainbowString = "";
  var blueRainbowString  = "";
  for (var x = 0; x < 360; x++) {
    //  M A T H   F T W
    var red    = Math.floor(Math.abs(Math.sin(x)) * 255);
    var green  = Math.floor(Math.abs(Math.sin(x + 1)) * 255);
    var blue   = Math.floor(Math.abs(Math.sin(x + 2)) * 255);
    var rgbNum = "rgb(";
    rgbNum += red + ",";
    rgbNum += green + ",";
    rgbNum += blue + ")";
    if ( x % 3 === 0) {
      redRainbowString += "<span style='color:" + rgbNum + "'>&blk34;</span>";
    } else if ( x % 3 - 1 === 0) {
      greenRainbowString += "<span style='color:" + rgbNum + "'>&blk34;</span>";
    } else {
      blueRainbowString += "<span style='color:" + rgbNum + "'>&blk34;</span>";
    }
    rainbowString = redRainbowString + blueRainbowString + greenRainbowString;
  }
  marquee.innerHTML = rainbowString;
  marquee.direction = "right";
}
window.onload = marquisDeArcaneciel;