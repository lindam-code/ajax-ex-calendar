$(document).ready(function(){
  // Setto primo giorno dell'anno di interesse
  var startDate = moment(
    {
    day:01,
    month:0,
    year:2018
    }
  );

  // Calcolo quanti giorni ha il mese corrente
  var totDayMonth = startDate.daysInMonth();
  // Stampo i giorni del mese corrente usando una funzione
  printDays(startDate);
  highlightFestivity(startDate);

  // Creo evento click sul tasto next
  $('#next').click(function(){
    var currentMonth = $('.current-month').attr('data-current-month');
    var momentCurrentMonth = moment(currentMonth);
    var nextMonth = momentCurrentMonth.add(1,'months');
    printDays(nextMonth);
    highlightFestivity(nextMonth);

  });

  // INIZIO FUNZIONI

  // Funzione che stampa i giorni di un mese scelto
  // Accetta: startDate che è un oggetto moment che rappresenta
  // il primo giorno del mese scelto
  // Return: niente, stampa solo a schermo
  function printDays(startDate) {
    // Pulisco la lista prima di scrivere nuovi giorni
    $('.calendar').html('');

    // Stampo nel titolo il nome del mese corrente e
    // salvo in un attributo la data del primo giorno del mese corrente
    // per memorizzarla ed utilizzarla nei tasti next e prev
    $('.current-month').text(startDate.format('MMMM YYYY'));
    $('.current-month').attr('data-current-month', startDate.format('YYYY-MM-DD'));


    // Uso un template con Handelbars per scrivere la lista dei giorni
    var source = document.getElementById("calendar-template").innerHTML;
    var template = Handlebars.compile(source);

    // Ciclo in base al numero dei giorni del mese corrente per stampare
    for (var i = 1; i <= totDayMonth; i++) {
      var currentDay = moment({
        day:i,
        month: startDate.month(),
        year: startDate.year()
      })
      // var newDay = moment(startDate).add(i,'days');
      var day = (currentDay.format('D'));
      var month = (currentDay.format('MMMM'));
      // creo un attributo per salvare la data ed usarla per controllare se è festività
      var totalDate = currentDay.format('YYYY-MM-DD');
      var dateToStamp = {day: day, month: month, date: totalDate};
      var html = template(dateToStamp);
      $('.calendar').append(html);
    };
  };

  // Funzione che evidenzia le festività del 2018 facendo una chiamata API
  // Accetta: startDate che è un oggetto moment che rappresenta
  // il primo giorno del mese di cui voglio evidenziare festività
  // Return: niente, stampa solo a schermo
  function highlightFestivity(startDate) {
    // Chiamata Ajax per vedere le festività del mese corrente
    $.ajax({
      url: 'https://flynn.boolean.careers/exercises/api/holidays',
      method: 'GET',
      data: {year: startDate.year(), month: startDate.month()},
      success: function(data) {

        // Vedere le festività del mese corrente
        var festivityCalendar = data.response;
        for (var i = 0; i < festivityCalendar.length; i++) {
          var singleFestivity = festivityCalendar[i].date;
          var nameFestivity = festivityCalendar[i].name;

          // Chi ha l'attributo data-date uguale alla festività
          // prende la classe per evidenziare la festività
          $(".day-calendar[data-date='" + singleFestivity + "']").append(" &minus; " + nameFestivity);
          $(".day-calendar[data-date='" + singleFestivity + "']").addClass("festivity");
        };
      },
      error: function() {
        alert('errore per reperire info su festività');
      }
    });
    // Fine chiamata ajax
  };
  // FINE FUNZIONI

});
