$(document).ready(function(){
  // Setto primo giorno dell'anno di interesse
  var date = moment("2018-01-01");

  // Uso un template con Handelbars per scrivere la lista dei giorni
  var source = document.getElementById("calendar-template").innerHTML;
  var template = Handlebars.compile(source);
  // Calcolo quanti giorni ha il mese corrente
  var totDayMonth = date.daysInMonth();
  // Stampo i giorni del mese corrente
  for (var i = 0; i < totDayMonth; i++) {
    var day = (date.format('D'));
    var month = (date.format('MMMM'));
    var dateToStamp = {day: day, month: month};
    var html = template(dateToStamp);
    $('.calendar').append(html);
    date.add(1,'days');
  };
});
