;(function(window, document, undefined){

// generate html list

  var daysHTML = document.getElementById('js-days'),
      docFrag  = document.createDocumentFragment(),
      // update this number as sketches are showable... enough. ish.
      numberOfDoneSketches = 8;


  for (var row = 1; row <= 10; row++) {
    var ul     = document.createElement('ul'),
        tempArray = [];
    for (var column = 1 * row; column <= 10 * row; column++) {
      var liArray = [],
          markup;
      if (column <= numberOfDoneSketches) {
        markup  = '<li><a href="' + column + '/index.html">day <span>' + column + '</span></a></li>';
      } else {
        markup = '<li class="is-disabled"><a href="#">day <span>' + column + '</span></a></li>';
      }
      tempArray.push(markup);
      liArray = tempArray.slice(-10);
      ul.innerHTML = liArray.join('');
    }
    docFrag.appendChild(ul);
    ul = null;
  }

  daysHTML.appendChild(docFrag);

})(window, document);