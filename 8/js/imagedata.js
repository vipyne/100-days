;(function(w, d, u) {

  var benchmark = new Date().getTime(),
      orginalImage = document.getElementById('original-img'),
      height = orginalImage.getAttribute('height'),
      width = orginalImage.getAttribute('width'),
      imgCanvas = document.getElementById('img-canvas'),
      canvas = document.getElementById('draw-canvas'),
      imageData,
      rgbaByteArray,
      imgData,
      worker = new Worker('js/imageWorker.js');

  imgCanvas.setAttribute('height', height);
  imgCanvas.setAttribute('width', width);
  imageContext = imgCanvas.getContext('2d');
  imageContext.drawImage(orginalImage, 0, 0)
  imageData = imageContext.getImageData(0, 0, width, height);
  rgbaByteArray = imageData.data;

  worker.postMessage([rgbaByteArray, width]);

  canvasContext = canvas.getContext('2d');

  worker.addEventListener('message', function(event) {
    imgData = event.data;
    canvasContext.putImageData(imgData, 0, 0);
    console.log('benchmark', new Date().getTime() - benchmark);
  }, false);

  canvas.setAttribute('height', height);
  canvas.setAttribute('width', width);

})(window, document, undefined);