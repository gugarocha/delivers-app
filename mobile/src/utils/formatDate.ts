import { format } from 'date-fns'

export function formatDate(date: string | Date) {
  if (date) {
    return format(new Date(date), 'dd/MM/yyyy');
  };
};