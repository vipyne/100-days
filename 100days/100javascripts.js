;(function(window, document, undefined){

// generate html list

  var daysHTML = document.getElementById('js-days'),
      docFrag  = document.createDocumentFragment();



  for (var i = 1; i <= 10; i++) {
    var ul = document.createElement('ul'), holder = [];
    for (var j = 1*i; j <= 10*i; j++) {
      console.log('js', j);
      var lastHTML = [];
      var HTML;
      if (j <= 6) {
        HTML = '<li><a href="' + j + '/index.html">day <span>' + j + '</span></a></li>';
      } else {
        HTML = '<li class="is-disabled"><a href="#">day <span>' + j + '</span></a></li>';
      }
      holder.push(HTML);
      lastHTML = holder.slice(-10);
      // var ten = holder.pop(10);
      ul.innerHTML = lastHTML.join('');
    }
    // console.log(holder);
    console.log('docFrag', docFrag);
    docFrag.appendChild(ul);
    ul = null;
  }

  console.log('doc', docFrag);
  daysHTML.appendChild(docFrag);
  // daysHTML.innerHTML = docFrag;

})(window, document);