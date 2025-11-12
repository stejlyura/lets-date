import type { Meta, StoryObj } from "@storybook/react";
import { UserCard } from "./UserCard";
import Nastya from '@/assets/img/Nastya.jpg'

const meta: Meta<typeof UserCard> = {
  title: "User/UserCard",
  component: UserCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    fname: "Nastya",
    age: 20,
    mainImg: Nastya,
  },
};