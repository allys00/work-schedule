import { format as toFormat, set } from 'date-fns'

export const timestampView = (timestamp: any, format = "dd/MM/yyyy") => {
  return toFormat(timestamp.toDate(), format)
};

export const dateView = (date: Date, format = "dd/MM/yyyy") => {
  return toFormat(date, format)
};

export interface IRangeDate { startAt: Date, endAt: Date }
export const getRangeMonth = (month: number, fromData1?: boolean) => {
  const date = new Date()
  return {
    startAt: set(date, { month, date: 1, hours: 0, minutes: 0, seconds: fromData1 ? 0 : -1 }),
    endAt: set(date, { month: month + 1, date: 0, hours: 0, minutes: 0, seconds: fromData1 ? 0 : -1 }),
  }
}

