import dayjs from 'dayjs';

export function formatDate(date: string) {
  return dayjs(new Date(date)).format('DD-MMMM-YYYY - HH:mm:ss');
}
