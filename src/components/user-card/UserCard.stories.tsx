import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { UserCard } from "./UserCard";
import type { userData } from "@/types/type-user";
import { projectBD } from "@/projectDB/data";
import Anna from "@/assets/img/Anna.webp";

type CardAction = "like" | "nope" | "skip";

const ANIMATION_MS = 420;
const ENTER_ANIMATION_MS = 320;

const fallbackUser: userData = {
  data_id: 0,
  fname: "Anna",
  age: 24,
  isLike: true,
  mainImg: Anna,
  isActive: true,
  range: 2,
};

const demoUsers: userData[] = projectBD.length ? projectBD : [fallbackUser];

const defaultUser = demoUsers[0] ?? fallbackUser;

const CardDeckPreview = () => {
  const [index, setIndex] = useState(0);
  const [stageState, setStageState] = useState<CardAction | "enter" | null>(null);
  const hideTimerRef = useRef<number>();
  const enterTimerRef = useRef<number>();

  const triggerAction = useCallback((type: CardAction) => {
    if (hideTimerRef.current || enterTimerRef.current) {
      return;
    }

    setStageState(type);
    hideTimerRef.current = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % demoUsers.length);
      setStageState("enter");

      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = undefined;
      }

      enterTimerRef.current = window.setTimeout(() => {
        setStageState(null);
        if (enterTimerRef.current) {
          window.clearTimeout(enterTimerRef.current);
          enterTimerRef.current = undefined;
        }
      }, ENTER_ANIMATION_MS);
    }, ANIMATION_MS);
  }, []);

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

  const currentUser = useMemo(
    () => demoUsers[index % demoUsers.length],
    [index]
  );

  const stageClassNames = ["user-card-deck__stage"];
  if (stageState) {
    stageClassNames.push(`user-card-deck__stage--${stageState}`);
  }

  return (
    <div className="user-card-deck">
      <div className={stageClassNames.join(" ")}>
        <div className="user-card-deck__card" key={currentUser.data_id}>
          <UserCard
            fname={currentUser.fname}
            age={currentUser.age}
            mainImg={currentUser.mainImg}
            isActive={currentUser.isActive}
            range={currentUser.range}
            onLike={() => triggerAction("like")}
            onNope={() => triggerAction("nope")}
            onSkip={() => triggerAction("skip")}
          />
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof UserCard> = {
  title: "User/UserCard",
  component: UserCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    fname: defaultUser.fname,
    age: defaultUser.age,
    mainImg: defaultUser.mainImg,
    isActive: defaultUser.isActive,
    range: defaultUser.range,
  },
};

export const InteractiveDeck: Story = {
  render: () => <CardDeckPreview />,
};
