import { useEffect, useRef } from 'react';
import { generateAnalemmaPoints } from '../../utils/astronomy/analemmaModel';

interface AnalemmaVizProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function AnalemmaViz({ selectedDate }: AnalemmaVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Generate analemma points
    const points = generateAnalemmaPoints();

    // Find bounds
    const xValues = points.map(p => p.x);
    const yValues = points.map(p => p.y);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    // Scale to canvas with padding
    const padding = 60;
    const scaleX = (width - 2 * padding) / (maxX - minX);
    const scaleY = (height - 2 * padding) / (maxY - minY);
    const scale = Math.min(scaleX, scaleY);

    const centerX = width / 2;
    const centerY = height / 2;

    // Draw analemma
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 3;
    ctx.beginPath();

    points.forEach((point, i) => {
      const x = centerX + (point.x - (minX + maxX) / 2) * scale;
      const y = centerY - (point.y - (minY + maxY) / 2) * scale;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw current date marker
    const dayOfYear = Math.floor((selectedDate.getTime() - new Date(selectedDate.getFullYear(), 0, 0).getTime()) / 86400000);
    const currentPoint = points[dayOfYear % points.length];
    const currentX = centerX + (currentPoint.x - (minX + maxX) / 2) * scale;
    const currentY = centerY - (currentPoint.y - (minY + maxY) / 2) * scale;

    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(currentX, currentY, 6, 0, 2 * Math.PI);
    ctx.fill();

    // Draw emblem overlay
    const img = new Image();
    img.src = '/assets/generated/analemma-emblem.dim_1024x1024.png';
    img.onload = () => {
      ctx.globalAlpha = 0.1;
      ctx.drawImage(img, width / 2 - 100, height / 2 - 100, 200, 200);
      ctx.globalAlpha = 1;
    };
  }, [selectedDate]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          className="max-w-full h-auto border border-amber-900/20 rounded-lg bg-white/30"
        />
      </div>
      <p className="text-center text-sm text-amber-800">
        The figure-8 pattern shows the sun's position at the same clock time throughout the year
      </p>
    </div>
  );
}
