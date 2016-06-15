console.log('hey hey hey')
self.addEventListener('message', function(e) {
  console.log('Worker said: fart');
  // create 2D array from RGBA byte array
  for (var i = 0; i < rgbaByteArray.length; i += 4) {
    var index = i;
    twoDArr[i] = [rgbaByteArray[index],
                  rgbaByteArray[index + 1],
                  rgbaByteArray[index + 2],
                  rgbaByteArray[index + 3]]
  }

  // sort from smallest to largest green value
  sillysortpixels = twoDArr.sort(function(a, b) {
    if (a[0] !== undefined && b[0] !== undefined) {
      if (a[1] < b[1]) return -1;
      if (b[1] < a[1]) return 1;
      return 0;
    }
  });

  // create flat array of sorted RGBA values
  for (var j = 0; j < sillysortpixels.length; j++) {
    if (sillysortpixels[j] && sillysortpixels[j][0] !== undefined) {
      tempArr.push(sillysortpixels[j][0]);
      tempArr.push(sillysortpixels[j][1]);
      tempArr.push(sillysortpixels[j][2]);
      tempArr.push(sillysortpixels[j][3]);
    }
  }

  sillysort = new Uint8ClampedArray(tempArr.length);
  sillysort.set(tempArr);

  imgData = new ImageData(sillysort, width);
  self.postMessage(e.data + 'hey boo boo');
}, false);

