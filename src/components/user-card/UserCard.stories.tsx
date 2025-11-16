import type { Meta, StoryObj } from "@storybook/react";
import { UserCard } from "./UserCard";
import Tana from '@/assets/img/Tana.jpg'

const meta: Meta<typeof UserCard> = {
  title: "User/UserCard",
  component: UserCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    fname: "Tana",
    age: 24,
    mainImg: Tana,
  },
};