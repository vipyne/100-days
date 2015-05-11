;(function(window, document, undefined){

// scratch canvas/html5... going to look into doing this with paper.js

  var canvas       = document.getElementById('canvas'),
      context      = canvas.getContext('2d'),
      imageObj     = new Image();

      imageObj.src = 'http://im.ft-static.com/content/images/71688a70-e8ea-11e2-8e9e-00144feabdc0.img';

      imageObj.onload = function() {
        context.drawImage(imageObj, 0, 0)
      };

    setTimeout(function() {
      function colorSpot() {
        var pixel = context.getImageData( 200, 200, 1, 1);
      }
      colorSpot();
    }, 1000);

})(window, document);
