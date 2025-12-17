import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { UserCard } from "@/components/user-card/UserCard";
import { projectBD } from "@/projectDB/data";

type CardAction = "like" | "nope" | "skip";

const HIDE_DURATION_MS = 420;
const ENTER_DURATION_MS = 320;

export const UserPicker = () => {
  const [index, setIndex] = useState(0);
  const [stageState, setStageState] = useState<CardAction | "enter" | null>(null);
  const hideTimerRef = useRef<number>(0);
  const enterTimerRef = useRef<number>(0);

  const totalProfiles = projectBD.length;

  const triggerAction = useCallback(
    (action: CardAction) => {
      if (!totalProfiles || hideTimerRef.current || enterTimerRef.current) {
        return;
      }

      setStageState(action);
      hideTimerRef.current = window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % totalProfiles);
        setStageState("enter");

        if (hideTimerRef.current) {
          window.clearTimeout(hideTimerRef.current);
          hideTimerRef.current = 0;
        }

        enterTimerRef.current = window.setTimeout(() => {
          setStageState(null);
          if (enterTimerRef.current) {
            window.clearTimeout(enterTimerRef.current);
            enterTimerRef.current = 0;
          }
        }, ENTER_DURATION_MS);
      }, HIDE_DURATION_MS);
    },
    [totalProfiles]
  );

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
      if (enterTimerRef.current) {
        window.clearTimeout(enterTimerRef.current);
      }
    };
  }, []);

  const currentProfile = useMemo(() => {
    if (!totalProfiles) {
      return null;
    }
    return projectBD[index % totalProfiles];
  }, [index, totalProfiles]);

  if (!currentProfile) {
    return (
      <main className="mx-auto w-full max-w-[420px] h-full px-4 py-6 text-center text-white/80">
        <p>No profiles available.</p>
      </main>
    );
  }

  const stageBaseClass =
    "relative mx-auto min-h-[560px] w-full max-w-[420px]";
  const cardStateClass =
    stageState === "like"
      ? "-translate-y-[18px]"
      : stageState === "nope"
        ? "translate-y-[26px] scale-[0.92] opacity-0"
        : stageState === "skip"
          ? "scale-[0.8] opacity-0"
          : "";

  return (
    <main className="mx-auto w-full max-w-[420px] h-full px-4 py-6">
      <div className={stageBaseClass}>
        <div
          className={`absolute inset-0 transition-[transform,opacity] duration-300 ease-out will-change-[transform,opacity] ${
            stageState === "enter" ? "animate-card-deck-enter" : cardStateClass
          }`}
          key={currentProfile.data_id}
        >
          <UserCard
            fname={currentProfile.fname}
            age={currentProfile.age}
            mainImg={currentProfile.mainImg}
            isActive={currentProfile.isActive}
            range={currentProfile.range}
            onLike={() => triggerAction("like")}
            onNope={() => triggerAction("nope")}
            onSkip={() => triggerAction("skip")}
          />
        </div>
      </div>
    </main>
  );
}
