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
  var rgba_byte_array = imageData.data;

  var red = 0,
      green = 0,
      blue = 0;
  for (var i = 0; i < rgba_byte_array.length/10022; i++) {

    var index = i * 4;
    // red
      red += rgba_byte_array[index];
    // green
      green += rgba_byte_array[index + 1];
    // blue
      blue += rgba_byte_array[index + 2];

    console.log('poop')
    console.log('red', red)
    console.log('green', green)
    console.log('blue', blue)
  }

  var bigger = (red > green) ? red : green;

  var biggest = (bigger > blue) ? bigger : blue;

  console.log(biggest % height )

  canvasContext.beginPath();
  canvasContext.moveTo(0, 0);
  canvasContext.lineTo(0, height);
  canvasContext.strokeStyle = '#c0f';
  canvasContext.lineWidth = canvas.getAttribute('width') / 3 * 2;
  canvasContext.stroke();

  canvasContext.beginPath();
  canvasContext.moveTo(width/2, 0);
  canvasContext.lineTo(width/2, height-50);
  canvasContext.strokeStyle = '#2c005f';
  canvasContext.lineWidth = canvas.getAttribute('width') / 3;
  canvasContext.stroke();

  canvasContext.beginPath();
  canvasContext.moveTo(width/3*2.5, 0);
  canvasContext.lineTo(width/3*2.5, height-100);
  canvasContext.strokeStyle = '#0c3f5f';
  canvasContext.lineWidth = canvas.getAttribute('width') / 3;
  canvasContext.stroke();

  console.log('height', height)
  console.log('width', width)

})(window, document, undefined);