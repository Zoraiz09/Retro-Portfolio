export function Marquee({
  items,
  className = "",
  speed = "animate-marquee",
}: {
  items: string[];
  className?: string;
  speed?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className={`relative flex overflow-hidden border-y-2 border-ink ${className}`}>
      <div className={`flex shrink-0 ${speed}`}>
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 whitespace-nowrap px-6 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em]"
          >
            {item}
            <span className="text-coral">✳</span>
          </span>
        ))}
      </div>
      <div className={`flex shrink-0 ${speed}`} aria-hidden>
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 whitespace-nowrap px-6 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em]"
          >
            {item}
            <span className="text-coral">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
