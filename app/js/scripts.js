$(document).ready(function() {

  // WEATHER
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

  // TIME and DATE

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






});
