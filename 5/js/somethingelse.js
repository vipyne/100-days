;(function(window, document, undefined){


  var all = document.getElementById('all');

  // var numberColor = document.addEventListener('keydown', function(event) {
  //   console.log('this.color in', event.keyCode);
  //   return event.keyCode;
  // });

  var numberColor = [];

  // ug i'm tired;

    // numberColor.color();

  var loop = setInterval(function() {
    var num = Math.round(Math.random()*9).toString();
    var numText = document.createElement('div');
    document.addEventListener('keydown', function(event) {
      console.log('this.color in', event.keyCode);
      numberColor.push(event.keyCode);
      // return event.keyCode;
    });
    numberColor.d = 'asdlf';
    numText.innerHTML = num;
    all.appendChild(numText);
    d3.selectAll('div').style('color', function(d, i) {
      if (i > 499) { clearInterval(loop); }
      i %= 25;
      // return 'rgb( 123, 123, 123)';
    // console.log('asdf', numberColor.d);
      return 'rgb(' + numberColor[3] + ','+ numberColor[3] + ',' + numberColor[3] +')';
    });
    console.log('rgb(' + numberColor[3] + ','+ numberColor[3] + ',' + numberColor[3] +')');
    d3.selectAll('div').style('display', function(d, i) {
      if (i % 25 === 0) {
        return 'table-column';
      }
    });
  }, 500);

})(window, document);
