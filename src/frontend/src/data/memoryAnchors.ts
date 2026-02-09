export interface MemoryAnchor {
  title: string;
  text: string;
}

const anchors: Record<string, MemoryAnchor> = {
  '1-1': {
    title: 'The Dawn of Agriculture',
    text: '12,025 years ago, humans began cultivating wild grains in the Fertile Crescent, marking the transition from nomadic hunter-gatherers to settled agricultural communities.',
  },
  '2-14': {
    title: 'The Bølling-Allerød Warming',
    text: 'Around this time 12,025 years ago, Earth experienced rapid warming after the last ice age, creating conditions that would allow human civilization to flourish.',
  },
  '3-21': {
    title: 'Spring Equinox Ceremonies',
    text: 'Ancient peoples marked the spring equinox with ceremonies celebrating renewal and the return of light, a tradition echoing through millennia.',
  },
  '6-21': {
    title: 'Summer Solstice Celebrations',
    text: 'The longest day of the year has been celebrated across cultures for thousands of years, honoring the sun at its zenith.',
  },
  '9-23': {
    title: 'Autumn Equinox Harvest',
    text: 'Ancient communities gathered to celebrate the harvest and prepare for winter, marking the balance between light and dark.',
  },
  '12-21': {
    title: 'Winter Solstice Rebirth',
    text: 'The darkest night of the year was seen as the rebirth of the sun, celebrated with fire and light across ancient cultures.',
  },
};

export function getMemoryAnchor(date: Date): MemoryAnchor {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const key = `${month}-${day}`;
  
  return anchors[key] || {
    title: 'A Day in the Holocene',
    text: 'Each day connects us to 12,025 years of human history, from the first settlements to the present moment.',
  };
}
