export function exportJardinSecretData() {
  const dreams = JSON.parse(localStorage.getItem('bios-time-dreams') || '[]');
  const rituals = JSON.parse(localStorage.getItem('bios-time-rituals') || '[]');
  const completions = JSON.parse(localStorage.getItem('bios-time-ritual-completions') || '{}');

  const data = {
    exportDate: new Date().toISOString(),
    dreams,
    rituals,
    ritualCompletions: completions,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `bios-time-export-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
