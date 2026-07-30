"use client";

import { useEffect, useRef } from "react";

type LineChartProps = {
  title: string;
  hideTitle?: boolean;
  description: string;
  unit: string;
  note?: string;
  items: Array<{
    label: string;
    value: number;
    display?: string;
  }>;
  event?: {
    at: string;
    label: string;
  };
};

export function LineChart({
  title,
  hideTitle,
  description,
  unit,
  note,
  items,
  event,
}: LineChartProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const canvas = canvasRef.current;
    if (!shell || !canvas || items.length < 2) return;

    const draw = () => {
      const width = shell.clientWidth;
      const height = shell.clientHeight;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const context = canvas.getContext("2d");
      if (!context) return;
      context.scale(ratio, ratio);
      context.clearRect(0, 0, width, height);

      // Same axis gutter as .vertical-plot so both chart families share a left edge.
      const padding = {
        top: 34,
        right: 0,
        bottom: 42,
        left: width < 650 ? 44 : 52,
      };
      const plotWidth = width - padding.left - padding.right;
      const plotHeight = height - padding.top - padding.bottom;
      const values = items.map((item) => item.value);
      const rawMin = Math.min(...values);
      const rawMax = Math.max(...values);
      const interval = 50;
      const minimum = Math.floor((rawMin - 20) / interval) * interval;
      const maximum = Math.ceil((rawMax + 20) / interval) * interval;
      const range = maximum - minimum || 1;
      const x = (index: number) =>
        padding.left + (index / (items.length - 1)) * plotWidth;
      const y = (value: number) =>
        padding.top + ((maximum - value) / range) * plotHeight;

      context.font = "10px monospace";
      context.fillStyle = "#686868";
      context.strokeStyle = "#deded9";
      context.lineWidth = 1;

      for (let value = minimum; value <= maximum; value += interval) {
        const position = y(value);
        context.beginPath();
        context.moveTo(padding.left, position);
        context.lineTo(width - padding.right, position);
        context.stroke();
        context.textAlign = "right";
        context.fillText(String(value), padding.left - 12, position + 3);
      }

      context.textAlign = "center";
      items.forEach((item, index) => {
        if (!item.label.endsWith("-01")) return;
        context.fillText(item.label.slice(0, 4), x(index), height - 14);
      });

      if (event) {
        const eventIndex = items.findIndex((item) => item.label === event.at);
        if (eventIndex >= 0) {
          const eventX = x(eventIndex);
          context.save();
          context.setLineDash([4, 5]);
          context.strokeStyle = "#686868";
          context.beginPath();
          context.moveTo(eventX, padding.top);
          context.lineTo(eventX, height - padding.bottom);
          context.stroke();
          context.restore();
          context.fillStyle = "#121212";
          context.textAlign = "left";
          context.fillText(
            event.label,
            Math.min(eventX + 8, width - padding.right - 150),
            padding.top + 12,
          );
        }
      }

      context.strokeStyle = "#e33a31";
      context.lineWidth = 2.5;
      context.lineJoin = "round";
      context.lineCap = "round";
      context.beginPath();
      items.forEach((item, index) => {
        const pointX = x(index);
        const pointY = y(item.value);
        if (index === 0) context.moveTo(pointX, pointY);
        else context.lineTo(pointX, pointY);
      });
      context.stroke();

      const finalIndex = items.length - 1;
      context.fillStyle = "#e33a31";
      context.beginPath();
      // Inset so the marker isn't half-clipped now that the plot runs to the edge.
      context.arc(
        Math.min(x(finalIndex), width - 4),
        y(items[finalIndex].value),
        4,
        0,
        Math.PI * 2,
      );
      context.fill();
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(shell);
    return () => observer.disconnect();
  }, [event, items]);

  return (
    <figure className="insight-figure">
      <figcaption className={hideTitle ? "is-titleless" : undefined}>
        <div>
          <p className="figure-label">Chart</p>
          {!hideTitle && <h2>{title}</h2>}
          <p>{description}</p>
        </div>
        <span>{unit}</span>
      </figcaption>
      <div
        className="line-chart-shell"
        ref={shellRef}
        role="img"
        aria-label={`${title}. ${description}`}
      >
        <canvas ref={canvasRef} aria-hidden="true" />
      </div>
      <details className="chart-data-table">
        <summary>View chart data</summary>
        <div>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>{unit}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.label}>
                  <td>{item.label}</td>
                  <td>{item.display ?? item.value.toLocaleString("en-CA")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <p className="figure-note">{note ?? "Source details are listed below."}</p>
    </figure>
  );
}
