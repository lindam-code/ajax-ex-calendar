$(document).ready(function(){
  // Setto primo giorno dell'anno di interesse
  var date = moment("2018-01-01");

  // Calcolo quanti giorni ha il mese corrente
  var totDayMonth = date.daysInMonth();
  // Stampo i giorni del mese corrente
  // Uso un template con Handelbars per scrivere la lista dei giorni
  var source = document.getElementById("calendar-template").innerHTML;
  var template = Handlebars.compile(source);
  // Ciclo in base al numero dei giorni del mese corrente
  for (var i = 0; i < totDayMonth; i++) {
    console.log(date);
    var day = (date.format('D'));
    var month = (date.format('MMMM'));
    var dateToStamp = {day: day, month: month};
    var html = template(dateToStamp);
    $('.calendar').append(html);
    date.add(1,'days');
  };

  // Chiamata Ajax per vedere le festività del mese corrente
  // $.ajax({
  //   url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
  //   method: 'GET',
  //   success: function(data) {
  //   var festivity = data.response;
  //   console.log(festivity);

  //   },
  //   error: function() {
  //     alert('errore per reperire info su festività');
  //   }
  // });
  // Fine chiamata ajax



});
