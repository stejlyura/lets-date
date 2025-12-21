type Props = {
  mainImg: string;
  fname: string;
  age: number;
  isActive: boolean;
  ocupation: string;
  isSmoking: boolean;
  isDrinking: boolean;
  aboutMe: string;
  isDogs: boolean;
  isCats: boolean;
  hobbies: string[];
};

export const UserAbout = ({
  mainImg,
  fname,
  age,
  isActive,
  ocupation,
  isSmoking,
  isDrinking,
  aboutMe,
  isDogs,
  isCats,
  hobbies,
}: Props) => {
  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[260px_1fr]">
        {/* LEFT (small) */}
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={mainImg}
              alt={`${fname} photo`}
              className="h-64 w-full object-cover"
              loading="lazy"
            />
            <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur">
              {isActive ? "Active" : "Offline"}
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-zinc-900">{fname}</h3>
              <span className="text-sm font-medium text-zinc-600">{age}</span>
            </div>
            <p className="mt-1 text-sm text-zinc-600">{ocupation}</p>
          </div>
        </div>

        {/* RIGHT (additional info) */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-3">
          <h4 className="text-base font-semibold text-zinc-900">About</h4>

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge label="Smoking" value={isSmoking} trueText="Smokes" falseText="Doesn't smoke" />
            <Badge label="Drinking" value={isDrinking} trueText="Drinks" falseText="Doesn't drink" />
            <Badge label="Dogs" value={isDogs} trueText="Likes dogs" falseText="No dogs" />
            <Badge label="Cats" value={isCats} trueText="Likes cats" falseText="No cats" />
          </div>

          <div className="mt-4 rounded-2xl bg-zinc-100 p-3 text-sm leading-relaxed text-zinc-800">
            {aboutMe}
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium text-zinc-600">Hobbies</p>

            <div className="mt-2 flex flex-wrap gap-2">
              {hobbies?.length ? (
                hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white"
                  >
                    {hobby}
                  </span>
                ))
              ) : (
                <span className="text-sm text-zinc-400">No hobbies</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type BadgeProps = {
  label: string;
  value: boolean;
  trueText: string;
  falseText: string;
};

const Badge = ({ label, value, trueText, falseText }: BadgeProps) => {
  return (
    <div
      className={[
        "rounded-full px-3 py-1 text-xs font-semibold",
        value ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600",
      ].join(" ")}
      aria-label={label}
      title={label}
    >
      {value ? trueText : falseText}
    </div>
  );
};
