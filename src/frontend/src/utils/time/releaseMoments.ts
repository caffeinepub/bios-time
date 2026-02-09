export function getNextReleaseMoment(type: 'zenith' | 'nadir'): Date {
  const now = new Date();
  const result = new Date(now);
  
  if (type === 'zenith') {
    result.setHours(12, 0, 0, 0);
    if (result <= now) {
      result.setDate(result.getDate() + 1);
    }
  } else {
    result.setHours(0, 0, 0, 0);
    if (result <= now) {
      result.setDate(result.getDate() + 1);
    }
  }
  
  return result;
}
