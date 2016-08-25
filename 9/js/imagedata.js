;(function(w, d, u) {

  color = {
    RED : 0,
    GREEN : 1,
    BLUE : 2
  }

  var benchmark = new Date().getTime(),
      originalImage = document.getElementById('original-img'),
      height = originalImage.getAttribute('height'),
      width = originalImage.getAttribute('width'),
      imgCanvas = document.getElementById('img-canvas'),
      canvas = document.getElementById('draw-canvas'),
      canvasTwo = document.getElementById('draw-canvas-two'),
      imageData,
      rgbaByteArray,
      twoDArr = [], // hold RGBA value arrays
      justTwoDArr = [], // hold RGBA value arrays
      tempArrOne = [], // hold raw RGBA values... essentially flatten twoDArr
      tempArrTwo = [], // hold raw RGBA values... essentially flatten twoDArr
      sillySortPixels,
      sillySortPixelsGreen,
      sillySortPixelsJustGreen = [],
      sillySortPixelsRed,
      sillySortPixelsBlue,
      sillysort,
      imgData;

  imgCanvas.setAttribute('height', height);
  imgCanvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  canvas.setAttribute('width', width);
  canvasTwo.setAttribute('height', height);
  canvasTwo.setAttribute('width', width);

  canvasContext = canvas.getContext('2d');
  canvasContextTwo = canvasTwo.getContext('2d');
  imageContext = imgCanvas.getContext('2d');

  imageContext.drawImage(originalImage, 0, 0)
  imageData = imageContext.getImageData(0, 0, width, height);
  rgbaByteArray = imageData.data;

  // create 2D array from RGBA byte array
  for (var i = 0; i < rgbaByteArray.length; i += 4) {
    var index = i;
    // twoDArr[i] = [0, rgbaByteArray[index + 1], rgbaByteArray[index + 2], 255]
    twoDArr[i] = [rgbaByteArray[index],
                  rgbaByteArray[index + 1],
                  rgbaByteArray[index + 2],
                  255]
    justTwoDArr[i] = [rgbaByteArray[index],
                  rgbaByteArray[index + 1],
                  rgbaByteArray[index + 2],
                  255]
  }
  console.log('a', rgbaByteArray[10])

  sillySortPixelsJustGreen = justTwoDArr.sort(function(a, b) {
    // debugger;
    // if (a[color.GREEN] < b[color.GREEN]) return -1;
    // if (b[color.GREEN] < a[color.GREEN]) return 1;
    return 0;
  });

  // sort from smallest to largest green value
  sillySortPixelsGreen = twoDArr.sort(function(a, b) {
    if (a[color.GREEN] < b[color.GREEN]) return -1;
    if (b[color.GREEN] < a[color.GREEN]) return 1;
    return 0;
  });
  console.log('green', sillySortPixelsGreen[10])
  console.log('eq?', sillySortPixelsJustGreen === sillySortPixelsBlue)

  // sort from smallest to largest blue value
  sillySortPixelsBlue = sillySortPixelsGreen.sort(function(a, b) {
    // if (a[color.GREEN] === b[color.GREEN]) {
      // console.log('blue', a[color.GREEN], b[color.GREEN])
      if (a[color.GREEN] === b[color.GREEN] && a[color.BLUE] < b[color.BLUE]) return -1;
      if (a[color.GREEN] === b[color.GREEN] && b[color.BLUE] < a[color.BLUE]) return 1;
      return 0;
    // } else {
    //   return 0;
    // }
  });
  console.log('blue', sillySortPixelsBlue[10])

  // sort from smallest to largest red value
  sillySortPixelsRed = sillySortPixelsBlue.sort(function(a, b) {
    if (a[color.RED] === b[color.RED] && a[color.GREEN] === b[color.GREEN]) {
      console.log('red')
      if (a[color.RED] < b[color.RED]) return -1;
      if (b[color.RED] < a[color.RED]) return 1;
      return 0;
    } else {
      return 0;
    }
  });
  console.log('red', sillySortPixelsRed[10])

  function flatten(sillySortPixels, tempArr) {
    // create flat array of sorted RGBA values
    for (var j = 0; j < sillySortPixels.length; j++) {
      if (sillySortPixels[j] && sillySortPixels[j][0] !== undefined) {
        tempArr.push(sillySortPixels[j][0]);
        tempArr.push(sillySortPixels[j][1]);
        tempArr.push(sillySortPixels[j][2]);
        tempArr.push(sillySortPixels[j][3]);
      }
    }
  }

  console.log('eq?', sillySortPixelsJustGreen[100] === sillySortPixelsBlue[100])

  flatten(sillySortPixelsJustGreen, tempArrOne);
  flatten(sillySortPixelsBlue, tempArrTwo);

  sillysort = new Uint8ClampedArray(tempArrOne.length);
  sillysortTwo = new Uint8ClampedArray(tempArrTwo.length);

  sillysort.set(tempArrOne);
  sillysortTwo.set(tempArrTwo);

  imgData = new ImageData(sillysort, width);
  canvasContext.putImageData(imgData, 0, 0);

  imgDataTwo = new ImageData(sillysortTwo, width);
  canvasContextTwo.putImageData(imgDataTwo, 0, 0);

  console.log('benchmark', new Date().getTime() - benchmark);

})(window, document, undefined);