const TTS_ENABLED_KEY = 'bios-time-tts-enabled';

export function getTtsEnabled(): boolean {
  try {
    const stored = localStorage.getItem(TTS_ENABLED_KEY);
    return stored === 'true';
  } catch (error) {
    console.error('Failed to read TTS setting:', error);
  }
  return false; // Default to disabled
}

export function setTtsEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(TTS_ENABLED_KEY, enabled ? 'true' : 'false');
  } catch (error) {
    console.error('Failed to save TTS setting:', error);
  }
}
