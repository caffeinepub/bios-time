export function getHoloceneYear(date: Date): number {
  return date.getFullYear() + 10000;
}

export function formatHoloceneDate(date: Date, preference: 'he-primary' | 'gregorian-primary' = 'he-primary'): string {
  const gregorianYear = date.getFullYear();
  const holoceneYear = getHoloceneYear(date);
  const monthDay = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  if (preference === 'he-primary') {
    return `${monthDay}, ${holoceneYear} HE (${gregorianYear} CE)`;
  } else {
    return `${monthDay}, ${gregorianYear} CE (${holoceneYear} HE)`;
  }
}
