;(function(window, document, undefined){

// generate html list

  var daysHTML = document.getElementById('js-days'),
      docFrag  = document.createDocumentFragment();

  for (var i = 1; i <= 10; i++) {
    var ul = document.createElement('ul'), holder = [];
    for (var j = 1*i; j <= 10*i; j++) {
      var li = [], HTML;
      if (j <= 3) {
        HTML = '<li><a href="' + j + '/index.html">day <span>' + j + '</span></a></li>';
      } else {
        HTML = '<li class="is-disabled"><a href="#">day <span>' + j + '</span></a></li>';
      }
      holder.push(HTML);
      li = holder.slice(-10);
      ul.innerHTML = li.join('');
    }
    docFrag.appendChild(ul);
    ul = null;
  }

  daysHTML.appendChild(docFrag);

})(window, document);