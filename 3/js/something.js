;(function(window, document, undefined){

  // crazy inefficient, just dipping my toe into d3.

  var all = document.getElementById('all');

  var loop = setInterval(function() {
    var num = Math.round(Math.random()*9).toString();
    var numText = document.createElement('div');
    numText.innerHTML = num;
    all.appendChild(numText);
    d3.selectAll('div').style('color', function(d, i) {
      if (i > 499) { clearInterval(loop); }
      i %= 25;
      return 'rgb(234,123,' + (i * 10) +')';
    });
    d3.selectAll('div').style('display', function(d, i) {
      if (i % 25 === 0) {
        return 'table-column';
      }
    });
  }, 10);

})(window, document);
