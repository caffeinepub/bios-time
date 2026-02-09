export function calculateEquationOfTime(date: Date): number {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  
  // Approximate formula for Equation of Time
  const B = (360 / 365) * (dayOfYear - 81) * (Math.PI / 180);
  
  const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
  
  return eot;
}
