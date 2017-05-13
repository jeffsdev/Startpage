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

  // GREETING MESSAGE /////////////////////////////////////////////

  var hourOfDay = new Date().getHours();

  if ( hourOfDay < 12 ) {
    // 12am thru 11:59pm
    $("#main-greeting").html("Good Morning,<br>Jeff");
  } else if ( (hourOfDay >= 12) && (hourOfDay < 18) ) {
    // 12pm thru 5:59pm
    $("#main-greeting").html("Good Afternoon,<br>Jeff");
  } else if ( (hourOfDay >= 18) && (hourOfDay <= 24) ) {
    // 6pm thru 11:59pm
    $("#main-greeting").html("Good Evening,<br>Jeff");
  }

  // SEARCH BAR FUNCTIONALITY  //////////////////////////////////////////////

  $('.search-container #search-submit').click(function(event) {
    event.preventDefault;
    if ( $("#search-input").val().length === 0 ) {
      $('.search-container').prepend("<span id='search-warn'>Please enter search parameters!</span>");
      $("#search-warn").fadeIn( 800 ).delay( 1500 ).fadeOut( 800, function() {
        $("#search-warn").remove();
      });
      return false;
    }
    if( $("#search-toggles").hasClass("web-search-selected") ) {
      var searchQuery = $('.search-container input').val();
      window.location.href = "http://www.google.com/search?q=" + searchQuery;
    }
    if( $("#search-toggles").hasClass("images-search-selected") ) {
      var searchQuery = $('.search-container input').val();
      window.location.href = "http://www.google.com/images?q=" + searchQuery;
    }
  });

  $("#search-input").keyup(function(event){
    if(event.keyCode == 13){
        $("#search-submit").click();
    }
  });

  $('.search-container #search-web-toggle').click(function(event) {
    event.preventDefault;
    $("#search-toggles").removeClass("images-search-selected");
    $("#search-toggles").addClass("web-search-selected");
  });

  $('.search-container #search-images-toggle').click(function(event) {
    event.preventDefault;
    $("#search-toggles").removeClass("web-search-selected");
    $("#search-toggles").addClass("images-search-selected");
  });

  if ( $("#search-input").val().length > 0 ) {
    $(".search-container label").addClass("active");
    $(".search-container #search-submit").addClass("active");
  }

  $("#search-input").focus(function() {
    $(".search-container label").addClass("active");
    $(".search-container #search-submit").addClass("active");
  }).blur(function() {
    if ( $("#search-input").val().length === 0 ) {
      $(".search-container label").removeClass("active");
      $(".search-container #search-submit").removeClass("active");
    }
  });


  // BOOKMARKS //////////////////////////////////////////////

  var bookmarks = [
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


});




window.onload = function(){
	//canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	//canvas dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;

	//snowflake particles
	var mp = 50; //max particles
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*5+1, //radius
			d: Math.random()*mp //density
		})
	}

	//Lets draw the flakes
	function draw()
	{
		ctx.clearRect(0, 0, W, H);

		ctx.fillStyle = "rgba(190, 231, 148, 0.6)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		update();
	}

	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	function update()
	{
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;

			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%3 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
		}
	}

	//animation loop
	setInterval(draw, 50);
}



//hide loader when page is loaded

$(window).on('load', function(){

  function hideLoader() {
    var loadingVeil = $("#loading-screen");

    loadingVeil.addClass("loaded");
    $(".wrapper").addClass("loaded");

    setTimeout(function () {
      loadingVeil.remove();
    }, 1000);

  }

  hideLoader();

});
