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

    return timeDiff > 0 ? Math.floor(timeDiff / 86400000 / 7) : 0
  }

  type EnumToUnion<T extends string> = {
    [enumValue in T]: `${enumValue}`
  }[T]

  type MemoKey = EnumToUnion<Token>

  type PartialRecord<K extends string, T> = {
    [P in K]?: T
  }

  const memo: PartialRecord<MemoKey, string> = {}

  const memoize = (key: MemoKey, value: string) => {
    memo[key] = value
    return value
  }

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
      // Double digits year.
      case Token.Year:
        return (
          memo[Token.Year] ||
          memoize(Token.Year, this.getFullYear().toString().substr(-2))
        )
      // Full digits year.
      case Token.FullYear:
        return (
          memo[Token.FullYear] ||
          memoize(Token.FullYear, this.getFullYear().toString())
        )
      default:
        return ''
    }
  }

  format.replace(/[%]{1,2}[AaBbcdmHIjMSpUWwxXYy]/g, match => {
    if (match.length === 3) {
      return match.slice(1)
    } else {
      return convert(match.slice(1) as MemoKey)
    }
  })

  fastReplace('%m', this.getMonth())
  // Date.
  fastReplace('%d', this.getDate())
  // Military time.
  fastReplace('%H', this.getHours())
  // Continental time.
  fastReplace('%I', this.getHours() % 12)
  // Minutes.
  fastReplace('%M', this.getMinutes())
  // Seconds.
  fastReplace('%S', this.getSeconds())
  // Weekday abbreviations.
  fastReplace('%a', getWeekDayName(this.getDay()).slice(0, 3))
  // Weekday.
  fastReplace('%A', getWeekDayName(this.getDay()))
  // Month abbreviations.
  fastReplace('%b', this.toLocaleString('default', { month: 'short' }))
  // Month.
  fastReplace('%B', this.toLocaleString('default', { month: 'long' }))
  // Locale Time.
  fastReplace('%c', this.toString())
  // Day in this year.
  fastReplace(
    '%j',
    Math.ceil(
      (this.getTime() - new Date(`${this.getFullYear()}/1/1`).getTime()) /
        86400000
    )
  )
  // Noon or afternoon.
  fastReplace('%p', this.getHours() >= 12 ? 'PM' : 'AM')
  // Week in this year(from Sunday).
  fastReplace('%U', toWeek())
  // Week day in digit.
  fastReplace('%w', this.getDay())
  // xth week in this year(from Monday).
  fastReplace('%W', toWeek(true))
  // locale date string.
  fastReplace('%x', this.toLocaleDateString())
  // locale time string.
  fastReplace('%X', this.toLocaleTimeString())

  return format
}
