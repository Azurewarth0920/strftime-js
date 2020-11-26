export function toFormatted(this: Date, format: string): string {
  const getWeekDayName = (count: number): string => {
    return [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ][count]
  }

  const toWeek = (startFromMonday?: boolean) => {
    const currentYear = this.getFullYear()
    const weekBeginningDay =
      ((7 -
        new Date(`${currentYear}/1/1`).getDay() +
        (startFromMonday ? 1 : 0)) %
        7) +
      1
    const timeDiff =
      this.getTime() -
      new Date(`${currentYear}/1/${weekBeginningDay}`).getTime()

    return timeDiff > 0 ? Math.floor(timeDiff / 86400000 / 7).toString() : '0'
  }

  type EnumToUnion<T extends string> = {
    [enumValue in T]: `${enumValue}`
  }[T]

  type MemoKey = EnumToUnion<Token>

  type PartialRecord<K extends string, T> = {
    [P in K]?: T
  }

  const memo: PartialRecord<MemoKey, string> = {}

  const memoize = (key: MemoKey, value: string) => (memo[key] = value)

  const enum Token {
    Year = 'y',
    FullYear = 'Y',
    Month = 'm',
    Date = 'd',
    MilitaryTime = 'H',
    ContinentalTime = 'I',
    Minutes = 'M',
    Seconds = 'S',
    AbbrWeekday = 'a',
    FullWeekday = 'A',
    AbbrMonth = 'b',
    FullMonth = 'B',
    LocaleTime = 'c',
    DayInThisYear = 'j',
    Meridiem = 'p',
    WeekInYearFromSunday = 'U',
    WeekDay = 'w',
    WeekInYearFromMonday = 'W',
    LocaleDateString = 'x',
    LocaleTimeString = 'X',
  }

  const convert = (token: MemoKey) => {
    switch (token) {
      case Token.Year:
        return (
          memo[Token.Year] ||
          memoize(Token.Year, this.getFullYear().toString().substr(-2))
        )

      case Token.FullYear:
        return (
          memo[Token.FullYear] ||
          memoize(Token.FullYear, this.getFullYear().toString())
        )

      case Token.Month:
        return (
          memo[Token.Month] || memoize(Token.Month, this.getMonth().toString())
        )

      case Token.Date:
        return (
          memo[Token.Date] || memoize(Token.Date, this.getDate().toString())
        )

      case Token.MilitaryTime:
        return (
          memo[Token.MilitaryTime] ||
          memoize(Token.MilitaryTime, this.getHours().toString())
        )

      case Token.ContinentalTime:
        return (
          memo[Token.ContinentalTime] ||
          memoize(Token.ContinentalTime, (this.getHours() % 12).toString())
        )

      case Token.Minutes:
        return (
          memo[Token.Minutes] ||
          memoize(Token.Minutes, this.getMinutes().toString())
        )

      case Token.Seconds:
        return (
          memo[Token.Seconds] ||
          memoize(Token.Seconds, this.getSeconds().toString())
        )

      case Token.AbbrWeekday:
        return (
          memo[Token.AbbrWeekday] ||
          memoize(Token.Seconds, getWeekDayName(this.getDay()).slice(0, 3))
        )

      case Token.FullWeekday:
        return (
          memo[Token.FullWeekday] ||
          memoize(Token.FullWeekday, getWeekDayName(this.getDay()))
        )

      case Token.AbbrMonth:
        return (
          memo[Token.AbbrMonth] ||
          memoize(
            Token.AbbrMonth,
            this.toLocaleString('default', { month: 'short' })
          )
        )

      case Token.FullMonth:
        return (
          memo[Token.FullMonth] ||
          memoize(
            Token.FullMonth,
            this.toLocaleString('default', { month: 'long' })
          )
        )

      case Token.LocaleTime:
        return (
          memo[Token.LocaleTime] || memoize(Token.LocaleTime, this.toString())
        )

      case Token.DayInThisYear:
        return (
          memo[Token.DayInThisYear] ||
          memoize(
            Token.LocaleTime,
            Math.ceil(
              (this.getTime() -
                new Date(`${this.getFullYear()}/1/1`).getTime()) /
                86400000
            ).toString()
          )
        )

      case Token.Meridiem:
        return (
          memo[Token.Meridiem] ||
          memoize(Token.LocaleTime, this.getHours() >= 12 ? 'PM' : 'AM')
        )

      case Token.WeekInYearFromSunday:
        return (
          memo[Token.WeekInYearFromSunday] ||
          memoize(Token.WeekInYearFromSunday, toWeek())
        )

      case Token.WeekDay:
        return (
          memo[Token.WeekDay] ||
          memoize(Token.WeekDay, this.getDay().toString())
        )

      case Token.WeekInYearFromMonday:
        return (
          memo[Token.WeekInYearFromMonday] ||
          memoize(Token.WeekInYearFromMonday, toWeek(true))
        )

      case Token.LocaleDateString:
        return (
          memo[Token.LocaleDateString] ||
          memoize(Token.LocaleDateString, this.toLocaleDateString())
        )

      case Token.LocaleTimeString:
        return (
          memo[Token.LocaleTimeString] ||
          memoize(Token.LocaleTimeString, this.toLocaleTimeString())
        )
      default:
        return ''
    }
  }

  return format.replace(/[%]{1,2}[AaBbcdmHIjMSpUWwxXYy]/g, match => {
    if (match.length === 3) {
      return match.slice(1)
    } else {
      return convert(match.slice(1) as MemoKey)
    }
  })
}
