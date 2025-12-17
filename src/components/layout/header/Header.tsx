import MailSVG from "@/assets/mail.svg";

export const Header = () => {
  return (
    <header className="w-full bg-gradient-to-b from-[#111218] to-[#0b0c10] px-4 py-6 text-white shadow-[0_18px_38px_rgba(0,0,0,0.5)] sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">

          <div>
            <p className="text-sm font-semibold tracking-wide text-white">Let&apos;s Date</p>
            <p className="text-xs text-white/60">Curated intros</p>
          </div>
        </div>

        <button className="inline-flex items-center gap-3 rounded-full bg-white/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40">
          <span>Messages</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 shadow-inner shadow-black/40">
            <img src={MailSVG} alt="" aria-hidden="true" className="h-4 w-4" />
          </span>
        </button>
      </div>
    </header>
  );
};
