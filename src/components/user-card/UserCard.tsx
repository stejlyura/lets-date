import type { MouseEventHandler } from "react";

import { type userData } from "@/types/type-user";
import "./userCard.css";

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
  const statusLabel = isActive ? "Active now" : "Offline";
  const distanceLabel = `${range} km away`;
  const statusDotClass = [
    "user-card__status-dot",
    isActive ? "user-card__status-dot--online" : "user-card__status-dot--offline",
  ].join(" ");

  return (
    <section className="user-card">
      <article className="user-card__inner">
        <figure className="user-card__media">
          <img
            src={mainImg}
            alt={`${fname}'s profile`}
            loading="lazy"
            className="user-card__photo"
          />
          <figcaption className="user-card__identity">
            <h3>{fname}</h3>
            <span>{age}</span>
          </figcaption>
        </figure>

        <div className="user-card__meta">
          <span className="user-card__status">
            <span aria-hidden="true" className={statusDotClass} />
            {statusLabel}
          </span>
          <span className="user-card__distance">{distanceLabel}</span>
        </div>

        <div className="user-card__actions">
          <button
            type="button"
            className="action action--nope"
            aria-label="Dismiss profile"
            onClick={onNope}
          >
            Nope
          </button>
          <button
            type="button"
            className="action action--skip"
            aria-label="Skip for now"
            onClick={onSkip}
          >
            Skip
          </button>
          <button
            type="button"
            className="action action--like"
            aria-label="Like profile"
            onClick={onLike}
          >
            Like
          </button>
        </div>
      </article>
    </section>
  );
};
