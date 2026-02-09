import { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { useNowTicker } from '../../hooks/useNowTicker';

export default function HorizonDial() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const now = useNowTicker();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw day arc (undulating line)
    const arcRadius = 200;
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 4;
    ctx.beginPath();

    for (let angle = 0; angle <= Math.PI; angle += 0.01) {
      const x = centerX + Math.cos(angle) * arcRadius;
      const y = centerY - Math.sin(angle) * arcRadius * 0.6 + Math.sin(angle * 3) * 10;
      if (angle === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw phase colors
    const drawPhaseArc = (startAngle: number, endAngle: number, color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 8;
      ctx.beginPath();
      for (let angle = startAngle; angle <= endAngle; angle += 0.01) {
        const x = centerX + Math.cos(angle) * arcRadius;
        const y = centerY - Math.sin(angle) * arcRadius * 0.6 + Math.sin(angle * 3) * 10;
        if (angle === startAngle) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };

    // Amber/Gold (Action): 0 to π/2
    drawPhaseArc(0, Math.PI / 2, '#d97706');
    // Green (Transition): π/2 to 2π/3
    drawPhaseArc(Math.PI / 2, (2 * Math.PI) / 3, '#16a34a');
    // Indigo (Recovery): 2π/3 to π
    drawPhaseArc((2 * Math.PI) / 3, Math.PI, '#4f46e5');

    // Draw symbolic markers
    const drawMarker = (x: number, y: number, label: string) => {
      ctx.fillStyle = '#92400e';
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = '#78350f';
      ctx.font = 'bold 14px serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, y - 20);
    };

    // East (Sunrise)
    drawMarker(centerX - arcRadius, centerY, 'East');
    // Zenith (Noon)
    drawMarker(centerX, centerY - arcRadius * 0.6, 'Zenith');
    // West (Sunset)
    drawMarker(centerX + arcRadius, centerY, 'West');
    // Nadir (Midnight) - below the arc
    drawMarker(centerX, centerY + 80, 'Nadir');

    // Draw current moment indicator
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeProgress = (hours + minutes / 60) / 24;
    const angle = timeProgress * Math.PI;

    const currentX = centerX + Math.cos(angle) * arcRadius;
    const currentY = centerY - Math.sin(angle) * arcRadius * 0.6 + Math.sin(angle * 3) * 10;

    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(currentX, currentY, 10, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
  }, [now]);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="max-w-full h-auto border border-amber-900/20 rounded-lg bg-white/30"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2">
          <img src="/assets/generated/amber-gold-swatch.dim_512x512.png" alt="Amber" className="w-6 h-6 rounded" />
          <Badge variant="outline" className="border-amber-700 text-amber-700">
            Action Phase
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <img src="/assets/generated/green-swatch.dim_512x512.png" alt="Green" className="w-6 h-6 rounded" />
          <Badge variant="outline" className="border-green-700 text-green-700">
            Transition
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <img src="/assets/generated/indigo-swatch.dim_512x512.png" alt="Indigo" className="w-6 h-6 rounded" />
          <Badge variant="outline" className="border-indigo-700 text-indigo-700">
            Recovery
          </Badge>
        </div>
      </div>

      <p className="text-center text-sm text-amber-800">
        The dial shows your current position in the daily solar cycle
      </p>
    </div>
  );
}
