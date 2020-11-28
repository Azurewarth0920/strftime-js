# date-formatter

Method that enable formatted output(Python like strftime) from date instance.

## Installation

Use yarn

```bash
yarn add date-formatter
```

or npm

```bash
npm install date-formatter
```

## Usage

### Patch method to instance

```JavaScript
import { patchInstance } from 'data-formatter'

const instance = new Date()
console.log(patchInstance(instance).toFormatted('Today is %x')) // -> Today is 1/1/2020
```

### Patch method to constructor

```JavaScript
import { patch } from 'data-formatter'

patch()
const instance = new Date()
console.log(instance.toFormatted('Today is %x')) // -> Today is 1/1/2020
```

## Reference

| %a  | Weekday as abbreviated name.                                                                                                                                         | Mon                      |     |     |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | --- | --- |
| %A  | Weekday as full name.                                                                                                                                                | Monday                   |     |     |
| %w  | Weekday as a decimal number, where 0 is Sunday and 6 is Saturday.                                                                                                    | 1                        |     |     |
| %d  | Day of the month.                                                                                                                                                    | 30                       |     |     |
| %b  | Month as abbreviated name.                                                                                                                                           | Sep                      |     |     |
| %B  | Month as full name.                                                                                                                                                  | September                |     |     |
| %m  | Month as a decimal number, where 0 is January and 11 is December.                                                                                                    | 9                        |     |     |
| %y  | Year without century as a decimal number.                                                                                                                            | 13                       |     |     |
| %Y  | Year with century as a decimal number.                                                                                                                               | 2013                     |     |     |
| %H  | Hour (24-hour clock) as a decimal number.                                                                                                                            | 07                       |     |     |
| %I  | Hour (12-hour clock) as a decimal number.                                                                                                                            | 07                       |     |     |
| %p  | Locale’s equivalent of either AM or PM.                                                                                                                              | AM                       |     |     |
| %M  | Minute as a decimal number.                                                                                                                                          | 06                       |     |     |
| %S  | Second as a decimal number.                                                                                                                                          | 05                       |     |     |
| %j  | Day of the year as a decimal number.                                                                                                                                 | 273                      |     |     |
| %U  | Week number of the year (Sunday as the first day of the week) as a decimal number. All days in a new year preceding the first Sunday are considered to be in week 0. | 39                       |     |     |
| %W  | Week number of the year (Monday as the first day of the week) as a decimal number. All days in a new year preceding the first Monday are considered to be in week 0. | 39                       |     |     |
| %c  | Locale’s appropriate date and time representation.                                                                                                                   | Mon Sep 30 07:06:05 2013 |     |     |
| %x  | Locale’s appropriate date representation.                                                                                                                            | 09/30/13                 |     |     |
| %X  | Locale’s appropriate time representation.                                                                                                                            | 07:06:05                 |     |     |
| %%  | A literal '%' character.                                                                                                                                             | %                        |     |     |
