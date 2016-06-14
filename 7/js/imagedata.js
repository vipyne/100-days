;(function(w, d, u) {

  var orginalImage = document.getElementById('original-img'),
      height = orginalImage.getAttribute('height'),
      width = orginalImage.getAttribute('width'),
      imgCanvas = document.getElementById('img-canvas'),
      canvas = document.getElementById('draw-canvas');

      imgCanvas.setAttribute('height', height);
      imgCanvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      canvas.setAttribute('width', width);

  canvasContext = canvas.getContext('2d');
  imageContext = imgCanvas.getContext('2d');

  imageContext.drawImage(orginalImage, 0, 0)
  var imageData = imageContext.getImageData(0, 0, width, height);
  var rgbaByteArray = imageData.data;

  // array to hold an array of the RGBA values
  var twoDArr = [];

  var red = 0,
      green = 0,
      blue = 0;
  for (var i = 0; i < rgbaByteArray.length; i+=4) {

    var index = i;

    twoDArr[i] = [rgbaByteArray[index],
                  rgbaByteArray[index+1],
                  rgbaByteArray[index+2],
                  rgbaByteArray[index+3]]
  }

  // array to hold raw RGBA values... essentially flatten twoDArr
  var tempArr = [];

  // sort from smallest to largest green value
  var sillysortpixels = twoDArr.sort(function(a, b) {
    if (a[0] !== undefined && b[0] !== undefined) {
      if (a[1] < b[1]) return -1;
      if (b[1] < a[1]) return 1;
      return 0;
    }
  });

  for (var j = 0; j < sillysortpixels.length; j++) {
    if (sillysortpixels[j] && sillysortpixels[j][0] !== undefined) {
      tempArr.push(sillysortpixels[j][0]);
      tempArr.push(sillysortpixels[j][1]);
      tempArr.push(sillysortpixels[j][2]);
      tempArr.push(sillysortpixels[j][3]);
    }
  }

  var sillysort = new Uint8ClampedArray(tempArr.length);
  sillysort.set(tempArr);

  var imgData = new ImageData(sillysort, width);
  canvasContext.putImageData(imgData, 0, 0)

  console.log('EOF')

})(window, document, undefined);