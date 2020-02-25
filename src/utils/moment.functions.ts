import { format as toFormat } from 'date-fns'

export const dateView = (timestamp: any, format = "dd/MM/yyyy") => {
  return toFormat(timestamp.toDate(), format)
}