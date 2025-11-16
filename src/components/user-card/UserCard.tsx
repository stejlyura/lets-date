import { type UserType } from "@/types/type-user";
import "./userCard.css";

export const UserCard: React.FC<UserType> = ({ fname, age, mainImg }) => {
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
          <span className="user-card__status">Active now</span>
          <span className="user-card__distance">2 km away</span>
        </div>

        <div className="user-card__actions">
          <button
            type="button"
            className="action action--nope"
            aria-label="Dismiss profile"
          >
            ✕
          </button>
          <button
            type="button"
            className="action action--skip"
            aria-label="Skip for now"
          >
            Skip
          </button>
          <button
            type="button"
            className="action action--like"
            aria-label="Like profile"
          >
            ♥
          </button>
        </div>
      </article>
    </section>
  );
};
