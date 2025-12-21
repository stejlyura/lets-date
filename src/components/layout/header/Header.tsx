import MailSVG from "@/assets/mail.svg";

export const Header = () => {
  return (
    <header className="w-full bg-gradient-to-b from-[#111218] to-[#0b0c10] px-4 py-6 text-white shadow-[0_18px_38px_rgba(0,0,0,0.5)] sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.45)]">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-white/10 text-[13px] font-semibold tracking-[0.2em] text-white/80">
            LD
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-white">Let&apos;s Date</p>
            <p className="text-xs text-white/60">Curated intros</p>
            <div className="mt-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              <span>Quiet mode</span>
            </div>
          </div>
        </div>

        <button className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40">
          <span>Messages</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 shadow-inner shadow-black/40">
            <img src={MailSVG} alt="" aria-hidden="true" className="h-4 w-4" />
          </span>
        </button>
      </div>
    </header>
  );
};
