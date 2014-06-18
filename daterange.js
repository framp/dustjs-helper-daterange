(function (dust, moment) {
  dust.helpers.daterange = function (chunk, context, bodies, params) {
    var start = dust.helpers.tap(params.start, chunk, context) || Date.now().startOf('day');
    var end = dust.helpers.tap(params.end, chunk, context) || Date.now().startOf('day');
    var formatDay = dust.helpers.tap(params.formatDay, chunk, context) || 'D';
    var formatMonth = dust.helpers.tap(params.formatMonth, chunk, context) || 'M';
    var formatYear = dust.helpers.tap(params.formatYear, chunk, context) || 'YY';
    var formatWeekday = dust.helpers.tap(params.formatWeekday, chunk, context) || 'd';
    var formatDayExt = dust.helpers.tap(params.formatDayExt, chunk, context) || 'DD';
    var formatMonthExt = dust.helpers.tap(params.formatMonthExt, chunk, context) || 'MM';
    var formatYearExt = dust.helpers.tap(params.formatYearExt, chunk, context) || 'YYYY';
    var formatWeekdayExt = dust.helpers.tap(params.formatWeekdayExt, chunk, context) || 'dddd';
    var lan = dust.helpers.tap(params.lan, chunk, context) || 'en-US';
    var body = bodies.block, chunk;
    
    moment.lang(lan);
    var momentStart = +moment(start);
    var momentEnd = +moment(end);
    var oldMonth = '';
    var oldYear = '';
    var counter = 0;
    for (var i=+momentStart; i<=+momentEnd; i+=1000*60*60*24){
      var current = moment(i);
      var month = current.format(formatMonth);
      var year = current.format(formatYear);
      chunk = body(chunk, context.push({
        $key: counter,
        $day: current.format(formatDay),
        $month: month,
        $year: year,
        $weekday: current.format(formatWeekday),
        $dayExt: current.format(formatDayExt),
        $monthExt: current.format(formatMonthExt),
        $yearExt: current.format(formatYearExt),
        $weekdayExt: current.format(formatWeekdayExt),
        $newMonth: oldMonth !== month && oldMonth!=='',
        $newYear: oldYear !== year && oldYear!=='',
        $first: counter==0
      }));
      oldMonth = month;
      oldYear = year;
      counter++;
    }
    return chunk;
  };
}(
    typeof exports !== 'undefined' ? module.exports = require('dustjs-linkedin') : dust),
    moment ? moment : require('moment')
);