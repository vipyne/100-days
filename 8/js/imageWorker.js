self.addEventListener('message', function(event) {
  var original2D = [], // hold RGBA value arrays
      oGoriginal2D = [], // og with undefineds in there
      sorted1D = [], // hold raw RGBA values... essentially flatten original2D
      t_sorted1D2 = [], // hold raw RGBA values... essentially flatten original2D
      sorted2D,
      t_sorted2D2,
      sorted1D_3 = [],
      greenSorted2D,
      blueSorted2D_3,
      justGreenSorted2D,
      sortedClampedBytes,
      t_sortedClampedBytes2,
      imgData,
      t_imgData2,
      originalRGBAbytes = event.data[0],
      width = event.data[1],
      message,
      derp = 0;

  // create original 2D array from RGBA byte array
  for (var i = 0; i < originalRGBAbytes.length; i += 4) {
    var index = i;
    original2D[i] = [originalRGBAbytes[index],
                      originalRGBAbytes[index + 1],
                      originalRGBAbytes[index + 2],
                      originalRGBAbytes[index + 3]]
  }

  rgbaObject = { first  : 1,
                 second : 0,
                 third  : 2 };

  // unneeded
  oGoriginal2D.forEach(function removeUndefineds(rgba) {
    if (rgba[0] !== undefined) {
      original2D.push(rgba);
    }
  })

  //////////// one sort - green ////////////
  // sort from smallest to largest green value
  greenSorted2D = original2D.sort(function(a, b) {
    if (a[0] !== undefined && b[0] !== undefined) {
      if (a[rgbaObject.first] < b[rgbaObject.first]) return -1;
      if (b[rgbaObject.first] < a[rgbaObject.first]) return 1;
      return 0;
    } else {
      derp++;
    }
  });

  justGreenSorted2D = greenSorted2D;
  // create flat array of sorted RGBA values JUST GREEN
  for (var j = 0; j < justGreenSorted2D.length; j++) {
    if (justGreenSorted2D[j] && justGreenSorted2D[j][0] !== undefined) {
      t_sorted1D2.push(justGreenSorted2D[j][0]);
      t_sorted1D2.push(justGreenSorted2D[j][1]);
      t_sorted1D2.push(justGreenSorted2D[j][2]);
      t_sorted1D2.push(justGreenSorted2D[j][3]);
    }
  }
  //////////// one sort - green ////////////


  //////////// two sorts - blue ////////////
  // sort from smallest to largest blue value
  blueSorted2D_3 = greenSorted2D.sort(function(a, b) {
    if (a[0] !== undefined && b[0] !== undefined) {
      if (a[rgbaObject.first] !== b[rgbaObject.first]) {
        return 0;
      } else {
        if (a[rgbaObject.second] < b[rgbaObject.second]) return -1;
        if (b[rgbaObject.second] < a[rgbaObject.second]) return 1;
        return 0;
      }
    }
  });

  // create flat array of sorted RGBA values
  for (var j = 0; j < blueSorted2D_3.length; j++) {
    if (blueSorted2D_3[j] && blueSorted2D_3[j][0] !== undefined) {
      sorted1D_3.push(blueSorted2D_3[j][0]);
      sorted1D_3.push(blueSorted2D_3[j][1]);
      sorted1D_3.push(blueSorted2D_3[j][2]);
      sorted1D_3.push(blueSorted2D_3[j][3]);
    }
  }
  //////////// two sorts - blue ////////////


  //////////// three sorts - red ////////////
  // sort from smallest to largest red value
  sorted2D = blueSorted2D_3.sort(function(a, b) {
    if (a[0] !== undefined && b[0] !== undefined) {
      if (a[rgbaObject.first] !== b[rgbaObject.first] && a[rgbaObject.second] !== b[rgbaObject.second]) {
        return 0;
      } else {
        if (a[rgbaObject.third] < b[rgbaObject.third]) return -1;
        if (b[rgbaObject.third] < a[rgbaObject.third]) return 1;
        return 0;
      }
    }
  });

  // create flat array of sorted RGBA values
  for (var j = 0; j < sorted2D.length; j++) {
    if (sorted2D[j] && sorted2D[j][0] !== undefined) {
      sorted1D.push(sorted2D[j][0]);
      sorted1D.push(sorted2D[j][1]);
      sorted1D.push(sorted2D[j][2]);
      sorted1D.push(sorted2D[j][3]);
    }
  }
  //////////// three sorts - red ////////////


  //////////// setting all the clapped arrays ////////////
  sortedClampedBytes = new Uint8ClampedArray(sorted1D.length);
  sortedClampedBytes.set(sorted1D);

  t_sortedClampedBytes2 = new Uint8ClampedArray(t_sorted1D2.length);
  t_sortedClampedBytes2.set(t_sorted1D2);

  imgData = new ImageData(sortedClampedBytes, width);
  t_imgData2 = new ImageData(t_sortedClampedBytes2, width);

  message = {first : imgData, second : t_imgData2, derpy : derp}
  self.postMessage(message);
}, false);

