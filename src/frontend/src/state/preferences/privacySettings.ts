const PRIVACY_SETTINGS_KEY = 'bios-time-privacy-settings';

export interface PrivacySettings {
  syncEnabled: boolean;
}

export function getPrivacySettings(): PrivacySettings {
  const stored = localStorage.getItem(PRIVACY_SETTINGS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return { syncEnabled: false };
}

export function setPrivacySettings(settings: PrivacySettings): void {
  localStorage.setItem(PRIVACY_SETTINGS_KEY, JSON.stringify(settings));
}
