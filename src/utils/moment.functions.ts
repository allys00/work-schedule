import { format as toFormat, set } from 'date-fns'

export const dateView = (timestamp: any, format = "dd/MM/yyyy") => {
  return toFormat(timestamp.toDate(), format)
};


export const getRangeMonth = (month: number) => {
  const date = new Date()
  return {
    startAt: set(date, { month, date: 1, hours: 0, minutes: 0, seconds: -1 }),
    endAt: set(date, { month: month + 1, hours: 0, minutes: 0, seconds: -1 }),
  }
}

