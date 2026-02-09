export interface AnalemmaPoint {
  x: number;
  y: number;
}

export function generateAnalemmaPoints(): AnalemmaPoint[] {
  const points: AnalemmaPoint[] = [];
  
  for (let day = 0; day < 365; day++) {
    const B = (360 / 365) * (day - 81) * (Math.PI / 180);
    
    // Equation of Time (x-axis)
    const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
    
    // Solar declination (y-axis)
    const declination = 23.45 * Math.sin((360 / 365) * (day - 81) * (Math.PI / 180));
    
    points.push({ x: eot, y: declination });
  }
  
  return points;
}
