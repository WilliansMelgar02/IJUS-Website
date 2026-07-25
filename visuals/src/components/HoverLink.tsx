export const HoverText = ({ children }: { children: string }) => {
  return (
    <div className="relative overflow-hidden inline-flex group">
      <div className="flex">
        {children.split('').map((char, i) => (
          <span key={i} className="relative inline-block whitespace-pre overflow-hidden">
            <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full" style={{ transitionDelay: `${i * 0.02}s` }}>
              {char}
            </span>
            <span className="absolute left-0 top-full inline-block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full" style={{ transitionDelay: `${i * 0.02}s` }}>
              {char}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};
