;(function(w, d, u) {

  var benchmark = new Date().getTime(),
      originalImage = document.getElementById('original-img'),
      height = originalImage.getAttribute('height'),
      width = originalImage.getAttribute('width'),
      imgCanvas = document.getElementById('img-canvas'),
      canvas = document.getElementById('draw-canvas'),
      canvas2 = document.getElementById('draw-2-canvas'),
      imageData,
      rgbaByteArray,
      imgData,
      worker = new Worker('js/imageWorker.js');

  imgCanvas.setAttribute('height', height);
  imgCanvas.setAttribute('width', width);
  imageContext = imgCanvas.getContext('2d');
  imageContext.drawImage(originalImage, 0, 0)
  imageData = imageContext.getImageData(0, 0, width, height);
  rgbaByteArray = imageData.data;

  worker.postMessage([rgbaByteArray, width]);

  canvasContext = canvas.getContext('2d');
  canvas2Context = canvas2.getContext('2d');

  worker.addEventListener('message', function(event) {
    imgData = event.data.first;
    imgData2 = event.data.second;
    console.log('event.data.derpy', event.data.derpy);
    canvasContext.putImageData(imgData, 0, 0);
    canvas2Context.putImageData(imgData2, 0, 0);
    console.log('benchmark', new Date().getTime() - benchmark);
  }, false);

  canvas.setAttribute('height', height);
  canvas.setAttribute('width', width);
  canvas2.setAttribute('height', height);
  canvas2.setAttribute('width', width);

})(window, document, undefined);