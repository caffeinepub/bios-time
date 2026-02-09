const DATE_DISPLAY_KEY = 'bios-time-date-display';

export type DateDisplayPreference = 'he-primary' | 'gregorian-primary';

export function getDateDisplayPreference(): DateDisplayPreference {
  try {
    const stored = localStorage.getItem(DATE_DISPLAY_KEY);
    if (stored === 'he-primary' || stored === 'gregorian-primary') {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to read date display preference from localStorage:', error);
  }
  return 'he-primary';
}

export function setDateDisplayPreference(preference: DateDisplayPreference): void {
  try {
    localStorage.setItem(DATE_DISPLAY_KEY, preference);
  } catch (error) {
    console.warn('Failed to save date display preference to localStorage:', error);
  }
}
