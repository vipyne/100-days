;(function(w, d, u) {

  var orginalImage = document.getElementById('original-img'),
      height = orginalImage.getAttribute('height')/2,
      width = orginalImage.getAttribute('width')/2,
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

  // var sillysort = rgbaByteArray.sort(function(a, b) {
  //   return a - b
  // });

  // array to hold an array of the RGBA values
  var twoDArr = [];

  var red = 0,
      green = 0,
      blue = 0;
  for (var i = 0; i < rgbaByteArray.length; i++) {

    var index = i;

    twoDArr[index] = [rgbaByteArray[index],
                      rgbaByteArray[index+1],
                      rgbaByteArray[index+2],
                      rgbaByteArray[index+3]]
  }

  // array to hold raw RGBA values... essentially flatten twoDArr
  var tempArr = [];

  // sort from largest red value to smallest
  var sillysortpixels = twoDArr.sort(function(a, b) {
    return (b[0] + b[1] + b[2]) - (a[0] + a[1] + a[2]);
  });

  for (var j = 0; j < sillysortpixels.length; j++) {
    if (sillysortpixels[j]) {
      tempArr.push(sillysortpixels[j][0]);
      tempArr.push(sillysortpixels[j][1]);
      tempArr.push(sillysortpixels[j][2]);
      tempArr.push(sillysortpixels[j][3]);
    }
  }

  var sillysort = new Uint8ClampedArray(tempArr.length);
  sillysort.set(tempArr);

  var imgData = new ImageData(sillysort,300);
  canvasContext.putImageData(imgData, 0, 0)

  console.log('EOF')

})(window, document, undefined);