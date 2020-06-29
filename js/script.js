$(document).ready(function(){

  // Chiamata Ajax per vedere le festività del mese corrente
  $.ajax({
    url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
    method: 'GET',
    success: function(data) {

      // Setto primo giorno dell'anno di interesse
      var startDate = moment("2018-01-01");

      // Calcolo quanti giorni ha il mese corrente
      var totDayMonth = startDate.daysInMonth();
      // Stampo i giorni del mese corrente
      // Uso un template con Handelbars per scrivere la lista dei giorni
      var source = document.getElementById("calendar-template").innerHTML;
      var template = Handlebars.compile(source);

    // Vedere le festività del mese corrente
    var festivityCalendar = data.response;
    for (var i = 0; i < festivityCalendar.length; i++) {
      var singleFestivity = festivityCalendar[i].date;

      // Ciclo in base al numero dei giorni del mese corrente
      for (var i = 0; i < totDayMonth; i++) {
        var currentDate = startDate.format('YYYY-MM-DD');
        var day = (startDate.format('D'));
        var month = (startDate.format('MMMM'));

        if (currentDate === singleFestivity) {
          var classe = 'festivity';
          var dateToStamp = {class: classe, day: day, month: month};
        } else {
          var dateToStamp = {day: day, month: month};
        }

        var html = template(dateToStamp);
        $('.calendar').append(html);
        startDate.add(1,'days');
      };
    }

    },
    error: function() {
      alert('errore per reperire info su festività');
    }
  });
  // Fine chiamata ajax
});
