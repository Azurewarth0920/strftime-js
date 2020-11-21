export function toFormatted(format: string): string {
  const weekDayMap = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday',
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
      (7 - new Date(currentYear, 0, 1).getDay() + (startFromMonday ? 1 : 0)) % 6
    return Math.floor(
      (this.getTime() - new Date(currentYear, 0, weekBeginningDay).getTime()) /
        86400000
    )
  }

  // %x 本地相应的日期表示
  // %X 本地相应的时间表示
  // %Z 当前时区的名称
  // %% %号本身

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
  // Weekdays abbreviations.
  fastReplace('%a', weekDayMap[this.getDay()].slice(0, 3))
  // Weekdays.
  fastReplace('%A', weekDayMap[this.getDay()])
  // Month abbreviations.
  fastReplace('%b', this.toLocaleString('default', { month: 'short' }))
  // Month.
  fastReplace('%B', this.toLocaleString('default', { month: 'long' }))
  // Locale Time.
  fastReplace('%c', this.toString())
  // Day in this year.
  fastReplace(
    '%j',
    Math.floor(
      (new Date().getTime() -
        new Date(`${new Date().getFullYear()}/0/1`).getTime()) /
        86400000
    )
  )
  fastReplace('%p', this.getHours() >= 12 ? 'PM' : 'AM')
  // xth week in this year(from Sunday).
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
