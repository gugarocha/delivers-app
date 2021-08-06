import { format } from 'date-fns'

export function formatDate(date: string | undefined) {
  if (date) {
    return format(new Date(date), 'dd/MM/yyyy');
  };
};