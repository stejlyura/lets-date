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
      <main className="usr-card-deck">
        <p>No profiles available.</p>
      </main>
    );
  }

  const stageClassNames = ["user-card-deck__stage"];
  if (stageState) {
    stageClassNames.push(`user-card-deck__stage--${stageState}`);
  }

  return (
    <main className="user-card-deck w-full h-full" >
      <div className={stageClassNames.join(" ")}>
        <div className="user-card-deck__card" key={currentProfile.data_id}>
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