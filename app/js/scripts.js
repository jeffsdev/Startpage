$(document).ready(function() {

  // WEATHER //////////////////////////////////////////////

  $.simpleWeather({
    location: 'Portland, OR',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      html = '<span><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</span>';

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });

  // TIME and DATE //////////////////////////////////////////////

  var datetime = null,
          date = null,
          time = null;

  var update = function () {
      date = moment(new Date());
      time = moment(new Date());
      datetime.html(date.format('dddd, MMMM Do YYYY'));
      actualtime.html(time.format('h:mm:ss a'));
  };

  datetime = $('#datetime .date');
  actualtime = $('#datetime .time');
  update();
  setInterval(update, 1000);

  // BOOKMARKS //////////////////////////////////////////////

  var bookmarks = [
    {
      "category": "4chan",
      "links": [
        {
          "url": "http://www.4chan.org/c/",
          "name": "/c/ - Anime / Cute"
        },
        {
          "url": "http://www.4chan.org/a/",
          "name": "/a/ - Anime / Manga"
        },
        {
          "url": "http://www.4chan.org/b/",
          "name": "/b/ - Random"
        },
        {
          "url": "http://www.4chan.org/g/",
          "name": "/g/ - Technology"
        },
        {
          "url": "http://www.4chan.org/tg/",
          "name": "/tg/ - Traditional Games"
        },
        {
          "url": "http://www.4chan.org/v/",
          "name": "/v/ - Video Games"
        },
        {
          "url": "http://www.4chan.org/vg/",
          "name": "/vg/ - Video Games General"
        },
      ]
    },
    {
      "category": "Social Media",
      "links": [
        {
          "url": "http://www.facebook.com",
          "name": "Facebook"
        },
        {
          "url": "http://www.twitter.com",
          "name": "Twitter"
        },
        {
          "url": "http://www.linkedin.com",
          "name": "LinkedIn"
        },
      ]
    },
    {
      "category": "Coding",
      "links": [
        {
          "url": "http://www.github.com",
          "name": "GitHub"
        },
        {
          "url": "http://www.stackoverflow.com",
          "name": "Stack Overflow"
        },
      ]
    },
  ];



  bookmarks.forEach(function(i) {
    $(".bookmarks-container").append(
      "<div class='bookmark-category'>" +
      "<h3 class='bookmark-category-title'>" +
      i.category +
      "</h3><ul></ul></div>"
    );
    i.links.forEach(function(t) {
      $(".bookmark-category:last-child ul").append(
        "<li><a href='" +
        t.url + "'>" +
        t.name +
        "</a></li>"
      );
    });
  });
  //
  // $(".bookmarks-container").each(function() {
  //
  // })





});
