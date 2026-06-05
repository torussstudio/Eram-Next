export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F5EFE8] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#ae1431]/30 border-t-[#ae1431] rounded-full animate-spin" />
        <p className="font-rethink text-sm text-[#111]/50 tracking-widest uppercase">
          Loading
        </p>
      </div>
    </div>
  );
}
