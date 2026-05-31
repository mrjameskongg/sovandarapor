interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: number;
  separator?: string;
  reverse?: boolean;
}

export default function Marquee({
  items,
  className = '',
  speed = 30,
  separator = '  ·  ',
  reverse = false,
}: MarqueeProps) {
  const text = items.join(separator) + separator;
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <div
        className="inline-block animate-marquee will-change-transform"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <span className="font-ui text-[11px] uppercase tracking-[0.35em] text-content-muted/70">
          {text}{text}
        </span>
      </div>
    </div>
  );
}
