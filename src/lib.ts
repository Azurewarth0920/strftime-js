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

  // Perform side effect fast replacement
  function fastReplace(from: string, to: string | number): void {
    let position = format.indexOf(from)
    if (position === -1) return

    while (position > -1) {
      // The from length is always 2.
      format = `${format.slice(0, position)}${to}${format.slice(position + 2)}`
      position = format.indexOf(from)
    }
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

  // Double digits year.
  fastReplace('%y', this.getFullYear().toString().substr(-2))
  // Full digits year.
  fastReplace('%Y', this.getFullYear())
  // Month.
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
  // % escaper
  fastReplace('%%', '%')

  return format
}
