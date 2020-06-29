$(document).ready(function(){
  // Setto primo giorno dell'anno di interesse
  var startDate = moment("2018-01-01");

  // Calcolo quanti giorni ha il mese corrente
  var totDayMonth = startDate.daysInMonth();
  // Stampo i giorni del mese corrente
  // Uso un template con Handelbars per scrivere la lista dei giorni
  var source = document.getElementById("calendar-template").innerHTML;
  var template = Handlebars.compile(source);

  // Ciclo in base al numero dei giorni del mese corrente per stampare
  for (var i = 0; i < totDayMonth; i++) {
    var newDay = moment(startDate).add(i,'days');
    var day = (newDay.format('D'));
    var month = (newDay.format('MMMM'));
    // creo un attributo per salvare la data ed usarla per controllare se è festività
    var totalDate = newDay.format('YYYY-MM-DD');
    var dateToStamp = {day: day, month: month, date: totalDate};
    var html = template(dateToStamp);
    $('.calendar').append(html);
  };

  // Chiamata Ajax per vedere le festività del mese corrente
    $.ajax({
      url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
      method: 'GET',
      success: function(data) {

        // Vedere le festività del mese corrente
        var festivityCalendar = data.response;
        for (var i = 0; i < festivityCalendar.length; i++) {
          var singleFestivity = festivityCalendar[i].date;

          // Chi ha l'attributo data-date uguale alla festività
          // prende la classe per evidenziare la festività
          $(".day-calendar[data-date='" + singleFestivity + "']").addClass("festivity");
        };
      },
      error: function() {
        alert('errore per reperire info su festività');
      }
    });
  // Fine chiamata ajax
});
