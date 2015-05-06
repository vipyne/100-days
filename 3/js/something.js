;(function(window, document, undefined){

  console.log('d2', d3);

  var vis = d3.svg;
  var derp = document.getElementById('something');

  setInterval(function() {
    console.log('sflk');
    console.log(derp);
    derp.append(Math.round(Math.random()*10).toString());
    // derp.html(Math.round(Math.random()*10));
  }, 100);

})(window, document);