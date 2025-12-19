import { useState, type MouseEventHandler } from "react";
import { ModalWindow } from "../layout/modal/ModalWindow";
import { type userData } from "@/types/type-user";

type HoveredAction = "like" | "nope" | "skip" | null;

type UserCardActionHandler = MouseEventHandler<HTMLButtonElement>;
export type UserCardProps = Pick<
  userData,
  "fname" | "age" | "mainImg" | "isActive" | "range"
> & {
  onLike?: UserCardActionHandler;
  onNope?: UserCardActionHandler;
  onSkip?: UserCardActionHandler;
};

export const UserCard = ({
  fname,
  age,
  mainImg,
  isActive,
  range,
  onLike,
  onNope,
  onSkip,
}: UserCardProps) => {
  const [hoveredAction, setHoveredAction] = useState<HoveredAction>(null);

  const statusLabel = isActive ? "Active now" : "Offline";
  const distanceLabel = `${range} km away`;
  const statusDotClass = [
    "inline-block h-2 w-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.35)]",
    isActive
      ? "bg-[#3dd598] shadow-[0_0_12px_rgba(61,213,152,0.6)]"
      : "bg-[#ff5364] shadow-[0_0_12px_rgba(255,83,100,0.6)]",
  ].join(" ");

  const interactionTilt =
    hoveredAction === "nope"
      ? "-translate-x-3 -rotate-2"
      : hoveredAction === "like"
        ? "translate-x-3 rotate-2"
        : hoveredAction === "skip"
          ? "-translate-y-1.5 grayscale"
          : "";

  const photoScale =
    hoveredAction === "like"
      ? "scale-[1.05]"
      : hoveredAction === "nope"
        ? "scale-[1.04]"
        : "scale-100";

  const handleHover =
    (action: HoveredAction) =>
    () => {
      setHoveredAction(action);
    };
  
  const [open, setOpen] = useState(false)
  return (
    <section className="w-full max-w-[360px] sm:max-w-[420px] px-4 sm:px-0 pb-6 mx-auto">
      <article
        className={`flex flex-col gap-4 rounded-[32px] bg-gradient-to-b from-[#1b1b1f] to-[#0e0f12] shadow-[0_25px_45px_rgba(9,9,14,0.35)] p-4 sm:p-5 transition duration-300 ease-out will-change-transform ${interactionTilt}`}
        onMouseLeave={handleHover(null)}
      >
        <figure className="relative overflow-hidden rounded-[24px] bg-[#1f2127] aspect-[4/5]"
          onClick={() => setOpen(true)}
        >
          <img
            src={mainImg}
            alt={`${fname}'s profile`}
            loading="lazy"
            className={`h-full w-full object-cover transition duration-300 ease-out ${photoScale}`}
          />
          <figcaption className="absolute inset-x-4 bottom-4 flex items-end gap-2 text-[clamp(1.2rem,3vw,1.4rem)] font-semibold text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.5)]">
            <h3 className="text-inherit font-semibold">{fname}</h3>
            <span className="font-normal text-white/85">{age}</span>
          </figcaption>
        </figure>

        <div className="flex items-center justify-between text-sm uppercase tracking-[0.04em] text-[#d3d3d8]">
          <span className="inline-flex items-center gap-1">
            <span aria-hidden="true" className={statusDotClass} />
            {statusLabel}
          </span>
          <span>{distanceLabel}</span>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <button
            type="button"
            className="h-16 max-[360px]:h-14 rounded-full bg-white text-[#ff3366] text-base max-[360px]:text-sm font-semibold shadow-[inset_0_0_0_2px_rgba(255,255,255,0.08)] transition duration-200 ease-out hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            aria-label="Dismiss profile"
            onClick={onNope}
            onMouseEnter={handleHover("nope")}
            onFocus={handleHover("nope")}
            onBlur={handleHover(null)}
            onMouseLeave={handleHover(null)}
          >
            Nope
          </button>
          <button
            type="button"
            className="h-16 max-[360px]:h-14 rounded-full bg-[#2a2c34] text-[#f1f1f5] text-base max-[360px]:text-sm font-semibold shadow-[inset_0_0_0_2px_rgba(255,255,255,0.08)] transition duration-200 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 hover:bg-[#cfcfd3] hover:text-[#1f1f25]"
            aria-label="Skip for now"
            onClick={onSkip}
            onMouseEnter={handleHover("skip")}
            onFocus={handleHover("skip")}
            onBlur={handleHover(null)}
            onMouseLeave={handleHover(null)}
          >
            Skip
          </button>
          <button
            type="button"
            className="h-16 max-[360px]:h-14 rounded-full bg-gradient-to-r from-[#ff4d79] to-[#ff7ab5] text-white text-base max-[360px]:text-sm font-semibold shadow-[inset_0_0_0_2px_rgba(255,255,255,0.08)] transition duration-200 ease-out hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            aria-label="Like profile"
            onClick={onLike}
            onMouseEnter={handleHover("like")}
            onFocus={handleHover("like")}
            onBlur={handleHover(null)}
            onMouseLeave={handleHover(null)}
          >
            Like
          </button>
        </div>
      </article>
    </section>
  );
};
