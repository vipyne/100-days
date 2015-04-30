// ;(function(window, document, undefined){

// // scratch canvas/html5... going to look into doing this with paper.js

//   // var canvas       = document.getElementById('canvas'),
//   //     context      = canvas.getContext('2d'),
//   //     imageObj     = new Image();


//   //     imageObj.onload = function() {
//   //       context.drawImage(imageObj, 0, 0)
//   //     };

//   //   setTimeout(function() {
//   //     function colorSpot() {
//   //       var pixel = context.getImageData( 200, 200, 1, 1);
//   //     }
//   //     colorSpot();
//   //   }, 1000);
// setTimeout(function() {
//     // Create a raster item using the image tag with id='mona'
//     var raster = new Raster('cray');

//     // Move the raster to the center of the view
//     raster.position = view.center;

//     // Set the opacity of the raster to 10%, so we can see
//     // the colored paths on top more clearly:
//     raster.opacity = 0.1;

//     // The onMouseMove event is fired in increments of 25 pts:
//     tool.fixedDistance = 25;

//     function onMouseMove(event) {
//       // Create a circle shaped path with its center point
//       // at the point in the middle between the current mouse
//       // position and the position when the last onMouseDrag
//       // event was fired:
//       var path = new Path.Circle({
//         center: event.middlePoint,
//         radius: 12.5,
//         strokeColor: 'white'
//       });

//       // Get the average color of the pixels that fall within
//       // the shape of the path:
//       path.fillColor = raster.getAverageColor(path);
//     }
//   }, 2000);

// })(window, document);
