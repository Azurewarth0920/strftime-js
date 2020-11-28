import { toFormatted } from '@/lib'

declare global {
  interface Date {
    toFormatted(format: string): string
  }
}

describe('import', () => {
  const dateInstance = new Date('2020/1/1 16:05:10')
  const dateInstance2 = new Date('2020/2/9 16:05:10')
  const dateInstance3 = new Date('2020/2/12 16:05:10')
  dateInstance.toFormatted = toFormatted
  dateInstance2.toFormatted = toFormatted
  dateInstance3.toFormatted = toFormatted

  test('%y is converted to double digits year.', () => {
    expect(dateInstance.toFormatted('%y')).toBe('20')
  })

  test('%Y is converted to full year.', () => {
    expect(dateInstance.toFormatted('%Y')).toEqual('2020')
  })

  test('%m is converted to month.', () => {
    expect(dateInstance.toFormatted('%m')).toEqual('0')
  })

  test('%d is converted to date.', () => {
    expect(dateInstance.toFormatted('%d')).toBe('1')
  })

  test('%H is converted to military time.', () => {
    expect(dateInstance.toFormatted('%H')).toBe('16')
  })

  test('%I is converted to military time.', () => {
    expect(dateInstance.toFormatted('%I')).toBe('4')
  })

  test('%M is converted to minute.', () => {
    expect(dateInstance.toFormatted('%M')).toBe('5')
  })

  test('%S is converted to second.', () => {
    expect(dateInstance.toFormatted('%S')).toBe('10')
  })

  test('%a is converted to weekday abbreviations.', () => {
    expect(dateInstance.toFormatted('%a')).toBe('Wed')
  })

  test('%a is converted to weekday.', () => {
    expect(dateInstance.toFormatted('%A')).toBe('Wednesday')
  })

  test('%b is converted to month abbreviations. // en-us', () => {
    expect(dateInstance.toFormatted('%b')).toBe('Jan')
  })

  test('%B is converted to month abbreviations. // en-us', () => {
    expect(dateInstance.toFormatted('%B')).toBe('January')
  })

  test('%c is converted to local time. // JapanStandard time', () => {
    expect(dateInstance.toFormatted('%c')).toBe(
      'Wed Jan 01 2020 16:05:10 GMT+0900 (Japan Standard Time)'
    )
  })

  test('%j is converted to day in this year.', () => {
    expect(dateInstance.toFormatted('%j')).toBe('1')
  })

  test('%p is converted to pm or am.', () => {
    expect(dateInstance.toFormatted('%p')).toBe('PM')
  })

  test('%U is converted to week in this year. // start from Sunday', () => {
    expect(dateInstance.toFormatted('%U')).toBe('0')
    expect(dateInstance2.toFormatted('%U')).toBe('5')
    expect(dateInstance3.toFormatted('%U')).toBe('5')
  })

  test('%w is converted to weekday.', () => {
    expect(dateInstance.toFormatted('%w')).toBe('3')
  })

  test('%W is converted to week in this year. // start from Monday', () => {
    expect(dateInstance.toFormatted('%W')).toBe('0')
    expect(dateInstance2.toFormatted('%W')).toBe('4')
    expect(dateInstance3.toFormatted('%W')).toBe('5')
  })

  test('%y converted to locale date string. // en-us', () => {
    expect(dateInstance.toFormatted('%x')).toBe('1/1/2020')
  })

  test('%y converted to locale time string. // en-us', () => {
    expect(dateInstance.toFormatted('%X')).toBe('4:05:10 PM')
  })

  test('Escaping works', () => {
    expect(dateInstance.toFormatted('%%X %X')).toBe('%X 4:05:10 PM')
  })
})
