export function SmartphoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto aspect-[9/19.5] max-h-[600px] w-full max-w-[300px] rounded-[2.5rem] border-[6px] border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/50 overflow-hidden ring-1 ring-white/10">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 z-20 h-6 w-32 -translate-x-1/2 rounded-b-3xl bg-zinc-800"></div>
      
      {/* Screen Content */}
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-zinc-950">
        {children}
      </div>
      
      {/* Side Buttons (Visual only) */}
      <div className="absolute -left-[8px] top-24 h-12 w-1 rounded-l-md bg-zinc-800"></div>
      <div className="absolute -left-[8px] top-40 h-12 w-1 rounded-l-md bg-zinc-800"></div>
      <div className="absolute -right-[8px] top-32 h-16 w-1 rounded-r-md bg-zinc-800"></div>
    </div>
  );
}
