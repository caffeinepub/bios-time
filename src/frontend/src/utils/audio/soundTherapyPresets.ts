export interface SoundPreset {
  id: string;
  name: string;
  frequency: number;
  description: string;
}

export const soundTherapyPresets = {
  solfeggio: [
    { id: 'sol-174', name: 'Ancrage', frequency: 174, description: 'Foundation and grounding' },
    { id: 'sol-285', name: 'Restauration', frequency: 285, description: 'Tissue regeneration' },
    { id: 'sol-396', name: 'Libération', frequency: 396, description: 'Release fear and guilt' },
    { id: 'sol-417', name: 'Changement', frequency: 417, description: 'Facilitate change' },
    { id: 'sol-432', name: 'Cohérence', frequency: 432, description: 'Natural harmony' },
    { id: 'sol-528', name: 'Amour', frequency: 528, description: 'DNA repair and love' },
    { id: 'sol-639', name: 'Connexion', frequency: 639, description: 'Relationships' },
    { id: 'sol-741', name: 'Éveil', frequency: 741, description: 'Awakening intuition' },
    { id: 'sol-852', name: 'Intuition', frequency: 852, description: 'Spiritual order' },
    { id: 'sol-963', name: 'Unité', frequency: 963, description: 'Divine connection' },
  ] as SoundPreset[],
  neuroscience: [
    { id: 'neuro-4', name: 'Delta', frequency: 4, description: 'Deep sleep' },
    { id: 'neuro-10', name: 'Alpha', frequency: 10, description: 'Relaxation' },
    { id: 'neuro-18', name: 'Beta', frequency: 18, description: 'Focus and alertness' },
    { id: 'neuro-40', name: 'Gamma', frequency: 40, description: 'Higher cognition' },
  ] as SoundPreset[],
};
