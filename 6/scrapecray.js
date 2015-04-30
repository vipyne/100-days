  // var scraperjs = require('scraperjs');
  // scraperjs.DynamicScraper.create('https://news.ycombinator.com/')
  //   .scrape(function() {
  //       return $(".title a").map(function() {
  //           return $(this).text();
  //       }).get();
  //   }, function(news) {
  //       console.log(news);
  //   })


var http =  require('http'),
    https = require('https'),
    url = require('url'),
    Scraper = require('scraper-js');
var address = 'https://www.google.com/search?q=cray+supercomputer&biw=1361&bih=802&source=lnms&tbm=isch&sa=X&ei=_k5ZVfz5HcGqsAWRh4HQAw&sqi=2&ved=0CAcQ_AUoAg';
// var address = 'https://www.reddit.com';
// var address = 'https://www.cray.com';
var scraper = new Scraper.Scraper();
scraper.scrape(address).then(function (thumbs) {
    console.log(thumbs);
});