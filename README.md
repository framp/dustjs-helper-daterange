# daterange helper 

Loop over a date range providing information for each day inside the loop

## Definition

```
{@daterange start="2014-06-25" end="2015-06-25" lan='en-US'
  formatDay="D" formatMonth="M" formatYear="YY" formatWeekDay="d"
  formatDayExt="DD" formatMonthExt="MM" formatYearExt="YYYY" formatWeekDayExt="dddd"}
  
{/daterange}


```
## Examples

```
{@daterange start="2014-06-25" end="2015-06-25"}
{?$first}
  <h1>{$yearExt}</h1>
  <div class="year">
    <h2>{$monthExt}</h2>
    <ul>
{/$first}
{?$newMonth}
  </ul>
  {?$newYear}
    </div>
    <h1>{$yearExt}</h1>
    <div class="year">
  {/$newYear}
  <h2>{$monthExt}</h2>
  <ul>
{/$newMonth}

<li>
  {$key}. {$day}-{$month}-{$year}, 
  {$weekdayExt} - {$weekday} of the week
</li>
{/daterange}
```

## Usage
Depends on dustjs-helpers module to be loaded first since it adds it's definition to the
the dust.helpers property.

In node.js:
require('dustjs-helper-repeat');

In browser:

If not using require, load the JS some other way and call it with the dust object. As noted earlier,
dustjs-helpers must be loaded earlier.

