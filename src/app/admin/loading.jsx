export default function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full animate-[fadeIn_0.2s_ease-out]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#ae1431]/30 border-t-[#ae1431] rounded-full animate-spin" />
        <p className="font-rethink text-xs text-zinc-500 tracking-widest uppercase">
          Loading Console...
        </p>
      </div>
    </div>
  );
}
