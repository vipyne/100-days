  var scraperjs = require('scraperjs');
  scraperjs.DynamicScraper.create('https://news.ycombinator.com/')
    .scrape(function() {
        return $(".title a").map(function() {
            return $(this).text();
        }).get();
    }, function(news) {
        console.log(news);
    })