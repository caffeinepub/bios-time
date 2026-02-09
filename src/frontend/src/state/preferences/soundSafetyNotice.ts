const SOUND_SAFETY_KEY = 'bios-time-sound-safety-acknowledged';

export function getSoundSafetyAcknowledged(): boolean {
  return localStorage.getItem(SOUND_SAFETY_KEY) === 'true';
}

export function setSoundSafetyAcknowledged(acknowledged: boolean): void {
  localStorage.setItem(SOUND_SAFETY_KEY, acknowledged ? 'true' : 'false');
}
