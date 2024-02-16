import { format, parseISO } from 'date-fns'

export const longDate = (dateString = '') => {
    return format(parseISO(dateString), 'MM/dd/yyyy hh:mm aaa')
}
