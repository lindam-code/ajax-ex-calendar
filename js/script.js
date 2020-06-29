$(document).ready(function(){
  // Setto primo giorno dell'anno di interesse
  var startDate = moment("2018-01-01");

  // Calcolo quanti giorni ha il mese corrente
  var totDayMonth = startDate.daysInMonth();
  // Stampo i giorni del mese corrente
  // Uso un template con Handelbars per scrivere la lista dei giorni
  var source = document.getElementById("calendar-template").innerHTML;
  var template = Handlebars.compile(source);

  // Ciclo in base al numero dei giorni del mese corrente
  for (var i = 0; i < totDayMonth; i++) {
    var newDay = moment(startDate).add(i,'days');
    var day = (newDay.format('D'));
    var month = (newDay.format('MMMM'));
    var dateToStamp = {day: day, month: month}
    var html = template(dateToStamp);
    $('.calendar').append(html);
  };

});
