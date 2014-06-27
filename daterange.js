(function (dust, moment) {
  dust.helpers.daterange = function (chunk, context, bodies, params) {
    var lan = dust.helpers.tap(params.lan, chunk, context) || 'en-US';
    moment.lang(lan);
    
    var start = dust.helpers.tap(params.start, chunk, context) || moment().startOf('day');
    var end = dust.helpers.tap(params.end, chunk, context) || moment().startOf('day');
    var length = dust.helpers.tap(params.length, chunk, context) || false;
    var formatDay = dust.helpers.tap(params.formatDay, chunk, context) || 'D';
    var formatMonth = dust.helpers.tap(params.formatMonth, chunk, context) || 'M';
    var formatYear = dust.helpers.tap(params.formatYear, chunk, context) || 'YY';
    var formatWeekday = dust.helpers.tap(params.formatWeekday, chunk, context) || 'd';
    var formatDayExt = dust.helpers.tap(params.formatDayExt, chunk, context) || 'DD';
    var formatMonthExt = dust.helpers.tap(params.formatMonthExt, chunk, context) || 'MM';
    var formatYearExt = dust.helpers.tap(params.formatYearExt, chunk, context) || 'YYYY';
    var formatWeekdayExt = dust.helpers.tap(params.formatWeekdayExt, chunk, context) || 'dddd';
    
    var body = bodies.block, chunk;
    
    if (length) end = moment().startOf('day').add('days', length);
    
    var momentStart = +moment(start);
    var momentEnd = +moment(end);
    var oldWeek = '';
    var oldMonth = '';
    var oldYear = '';
    var counter = 0;
    var weeksPassed = 0;
    var monthsPassed = 0;
    var yearsPassed = 0;
    for (var i=+momentStart; i<=+momentEnd; i+=1000*60*60*24){
      var current = moment(i);
      var weekday = current.format(formatWeekday);
      var month = current.format(formatMonth);
      var year = current.format(formatYear);
      var isNewWeek = (oldWeek>>0 === 6 && weekday>>0 === 0) || counter===0;
      var isNewMonth = oldMonth !== month;
      var isNewYear = oldYear !== year;
      if (isNewWeek) weeksPassed++;
      if (isNewMonth) monthsPassed++;
      if (isNewYear) yearsPassed++;
      chunk = body(chunk, context.push({
        $key: counter,
        $day: current.format(formatDay),
        $month: month,
        $year: year,
        $weekday: weekday,
        $dayExt: current.format(formatDayExt),
        $monthExt: current.format(formatMonthExt),
        $yearExt: current.format(formatYearExt),
        $weekdayExt: current.format(formatWeekdayExt),
        $newWeek: isNewWeek,
        $newMonth: isNewMonth,
        $newYear: isNewYear,
        $weeksPassed: weeksPassed,
        $monthsPassed: monthsPassed,
        $yearsPassed: yearsPassed,
        $first: counter==0
      }));
      oldWeek = weekday;
      oldMonth = month;
      oldYear = year;
      counter++;
    }
    return chunk;
  };
}(typeof exports !== 'undefined' ? module.exports = require('dustjs-linkedin') : dust,
  typeof moment !== 'undefined' ? moment : require('moment')
));